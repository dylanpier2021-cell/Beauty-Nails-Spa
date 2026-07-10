/**
 * Beauty Nails Spa — Booking backend (Google Apps Script Web App)
 * -----------------------------------------------------------------
 * This script runs UNDER the Google account that owns (or has "Make changes
 * to events" access to) the Beauty Nails Spa Appointment Calendar.
 *
 * It does two things for the Book Now page:
 *   1. action=availability&date=YYYY-MM-DD  -> returns the events already
 *      booked that day, so the page can show which time slots still have
 *      an open station.
 *   2. A POST with a booking -> creates the event on her calendar, but ONLY
 *      if fewer than MAX_STATIONS appointments already overlap that time.
 *
 * The "3 slots" / "3 calendars" behavior is a single real calendar that
 * allows up to 3 overlapping appointments (3 nail stations working at once).
 *
 * DEPLOY: see the SETUP-INSTRUCTIONS file that came with this script.
 */

const CONFIG = {
  // The Beauty Nails Spa Appointment Calendar.
  CALENDAR_ID: '90fd6b904986570d1af205006efe318b9a66a9571dc059cea3d2616563ae6e77@group.calendar.google.com',

  // How many appointments can run at the same time (number of stations).
  MAX_STATIONS: 3,

  TIMEZONE: 'America/Chicago',

  // Slot start times every N minutes (used by the openslots endpoint the
  // voice AI calls).
  SLOT_INTERVAL: 30,

  // Business hours per weekday (0=Sun ... 6=Sat). null = closed.
  // 24h "HH:MM" in the salon's local time. Keep this in sync with the page.
  HOURS: {
    0: { open: '11:00', close: '17:00' }, // Sun  11:00 AM – 5:00 PM
    1: { open: '09:30', close: '19:00' }, // Mon  9:30 AM – 7:00 PM
    2: { open: '09:30', close: '19:00' }, // Tue
    3: { open: '09:30', close: '19:00' }, // Wed
    4: { open: '09:30', close: '19:00' }, // Thu
    5: { open: '09:30', close: '19:00' }, // Fri
    6: { open: '09:30', close: '19:00' }, // Sat
  },

  // A shared secret you also put in the web page. Blocks random bots from
  // hitting your endpoint. Change it to anything you like (keep it matching
  // the BOOKING_TOKEN value in the Book Now page).
  TOKEN: 'beautynails-2026',
};

/* ------------------------------------------------------------------ */
/* Web app entry points                                                */
/* ------------------------------------------------------------------ */

function doGet(e) {
  try {
    const action = (e.parameter.action || '').toLowerCase();

    if (action === 'availability') {
      return json(getAvailability(e.parameter.date));
    }

    // Clean, voice-AI-friendly endpoint: returns the open start times for a
    // given day (and optional service duration) with how many stations are
    // still free. Example call:
    //   ...?action=openslots&date=2026-07-15&durationMin=45
    if (action === 'openslots') {
      return json(getOpenSlots(e.parameter.date, e.parameter.durationMin));
    }

    // Quick "is this exact time free?" check the voice AI can use before it
    // promises a slot. Example: ...?action=check&start=2026-07-15T14:00:00&durationMin=45
    if (action === 'check') {
      return json(checkSlot(e.parameter.start, e.parameter.durationMin));
    }

    // Health check
    return json({ ok: true, service: 'Beauty Nails Spa booking API', stations: CONFIG.MAX_STATIONS });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doPost(e) {
  try {
    // The page sends the body as text/plain to avoid a CORS preflight,
    // so we parse it ourselves.
    const body = JSON.parse(e.postData.contents || '{}');

    if (body.token !== CONFIG.TOKEN) {
      return json({ ok: false, error: 'Unauthorized' });
    }

    return json(createBooking(body));
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

/* ------------------------------------------------------------------ */
/* Core logic                                                          */
/* ------------------------------------------------------------------ */

/**
 * Returns every event on the calendar for the given day as
 * { start: ISO, end: ISO } so the page can compute remaining stations.
 */
function getAvailability(dateStr) {
  if (!dateStr) return { ok: false, error: 'Missing date' };

  const cal = CalendarApp.getCalendarById(CONFIG.CALENDAR_ID);
  if (!cal) return { ok: false, error: 'Calendar not found / not shared with this account' };

  const dayStart = new Date(dateStr + 'T00:00:00');
  const dayEnd = new Date(dateStr + 'T23:59:59');

  const events = cal.getEvents(dayStart, dayEnd).map(function (ev) {
    return { start: ev.getStartTime().toISOString(), end: ev.getEndTime().toISOString() };
  });

  return { ok: true, date: dateStr, stations: CONFIG.MAX_STATIONS, events: events };
}

/**
 * Voice-AI endpoint. Returns the list of bookable start times for a day,
 * each with how many of the MAX_STATIONS are still open.
 * Response shape:
 *   { ok, date, open:true/false, durationMin,
 *     slots:[ { time:"2:00 PM", start:ISO, stationsLeft:2 }, ... ] }
 */
function getOpenSlots(dateStr, durationMinParam) {
  if (!dateStr) return { ok: false, error: 'Missing date' };

  const durationMin = Number(durationMinParam) || 30;
  const day = new Date(dateStr + 'T12:00:00');
  const hours = CONFIG.HOURS[day.getDay()];
  if (!hours) return { ok: true, date: dateStr, open: false, closed: true, slots: [] };

  const cal = CalendarApp.getCalendarById(CONFIG.CALENDAR_ID);
  if (!cal) return { ok: false, error: 'Calendar not found / not shared with this account' };

  const dayStart = new Date(dateStr + 'T00:00:00');
  const dayEnd = new Date(dateStr + 'T23:59:59');
  const existing = cal.getEvents(dayStart, dayEnd);

  const open = new Date(dateStr + 'T' + hours.open + ':00');
  const close = new Date(dateStr + 'T' + hours.close + ':00');
  const now = new Date();

  const slots = [];
  let t = new Date(open);
  while (new Date(t.getTime() + durationMin * 60000) <= close) {
    const end = new Date(t.getTime() + durationMin * 60000);
    if (t > now) {
      const overlap = existing.filter(function (ev) {
        return ev.getStartTime() < end && ev.getEndTime() > t;
      }).length;
      const stationsLeft = CONFIG.MAX_STATIONS - overlap;
      if (stationsLeft > 0) {
        slots.push({
          time: Utilities.formatDate(t, CONFIG.TIMEZONE, 'h:mm a'),
          start: t.toISOString(),
          stationsLeft: stationsLeft,
        });
      }
    }
    t = new Date(t.getTime() + CONFIG.SLOT_INTERVAL * 60000);
  }

  return { ok: true, date: dateStr, open: true, durationMin: durationMin, stations: CONFIG.MAX_STATIONS, slots: slots };
}

/**
 * Voice-AI endpoint. Confirms whether one specific start time has a free
 * station before the agent commits to it.
 */
function checkSlot(startStr, durationMinParam) {
  if (!startStr) return { ok: false, error: 'Missing start' };
  const cal = CalendarApp.getCalendarById(CONFIG.CALENDAR_ID);
  if (!cal) return { ok: false, error: 'Calendar not found / not shared with this account' };

  const start = new Date(startStr);
  if (isNaN(start.getTime())) return { ok: false, error: 'Invalid start time' };
  const durationMin = Number(durationMinParam) || 30;
  const end = new Date(start.getTime() + durationMin * 60000);

  const overlap = cal.getEvents(start, end).filter(function (ev) {
    return ev.getStartTime() < end && ev.getEndTime() > start;
  }).length;

  const stationsLeft = CONFIG.MAX_STATIONS - overlap;
  return { ok: true, available: stationsLeft > 0, stationsLeft: Math.max(0, stationsLeft), start: start.toISOString() };
}

/**
 * Creates an appointment if a station is free. Rejects with reason "full"
 * when all stations are already booked for that time window.
 */
function createBooking(body) {
  const cal = CalendarApp.getCalendarById(CONFIG.CALENDAR_ID);
  if (!cal) return { ok: false, error: 'Calendar not found / not shared with this account' };

  const start = new Date(body.start);
  const durationMin = Number(body.durationMin) || 30;
  const end = new Date(start.getTime() + durationMin * 60000);

  if (isNaN(start.getTime())) return { ok: false, error: 'Invalid start time' };

  // Count appointments that actually overlap this window.
  const overlapping = cal.getEvents(start, end).filter(function (ev) {
    return ev.getStartTime() < end && ev.getEndTime() > start;
  });

  if (overlapping.length >= CONFIG.MAX_STATIONS) {
    return { ok: false, reason: 'full', message: 'That time is fully booked. Please pick another time.' };
  }

  const station = overlapping.length + 1;
  const name = (body.name || 'Guest').toString().trim();
  const service = (body.service || 'Appointment').toString().trim();
  const price = body.price ? ' — $' + body.price : '';

  const title = service + ' — ' + name + ' (Station ' + station + ')';

  const description =
    'Booked online via Beauty Nails Spa Book Now page.\n\n' +
    'Service: ' + service + price + '\n' +
    'Duration: ' + durationMin + ' min\n' +
    'Name: ' + name + '\n' +
    'Phone: ' + (body.phone || '—') + '\n' +
    'Email: ' + (body.email || '—') + '\n' +
    'Station: ' + station + ' of ' + CONFIG.MAX_STATIONS + '\n' +
    (body.notes ? 'Notes: ' + body.notes + '\n' : '');

  const options = {};
  if (body.email) options.guests = body.email; // sends the customer an invite

  const ev = cal.createEvent(title, start, end, options);
  ev.setDescription(description);

  return {
    ok: true,
    station: station,
    eventId: ev.getId(),
    start: start.toISOString(),
    end: end.toISOString(),
  };
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Optional: run this once from the editor to confirm the script can see
 * the calendar before you deploy. Check the execution log.
 */
function testCalendarAccess() {
  const cal = CalendarApp.getCalendarById(CONFIG.CALENDAR_ID);
  if (!cal) {
    Logger.log('❌ Cannot access calendar. Make sure it is shared with this account with "Make changes to events".');
  } else {
    Logger.log('✅ Connected to calendar: ' + cal.getName());
  }
}

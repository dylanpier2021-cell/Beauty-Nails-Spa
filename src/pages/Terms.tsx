import { business } from '@/data/business'
import { LegalLayout } from '@/components/LegalLayout'

export default function Terms() {
  return (
    <LegalLayout
      title="Terms of Service"
      metaTitle="Terms of Service | Beauty Nails Spa Champaign, IL"
      description="The terms for using the Beauty Nails Spa website and services in Champaign, IL, including appointments, pricing and our SMS text messaging program."
      path="/terms"
      updated="June 7, 2026"
    >
      <p>
        Welcome to {business.name}. By using our website or booking our services, you agree to these Terms
        of Service. Please read them carefully. If you do not agree, please do not use the site.
      </p>

      <h2>Our Services</h2>
      <p>
        {business.name} provides nail care services including manicures, pedicures, gel, dip powder,
        acrylic, Gel X and nail art at our salon in {business.address.city}, {business.address.state}.
        Service availability and offerings may change over time.
      </p>

      <h2>Appointments and Walk-Ins</h2>
      <ul>
        <li>Appointments can be made by phone, and walk-ins are welcome based on availability.</li>
        <li>Please arrive on time so we can give you and the next guest our full attention.</li>
        <li>If you need to cancel or reschedule, we appreciate a courtesy call as early as possible.</li>
      </ul>

      <h2>Pricing</h2>
      <p>
        Posted prices are starting prices. Final pricing may vary based on nail length, shape, design
        complexity and any add-ons, and will be confirmed with you before we begin. Prices are subject to
        change without notice.
      </p>

      <h2>SMS Text Messaging Program</h2>
      <p>
        If you opt in, {business.name} may send appointment related text messages such as confirmations
        and reminders. By providing your mobile number and opting in, you agree to the following terms.
      </p>
      <ul>
        <li>
          <strong>Consent:</strong> You consent to receive text messages only after providing express
          opt in. Consent is not a condition of purchasing any service.
        </li>
        <li>
          <strong>Message frequency:</strong> Frequency varies based on your appointments and requests.
        </li>
        <li>
          <strong>STOP:</strong> Reply <strong>STOP</strong> at any time to cancel. You will receive one
          confirmation message and no further texts unless you opt in again.
        </li>
        <li>
          <strong>HELP:</strong> Reply <strong>HELP</strong> for help, or call us at {business.phoneDisplay}.
        </li>
        <li>
          <strong>Rates:</strong> Message and data rates may apply. Carriers are not liable for delayed or
          undelivered messages.
        </li>
        <li>
          <strong>Privacy:</strong> We do not share or sell your mobile opt-in data or phone number with
          third parties or affiliates for marketing. See our{' '}
          <a href="/privacy">Privacy Policy</a> for details.
        </li>
      </ul>

      <h2>No Lead Sharing or Affiliate Marketing</h2>
      <p>
        We do not sell, rent or share your information for lead generation, and we do not participate in
        affiliate marketing programs that share your personal data.
      </p>

      <h2>Website Use and Intellectual Property</h2>
      <p>
        The content on this website, including text, graphics and the Beauty Nails Spa name and branding,
        is owned by us or our licensors and is provided for your personal, non-commercial use. Please do
        not copy or reuse our content without permission.
      </p>

      <h2>Disclaimers</h2>
      <p>
        We strive to provide excellent service and accurate information, but our website is provided on an
        "as is" basis without warranties of any kind. If you have a known allergy or skin condition, please
        let your technician know before your service.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, {business.name} is not liable for any indirect or
        incidental damages arising from your use of the website. Nothing in these terms limits liability
        that cannot be limited under applicable law.
      </p>

      <h2>Governing Law</h2>
      <p>
        These Terms are governed by the laws of the State of {business.address.stateLong}, without regard
        to conflict of law principles.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. Updates take effect when posted, and we will revise
        the date at the top of this page.
      </p>

      <h2>Contact Us</h2>
      <ul>
        <li>{business.name}</li>
        <li>{business.address.street}, {business.address.city}, {business.address.state} {business.address.zip}</li>
        <li>Phone: <a href={business.phoneHref}>{business.phoneDisplay}</a></li>
        <li>Email: <a href={`mailto:${business.email}`}>{business.email}</a></li>
      </ul>
    </LegalLayout>
  )
}

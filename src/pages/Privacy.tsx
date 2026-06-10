import { business } from '@/data/business'
import { LegalLayout } from '@/components/LegalLayout'

export default function Privacy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      metaTitle="Privacy Policy | Beauty Nails Spa Champaign, IL"
      description="How Beauty Nails Spa in Champaign, IL collects, uses and protects your information, including our SMS text messaging and opt-out practices."
      path="/privacy"
      updated="June 7, 2026"
    >
      <p>
        This Privacy Policy explains how {business.name} ("we," "us," or "our") collects, uses and
        protects information when you contact us, visit our salon, or use our website. We respect your
        privacy and are committed to handling your information responsibly.
      </p>

      <h2>Information We Collect</h2>
      <p>We may collect the following information when you choose to share it with us:</p>
      <ul>
        <li>Contact details such as your name, phone number and email address when you call, email or book an appointment.</li>
        <li>Appointment preferences such as the services you request and your preferred technician or time.</li>
        <li>Basic website usage data, such as pages visited, collected through standard analytics to help us improve our site.</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To schedule, confirm and manage your appointments.</li>
        <li>To respond to your questions and provide customer service.</li>
        <li>To send appointment reminders or updates if you have asked us to.</li>
        <li>To improve our website and services.</li>
      </ul>

      <h2>SMS Text Messaging</h2>
      <p>
        If you provide your mobile number and opt in, we may send you appointment related text messages,
        such as confirmations and reminders. Your consent to receive text messages is not a condition of
        any purchase.
      </p>
      <ul>
        <li>
          <strong>Opt in:</strong> You agree to receive text messages from {business.name} only after you
          give express consent, for example by checking a box or sending us your number for this purpose.
        </li>
        <li>
          <strong>Message frequency:</strong> Message frequency varies based on your appointments and
          requests.
        </li>
        <li>
          <strong>Opt out:</strong> You can opt out at any time by replying <strong>STOP</strong> to any
          message. After you reply STOP, we will send one confirmation message and will not send further
          texts unless you opt in again.
        </li>
        <li>
          <strong>Help:</strong> Reply <strong>HELP</strong> for assistance, or contact us at{' '}
          {business.phoneDisplay}.
        </li>
        <li>
          <strong>Rates:</strong> Message and data rates may apply, depending on your mobile carrier and
          plan.
        </li>
        <li>
          <strong>No sharing of opt-in data:</strong> We do not share or sell your mobile opt-in
          information or phone number with third parties or affiliates for their marketing purposes. Text
          messaging consent and phone numbers collected for SMS are never shared with anyone for marketing.
        </li>
      </ul>

      <h2>How We Share Information</h2>
      <p>
        We do not sell, rent or share your personal information, and we do not engage in lead sharing or
        affiliate marketing. We may share information only with trusted service providers who help us
        operate, such as a scheduling or messaging platform, and only to the extent needed to provide that
        service. We may also disclose information if required by law.
      </p>

      <h2>Cookies and Analytics</h2>
      <p>
        Our website may use cookies and similar technologies to understand how visitors use the site so we
        can improve it. You can control cookies through your browser settings.
      </p>

      <h2>Data Security</h2>
      <p>
        We take reasonable steps to protect your information. No method of transmission or storage is
        completely secure, but we work to keep your information safe.
      </p>

      <h2>Your Choices</h2>
      <p>
        You may ask us to update or delete your contact information, and you may opt out of text messages
        at any time as described above. To make a request, contact us using the details below.
      </p>

      <h2>Children's Privacy</h2>
      <p>
        Our website is not directed to children under 13, and we do not knowingly collect personal
        information from children. Appointments for minors are arranged by a parent or guardian.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. When we do, we will revise the date at the top
        of this page.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy, please reach out:
      </p>
      <ul>
        <li>{business.name}</li>
        <li>{business.address.street}, {business.address.city}, {business.address.state} {business.address.zip}</li>
        <li>Phone: <a href={business.phoneHref}>{business.phoneDisplay}</a></li>
        <li>Email: <a href={`mailto:${business.email}`}>{business.email}</a></li>
      </ul>
    </LegalLayout>
  )
}

import LegalPage from "@/components/LegalPage";
import { brand } from "@/lib/data";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p className="text-sm text-charcoal/50">
        Template only — have this reviewed by a lawyer familiar with healthcare privacy law (e.g.
        HIPAA in the US) before publishing. Last updated: [DATE].
      </p>

      <h2>Who we are</h2>
      <p>
        This Privacy Policy explains how {brand.name} (&quot;we&quot;, &quot;us&quot;) collects, uses and
        protects information when you visit this website or contact us through it, including via
        our chat assistant.
      </p>

      <h2>Information we collect</h2>
      <p>When you use the chat assistant to ask a question or request an appointment, we collect:</p>
      <ul>
        <li>Your name, phone number and email address</li>
        <li>The treatment you&apos;re interested in and your preferred appointment date</li>
        <li>Any free-text message you choose to include</li>
      </ul>
      <p>
        We also automatically collect standard technical information (such as browser type and
        approximate location from IP address) through our hosting provider&apos;s logs, for security
        and performance monitoring.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To respond to your appointment request and contact you to confirm details</li>
        <li>To answer questions you send through the chat assistant</li>
        <li>To maintain and improve this website</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>Third-party services</h2>
      <p>This site uses the following third-party services, each with its own privacy practices:</p>
      <ul>
        <li>
          <strong>Vercel</strong> — hosting and serverless infrastructure
        </li>
        <li>
          <strong>Google Maps</strong> — the embedded location map on our Contact section
        </li>
        <li>
          <strong>Unsplash</strong> — placeholder photography used on this site prior to launch
        </li>
      </ul>

      <h2>Data retention</h2>
      <p>
        Appointment requests are retained only as long as necessary to respond to your enquiry and
        for our clinical/administrative record-keeping obligations. [PLACEHOLDER — state your
        actual retention period.]
      </p>

      <h2>Your rights</h2>
      <p>
        You may ask us to access, correct or delete the personal information we hold about you by
        contacting us using the details below.
      </p>

      <h2>Contact us</h2>
      <p>
        {brand.address.line1}, {brand.address.city}
        <br />
        {brand.phone} · {brand.email}
      </p>
    </LegalPage>
  );
}

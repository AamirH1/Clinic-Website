import LegalPage from "@/components/LegalPage";
import { brand } from "@/lib/data";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <p className="text-sm text-charcoal/50">
        Template only — have this reviewed by a lawyer before publishing. Last updated: [DATE].
      </p>

      <h2>Acceptance of terms</h2>
      <p>
        By using this website, you agree to these Terms of Service. If you do not agree, please do
        not use this site.
      </p>

      <h2>Not medical advice</h2>
      <p>
        Content on this website — including treatment descriptions, the smile gallery and chat
        assistant responses — is provided for general informational purposes only and does not
        constitute dental or medical advice. It is not a substitute for an in-person consultation
        and examination by a qualified dental professional. Always seek the advice of a qualified
        clinician regarding any dental condition or treatment.
      </p>

      <h2>Appointment requests</h2>
      <p>
        Submitting an appointment request through this website (including via the chat assistant)
        does not guarantee an appointment. All requests are subject to confirmation by our team by
        phone or email.
      </p>

      <h2>Website use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use this website for any unlawful purpose</li>
        <li>Attempt to gain unauthorized access to any part of this website or its systems</li>
        <li>Submit false, misleading or fraudulent information through our forms or chat assistant</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The design, text and other content of this website are owned by or licensed to {brand.name}
        and may not be reproduced without permission, except as permitted by law.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {brand.name} is not liable for any indirect,
        incidental or consequential damages arising from your use of this website.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of [PLACEHOLDER — your jurisdiction].</p>

      <h2>Contact us</h2>
      <p>
        {brand.address.line1}, {brand.address.city}
        <br />
        {brand.phone} · {brand.email}
      </p>
    </LegalPage>
  );
}

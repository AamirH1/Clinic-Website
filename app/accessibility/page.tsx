import LegalPage from "@/components/LegalPage";
import { brand } from "@/lib/data";

export const metadata = { title: "Accessibility" };

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility">
      <p className="text-sm text-charcoal/50">
        Template only — verify against an actual audit before publishing. Last updated: [DATE].
      </p>

      <h2>Our commitment</h2>
      <p>
        {brand.name} is committed to ensuring this website is accessible to everyone, including
        people with disabilities. We aim to conform to the Web Content Accessibility Guidelines
        (WCAG) 2.1 at Level AA.
      </p>

      <h2>What we&apos;ve done</h2>
      <ul>
        <li>Semantic HTML structure and heading hierarchy throughout the site</li>
        <li>Keyboard-reachable navigation, buttons, form fields and the chat assistant</li>
        <li>Visible focus states and sufficient color contrast in both light and dark themes</li>
        <li>
          Motion that respects your operating system&apos;s &quot;reduce motion&quot; preference —
          animations are minimized automatically if you have that setting enabled
        </li>
        <li>Descriptive alt text on photography</li>
      </ul>

      <h2>Known limitations</h2>
      <p>
        We are aware that some third-party embeds (such as the Google Maps location widget) may
        not fully meet the same accessibility standard as the rest of this site. We&apos;re working
        to address this over time.
      </p>

      <h2>Feedback</h2>
      <p>
        If you encounter an accessibility barrier on this website, please let us know so we can
        fix it:
      </p>
      <p>
        {brand.phone} · {brand.email}
      </p>
    </LegalPage>
  );
}

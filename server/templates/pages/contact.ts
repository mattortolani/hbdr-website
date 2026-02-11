import { renderLayout } from "../layout";
import { renderPageHero } from "../components/hero";
import { renderContactFormSection } from "../components/contact-form";

export function renderContactPage(): string {
  const content = `
  ${renderPageHero("Contact", "Get In Touch", "Ready to transform your ad revenue? Our team is here to help you get started with HBDR.")}

  ${renderContactFormSection()}`;

  return renderLayout({
    title: "Contact Us - HBDR",
    description: "Contact HBDR to learn how our header bidding and ad monetization solutions can maximize your publisher revenue.",
    canonicalPath: "/contact",
    bodyContent: content,
  });
}


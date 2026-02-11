// Barrel file — re-exports all template functions
// Useful for importing multiple templates from a single path

// Layout
export { renderLayout } from "./layout";
export type { LayoutOptions } from "./layout";

// Components
export { renderContactFormSection } from "./components/contact-form";
export { renderCTASection } from "./components/cta";
export { renderPageHero } from "./components/hero";
export { renderStatsSection } from "./components/stats";

// Pages
export { renderPage } from "./pages/home";
export { renderAboutPage } from "./pages/about";
export { renderHowItWorksPage } from "./pages/how-it-works";
export { renderCareersPage } from "./pages/careers";
export { renderPressPage } from "./pages/press";
export { renderContactPage } from "./pages/contact";
export { renderBlogPage, renderBlogPostPage } from "./pages/blog";
export { renderDashboardPage } from "./pages/dashboard";
export { renderPartnersPage } from "./pages/partners";
export { renderFaqSupportPage } from "./pages/support";
export { renderTrustCompliancePage } from "./pages/trust";

// Solution pages
export { renderHeaderBiddingPage } from "./pages/solutions/header-bidding";
export { renderDisplayAdsPage } from "./pages/solutions/display-ads";
export { renderCtvOttPage } from "./pages/solutions/ctv-ott";
export { renderInAppAdsPage } from "./pages/solutions/in-app-ads";
export { renderMcmPage } from "./pages/solutions/mcm";
export { renderManageAccountPage } from "./pages/solutions/manage-account";
export { renderManageInventoryPage } from "./pages/solutions/manage-inventory";
export { renderOpenBiddingPage } from "./pages/solutions/open-bidding";
export { renderAdExchangePage } from "./pages/solutions/ad-exchange-adx";
export { renderVideoPlayerPage } from "./pages/solutions/video-player";

// Legal pages
export { renderPrivacyPolicyPage } from "./pages/legal/privacy-policy";
export { renderTermsPage } from "./pages/legal/terms";
export { renderGdprCookiePolicyPage } from "./pages/legal/gdpr-cookie-policy";

// Audience pages
export { renderPublishersPage } from "./pages/audience/publishers";
export { renderAdvertisersPage } from "./pages/audience/advertisers";

// Admin templates
export { renderBlogAdminPage, renderBlogEditorPage } from "./admin/blog";
export { renderAdminLoginPage, renderAdminLeadsPage } from "./admin/leads";

// Tools
export { renderPublisherToolsPage } from "./tools/index";

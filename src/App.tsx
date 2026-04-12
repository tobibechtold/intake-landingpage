import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import LocaleRedirect from "@/components/LocaleRedirect";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import FeaturesPage from "./pages/FeaturesPage";
import NoSubscriptionPage from "./pages/NoSubscriptionPage";
import NoAccountPage from "./pages/NoAccountPage";
import ComparisonsIndexPage from "./pages/ComparisonsIndexPage";
import ComparisonDetailPage from "./pages/ComparisonDetailPage";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import WhatsNewIndex from "./pages/WhatsNewIndex";
import WhatsNewEntry from "./pages/WhatsNewEntry";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { getLegacyGermanRedirectPath } from "@/lib/localeRouting";

const queryClient = new QueryClient();

const LegacyGermanRedirect = () => {
  const location = useLocation();
  const target = getLegacyGermanRedirectPath(location.pathname) ?? "/";

  return <Navigate replace to={target} state={{ legacyLocaleRedirect: true }} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <LocaleRedirect />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/funktionen" element={<FeaturesPage />} />
            <Route path="/kalorienzaehler-ohne-abo" element={<NoSubscriptionPage />} />
            <Route path="/kalorien-tracker-ohne-konto" element={<NoAccountPage />} />
            <Route path="/vergleiche" element={<ComparisonsIndexPage />} />
            <Route path="/vergleiche/:slug" element={<ComparisonDetailPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/whats-new" element={<WhatsNewIndex />} />
            <Route path="/whats-new/:version" element={<WhatsNewEntry />} />
            <Route path="/en" element={<Index />} />
            <Route path="/en/features" element={<FeaturesPage />} />
            <Route path="/en/calorie-counter-no-subscription" element={<NoSubscriptionPage />} />
            <Route path="/en/calorie-tracker-no-account" element={<NoAccountPage />} />
            <Route path="/en/comparisons" element={<ComparisonsIndexPage />} />
            <Route path="/en/comparisons/:slug" element={<ComparisonDetailPage />} />
            <Route path="/en/privacy" element={<Privacy />} />
            <Route path="/en/terms" element={<Terms />} />
            <Route path="/en/whats-new" element={<WhatsNewIndex />} />
            <Route path="/en/whats-new/:version" element={<WhatsNewEntry />} />
            <Route path="/de/*" element={<LegacyGermanRedirect />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Analytics />
          <SpeedInsights />
        </TooltipProvider>
      </LanguageProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;

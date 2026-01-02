import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegistrationProvider } from "@/context/RegistrationContext";

import LandingPage from "./pages/LandingPage";
import RegistrationPage from "./pages/RegistrationPage";
import IdentityVerificationPage from "./pages/IdentityVerificationPage";
import BiometricVerificationPage from "./pages/BiometricVerificationPage";
import DuplicateCheckPage from "./pages/DuplicateCheckPage";
import MobilityPage from "./pages/MobilityPage";
import SuccessPage from "./pages/SuccessPage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RegistrationProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/verify/identity" element={<IdentityVerificationPage />} />
            <Route path="/verify/biometric" element={<BiometricVerificationPage />} />
            <Route path="/verify/duplicate" element={<DuplicateCheckPage />} />
            <Route path="/verify/mobility" element={<MobilityPage />} />
            <Route path="/verify/success" element={<SuccessPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RegistrationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

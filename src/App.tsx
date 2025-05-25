
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Medications from "./pages/Medications";
import TreatmentTracker from "./pages/TreatmentTracker";
import Funding from "./pages/Funding";
import Schedule from "./pages/Schedule";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/medications" element={<Medications />} />
          <Route path="/medications/tracker" element={<TreatmentTracker />} />
          <Route path="/medications/:medicationId/tracker" element={<TreatmentTracker />} />
          <Route path="/funding" element={<Funding />} />
          <Route path="/schedule" element={<Schedule />} />
          {/* Placeholder routes for future pages */}
          <Route path="/reminders" element={<Index />} />
          <Route path="/records" element={<Index />} />
          <Route path="/monitoring" element={<Index />} />
          <Route path="/profile" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

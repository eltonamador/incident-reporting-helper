import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Solicitante_Esperando from "./pages/Solicitante_Esperando";
import CIODES_Recebimento from "./pages/CIODES_Recebimento";
import FirstGBM from "./pages/1GBM";
import SecondGBM from "./pages/2GBM";
import GAPH from "./pages/GAPH";
import GMAF from "./pages/GMAF";
import FifthGBM from "./pages/5GBM";
import MCPB from "./pages/MCPB";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/solicitante-esperando" element={<Solicitante_Esperando />} />
          <Route path="/ciodes" element={<CIODES_Recebimento />} />
          <Route path="/1gbm" element={<FirstGBM />} />
          <Route path="/2gbm" element={<SecondGBM />} />
          <Route path="/gaph" element={<GAPH />} />
          <Route path="/gmaf" element={<GMAF />} />
          <Route path="/5gbm" element={<FifthGBM />} />
          <Route path="/mcpb" element={<MCPB />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
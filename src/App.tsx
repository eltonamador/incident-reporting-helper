import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Solicitante_Esperando from "./pages/Solicitante_Esperando";
import CIODES_Recebimento from "./pages/CIODES_Recebimento";
import Login from "./pages/Login";

const queryClient = new QueryClient();

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: JSX.Element;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={['solicitante']}>
            <Index />
          </ProtectedRoute>
        }
      />
      <Route
        path="/solicitante-esperando"
        element={
          <ProtectedRoute allowedRoles={['solicitante']}>
            <Solicitante_Esperando />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ciodes"
        element={
          <ProtectedRoute allowedRoles={['despachante']}>
            <CIODES_Recebimento />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
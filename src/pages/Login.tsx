import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserRole } from "@/types/auth";
import { toast } from "sonner";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: UserRole) => {
    login(role);
    toast.success(`Logado como ${role}`);
    
    switch (role) {
      case 'solicitante':
        navigate('/');
        break;
      case 'despachante':
        navigate('/ciodes');
        break;
      case 'respondedor':
        // Navigate to GBM page when implemented
        toast.info('Página do GBM em desenvolvimento');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md space-y-4 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <div className="space-y-4">
          <Button
            className="w-full"
            onClick={() => handleLogin('solicitante')}
          >
            Entrar como Solicitante
          </Button>
          <Button
            className="w-full"
            onClick={() => handleLogin('despachante')}
          >
            Entrar como Despachante
          </Button>
          <Button
            className="w-full"
            onClick={() => handleLogin('respondedor')}
          >
            Entrar como Respondedor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
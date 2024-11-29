import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const Login = () => {
  const { login } = useAuth();
  const [role, setRole] = useState<string>("");
  const [gbm, setGbm] = useState<string>("");

  const handleLogin = () => {
    if (!role) {
      toast.error("Selecione um perfil");
      return;
    }

    if (role === "respondedor" && !gbm) {
      toast.error("Selecione um GBM");
      return;
    }

    login(role as "despachante" | "respondedor", gbm);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Acesse o sistema com suas credenciais
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Perfil</label>
            <Select onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione seu perfil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="despachante">Despachante</SelectItem>
                <SelectItem value="respondedor">Respondedor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {role === "respondedor" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">GBM</label>
              <Select onValueChange={setGbm}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione seu GBM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1gbm">1º GBM</SelectItem>
                  <SelectItem value="2gbm">2º GBM</SelectItem>
                  <SelectItem value="5gbm">5º GBM</SelectItem>
                  <SelectItem value="gaph">GAPH</SelectItem>
                  <SelectItem value="gmaf">GMAF</SelectItem>
                  <SelectItem value="mcpb">MCPB</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Button className="w-full" onClick={handleLogin}>
            Entrar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
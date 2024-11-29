import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MCPB = () => {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>MCPB - Monitoramento e Controle de Pânico e Brigada</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Painel de ocorrências do MCPB</p>
            {/* Add specific content for MCPB here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MCPB;
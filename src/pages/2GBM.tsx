import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SecondGBM = () => {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>2º GBM - Segundo Grupamento de Bombeiro Militar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Painel de ocorrências do 2º GBM</p>
            {/* Add specific content for 2GBM here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecondGBM;
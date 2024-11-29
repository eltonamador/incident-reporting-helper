import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FirstGBM = () => {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>1º GBM - Primeiro Grupamento de Bombeiro Militar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Painel de ocorrências do 1º GBM</p>
            {/* Add specific content for 1GBM here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FirstGBM;
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GAPH = () => {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>GAPH - Grupamento de Ações e Proteção em Altura</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Painel de ocorrências do GAPH</p>
            {/* Add specific content for GAPH here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GAPH;
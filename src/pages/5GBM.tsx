import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FifthGBM = () => {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>5º GBM - Quinto Grupamento de Bombeiro Militar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Painel de ocorrências do 5º GBM</p>
            {/* Add specific content for 5GBM here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FifthGBM;
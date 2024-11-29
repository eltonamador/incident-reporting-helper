import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GMAF = () => {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>GMAF - Grupamento Marítimo Fluvial</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Painel de ocorrências do GMAF</p>
            {/* Add specific content for GMAF here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GMAF;
import React, { useState } from "react";
import { Article, StockMovement } from "./types";
import ArticleForm from "./ArticleForm";
import StockMovementsTable from "./StockMovementsTable";

const initialArticle: Article = {
  name: "",
  erp: "",
  nature: "",
  unit: "",
  warehouse: "",
};

const App: React.FC = () => {
  const [article, setArticle] = useState<Article>(initialArticle);
  const [movements, setMovements] = useState<StockMovement[]>([]);

  const computeStock = (prevStock: number, entry: number, exit: number) =>
    prevStock + (entry || 0) - (exit || 0);

  const handleAddMovement = (movement: Omit<StockMovement, "id" | "stock">) => {
    const lastStock = movements.length ? movements[movements.length - 1].stock : 0;
    const stock = computeStock(lastStock, movement.entry, movement.exit);
    setMovements([
      ...movements,
      {
        ...movement,
        id: Date.now(),
        stock,
      },
    ]);
  };

  const handleDeleteMovement = (id: number) => {
    const filtered = movements.filter((m) => m.id !== id);
    // Recompute stock after deletion
    let stock = 0;
    const recalculated = filtered.map((m) => {
      stock = computeStock(stock, m.entry, m.exit);
      return { ...m, stock };
    });
    setMovements(recalculated);
  };

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <h2>Fiche de Stock</h2>
      <ArticleForm article={article} onChange={setArticle} />
      <StockMovementsTable
        movements={movements}
        onAdd={handleAddMovement}
        onDelete={handleDeleteMovement}
      />
    </div>
  );
};

export default App;
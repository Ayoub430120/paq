import React from "react";
import { Article, Nature } from "./types";

type Props = {
  article: Article;
  onChange: (a: Article) => void;
};

const ArticleForm: React.FC<Props> = ({ article, onChange }) => {
  // Fix: handleInput should properly convert values for select fields if needed
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // If you want to ensure correct type for 'nature', you can add a check:
    if (name === "nature") {
      onChange({ ...article, nature: value as Nature });
    } else {
      onChange({ ...article, [name]: value });
    }
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <h3>Données de l'article</h3>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <input
          name="name"
          placeholder="Libellé Article"
          value={article.name || ""}
          onChange={handleInput}
        />
        <input
          name="erp"
          placeholder="Code ERP"
          value={article.erp || ""}
          onChange={handleInput}
        />
        <select
          name="nature"
          value={article.nature || ""}
          onChange={handleInput}
        >
          <option value="">Nature</option>
          <option value="OPEX">OPEX</option>
          <option value="CAPEX">CAPEX</option>
        </select>
        <input
          name="unit"
          placeholder="Unité de mesure"
          value={article.unit || ""}
          onChange={handleInput}
        />
        <input
          name="warehouse"
          placeholder="Adresse magasin"
          value={article.warehouse || ""}
          onChange={handleInput}
        />
      </div>
    </div>
  );
};

export default ArticleForm;
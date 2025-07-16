import React, { useState } from "react";
import { StockMovement } from "./types";

type Props = {
  movements: StockMovement[];
  onAdd: (m: Omit<StockMovement, "id" | "stock">) => void;
  onDelete: (id: number) => void;
};

const initialMovement = {
  date: "",
  document: "",
  entry: "",
  exit: "",
  observation: "",
};

const StockMovementsTable: React.FC<Props> = ({ movements, onAdd, onDelete }) => {
  const [form, setForm] = useState(initialMovement);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date || !form.document) return;
    onAdd({
      date: form.date,
      document: form.document,
      entry: Number(form.entry) || 0,
      exit: Number(form.exit) || 0,
      observation: form.observation,
    });
    setForm(initialMovement);
  };

  return (
    <div>
      <h3>Mouvements de Stock</h3>
      <form onSubmit={handleAdd} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
        <input name="document" placeholder="N° Document" value={form.document} onChange={handleChange} required />
        <input name="entry" type="number" placeholder="Entrée" value={form.entry} min={0} onChange={handleChange} />
        <input name="exit" type="number" placeholder="Sortie" value={form.exit} min={0} onChange={handleChange} />
        <input name="observation" placeholder="Observation" value={form.observation} onChange={handleChange} />
        <button type="submit">Ajouter</button>
      </form>
      <table border={1} cellPadding={4} cellSpacing={0} style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>N° ligne</th>
            <th>Date Mouvement</th>
            <th>N° Document</th>
            <th>Entrée</th>
            <th>Sortie</th>
            <th>Stock</th>
            <th>Observation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movements.length === 0 ? (
            <tr>
              <td colSpan={8} style={{ textAlign: "center" }}>Aucun mouvement</td>
            </tr>
          ) : (
            movements.map((m, idx) => (
              <tr key={m.id}>
                <td>{idx + 1}</td>
                <td>{m.date}</td>
                <td>{m.document}</td>
                <td>{m.entry}</td>
                <td>{m.exit}</td>
                <td>{m.stock}</td>
                <td>{m.observation}</td>
                <td>
                  <button onClick={() => onDelete(m.id)}>Supprimer</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StockMovementsTable;
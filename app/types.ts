export type Nature = "OPEX" | "CAPEX" | "";

export type Article = {
  name: string;
  erp: string;
  nature: Nature;
  unit: string;
  warehouse: string;
};

export type StockMovement = {
  id: number;
  date: string;
  document: string;
  entry: number;
  exit: number;
  stock: number;
  observation: string;
};
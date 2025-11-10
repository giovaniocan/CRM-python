//CLIENTS

export type Client = {
  id: number;
  name: string;
  cpf_cnpj: string;
  rg: string;
  email: string;
  phone: string;
  address: string;
  zip_code?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city: string;
  state: string;
  created_at: string;
  updated_at: string;
};

export type NewClient = Omit<Client, "id" | "created_at" | "updated_at">;

/// SUPPLIERS

export type Supplier = {
  id: number;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  address: string;
  zip_code?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city: string;
  state: string;
  created_at: string;
  updated_at: string;
};

export type NewSupplier = Omit<Supplier, "id" | "created_at" | "updated_at">;

// PRODUCTS

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  supplier: number | null;
  supplier_name?: string | null;
  created_at: string;
  updated_at: string;
};

export type NewProduct = Omit<
  Product,
  "id" | "created_at" | "updated_at" | "supplier_name"
>;
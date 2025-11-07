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

/// EMPLOYEES
export type Employee = {
  id: number;
  name: string;
  email: string;
  department: string;
  created_at: string;
  updated_at: string;
};

export type NewEmployee = Omit<Employee, "id" | "created_at" | "updated_at">;

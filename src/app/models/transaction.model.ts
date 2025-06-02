
export interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: Date;
  type: 'income' | 'expense';
  category: string;
}

export interface FixedExpense {
  id: number;
  description: string;
  amount: number;
  month: number;
  year: number;
  category: string;
}

export interface VariableExpense {
  id: number;
  description: string;
  amount: number;
  date: Date;
  category: string;
}

export interface CardExpense {
  id: number;
  description: string;
  amount: number;
  date: Date;
  cardName: string;
  installments: number;
}

export interface MonthlyFinancialData {
  month: number;
  year: number;
  income: number;
  fixedExpenses: number;
  variableExpenses: number;
  cardExpenses: number;
  balance: number;
}

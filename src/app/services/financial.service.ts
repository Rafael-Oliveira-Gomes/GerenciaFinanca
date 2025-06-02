
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction, FixedExpense, VariableExpense, CardExpense, MonthlyFinancialData } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Transactions
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`);
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/transactions`, transaction);
  }

  // Fixed Expenses
  getFixedExpenses(): Observable<FixedExpense[]> {
    return this.http.get<FixedExpense[]>(`${this.apiUrl}/fixed-expenses`);
  }

  addFixedExpense(expense: FixedExpense): Observable<FixedExpense> {
    return this.http.post<FixedExpense>(`${this.apiUrl}/fixed-expenses`, expense);
  }

  // Variable Expenses
  getVariableExpenses(): Observable<VariableExpense[]> {
    return this.http.get<VariableExpense[]>(`${this.apiUrl}/variable-expenses`);
  }

  addVariableExpense(expense: VariableExpense): Observable<VariableExpense> {
    return this.http.post<VariableExpense>(`${this.apiUrl}/variable-expenses`, expense);
  }

  // Card Expenses
  getCardExpenses(): Observable<CardExpense[]> {
    return this.http.get<CardExpense[]>(`${this.apiUrl}/card-expenses`);
  }

  addCardExpense(expense: CardExpense): Observable<CardExpense> {
    return this.http.post<CardExpense>(`${this.apiUrl}/card-expenses`, expense);
  }

  // Dashboard Data
  getMonthlyData(): Observable<MonthlyFinancialData[]> {
    return this.http.get<MonthlyFinancialData[]>(`${this.apiUrl}/monthly-data`);
  }

  getExpensePercentage(month: number, year: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/expense-percentage/${year}/${month}`);
  }
}

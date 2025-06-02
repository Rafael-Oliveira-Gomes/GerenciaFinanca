
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinancialService } from '../../services/financial.service';
import { VariableExpense } from '../../models/transaction.model';

@Component({
  selector: 'app-variable-expenses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './variable-expenses.component.html',
  styleUrl: './variable-expenses.component.css'
})
export class VariableExpensesComponent implements OnInit {
  variableExpenses: VariableExpense[] = [];
  newExpense: VariableExpense = {
    id: 0,
    description: '',
    amount: 0,
    date: new Date(),
    category: ''
  };

  constructor(private financialService: FinancialService) {}

  ngOnInit() {
    this.loadVariableExpenses();
  }

  loadVariableExpenses() {
    this.financialService.getVariableExpenses().subscribe(expenses => {
      this.variableExpenses = expenses;
    });
  }

  addExpense() {
    if (this.newExpense.description && this.newExpense.amount > 0) {
      this.financialService.addVariableExpense(this.newExpense).subscribe(expense => {
        this.variableExpenses.push(expense);
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.newExpense = {
      id: 0,
      description: '',
      amount: 0,
      date: new Date(),
      category: ''
    };
  }

  getTotalExpenses(): number {
    return this.variableExpenses.reduce((total, expense) => total + expense.amount, 0);
  }

  getExpensesByMonth(): { [key: string]: VariableExpense[] } {
    const grouped: { [key: string]: VariableExpense[] } = {};
    this.variableExpenses.forEach(expense => {
      const monthYear = new Date(expense.date).toLocaleDateString('pt-BR', { 
        month: 'long', 
        year: 'numeric' 
      });
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      grouped[monthYear].push(expense);
    });
    return grouped;
  }

  getMonthTotal(expenses: VariableExpense[]): number {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }
}

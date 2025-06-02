
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinancialService } from '../../services/financial.service';
import { FixedExpense } from '../../models/transaction.model';

@Component({
  selector: 'app-fixed-expenses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fixed-expenses.component.html',
  styleUrl: './fixed-expenses.component.css'
})
export class FixedExpensesComponent implements OnInit {
  fixedExpenses: FixedExpense[] = [];
  newExpense: FixedExpense = {
    id: 0,
    description: '',
    amount: 0,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    category: ''
  };

  months = [
    { value: 1, name: 'Janeiro' },
    { value: 2, name: 'Fevereiro' },
    { value: 3, name: 'Março' },
    { value: 4, name: 'Abril' },
    { value: 5, name: 'Maio' },
    { value: 6, name: 'Junho' },
    { value: 7, name: 'Julho' },
    { value: 8, name: 'Agosto' },
    { value: 9, name: 'Setembro' },
    { value: 10, name: 'Outubro' },
    { value: 11, name: 'Novembro' },
    { value: 12, name: 'Dezembro' }
  ];

  constructor(private financialService: FinancialService) {}

  ngOnInit() {
    this.loadFixedExpenses();
  }

  loadFixedExpenses() {
    this.financialService.getFixedExpenses().subscribe(expenses => {
      this.fixedExpenses = expenses;
    });
  }

  addExpense() {
    if (this.newExpense.description && this.newExpense.amount > 0) {
      this.financialService.addFixedExpense(this.newExpense).subscribe(expense => {
        this.fixedExpenses.push(expense);
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.newExpense = {
      id: 0,
      description: '',
      amount: 0,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      category: ''
    };
  }

  getMonthName(monthNumber: number): string {
    return this.months.find(m => m.value === monthNumber)?.name || '';
  }

  getTotalByMonth(): { [key: number]: number } {
    const totals: { [key: number]: number } = {};
    this.fixedExpenses.forEach(expense => {
      if (!totals[expense.month]) {
        totals[expense.month] = 0;
      }
      totals[expense.month] += expense.amount;
    });
    return totals;
  }

  getYearTotal(): number {
    return this.fixedExpenses.reduce((total, expense) => total + expense.amount, 0);
  }
}

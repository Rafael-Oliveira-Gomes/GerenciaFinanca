
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinancialService } from '../../services/financial.service';
import { CardExpense } from '../../models/transaction.model';

@Component({
  selector: 'app-card-expenses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-expenses.component.html',
  styleUrl: './card-expenses.component.css'
})
export class CardExpensesComponent implements OnInit {
  cardExpenses: CardExpense[] = [];
  newExpense: CardExpense = {
    id: 0,
    description: '',
    amount: 0,
    date: new Date(),
    cardName: '',
    installments: 1
  };

  constructor(private financialService: FinancialService) {}

  ngOnInit() {
    this.loadCardExpenses();
  }

  loadCardExpenses() {
    this.financialService.getCardExpenses().subscribe(expenses => {
      this.cardExpenses = expenses;
    });
  }

  addExpense() {
    if (this.newExpense.description && this.newExpense.amount > 0) {
      this.financialService.addCardExpense(this.newExpense).subscribe(expense => {
        this.cardExpenses.push(expense);
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
      cardName: '',
      installments: 1
    };
  }

  getTotalExpenses(): number {
    return this.cardExpenses.reduce((total, expense) => total + expense.amount, 0);
  }

  getInstallmentValue(expense: CardExpense): number {
    return expense.amount / expense.installments;
  }

  getExpensesByCard(): { [key: string]: CardExpense[] } {
    const grouped: { [key: string]: CardExpense[] } = {};
    this.cardExpenses.forEach(expense => {
      if (!grouped[expense.cardName]) {
        grouped[expense.cardName] = [];
      }
      grouped[expense.cardName].push(expense);
    });
    return grouped;
  }

  getCardTotal(expenses: CardExpense[]): number {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  getMonthlyInstallmentTotal(): number {
    return this.cardExpenses.reduce((total, expense) => 
      total + this.getInstallmentValue(expense), 0);
  }
}

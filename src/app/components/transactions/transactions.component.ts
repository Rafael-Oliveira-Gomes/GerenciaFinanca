
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinancialService } from '../../services/financial.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  newTransaction: Transaction = {
    id: 0,
    description: '',
    amount: 0,
    date: new Date(),
    type: 'income',
    category: ''
  };

  constructor(private financialService: FinancialService) {}

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.financialService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
    });
  }

  addTransaction() {
    if (this.newTransaction.description && this.newTransaction.amount > 0) {
      this.financialService.addTransaction(this.newTransaction).subscribe(transaction => {
        this.transactions.push(transaction);
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.newTransaction = {
      id: 0,
      description: '',
      amount: 0,
      date: new Date(),
      type: 'income',
      category: ''
    };
  }

  getTotalIncome(): number {
    return this.transactions
      .filter(t => t.type === 'income')
      .reduce((total, t) => total + t.amount, 0);
  }

  getTotalExpenses(): number {
    return this.transactions
      .filter(t => t.type === 'expense')
      .reduce((total, t) => total + t.amount, 0);
  }

  getBalance(): number {
    return this.getTotalIncome() - this.getTotalExpenses();
  }
}

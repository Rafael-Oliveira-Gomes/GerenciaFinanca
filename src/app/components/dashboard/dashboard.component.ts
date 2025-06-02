
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialService } from '../../services/financial.service';
import { MonthlyFinancialData } from '../../models/transaction.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  monthlyData: MonthlyFinancialData[] = [];
  currentYear = new Date().getFullYear();
  months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  constructor(private financialService: FinancialService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.financialService.getMonthlyData().subscribe(data => {
      this.monthlyData = data;
    });
  }

  getExpensePercentage(monthData: MonthlyFinancialData): number {
    if (monthData.income === 0) return 0;
    const totalExpenses = monthData.fixedExpenses + monthData.variableExpenses + monthData.cardExpenses;
    return (totalExpenses / monthData.income) * 100;
  }

  getPercentageColor(percentage: number): string {
    if (percentage < 50) return '#007bff'; // Azul
    if (percentage >= 50 && percentage < 70) return '#ffc107'; // Amarelo
    if (percentage >= 70 && percentage <= 100) return '#fd7e14'; // Laranja escuro
    return '#dc3545'; // Vermelho
  }

  getPercentageStatus(percentage: number): string {
    if (percentage < 50) return 'Ideal';
    if (percentage >= 50 && percentage < 70) return 'Atenção';
    if (percentage >= 70 && percentage <= 100) return 'Cuidado';
    return 'Crítico';
  }

  getTotalYearIncome(): number {
    return this.monthlyData.reduce((total, month) => total + month.income, 0);
  }

  getTotalYearExpenses(): number {
    return this.monthlyData.reduce((total, month) => 
      total + month.fixedExpenses + month.variableExpenses + month.cardExpenses, 0);
  }

  getTotalYearBalance(): number {
    return this.getTotalYearIncome() - this.getTotalYearExpenses();
  }
}

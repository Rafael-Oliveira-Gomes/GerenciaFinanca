import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { FixedExpensesComponent } from './components/fixed-expenses/fixed-expenses.component';
import { VariableExpensesComponent } from './components/variable-expenses/variable-expenses.component';
import { CardExpensesComponent } from './components/card-expenses/card-expenses.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'fixed-expenses', component: FixedExpensesComponent },
  { path: 'variable-expenses', component: VariableExpensesComponent },
  { path: 'card-expenses', component: CardExpensesComponent }
];

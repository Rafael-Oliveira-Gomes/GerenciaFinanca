
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Mock data
const transactions = [
  { id: 1, description: 'Tatuagem Realista', amount: 800, date: new Date('2024-01-15'), type: 'income', category: 'Serviços' },
  { id: 2, description: 'Tatuagem Tradicional', amount: 500, date: new Date('2024-01-20'), type: 'income', category: 'Serviços' }
];

const fixedExpenses = [
  { id: 1, description: 'Aluguel do Studio', amount: 1200, month: 1, year: 2024, category: 'Fixo' },
  { id: 2, description: 'Energia Elétrica', amount: 200, month: 1, year: 2024, category: 'Utilidades' }
];

const variableExpenses = [
  { id: 1, description: 'Material de Tatuagem', amount: 300, date: new Date('2024-01-10'), category: 'Material' },
  { id: 2, description: 'Tinta Nova', amount: 150, date: new Date('2024-01-12'), category: 'Material' }
];

const cardExpenses = [
  { id: 1, description: 'Equipamento Novo', amount: 1000, date: new Date('2024-01-05'), cardName: 'Visa', installments: 12 },
  { id: 2, description: 'Agulhas', amount: 80, date: new Date('2024-01-08'), cardName: 'Mastercard', installments: 1 }
];

// Generate monthly data for multiple years
const monthlyData = [];
const currentYear = new Date().getFullYear();
const years = [];

// Generate for 5 years before current year to 2 years after
for (let year = currentYear - 5; year <= currentYear + 2; year++) {
  years.push(year);
}

years.forEach(year => {
  for (let month = 1; month <= 12; month++) {
    // Base income varies by year (simulate business growth/decline)
    const yearMultiplier = year === 2024 ? 1 : (year < 2024 ? 0.8 + (year - 2019) * 0.05 : 1.1);
    const baseIncome = year === 2024 && month === 1 ? 1300 : Math.floor((Math.random() * 2000 + 500) * yearMultiplier);
    
    const monthIncome = transactions
      .filter(t => t.type === 'income' && new Date(t.date).getMonth() + 1 === month && new Date(t.date).getFullYear() === year)
      .reduce((sum, t) => sum + t.amount, 0) + baseIncome;
    
    const monthFixedExpenses = fixedExpenses
      .filter(e => e.month === month && e.year === year)
      .reduce((sum, e) => sum + e.amount, 0) + (year === 2024 ? 0 : Math.floor(Math.random() * 800 + 200));
    
    const monthVariableExpenses = variableExpenses
      .filter(e => new Date(e.date).getMonth() + 1 === month && new Date(e.date).getFullYear() === year)
      .reduce((sum, e) => sum + e.amount, 0) + (year === 2024 && month === 1 ? 0 : Math.floor(Math.random() * 500 * yearMultiplier));
    
    const monthCardExpenses = cardExpenses
      .filter(e => new Date(e.date).getMonth() + 1 === month && new Date(e.date).getFullYear() === year)
      .reduce((sum, e) => sum + e.amount, 0) + (year === 2024 && month === 1 ? 0 : Math.floor(Math.random() * 300 * yearMultiplier));

    monthlyData.push({
      month,
      year,
      income: monthIncome,
      fixedExpenses: monthFixedExpenses,
      variableExpenses: monthVariableExpenses,
      cardExpenses: monthCardExpenses,
      balance: monthIncome - (monthFixedExpenses + monthVariableExpenses + monthCardExpenses)
    });
  }
});

// Routes
app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});

app.post('/api/transactions', (req, res) => {
  const newTransaction = { ...req.body, id: transactions.length + 1 };
  transactions.push(newTransaction);
  res.json(newTransaction);
});

app.get('/api/fixed-expenses', (req, res) => {
  res.json(fixedExpenses);
});

app.post('/api/fixed-expenses', (req, res) => {
  const newExpense = { ...req.body, id: fixedExpenses.length + 1 };
  fixedExpenses.push(newExpense);
  res.json(newExpense);
});

app.get('/api/variable-expenses', (req, res) => {
  res.json(variableExpenses);
});

app.post('/api/variable-expenses', (req, res) => {
  const newExpense = { ...req.body, id: variableExpenses.length + 1 };
  variableExpenses.push(newExpense);
  res.json(newExpense);
});

app.get('/api/card-expenses', (req, res) => {
  res.json(cardExpenses);
});

app.post('/api/card-expenses', (req, res) => {
  const newExpense = { ...req.body, id: cardExpenses.length + 1 };
  cardExpenses.push(newExpense);
  res.json(newExpense);
});

app.get('/api/monthly-data', (req, res) => {
  res.json(monthlyData);
});

app.get('/api/expense-percentage/:year/:month', (req, res) => {
  const { year, month } = req.params;
  const monthData = monthlyData.find(m => m.month === parseInt(month) && m.year === parseInt(year));
  
  if (monthData && monthData.income > 0) {
    const totalExpenses = monthData.fixedExpenses + monthData.variableExpenses + monthData.cardExpenses;
    const percentage = (totalExpenses / monthData.income) * 100;
    res.json(percentage);
  } else {
    res.json(0);
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`API Mock rodando em http://localhost:${port}`);
});

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Target, 
  Brain, 
  PiggyBank, 
  Shield,
  Zap,
  BarChart3,
  DollarSign,
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { formatCurrency, formatPercentage, CURRENCIES } from '@/lib/utils';
import { motion } from 'framer-motion';

// Mock data for demonstration
const mockUser = {
  name: 'Arjun Kumar',
  email: 'arjun@example.com',
  currency: CURRENCIES[0], // INR
  creditScore: 750,
  monthlyIncome: 85000,
};

const mockData = {
  totalDebt: 485000,
  totalInvestments: 275000,
  monthlyExpenses: 45000,
  savingsRate: 25,
  debtToIncomeRatio: 32,
  creditUtilization: 45,
  portfolioGrowth: 12.5,
  recentProfitSkim: 15750,
};

const mockCreditCards = [
  {
    id: '1',
    bankName: 'HDFC Bank',
    cardName: 'Regalia Gold',
    lastFourDigits: '4521',
    currentBalance: 75000,
    creditLimit: 200000,
    dueDate: new Date('2024-02-15'),
    minPaymentDue: 3500,
    status: 'active' as const,
  },
  {
    id: '2',
    bankName: 'SBI',
    cardName: 'SimplyCLICK',
    lastFourDigits: '8934',
    currentBalance: 32000,
    creditLimit: 150000,
    dueDate: new Date('2024-02-20'),
    minPaymentDue: 1800,
    status: 'active' as const,
  },
];

const mockRecommendations = [
  {
    id: '1',
    type: 'debt_payment',
    priority: 'high' as const,
    title: 'Credit Utilization Alert',
    description: 'Your credit utilization is 45%. Consider paying ₹25,000 across cards to improve your credit score.',
    actionRequired: true,
    estimatedImpact: { savings: 12500, scoreImprovement: 25 },
  },
  {
    id: '2',
    type: 'investment',
    priority: 'medium' as const,
    title: 'Profit Skimming Available',
    description: 'You can skim ₹15,750 in profits from your portfolio while staying invested.',
    actionRequired: false,
    estimatedImpact: { savings: 15750 },
  },
  {
    id: '3',
    type: 'goal',
    priority: 'low' as const,
    title: 'Emergency Fund Goal',
    description: 'Consider increasing your emergency fund to 6 months of expenses (₹270,000).',
    actionRequired: false,
  },
];

const MotionCard = motion(Card);

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-financial rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gradient">AnkismaikT AI</h1>
              </div>
              <span className="text-sm text-muted-foreground">Investment Bank</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium">{mockUser.name}</p>
                <p className="text-xs text-muted-foreground">Credit Score: {mockUser.creditScore}</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-2">Welcome back, {mockUser.name.split(' ')[0]}! 👋</h2>
          <p className="text-muted-foreground">
            Your AI financial advisor is ready to help you become debt-free and build wealth.
          </p>
        </motion.div>

        {/* Key Metrics */}
        <div className="metrics-grid mb-8">
          <MotionCard
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="card-gradient"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Debt</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-loss">
                {formatCurrency(mockData.totalDebt, mockUser.currency)}
              </div>
              <p className="text-xs text-muted-foreground">
                {mockData.debtToIncomeRatio}% of income
              </p>
            </CardContent>
          </MotionCard>

          <MotionCard
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="card-gradient"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Investments</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-profit">
                {formatCurrency(mockData.totalInvestments, mockUser.currency)}
              </div>
              <p className="text-xs text-profit">
                +{formatPercentage(mockData.portfolioGrowth)} this month
              </p>
            </CardContent>
          </MotionCard>

          <MotionCard
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="card-gradient"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credit Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-info">
                {mockUser.creditScore}
              </div>
              <p className="text-xs text-muted-foreground">
                Excellent • {mockData.creditUtilization}% utilization
              </p>
            </CardContent>
          </MotionCard>

          <MotionCard
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="card-gradient"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profit Skimmed</CardTitle>
              <PiggyBank className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-profit">
                {formatCurrency(mockData.recentProfitSkim, mockUser.currency)}
              </div>
              <p className="text-xs text-muted-foreground">
                Available to skim more
              </p>
            </CardContent>
          </MotionCard>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* AI Recommendations */}
          <div className="lg:col-span-2">
            <MotionCard
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <CardTitle>AI Recommendations</CardTitle>
                </div>
                <CardDescription>
                  Personalized suggestions to improve your financial health
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockRecommendations.map((rec, index) => (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className={`p-4 rounded-lg border ${
                      rec.priority === 'high' ? 'border-warning/20 bg-warning/5' :
                      rec.priority === 'medium' ? 'border-info/20 bg-info/5' :
                      'border-border bg-muted/20'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {rec.priority === 'high' && <AlertTriangle className="w-4 h-4 text-warning" />}
                          {rec.priority === 'medium' && <Target className="w-4 h-4 text-info" />}
                          {rec.priority === 'low' && <Zap className="w-4 h-4 text-muted-foreground" />}
                          <h4 className="font-semibold text-sm">{rec.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            rec.priority === 'high' ? 'bg-warning/10 text-warning' :
                            rec.priority === 'medium' ? 'bg-info/10 text-info' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {rec.priority}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                        {rec.estimatedImpact && (
                          <div className="flex items-center space-x-4 text-xs">
                            {rec.estimatedImpact.savings && (
                              <span className="text-profit">
                                💰 Save {formatCurrency(rec.estimatedImpact.savings, mockUser.currency)}
                              </span>
                            )}
                            {rec.estimatedImpact.scoreImprovement && (
                              <span className="text-info">
                                📈 +{rec.estimatedImpact.scoreImprovement} credit score
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      {rec.actionRequired && (
                        <Button size="sm" variant="outline" className="ml-4">
                          Take Action
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </MotionCard>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <MotionCard
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Credit Card
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay Bills
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Skim Profits
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Target className="w-4 h-4 mr-2" />
                  Set Financial Goal
                </Button>
              </CardContent>
            </MotionCard>

            {/* Credit Cards Overview */}
            <MotionCard
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <CardHeader>
                <CardTitle className="text-lg">Credit Cards</CardTitle>
                <CardDescription>
                  {mockCreditCards.length} active cards
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockCreditCards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className="p-3 rounded-lg border border-border/50 bg-muted/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{card.bankName}</span>
                      <span className="text-xs text-muted-foreground">•••• {card.lastFourDigits}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {formatCurrency(card.currentBalance, mockUser.currency)} / {formatCurrency(card.creditLimit, mockUser.currency)}
                      </span>
                      <span className={`text-xs ${
                        (card.currentBalance / card.creditLimit) > 0.7 ? 'text-warning' : 'text-muted-foreground'
                      }`}>
                        {Math.round((card.currentBalance / card.creditLimit) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                      <div 
                        className={`h-1.5 rounded-full ${
                          (card.currentBalance / card.creditLimit) > 0.7 ? 'bg-warning' : 
                          (card.currentBalance / card.creditLimit) > 0.5 ? 'bg-info' : 'bg-profit'
                        }`}
                        style={{ width: `${(card.currentBalance / card.creditLimit) * 100}%` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </MotionCard>
          </div>
        </div>

        {/* Financial Health Score */}
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8"
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Financial Health Score</CardTitle>
                <CardDescription>
                  Based on your credit score, debt ratio, and savings rate
                </CardDescription>
              </div>
              <div className="text-4xl font-bold text-profit">85/100</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-info">{mockUser.creditScore}</div>
                <p className="text-sm text-muted-foreground">Credit Score</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">{mockData.debtToIncomeRatio}%</div>
                <p className="text-sm text-muted-foreground">Debt-to-Income</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">{mockData.creditUtilization}%</div>
                <p className="text-sm text-muted-foreground">Credit Utilization</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-profit">{mockData.savingsRate}%</div>
                <p className="text-sm text-muted-foreground">Savings Rate</p>
              </div>
            </div>
          </CardContent>
        </MotionCard>
      </main>
    </div>
  );
}

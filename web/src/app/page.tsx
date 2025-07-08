'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CreditCard, 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  Brain, 
  PiggyBank, 
  Shield,
  Plus
} from 'lucide-react';

// Mock data for demonstration
const mockUser = {
  name: 'Arjun Kumar',
  email: 'arjun@example.com',
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
];

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AnkismaikT AI
                </h1>
              </div>
              <span className="text-sm text-gray-600">Investment Bank</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium">{mockUser.name}</p>
                <p className="text-xs text-gray-500">Credit Score: {mockUser.creditScore}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-blue-600">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {mockUser.name.split(' ')[0]}! 👋</h2>
          <p className="text-gray-600">
            Your AI financial advisor is ready to help you become debt-free and build wealth.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Debt</CardTitle>
              <CreditCard className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(mockData.totalDebt)}
              </div>
              <p className="text-xs text-gray-500">
                {mockData.debtToIncomeRatio}% of income
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Investments</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(mockData.totalInvestments)}
              </div>
              <p className="text-xs text-green-600">
                +{mockData.portfolioGrowth}% this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credit Score</CardTitle>
              <Shield className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mockUser.creditScore}
              </div>
              <p className="text-xs text-gray-500">
                Excellent • {mockData.creditUtilization}% utilization
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profit Skimmed</CardTitle>
              <PiggyBank className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(mockData.recentProfitSkim)}
              </div>
              <p className="text-xs text-gray-500">
                Available to skim more
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* AI Recommendations */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  <CardTitle>AI Recommendations</CardTitle>
                </div>
                <CardDescription>
                  Personalized suggestions to improve your financial health
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockRecommendations.map((rec, index) => (
                  <div
                    key={rec.id}
                    className={`p-4 rounded-lg border ${
                      rec.priority === 'high' ? 'border-orange-200 bg-orange-50' :
                      rec.priority === 'medium' ? 'border-blue-200 bg-blue-50' :
                      'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {rec.priority === 'high' && <AlertTriangle className="w-4 h-4 text-orange-500" />}
                          {rec.priority === 'medium' && <Target className="w-4 h-4 text-blue-500" />}
                          <h4 className="font-semibold text-sm">{rec.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            rec.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                            rec.priority === 'medium' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {rec.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                        {rec.estimatedImpact && (
                          <div className="flex items-center space-x-4 text-xs">
                            {rec.estimatedImpact.savings && (
                              <span className="text-green-600">
                                💰 Save {formatCurrency(rec.estimatedImpact.savings)}
                              </span>
                            )}
                            {rec.estimatedImpact.scoreImprovement && (
                              <span className="text-blue-600">
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
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
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
            </Card>

            {/* Financial Health Score */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Financial Health Score</CardTitle>
                    <CardDescription>
                      Based on your credit score and financial metrics
                    </CardDescription>
                  </div>
                  <div className="text-4xl font-bold text-green-600">85/100</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{mockUser.creditScore}</div>
                    <p className="text-sm text-gray-500">Credit Score</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{mockData.debtToIncomeRatio}%</div>
                    <p className="text-sm text-gray-500">Debt-to-Income</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{mockData.creditUtilization}%</div>
                    <p className="text-sm text-gray-500">Credit Utilization</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{mockData.savingsRate}%</div>
                    <p className="text-sm text-gray-500">Savings Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  CreditCard, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Calendar,
  DollarSign,
  Target,
  Brain,
  Filter,
  Search,
  MoreVertical,
  Eye,
  EyeOff
} from 'lucide-react';
import { formatCurrency, formatDate, CURRENCIES } from '@/lib/utils';
import { motion } from 'framer-motion';

const mockUser = {
  currency: CURRENCIES[0], // INR
};

const mockCreditCards = [
  {
    id: '1',
    bankName: 'HDFC Bank',
    cardName: 'Regalia Gold',
    cardType: 'credit' as const,
    cardCategory: 'gold' as const,
    lastFourDigits: '4521',
    creditLimit: 200000,
    availableLimit: 125000,
    currentBalance: 75000,
    minPaymentDue: 3500,
    totalPaymentDue: 75000,
    dueDate: new Date('2024-02-15'),
    interestRate: 42,
    rewardPoints: 12750,
    status: 'active' as const,
    brand: 'visa',
  },
  {
    id: '2',
    bankName: 'SBI Card',
    cardName: 'SimplyCLICK',
    cardType: 'credit' as const,
    cardCategory: 'cashback' as const,
    lastFourDigits: '8934',
    creditLimit: 150000,
    availableLimit: 118000,
    currentBalance: 32000,
    minPaymentDue: 1800,
    totalPaymentDue: 32000,
    dueDate: new Date('2024-02-20'),
    interestRate: 39,
    rewardPoints: 0,
    cashbackEarned: 2580,
    status: 'active' as const,
    brand: 'mastercard',
  },
  {
    id: '3',
    bankName: 'ICICI Bank',
    cardName: 'Amazon Pay',
    cardType: 'credit' as const,
    cardCategory: 'cashback' as const,
    lastFourDigits: '2847',
    creditLimit: 100000,
    availableLimit: 85000,
    currentBalance: 15000,
    minPaymentDue: 750,
    totalPaymentDue: 15000,
    dueDate: new Date('2024-02-25'),
    interestRate: 36,
    rewardPoints: 0,
    cashbackEarned: 1250,
    status: 'active' as const,
    brand: 'visa',
  },
];

const aiInsights = [
  {
    id: '1',
    type: 'warning',
    title: 'High Utilization Alert',
    description: 'HDFC Regalia Gold is at 37.5% utilization. Consider paying ₹15,000 to optimize credit score.',
    impact: 'Could improve credit score by 15-25 points',
    urgency: 'high',
  },
  {
    id: '2',
    type: 'optimization',
    title: 'Reward Optimization',
    description: 'Use SBI SimplyCLICK for online purchases to earn 5% cashback instead of HDFC card.',
    impact: 'Save ₹500-1000 monthly in rewards',
    urgency: 'medium',
  },
  {
    id: '3',
    type: 'opportunity',
    title: 'Credit Limit Increase',
    description: 'Your payment history qualifies you for a credit limit increase on ICICI Amazon Pay.',
    impact: 'Reduce overall utilization ratio',
    urgency: 'low',
  },
];

export default function CreditCardsPage() {
  const [showBalances, setShowBalances] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const getCardBrandStyle = (brand: string) => {
    switch (brand) {
      case 'visa':
        return 'credit-card visa';
      case 'mastercard':
        return 'credit-card mastercard';
      case 'amex':
        return 'credit-card amex';
      case 'rupay':
        return 'credit-card rupay';
      default:
        return 'credit-card';
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 70) return 'text-loss';
    if (utilization >= 50) return 'text-warning';
    if (utilization >= 30) return 'text-info';
    return 'text-profit';
  };

  const totalCreditLimit = mockCreditCards.reduce((sum, card) => sum + card.creditLimit, 0);
  const totalCurrentBalance = mockCreditCards.reduce((sum, card) => sum + card.currentBalance, 0);
  const totalMinPayment = mockCreditCards.reduce((sum, card) => sum + card.minPaymentDue, 0);
  const overallUtilization = (totalCurrentBalance / totalCreditLimit) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Credit Cards</h1>
              <p className="text-muted-foreground mt-1">
                Manage your credit cards and optimize your spending
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={() => setShowBalances(!showBalances)}>
                {showBalances ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {showBalances ? 'Hide' : 'Show'} Balances
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Card
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Credit Limit</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {showBalances ? formatCurrency(totalCreditLimit, mockUser.currency) : '••••••'}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across {mockCreditCards.length} cards
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-loss">
                  {showBalances ? formatCurrency(totalCurrentBalance, mockUser.currency) : '••••••'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {overallUtilization.toFixed(1)}% utilization
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Min Payment Due</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">
                  {showBalances ? formatCurrency(totalMinPayment, mockUser.currency) : '••••••'}
                </div>
                <p className="text-xs text-muted-foreground">
                  Next due: Feb 15
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Credit</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-profit">
                  {showBalances ? formatCurrency(totalCreditLimit - totalCurrentBalance, mockUser.currency) : '••••••'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {((totalCreditLimit - totalCurrentBalance) / totalCreditLimit * 100).toFixed(1)}% available
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Credit Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filter */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Credit Cards Grid */}
            <div className="space-y-6">
              {mockCreditCards.map((card, index) => {
                const utilization = (card.currentBalance / card.creditLimit) * 100;
                
                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="grid md:grid-cols-3 gap-6">
                          {/* Credit Card Visual */}
                          <div className="p-6">
                            <div className={getCardBrandStyle(card.brand)}>
                              <div className="flex items-start justify-between mb-8">
                                <div>
                                  <p className="text-sm opacity-80">{card.bankName}</p>
                                  <p className="font-semibold">{card.cardName}</p>
                                </div>
                                <div className="text-right">
                                  <div className="w-8 h-6 bg-white/20 rounded"></div>
                                </div>
                              </div>
                              
                              <div className="space-y-4">
                                <div>
                                  <p className="text-xs opacity-60">Card Number</p>
                                  <p className="font-mono text-lg tracking-wider">
                                    •••• •••• •••• {card.lastFourDigits}
                                  </p>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-xs opacity-60">Valid Thru</p>
                                    <p className="font-mono">12/28</p>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-lg font-bold">
                                      {card.brand.toUpperCase()}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Card Details */}
                          <div className="p-6 space-y-4">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Current Balance</span>
                                <span className="font-semibold text-loss">
                                  {showBalances ? formatCurrency(card.currentBalance, mockUser.currency) : '••••••'}
                                </span>
                              </div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Credit Limit</span>
                                <span className="font-semibold">
                                  {showBalances ? formatCurrency(card.creditLimit, mockUser.currency) : '••••••'}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Available</span>
                                <span className="font-semibold text-profit">
                                  {showBalances ? formatCurrency(card.availableLimit, mockUser.currency) : '••••••'}
                                </span>
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Utilization</span>
                                <span className={`font-semibold ${getUtilizationColor(utilization)}`}>
                                  {utilization.toFixed(1)}%
                                </span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full transition-all duration-300 ${
                                    utilization >= 70 ? 'bg-loss' :
                                    utilization >= 50 ? 'bg-warning' :
                                    utilization >= 30 ? 'bg-info' : 'bg-profit'
                                  }`}
                                  style={{ width: `${Math.min(utilization, 100)}%` }}
                                />
                              </div>
                            </div>

                            {card.rewardPoints && (
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Reward Points</span>
                                <span className="font-semibold text-info">
                                  {card.rewardPoints.toLocaleString()}
                                </span>
                              </div>
                            )}

                            {card.cashbackEarned && (
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Cashback Earned</span>
                                <span className="font-semibold text-profit">
                                  {formatCurrency(card.cashbackEarned, mockUser.currency)}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="p-6 space-y-3">
                            <div className="text-sm">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-muted-foreground">Min Payment</span>
                                <span className="font-semibold text-warning">
                                  {showBalances ? formatCurrency(card.minPaymentDue, mockUser.currency) : '••••••'}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Due Date</span>
                                <span className="font-semibold">
                                  {formatDate(card.dueDate)}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Button className="w-full" size="sm">
                                Pay Bill
                              </Button>
                              <Button variant="outline" className="w-full" size="sm">
                                View Statements
                              </Button>
                              <Button variant="ghost" className="w-full" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* AI Insights Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <CardTitle>AI Insights</CardTitle>
                </div>
                <CardDescription>
                  Smart recommendations for your credit cards
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className={`p-4 rounded-lg border ${
                      insight.urgency === 'high' ? 'border-loss/20 bg-loss/5' :
                      insight.urgency === 'medium' ? 'border-warning/20 bg-warning/5' :
                      'border-info/20 bg-info/5'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {insight.urgency === 'high' && <AlertTriangle className="w-5 h-5 text-loss mt-0.5" />}
                      {insight.urgency === 'medium' && <Target className="w-5 h-5 text-warning mt-0.5" />}
                      {insight.urgency === 'low' && <TrendingUp className="w-5 h-5 text-info mt-0.5" />}
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                        <p className="text-xs text-profit font-medium">{insight.impact}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Card
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Target className="w-4 h-4 mr-2" />
                  Set Payment Reminders
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Optimize Rewards
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Payments
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
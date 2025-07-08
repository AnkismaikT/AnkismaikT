export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  country: string;
  currency: Currency;
  kycStatus: 'pending' | 'verified' | 'rejected';
  creditScore?: number;
  monthlyIncome?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Currency {
  code: string; // INR, USD, EUR, GBP, etc.
  symbol: string; // ₹, $, €, £, etc.
  name: string; // Indian Rupee, US Dollar, etc.
}

export interface CreditCard {
  id: string;
  userId: string;
  bankName: string;
  cardName: string;
  cardType: 'credit' | 'debit';
  cardCategory: 'platinum' | 'gold' | 'silver' | 'basic' | 'fuel' | 'cashback';
  lastFourDigits: string;
  creditLimit: number;
  availableLimit: number;
  currentBalance: number;
  minPaymentDue: number;
  totalPaymentDue: number;
  dueDate: Date;
  interestRate: number; // APR
  rewardPoints?: number;
  cashbackEarned?: number;
  status: 'active' | 'blocked' | 'closed';
  autoPayEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Loan {
  id: string;
  userId: string;
  loanType: 'personal' | 'home' | 'auto' | 'education' | 'business' | 'other';
  bankName: string;
  principalAmount: number;
  outstandingAmount: number;
  interestRate: number;
  emiAmount: number;
  emiDate: number; // Day of month
  tenureMonths: number;
  remainingMonths: number;
  nextEmiDate: Date;
  status: 'active' | 'closed' | 'defaulted';
  prepaymentCharges?: number;
  autoPayEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Investment {
  id: string;
  userId: string;
  type: 'stocks' | 'mutual_funds' | 'gold' | 'crypto' | 'fd' | 'bonds' | 'ppf' | 'nps';
  name: string;
  symbol?: string;
  investedAmount: number;
  currentValue: number;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  profitLoss: number;
  profitLossPercentage: number;
  platform: string; // Zerodha, Groww, etc.
  autoSkimEnabled: boolean;
  skimThreshold?: number; // Percentage profit to skim
  lastSkimDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface DebtRepaymentPlan {
  id: string;
  userId: string;
  planName: string;
  strategy: 'snowball' | 'avalanche' | 'hybrid' | 'custom';
  totalDebt: number;
  totalMonthlyPayment: number;
  estimatedPayoffMonths: number;
  estimatedInterestSaved: number;
  status: 'active' | 'completed' | 'paused';
  items: DebtRepaymentItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DebtRepaymentItem {
  id: string;
  planId: string;
  debtId: string; // Can be credit card or loan ID
  debtType: 'credit_card' | 'loan';
  currentBalance: number;
  minPayment: number;
  suggestedPayment: number;
  interestRate: number;
  priority: number;
  payoffOrder: number;
  estimatedPayoffDate: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  accountId: string; // Credit card or loan ID
  accountType: 'credit_card' | 'loan' | 'investment';
  type: 'payment' | 'purchase' | 'refund' | 'interest' | 'fee' | 'investment' | 'skim';
  amount: number;
  description: string;
  category?: string;
  date: Date;
  status: 'pending' | 'completed' | 'failed';
  metadata?: Record<string, any>;
}

export interface AIRecommendation {
  id: string;
  userId: string;
  type: 'debt_payment' | 'investment' | 'spending' | 'emergency' | 'goal';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  actionRequired: boolean;
  estimatedImpact?: {
    savings?: number;
    timeReduction?: number; // in days
    scoreImprovement?: number;
  };
  expiresAt?: Date;
  status: 'pending' | 'accepted' | 'dismissed' | 'expired';
  createdAt: Date;
}

export interface FinancialGoal {
  id: string;
  userId: string;
  name: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  category: 'emergency_fund' | 'vacation' | 'house' | 'car' | 'education' | 'retirement' | 'other';
  status: 'active' | 'completed' | 'paused';
  autoContribution: boolean;
  monthlyContribution?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmotionalState {
  id: string;
  userId: string;
  mood: 'stressed' | 'anxious' | 'hopeful' | 'confident' | 'overwhelmed' | 'motivated';
  financialStress: number; // 1-10 scale
  notes?: string;
  triggers?: string[];
  date: Date;
}

export interface AIAgent {
  id: string;
  userId: string;
  name: string;
  personality: 'supportive' | 'strict' | 'analytical' | 'motivational';
  lastInteraction: Date;
  totalInteractions: number;
  userSatisfaction: number; // 1-5 scale
  specializations: AISpecialization[];
}

export interface AISpecialization {
  area: 'debt_management' | 'investment_advice' | 'budgeting' | 'goal_planning' | 'emotional_support';
  proficiency: number; // 1-100 scale
  lastTraining: Date;
}

export interface NotificationPreferences {
  userId: string;
  email: boolean;
  push: boolean;
  sms: boolean;
  dueDateReminders: boolean;
  aiRecommendations: boolean;
  marketUpdates: boolean;
  goalMilestones: boolean;
  emergencyAlerts: boolean;
}

export interface DashboardData {
  user: User;
  totalDebt: number;
  totalInvestments: number;
  creditScore: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
  debtToIncomeRatio: number;
  recentTransactions: Transaction[];
  aiRecommendations: AIRecommendation[];
  upcomingPayments: UpcomingPayment[];
  portfolioPerformance: PortfolioPerformance;
}

export interface UpcomingPayment {
  id: string;
  type: 'credit_card' | 'loan' | 'sip' | 'insurance';
  name: string;
  amount: number;
  dueDate: Date;
  status: 'upcoming' | 'overdue' | 'paid';
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface PortfolioPerformance {
  totalValue: number;
  totalInvested: number;
  totalGains: number;
  gainsPercentage: number;
  dayChange: number;
  dayChangePercentage: number;
  skimmedProfits: number;
  availableToSkim: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  phone?: string;
}

export interface AddCreditCardForm {
  bankName: string;
  cardName: string;
  cardType: 'credit' | 'debit';
  cardCategory: string;
  lastFourDigits: string;
  creditLimit: number;
  interestRate: number;
}

export interface AddLoanForm {
  loanType: string;
  bankName: string;
  principalAmount: number;
  interestRate: number;
  emiAmount: number;
  emiDate: number;
  tenureMonths: number;
}

export interface CreateGoalForm {
  name: string;
  description?: string;
  targetAmount: number;
  targetDate: string;
  category: string;
  monthlyContribution?: number;
}

// Constants
export const CURRENCIES: Currency[] = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
];

export const CARD_CATEGORIES = [
  'platinum',
  'gold',
  'silver', 
  'basic',
  'fuel',
  'cashback',
  'travel',
  'shopping'
] as const;

export const LOAN_TYPES = [
  'personal',
  'home',
  'auto',
  'education',
  'business',
  'credit_card',
  'other'
] as const;

export const INVESTMENT_TYPES = [
  'stocks',
  'mutual_funds',
  'gold',
  'crypto',
  'fd',
  'bonds',
  'ppf',
  'nps',
  'elss'
] as const;
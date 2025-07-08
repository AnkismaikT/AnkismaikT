import { Currency, CreditCard, Loan, Investment, DebtRepaymentItem } from './types';

/**
 * Simple class name utility without external dependencies
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format currency with proper symbol and locale
 */
export function formatCurrency(
  amount: number,
  currency: Currency,
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    showSymbol?: boolean;
  }
): string {
  const { minimumFractionDigits = 0, maximumFractionDigits = 2, showSymbol = true } = options || {};
  
  const formatted = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(Math.abs(amount));
  
  const symbol = showSymbol ? currency.symbol : '';
  const sign = amount < 0 ? '-' : '';
  
  return `${sign}${symbol}${formatted}`;
}

/**
 * Format large numbers with K, M, B suffixes
 */
export function formatCompactCurrency(amount: number, currency: Currency): string {
  const absAmount = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';
  
  if (absAmount >= 1000000000) {
    return `${sign}${currency.symbol}${(absAmount / 1000000000).toFixed(1)}B`;
  } else if (absAmount >= 1000000) {
    return `${sign}${currency.symbol}${(absAmount / 1000000).toFixed(1)}M`;
  } else if (absAmount >= 1000) {
    return `${sign}${currency.symbol}${(absAmount / 1000).toFixed(1)}K`;
  }
  
  return formatCurrency(amount, currency);
}

/**
 * Format percentage with proper decimal places
 */
export function formatPercentage(
  value: number,
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    showSign?: boolean;
  }
): string {
  const { minimumFractionDigits = 0, maximumFractionDigits = 2, showSign = true } = options || {};
  
  const formatted = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(Math.abs(value));
  
  const sign = showSign && value > 0 ? '+' : value < 0 ? '-' : '';
  
  return `${sign}${formatted}%`;
}

/**
 * Format dates in a human-readable way
 */
export function formatDate(date: Date, formatStr?: string): string {
  if (!formatStr) {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
  
  // Simple date formatting without external library
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return `${month}/${day}/${year}`;
}

/**
 * Format relative time (e.g., "2 days ago", "in 3 hours")
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 0) return `In ${diffDays} days`;
  return `${Math.abs(diffDays)} days ago`;
}

/**
 * Calculate credit utilization ratio
 */
export function calculateCreditUtilization(creditCards: CreditCard[]): number {
  const totalLimit = creditCards.reduce((sum, card) => sum + card.creditLimit, 0);
  const totalUsed = creditCards.reduce((sum, card) => sum + card.currentBalance, 0);
  
  if (totalLimit === 0) return 0;
  return (totalUsed / totalLimit) * 100;
}

/**
 * Calculate debt-to-income ratio
 */
export function calculateDebtToIncomeRatio(
  monthlyIncome: number,
  creditCards: CreditCard[],
  loans: Loan[]
): number {
  const creditCardPayments = creditCards.reduce((sum, card) => sum + card.minPaymentDue, 0);
  const loanPayments = loans.reduce((sum, loan) => sum + loan.emiAmount, 0);
  const totalMonthlyDebt = creditCardPayments + loanPayments;
  
  if (monthlyIncome === 0) return 0;
  return (totalMonthlyDebt / monthlyIncome) * 100;
}

/**
 * Calculate total debt across all accounts
 */
export function calculateTotalDebt(creditCards: CreditCard[], loans: Loan[]): number {
  const creditCardDebt = creditCards.reduce((sum, card) => sum + card.currentBalance, 0);
  const loanDebt = loans.reduce((sum, loan) => sum + loan.outstandingAmount, 0);
  return creditCardDebt + loanDebt;
}

/**
 * Calculate portfolio performance metrics
 */
export function calculatePortfolioPerformance(investments: Investment[]) {
  const totalInvested = investments.reduce((sum, inv) => sum + inv.investedAmount, 0);
  const totalValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalGains = totalValue - totalInvested;
  const gainsPercentage = totalInvested > 0 ? (totalGains / totalInvested) * 100 : 0;
  
  // Calculate available profits to skim (profits above threshold)
  const availableToSkim = investments.reduce((sum, inv) => {
    if (!inv.autoSkimEnabled || !inv.skimThreshold) return sum;
    const profitPercent = inv.profitLossPercentage;
    if (profitPercent > inv.skimThreshold) {
      const excessProfit = ((profitPercent - inv.skimThreshold) / 100) * inv.investedAmount;
      return sum + excessProfit;
    }
    return sum;
  }, 0);
  
  return {
    totalInvested,
    totalValue,
    totalGains,
    gainsPercentage,
    availableToSkim,
  };
}

/**
 * Add months to a date
 */
function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Calculate debt repayment using snowball method (smallest balance first)
 */
export function calculateSnowballPlan(
  creditCards: CreditCard[],
  loans: Loan[],
  extraPayment: number
): DebtRepaymentItem[] {
  const allDebts = [
    ...creditCards.map(card => ({
      id: card.id,
      type: 'credit_card' as const,
      balance: card.currentBalance,
      minPayment: card.minPaymentDue,
      interestRate: card.interestRate,
      name: `${card.bankName} ${card.cardName}`,
    })),
    ...loans.map(loan => ({
      id: loan.id,
      type: 'loan' as const,
      balance: loan.outstandingAmount,
      minPayment: loan.emiAmount,
      interestRate: loan.interestRate,
      name: `${loan.bankName} ${loan.loanType}`,
    })),
  ];
  
  // Sort by balance (smallest first) for snowball method
  allDebts.sort((a, b) => a.balance - b.balance);
  
  return allDebts.map((debt, index) => ({
    id: `plan-${debt.id}`,
    planId: 'snowball-plan',
    debtId: debt.id,
    debtType: debt.type,
    currentBalance: debt.balance,
    minPayment: debt.minPayment,
    suggestedPayment: index === 0 ? debt.minPayment + extraPayment : debt.minPayment,
    interestRate: debt.interestRate,
    priority: index + 1,
    payoffOrder: index + 1,
    estimatedPayoffDate: calculatePayoffDate(debt.balance, debt.minPayment + (index === 0 ? extraPayment : 0), debt.interestRate),
  }));
}

/**
 * Calculate debt repayment using avalanche method (highest interest first)
 */
export function calculateAvalanchePlan(
  creditCards: CreditCard[],
  loans: Loan[],
  extraPayment: number
): DebtRepaymentItem[] {
  const allDebts = [
    ...creditCards.map(card => ({
      id: card.id,
      type: 'credit_card' as const,
      balance: card.currentBalance,
      minPayment: card.minPaymentDue,
      interestRate: card.interestRate,
      name: `${card.bankName} ${card.cardName}`,
    })),
    ...loans.map(loan => ({
      id: loan.id,
      type: 'loan' as const,
      balance: loan.outstandingAmount,
      minPayment: loan.emiAmount,
      interestRate: loan.interestRate,
      name: `${loan.bankName} ${loan.loanType}`,
    })),
  ];
  
  // Sort by interest rate (highest first) for avalanche method
  allDebts.sort((a, b) => b.interestRate - a.interestRate);
  
  return allDebts.map((debt, index) => ({
    id: `plan-${debt.id}`,
    planId: 'avalanche-plan',
    debtId: debt.id,
    debtType: debt.type,
    currentBalance: debt.balance,
    minPayment: debt.minPayment,
    suggestedPayment: index === 0 ? debt.minPayment + extraPayment : debt.minPayment,
    interestRate: debt.interestRate,
    priority: index + 1,
    payoffOrder: index + 1,
    estimatedPayoffDate: calculatePayoffDate(debt.balance, debt.minPayment + (index === 0 ? extraPayment : 0), debt.interestRate),
  }));
}

/**
 * Calculate payoff date for a debt
 */
export function calculatePayoffDate(balance: number, monthlyPayment: number, annualInterestRate: number): Date {
  if (monthlyPayment <= 0 || balance <= 0) {
    return addMonths(new Date(), 999); // Far future date
  }
  
  const monthlyRate = annualInterestRate / 100 / 12;
  
  if (monthlyRate === 0) {
    // No interest
    const months = Math.ceil(balance / monthlyPayment);
    return addMonths(new Date(), months);
  }
  
  // Calculate months using formula for loan payoff
  const months = Math.ceil(
    -Math.log(1 - (balance * monthlyRate) / monthlyPayment) / Math.log(1 + monthlyRate)
  );
  
  if (!isFinite(months) || months <= 0) {
    return addMonths(new Date(), 999); // Far future date if calculation fails
  }
  
  return addMonths(new Date(), months);
}

/**
 * Calculate interest savings by paying off debt early
 */
export function calculateInterestSavings(
  balance: number,
  minPayment: number,
  acceleratedPayment: number,
  annualInterestRate: number
): number {
  const monthlyRate = annualInterestRate / 100 / 12;
  
  if (monthlyRate === 0) return 0;
  
  // Calculate total interest with minimum payments
  const minMonths = Math.ceil(
    -Math.log(1 - (balance * monthlyRate) / minPayment) / Math.log(1 + monthlyRate)
  );
  const totalInterestMin = (minPayment * minMonths) - balance;
  
  // Calculate total interest with accelerated payments
  const accMonths = Math.ceil(
    -Math.log(1 - (balance * monthlyRate) / acceleratedPayment) / Math.log(1 + monthlyRate)
  );
  const totalInterestAcc = (acceleratedPayment * accMonths) - balance;
  
  return Math.max(0, totalInterestMin - totalInterestAcc);
}

interface AIRecommendation {
  type: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  actionRequired: boolean;
}

/**
 * Generate AI recommendations based on financial data
 */
export function generateAIRecommendations(
  creditCards: CreditCard[],
  loans: Loan[],
  investments: Investment[],
  monthlyIncome: number
): AIRecommendation[] {
  const recommendations: AIRecommendation[] = [];
  
  // High credit utilization warning
  const utilization = calculateCreditUtilization(creditCards);
  if (utilization > 80) {
    recommendations.push({
      type: 'debt_payment',
      priority: 'critical',
      title: 'High Credit Utilization Detected',
      description: `Your credit utilization is ${utilization.toFixed(1)}%. This can severely impact your credit score. Consider paying down credit cards immediately.`,
      actionRequired: true,
    });
  } else if (utilization > 50) {
    recommendations.push({
      type: 'debt_payment',
      priority: 'high',
      title: 'Credit Utilization Above Recommended Level',
      description: `Your credit utilization is ${utilization.toFixed(1)}%. Keep it below 30% for optimal credit score.`,
      actionRequired: true,
    });
  }
  
  // High interest debt warning
  const highInterestDebts = [...creditCards, ...loans].filter(debt => 
    ('interestRate' in debt && debt.interestRate > 18)
  );
  
  if (highInterestDebts.length > 0) {
    recommendations.push({
      type: 'debt_payment',
      priority: 'high',
      title: 'High Interest Debt Detected',
      description: `You have ${highInterestDebts.length} accounts with interest rates above 18%. Focus on paying these off first.`,
      actionRequired: true,
    });
  }
  
  // Investment profit skimming opportunity
  const profitableInvestments = investments.filter(inv => 
    inv.autoSkimEnabled && inv.skimThreshold && inv.profitLossPercentage > inv.skimThreshold
  );
  
  if (profitableInvestments.length > 0) {
    const totalSkimmable = profitableInvestments.reduce((sum, inv) => {
      const excessProfit = ((inv.profitLossPercentage - (inv.skimThreshold || 0)) / 100) * inv.investedAmount;
      return sum + excessProfit;
    }, 0);
    
    recommendations.push({
      type: 'investment',
      priority: 'medium',
      title: 'Profit Skimming Opportunity',
      description: `You can skim approximately ₹${totalSkimmable.toFixed(0)} in profits from ${profitableInvestments.length} investments.`,
      actionRequired: false,
    });
  }
  
  // Debt-to-income ratio warning
  const dtiRatio = calculateDebtToIncomeRatio(monthlyIncome, creditCards, loans);
  if (dtiRatio > 40) {
    recommendations.push({
      type: 'debt_payment',
      priority: 'critical',
      title: 'High Debt-to-Income Ratio',
      description: `Your debt-to-income ratio is ${dtiRatio.toFixed(1)}%. This is above the recommended 36% and may affect your ability to get new credit.`,
      actionRequired: true,
    });
  }
  
  return recommendations;
}

/**
 * Validate phone number format
 */
export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

/**
 * Sleep utility for async operations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Debounce function for search and input handling
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Check if a date is within a range
 */
export function isDateInRange(date: Date, start: Date, end: Date): boolean {
  return date > start && date < end;
}

/**
 * Get next payment date based on EMI date
 */
export function getNextPaymentDate(emiDate: number): Date {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  let nextPaymentDate = new Date(currentYear, currentMonth, emiDate);
  
  // If the payment date has passed this month, move to next month
  if (nextPaymentDate <= now) {
    nextPaymentDate = new Date(currentYear, currentMonth + 1, emiDate);
  }
  
  return nextPaymentDate;
}

/**
 * Calculate financial health score (0-100)
 */
export function calculateFinancialHealthScore(
  creditScore: number,
  debtToIncomeRatio: number,
  creditUtilization: number,
  savingsRate: number
): number {
  let score = 0;
  
  // Credit score component (40% weight)
  if (creditScore >= 800) score += 40;
  else if (creditScore >= 750) score += 35;
  else if (creditScore >= 700) score += 30;
  else if (creditScore >= 650) score += 25;
  else if (creditScore >= 600) score += 20;
  else score += 10;
  
  // Debt-to-income ratio component (30% weight)
  if (debtToIncomeRatio <= 20) score += 30;
  else if (debtToIncomeRatio <= 30) score += 25;
  else if (debtToIncomeRatio <= 40) score += 20;
  else if (debtToIncomeRatio <= 50) score += 15;
  else score += 5;
  
  // Credit utilization component (20% weight)
  if (creditUtilization <= 10) score += 20;
  else if (creditUtilization <= 30) score += 15;
  else if (creditUtilization <= 50) score += 10;
  else if (creditUtilization <= 70) score += 5;
  else score += 0;
  
  // Savings rate component (10% weight)
  if (savingsRate >= 20) score += 10;
  else if (savingsRate >= 15) score += 8;
  else if (savingsRate >= 10) score += 6;
  else if (savingsRate >= 5) score += 4;
  else score += 2;
  
  return Math.min(100, Math.max(0, score));
}
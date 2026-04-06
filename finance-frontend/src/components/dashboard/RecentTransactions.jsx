import {
  Utensils,
  Car,
  Zap,
  Film,
  ShoppingBag,
  Heart,
  Book,
  Plane,
  User,
  Home,
  Shield,
  Repeat,
  PlusCircle,
  MinusCircle,
  Briefcase,
  Laptop,
  TrendingUp,
  Gift,
  Building,
  MoreHorizontal,
} from 'lucide-react';
import { RECORD_TYPES } from '../../utils/constants';
import { formatCurrency, formatDate, formatRelativeTime } from '../../utils/formatters';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const categoryIcons = {
  // Income
  Salary: Briefcase,
  Freelance: Laptop,
  Investments: TrendingUp,
  Gifts: Gift,
  'Rental Income': Home,
  'Business Income': Building,
  'Other Income': PlusCircle,
  // Expense
  'Food & Dining': Utensils,
  Transportation: Car,
  Utilities: Zap,
  Entertainment: Film,
  Shopping: ShoppingBag,
  Healthcare: Heart,
  Education: Book,
  Travel: Plane,
  'Personal Care': User,
  'Home & Garden': Home,
  Insurance: Shield,
  Subscriptions: Repeat,
  'Other Expense': MinusCircle,
};

const RecentTransactions = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <Card>
        <div className="text-center py-12 text-slate-500">
          No recent transactions
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction) => {
          const Icon = categoryIcons[transaction.category] || MoreHorizontal;
          const isIncome = transaction.type === RECORD_TYPES.INCOME;

          return (
            <div
              key={transaction._id || transaction.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    p-2 rounded-lg
                    ${isIncome
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-rose-500/20 text-rose-400'
                    }
                  `}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {transaction.category}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatRelativeTime(transaction.date)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`
                    text-sm font-semibold
                    ${isIncome ? 'text-emerald-400' : 'text-rose-400'}
                  `}
                >
                  {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
                <p className="text-xs text-slate-500">
                  {formatDate(transaction.date)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default RecentTransactions;

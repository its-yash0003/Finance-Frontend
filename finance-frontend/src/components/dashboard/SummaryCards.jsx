import { Wallet, TrendingUp, TrendingDown, FileText } from 'lucide-react';
import StatCard from '../ui/StatCard';
import { formatCurrencyFull } from '../../utils/formatters';

const SummaryCards = ({ summary }) => {
  if (!summary) return null;

  const cards = [
    {
      title: 'Total Income',
      value: formatCurrencyFull(summary.total_income),
      icon: TrendingUp,
      color: 'success',
      trend: summary.income_trend,
    },
    {
      title: 'Total Expenses',
      value: formatCurrencyFull(summary.total_expenses),
      icon: TrendingDown,
      color: 'danger',
      trend: summary.expense_trend,
    },
    {
      title: 'Net Balance',
      value: formatCurrencyFull(summary.net_balance),
      icon: Wallet,
      color: summary.net_balance >= 0 ? 'info' : 'danger',
    },
    {
      title: 'Total Records',
      value: summary.record_count || 0,
      icon: FileText,
      color: 'purple',
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => (
        <StatCard
          key={index}
          title={card.title}
          value={card.value}
          icon={card.icon}
          trend={card.trend}
          color={card.color}
        />
      ))}
    </div>
  );
};

export default SummaryCards;

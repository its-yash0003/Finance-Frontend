import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { RECORD_TYPES, RECORD_TYPE_LABELS } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const TrendsChart = ({ trends }) => {
  const [viewMode, setViewMode] = useState('both');

  if (!trends || trends.length === 0) {
    return (
      <Card>
        <div className="text-center py-12 text-slate-500">
          No trends data available
        </div>
      </Card>
    );
  }

  // Transform data for chart
  const chartData = trends.map((item) => ({
    month: item.month,
    income: item.type === RECORD_TYPES.INCOME ? item.total : 0,
    expense: item.type === RECORD_TYPES.EXPENSE ? item.total : 0,
  }));

  // Combine income and expense for same months
  const combinedData = chartData.reduce((acc, item) => {
    const existingMonth = acc.find((m) => m.month === item.month);
    if (existingMonth) {
      existingMonth.income += item.income;
      existingMonth.expense += item.expense;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 shadow-xl">
          <p className="text-sm font-medium text-white mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-400">{entry.name}:</span>
              <span className="text-white font-medium">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Monthly Trends</h3>
        <div className="flex gap-2">
          {['income', 'expense', 'both'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`
                px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                ${viewMode === mode
                  ? 'bg-primary-500/20 text-primary-400'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
                }
              `}
            >
              {RECORD_TYPE_LABELS[mode] || 'Both'}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={combinedData}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `₹${value / 1000}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {(viewMode === 'both' || viewMode === 'income') && (
              <Area
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorIncome)"
                strokeWidth={2}
              />
            )}
            {(viewMode === 'both' || viewMode === 'expense') && (
              <Area
                type="monotone"
                dataKey="expense"
                name="Expense"
                stroke="#f43f5e"
                fillOpacity={1}
                fill="url(#colorExpense)"
                strokeWidth={2}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TrendsChart;

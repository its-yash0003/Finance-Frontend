import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';
import Card from '../ui/Card';

const COLORS = {
  income: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#14b8a6', '#06b6d4'],
  expense: ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#e11d48', '#be123c'],
};

const CategoryChart = ({ categories }) => {
  // Normalize data — handle array, object with data property, or null
  const rawData = Array.isArray(categories)
    ? categories
    : Array.isArray(categories?.data)
    ? categories.data
    : [];

  if (rawData.length === 0) {
    return (
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="text-center py-12 text-slate-500">No income category data</div>
        </Card>
        <Card>
          <div className="text-center py-12 text-slate-500">No expense category data</div>
        </Card>
      </div>
    );
  }

  const incomeCategories = rawData
    .filter((c) => c.type === 'income')
    .map((c) => ({ name: c.category, value: c.total }));

  const expenseCategories = rawData
    .filter((c) => c.type === 'expense')
    .map((c) => ({ name: c.category, value: c.total }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 shadow-xl">
          <p className="text-sm font-medium text-white mb-1">{data.name}</p>
          <p className="text-sm text-slate-400">{formatCurrency(data.value)}</p>
        </div>
      );
    }
    return null;
  };

  const renderChart = (data, colorKey, title, emptyMsg) => (
    <Card>
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      {data.length > 0 ? (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[colorKey][index % COLORS[colorKey].length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-slate-300 text-sm">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center text-slate-500">
          {emptyMsg}
        </div>
      )}
    </Card>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {renderChart(incomeCategories, 'income', 'Income by Category', 'No income records')}
      {renderChart(expenseCategories, 'expense', 'Expenses by Category', 'No expense records')}
    </div>
  );
};

export default CategoryChart;
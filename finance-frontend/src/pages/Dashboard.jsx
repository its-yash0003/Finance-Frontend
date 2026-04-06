import { useEffect, useState } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import SummaryCards from '../components/dashboard/SummaryCards';
import TrendsChart from '../components/dashboard/TrendsChart';
import CategoryChart from '../components/dashboard/CategoryChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import { CardSkeleton } from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import { FileText } from 'lucide-react';

const Dashboard = () => {
  const { fetchAllData, summary, trends, categories, recent, loading } = useDashboard();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchAllData();
      if (result) {
        setHasLoaded(true);
      }
    };

    loadData();
  }, [fetchAllData]);

  if (loading && !hasLoaded) {
    return (
      <div className="space-y-6">
        <CardSkeleton count={4} />
        <div className="glass-card p-6">
          <div className="h-80 animate-pulse bg-slate-800 rounded-xl" />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card p-6">
            <div className="h-64 animate-pulse bg-slate-800 rounded-xl" />
          </div>
          <div className="glass-card p-6">
            <div className="h-64 animate-pulse bg-slate-800 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // Check if there's any data
  const hasData = summary || (trends && trends.length > 0) || (categories && categories.length > 0);

  if (!loading && hasLoaded && !hasData) {
    return (
      <EmptyState
        icon={FileText}
        title="No data available"
        description="Start by adding some financial records to see your dashboard."
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <SummaryCards summary={summary} />

      {/* Trends Chart */}
      <TrendsChart trends={trends} />

      {/* Category Charts and Recent Transactions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <CategoryChart categories={categories} />
        <RecentTransactions transactions={recent} />
      </div>
    </div>
  );
};

export default Dashboard;

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { abTestData, modelPerformanceData } from '@/data/projectData';
import { TrendingUp, TrendingDown, DollarSign, Users } from 'lucide-react';

const ABTestChart = () => {
  // Aggregate data by date and variant
  const aggregatedData = abTestData.reduce((acc, curr) => {
    const existing = acc.find(item => item.date === curr.date);
    if (existing) {
      existing[curr.variant.toLowerCase()] = {
        conversionRate: curr.conversionRate,
        visitors: curr.visitors,
        conversions: curr.conversions,
        revenue: curr.revenue
      };
    } else {
      acc.push({
        date: curr.date,
        [curr.variant.toLowerCase()]: {
          conversionRate: curr.conversionRate,
          visitors: curr.visitors,
          conversions: curr.conversions,
          revenue: curr.revenue
        }
      });
    }
    return acc;
  }, [] as any[]);

  // Calculate summary statistics
  const controlData = abTestData.filter(item => item.variant === 'Control');
  const treatmentData = abTestData.filter(item => item.variant === 'Treatment');

  const controlStats = {
    totalVisitors: controlData.reduce((sum, item) => sum + item.visitors, 0),
    totalConversions: controlData.reduce((sum, item) => sum + item.conversions, 0),
    totalRevenue: controlData.reduce((sum, item) => sum + item.revenue, 0),
    avgConversionRate: controlData.reduce((sum, item) => sum + item.conversionRate, 0) / controlData.length
  };

  const treatmentStats = {
    totalVisitors: treatmentData.reduce((sum, item) => sum + item.visitors, 0),
    totalConversions: treatmentData.reduce((sum, item) => sum + item.conversions, 0),
    totalRevenue: treatmentData.reduce((sum, item) => sum + item.revenue, 0),
    avgConversionRate: treatmentData.reduce((sum, item) => sum + item.conversionRate, 0) / treatmentData.length
  };

  const improvement = {
    conversionRate: ((treatmentStats.avgConversionRate - controlStats.avgConversionRate) / controlStats.avgConversionRate) * 100,
    revenue: ((treatmentStats.totalRevenue - controlStats.totalRevenue) / controlStats.totalRevenue) * 100
  };

  // Prepare chart data
  const conversionData = aggregatedData.map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    control: item.control?.conversionRate || 0,
    treatment: item.treatment?.conversionRate || 0
  }));

  const revenueData = aggregatedData.map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    control: item.control?.revenue || 0,
    treatment: item.treatment?.revenue || 0
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey === 'control' ? 'Control' : 'Treatment'}: {entry.value.toFixed(2)}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const RevenueTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey === 'control' ? 'Control' : 'Treatment'}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, trend }: any) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center space-x-2">
            <p className="text-xs text-muted-foreground">{subtitle}</p>
            {trend !== undefined && (
              <Badge variant={trend > 0 ? "default" : "secondary"}>
                {trend > 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {Math.abs(trend).toFixed(1)}%
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Control Conversion"
          value={`${controlStats.avgConversionRate.toFixed(2)}%`}
          subtitle={`${controlStats.totalConversions.toLocaleString()} conversions`}
          icon={Users}
        />
        <StatCard
          title="Treatment Conversion"
          value={`${treatmentStats.avgConversionRate.toFixed(2)}%`}
          subtitle={`${treatmentStats.totalConversions.toLocaleString()} conversions`}
          icon={Users}
          trend={improvement.conversionRate}
        />
        <StatCard
          title="Control Revenue"
          value={`$${(controlStats.totalRevenue / 1000).toFixed(0)}k`}
          subtitle={`${controlStats.totalVisitors.toLocaleString()} visitors`}
          icon={DollarSign}
        />
        <StatCard
          title="Treatment Revenue"
          value={`$${(treatmentStats.totalRevenue / 1000).toFixed(0)}k`}
          subtitle={`${treatmentStats.totalVisitors.toLocaleString()} visitors`}
          icon={DollarSign}
          trend={improvement.revenue}
        />
      </div>

      {/* Test Results Summary */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Statistical Significance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <span className="font-medium">P-value:</span> {modelPerformanceData.abTestResults.statisticalSignificance} 
              <Badge variant="default" className="ml-2">Significant</Badge>
            </p>
            <p>
              <span className="font-medium">95% Confidence Interval:</span> [{modelPerformanceData.abTestResults.confidenceInterval[0]}, {modelPerformanceData.abTestResults.confidenceInterval[1]}]
            </p>
            <p>
              <span className="font-medium">Effect:</span> {modelPerformanceData.abTestResults.effect}
            </p>
            <p className="text-sm text-primary font-medium">
              📈 {modelPerformanceData.abTestResults.recommendation}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversionData.slice(-30)}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="control" 
                  stroke="#94a3b8" 
                  strokeWidth={2}
                  name="Control"
                />
                <Line 
                  type="monotone" 
                  dataKey="treatment" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Treatment"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Revenue Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData.slice(-14)}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                <Tooltip content={<RevenueTooltip />} />
                <Bar dataKey="control" fill="#94a3b8" name="Control" />
                <Bar dataKey="treatment" fill="hsl(var(--primary))" name="Treatment" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ABTestChart;
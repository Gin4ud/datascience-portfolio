import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { customerChurnData, modelPerformanceData } from '@/data/projectData';

const ChurnRiskChart = () => {
  // Calculate risk distribution
  const riskDistribution = customerChurnData.reduce((acc, customer) => {
    acc[customer.churnRisk] = (acc[customer.churnRisk] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const riskData = Object.entries(riskDistribution).map(([risk, count]) => ({
    name: risk,
    value: count,
    percentage: Math.round((count / customerChurnData.length) * 100)
  }));

  const featureImportanceData = modelPerformanceData.churnModel.featureImportance;

  const COLORS = {
    Low: '#22c55e',
    Medium: '#f59e0b',
    High: '#ef4444'
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{data.name} Risk</p>
          <p className="text-muted-foreground">
            Count: {data.value} ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const FeatureTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{data.feature}</p>
          <p className="text-muted-foreground">
            Importance: {(data.importance * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Customer Churn Risk Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percentage }) => `${name}: ${percentage}%`}
              >
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            {riskData.map((item) => (
              <div key={item.name} className="space-y-1">
                <div 
                  className="w-4 h-4 rounded mx-auto" 
                  style={{ backgroundColor: COLORS[item.name as keyof typeof COLORS] }}
                />
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.value} customers</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feature Importance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={featureImportanceData}
              layout="horizontal"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis type="number" domain={[0, 0.3]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
              <YAxis dataKey="feature" type="category" width={100} fontSize={12} />
              <Tooltip content={<FeatureTooltip />} />
              <Bar dataKey="importance" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChurnRiskChart;
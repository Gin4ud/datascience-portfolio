import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { salesForecastData, modelPerformanceData } from '@/data/projectData';
import { TrendingUp, Target, AlertTriangle } from 'lucide-react';

const SalesForecastChart = () => {
  const [selectedCategory, setSelectedCategory] = useState('Electronics');
  const [selectedRegion, setSelectedRegion] = useState('North');

  const categories = Array.from(new Set(salesForecastData.map(item => item.category)));
  const regions = Array.from(new Set(salesForecastData.map(item => item.region)));

  const filteredData = salesForecastData
    .filter(item => item.category === selectedCategory && item.region === selectedRegion)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Split into historical and forecast data
  const splitPoint = Math.floor(filteredData.length * 0.7);
  const historicalData = filteredData.slice(0, splitPoint).map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    type: 'historical'
  }));

  const forecastData = filteredData.slice(splitPoint).map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    type: 'forecast'
  }));

  const allData = [...historicalData, ...forecastData];

  // Calculate accuracy metrics for historical period
  const accuracy = historicalData.reduce((acc, item) => {
    const error = Math.abs(item.actual - item.predicted) / item.actual;
    return acc + error;
  }, 0) / historicalData.length;

  const mape = (1 - accuracy) * 100;

  // Calculate trends
  const recentActual = historicalData.slice(-30).reduce((sum, item) => sum + item.actual, 0) / 30;
  const forecastAvg = forecastData.slice(0, 30).reduce((sum, item) => sum + item.predicted, 0) / 30;
  const trend = ((forecastAvg - recentActual) / recentActual) * 100;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          {data.actual !== undefined && (
            <p style={{ color: '#22c55e' }}>
              Actual: ${data.actual.toLocaleString()}
            </p>
          )}
          <p style={{ color: 'hsl(var(--primary))' }}>
            Predicted: ${data.predicted.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">
            Range: ${data.lowerBound.toLocaleString()} - ${data.upperBound.toLocaleString()}
          </p>
          {data.type === 'forecast' && (
            <Badge variant="outline" className="mt-1">Forecast</Badge>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Category:</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Region:</label>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {regions.map(region => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Model Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">MAPE</h3>
              <Target className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-primary">
              {mape.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Mean Absolute Percentage Error
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">R²</h3>
              <Target className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-primary">
              {modelPerformanceData.salesModel.r2.toFixed(3)}
            </div>
            <p className="text-xs text-muted-foreground">
              Coefficient of Determination
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Trend</h3>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-primary">
              {trend > 0 ? '+' : ''}{trend.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              30-day forecast vs recent
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">RMSE</h3>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-primary">
              ${(modelPerformanceData.salesModel.rmse / 1000).toFixed(1)}k
            </div>
            <p className="text-xs text-muted-foreground">
              Root Mean Square Error
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Forecast Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Forecast with Confidence Intervals</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={allData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date"
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Confidence interval area */}
              <Area
                dataKey="upperBound"
                fill="hsl(var(--primary))"
                fillOpacity={0.1}
                stroke="none"
              />
              <Area
                dataKey="lowerBound"
                fill="white"
                fillOpacity={1}
                stroke="none"
              />
              
              {/* Historical actual line */}
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
                connectNulls={false}
                name="Actual"
              />
              
              {/* Forecast line */}
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                strokeDasharray={historicalData.length > 0 ? "5 5" : "none"}
                dot={false}
                name="Predicted"
              />
            </AreaChart>
          </ResponsiveContainer>
          
          <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-green-500"></div>
              <span>Historical Actual</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-primary" style={{ borderTop: '2px dashed' }}></div>
              <span>Forecast</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary/20"></div>
              <span>95% Confidence Interval</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forecast Summary */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle>Forecast Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Model Accuracy:</span> The forecast model achieves {mape.toFixed(1)}% MAPE on historical data, 
              indicating {mape < 10 ? 'excellent' : mape < 20 ? 'good' : 'fair'} predictive performance.
            </p>
            <p>
              <span className="font-medium">Trend Analysis:</span> Sales are forecasted to {trend > 0 ? 'increase' : 'decrease'} by {Math.abs(trend).toFixed(1)}% 
              over the next 30 days compared to recent historical average.
            </p>
            <p>
              <span className="font-medium">Seasonality:</span> The model captures seasonal patterns and adjusts forecasts accordingly, 
              with confidence intervals reflecting uncertainty levels.
            </p>
            <p className="text-primary font-medium">
              💡 Recommended action: {trend > 5 ? 'Scale up inventory and marketing' : trend < -5 ? 'Optimize costs and consider promotions' : 'Maintain current strategy with regular monitoring'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesForecastChart;
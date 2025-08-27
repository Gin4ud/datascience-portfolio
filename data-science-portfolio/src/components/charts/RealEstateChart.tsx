import { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { realEstateData } from '@/data/projectData';

const RealEstateChart = () => {
  const [selectedCity, setSelectedCity] = useState('all');
  const [chartType, setChartType] = useState('scatter');

  const cities = ['all', ...Array.from(new Set(realEstateData.map(item => item.city)))];
  
  const filteredData = selectedCity === 'all' 
    ? realEstateData 
    : realEstateData.filter(item => item.city === selectedCity);

  // Price distribution by city
  const priceByCity = cities.slice(1).map(city => {
    const cityData = realEstateData.filter(item => item.city === city);
    const avgPrice = cityData.reduce((sum, item) => sum + item.price, 0) / cityData.length;
    const medianPrice = cityData.sort((a, b) => a.price - b.price)[Math.floor(cityData.length / 2)]?.price || 0;
    
    return {
      city,
      avgPrice: Math.round(avgPrice),
      medianPrice: Math.round(medianPrice),
      count: cityData.length
    };
  });

  // Price trend by square footage
  const priceVsSqft = filteredData.map(item => ({
    sqft: item.sqft,
    price: item.price,
    pricePerSqft: item.pricePerSqft,
    city: item.city,
    bedrooms: item.bedrooms
  }));

  // Average price per sqft by bedrooms
  const priceByBedrooms = [1, 2, 3, 4, 5].map(bedrooms => {
    const bedroomData = filteredData.filter(item => item.bedrooms === bedrooms);
    if (bedroomData.length === 0) return null;
    
    const avgPricePerSqft = bedroomData.reduce((sum, item) => sum + item.pricePerSqft, 0) / bedroomData.length;
    return {
      bedrooms: `${bedrooms} BR`,
      avgPricePerSqft: Math.round(avgPricePerSqft),
      count: bedroomData.length
    };
  }).filter(Boolean);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{data.city || 'Property'}</p>
          <p className="text-muted-foreground">Price: ${data.price?.toLocaleString()}</p>
          <p className="text-muted-foreground">Sqft: {data.sqft?.toLocaleString()}</p>
          <p className="text-muted-foreground">$/sqft: ${data.pricePerSqft}</p>
          {data.bedrooms && <p className="text-muted-foreground">Bedrooms: {data.bedrooms}</p>}
        </div>
      );
    }
    return null;
  };

  const CityTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{data.city}</p>
          <p className="text-muted-foreground">Avg Price: ${data.avgPrice?.toLocaleString()}</p>
          <p className="text-muted-foreground">Median Price: ${data.medianPrice?.toLocaleString()}</p>
          <p className="text-muted-foreground">Properties: {data.count}</p>
        </div>
      );
    }
    return null;
  };

  const getColorByCity = (city: string) => {
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];
    const index = cities.indexOf(city) % colors.length;
    return colors[index];
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">City:</label>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {cities.map(city => (
                <SelectItem key={city} value={city}>
                  {city === 'all' ? 'All Cities' : city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Chart Type:</label>
          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="scatter">Price vs Sqft</SelectItem>
              <SelectItem value="city">Price by City</SelectItem>
              <SelectItem value="bedrooms">Price by Bedrooms</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Badge variant="outline">
          {filteredData.length} properties
        </Badge>
      </div>

      {/* Main Chart */}
      <Card>
        <CardHeader>
          <CardTitle>
            {chartType === 'scatter' && 'Property Price vs Square Footage'}
            {chartType === 'city' && 'Average Property Prices by City'}
            {chartType === 'bedrooms' && 'Price per Square Foot by Bedroom Count'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {chartType === 'scatter' && (
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={priceVsSqft}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="sqft" 
                  name="Square Feet"
                  tickFormatter={(value) => `${value.toLocaleString()}`}
                />
                <YAxis 
                  dataKey="price" 
                  name="Price"
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Scatter 
                  dataKey="price" 
                  fill="hsl(var(--primary))"
                  fillOpacity={0.7}
                />
              </ScatterChart>
            </ResponsiveContainer>
          )}
          
          {chartType === 'city' && (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={priceByCity}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="city" />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                <Tooltip content={<CityTooltip />} />
                <Bar dataKey="avgPrice" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          )}
          
          {chartType === 'bedrooms' && (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={priceByBedrooms}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="bedrooms" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  formatter={(value: any, name: string) => [
                    `$${value}/sqft`, 
                    'Avg Price per Sqft'
                  ]}
                />
                <Bar dataKey="avgPricePerSqft" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              ${Math.round(filteredData.reduce((sum, item) => sum + item.price, 0) / filteredData.length / 1000)}k
            </div>
            <p className="text-xs text-muted-foreground">Average Price</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              ${Math.round(filteredData.reduce((sum, item) => sum + item.pricePerSqft, 0) / filteredData.length)}
            </div>
            <p className="text-xs text-muted-foreground">Avg Price/Sqft</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              {Math.round(filteredData.reduce((sum, item) => sum + item.sqft, 0) / filteredData.length).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Avg Square Feet</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              {Math.round(filteredData.reduce((sum, item) => sum + item.daysOnMarket, 0) / filteredData.length)}
            </div>
            <p className="text-xs text-muted-foreground">Avg Days on Market</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealEstateChart;
// Sample data for portfolio projects

export interface CustomerData {
  id: string;
  age: number;
  tenure: number;
  monthlyCharges: number;
  totalCharges: number;
  churnProbability: number;
  churnRisk: 'Low' | 'Medium' | 'High';
  contractType: 'Monthly' | 'Yearly' | 'Two-Year';
  internetService: 'DSL' | 'Fiber' | 'No';
  paymentMethod: string;
}

export interface RealEstateData {
  id: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lotSize: number;
  yearBuilt: number;
  city: string;
  state: string;
  zipcode: string;
  pricePerSqft: number;
  daysOnMarket: number;
  latitude: number;
  longitude: number;
}

export interface ABTestData {
  date: string;
  variant: 'Control' | 'Treatment';
  visitors: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
  revenuePerVisitor: number;
}

export interface SalesData {
  date: string;
  actual: number;
  predicted: number;
  upperBound: number;
  lowerBound: number;
  category: string;
  region: string;
}

// Customer Churn Data
export const customerChurnData: CustomerData[] = [
  {
    id: 'CUST001',
    age: 35,
    tenure: 24,
    monthlyCharges: 85.50,
    totalCharges: 2052.00,
    churnProbability: 0.15,
    churnRisk: 'Low',
    contractType: 'Yearly',
    internetService: 'Fiber',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'CUST002',
    age: 42,
    tenure: 6,
    monthlyCharges: 120.00,
    totalCharges: 720.00,
    churnProbability: 0.75,
    churnRisk: 'High',
    contractType: 'Monthly',
    internetService: 'Fiber',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'CUST003',
    age: 28,
    tenure: 36,
    monthlyCharges: 65.00,
    totalCharges: 2340.00,
    churnProbability: 0.08,
    churnRisk: 'Low',
    contractType: 'Two-Year',
    internetService: 'DSL',
    paymentMethod: 'Credit Card'
  },
  // Add more sample customers...
];

// Generate more customer data
for (let i = 4; i <= 100; i++) {
  const tenure = Math.floor(Math.random() * 60) + 1;
  const monthlyCharges = Math.floor(Math.random() * 100) + 30;
  const age = Math.floor(Math.random() * 50) + 20;
  
  // Calculate churn probability based on factors
  let churnProb = 0.3;
  if (tenure < 12) churnProb += 0.3;
  if (monthlyCharges > 80) churnProb += 0.2;
  if (age < 30) churnProb += 0.1;
  churnProb = Math.min(0.95, Math.max(0.05, churnProb + (Math.random() - 0.5) * 0.3));
  
  const contractTypes: Array<'Monthly' | 'Yearly' | 'Two-Year'> = ['Monthly', 'Yearly', 'Two-Year'];
  const internetServices: Array<'DSL' | 'Fiber' | 'No'> = ['DSL', 'Fiber', 'No'];
  const paymentMethods = ['Credit Card', 'Bank Transfer', 'Electronic Check', 'Mailed Check'];
  
  customerChurnData.push({
    id: `CUST${String(i).padStart(3, '0')}`,
    age,
    tenure,
    monthlyCharges: Math.round(monthlyCharges * 100) / 100,
    totalCharges: Math.round(monthlyCharges * tenure * 100) / 100,
    churnProbability: Math.round(churnProb * 100) / 100,
    churnRisk: churnProb > 0.6 ? 'High' : churnProb > 0.3 ? 'Medium' : 'Low',
    contractType: contractTypes[Math.floor(Math.random() * contractTypes.length)],
    internetService: internetServices[Math.floor(Math.random() * internetServices.length)],
    paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)]
  });
}

// Real Estate Data
export const realEstateData: RealEstateData[] = [];
const cities = [
  { name: 'San Francisco', state: 'CA', basePricePerSqft: 800, lat: 37.7749, lng: -122.4194 },
  { name: 'Austin', state: 'TX', basePricePerSqft: 300, lat: 30.2672, lng: -97.7431 },
  { name: 'Denver', state: 'CO', basePricePerSqft: 400, lat: 39.7392, lng: -104.9903 },
  { name: 'Seattle', state: 'WA', basePricePerSqft: 600, lat: 47.6062, lng: -122.3321 },
  { name: 'Miami', state: 'FL', basePricePerSqft: 350, lat: 25.7617, lng: -80.1918 }
];

for (let i = 0; i < 300; i++) {
  const city = cities[Math.floor(Math.random() * cities.length)];
  const sqft = Math.floor(Math.random() * 3000) + 800;
  const bedrooms = Math.floor(Math.random() * 5) + 1;
  const bathrooms = Math.floor(Math.random() * 3) + 1;
  const yearBuilt = Math.floor(Math.random() * 50) + 1970;
  const lotSize = Math.floor(Math.random() * 10000) + 2000;
  
  const pricePerSqft = city.basePricePerSqft * (0.7 + Math.random() * 0.6);
  const price = Math.round(sqft * pricePerSqft);
  
  realEstateData.push({
    id: `PROP${String(i + 1).padStart(3, '0')}`,
    price,
    bedrooms,
    bathrooms,
    sqft,
    lotSize,
    yearBuilt,
    city: city.name,
    state: city.state,
    zipcode: String(Math.floor(Math.random() * 90000) + 10000),
    pricePerSqft: Math.round(pricePerSqft),
    daysOnMarket: Math.floor(Math.random() * 120) + 1,
    latitude: city.lat + (Math.random() - 0.5) * 0.5,
    longitude: city.lng + (Math.random() - 0.5) * 0.5
  });
}

// A/B Test Data
export const abTestData: ABTestData[] = [];
const startDate = new Date('2024-01-01');
for (let i = 0; i < 90; i++) {
  const date = new Date(startDate);
  date.setDate(date.getDate() + i);
  
  const controlVisitors = Math.floor(Math.random() * 500) + 1000;
  const treatmentVisitors = Math.floor(Math.random() * 500) + 1000;
  
  const controlConversionRate = 0.12 + (Math.random() - 0.5) * 0.04;
  const treatmentConversionRate = 0.15 + (Math.random() - 0.5) * 0.04;
  
  const controlConversions = Math.floor(controlVisitors * controlConversionRate);
  const treatmentConversions = Math.floor(treatmentVisitors * treatmentConversionRate);
  
  const avgRevenue = 50;
  
  abTestData.push(
    {
      date: date.toISOString().split('T')[0],
      variant: 'Control',
      visitors: controlVisitors,
      conversions: controlConversions,
      conversionRate: Math.round(controlConversionRate * 10000) / 100,
      revenue: controlConversions * avgRevenue,
      revenuePerVisitor: Math.round((controlConversions * avgRevenue / controlVisitors) * 100) / 100
    },
    {
      date: date.toISOString().split('T')[0],
      variant: 'Treatment',
      visitors: treatmentVisitors,
      conversions: treatmentConversions,
      conversionRate: Math.round(treatmentConversionRate * 10000) / 100,
      revenue: treatmentConversions * avgRevenue,
      revenuePerVisitor: Math.round((treatmentConversions * avgRevenue / treatmentVisitors) * 100) / 100
    }
  );
}

// Sales Forecast Data
export const salesForecastData: SalesData[] = [];
const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'];
const regions = ['North', 'South', 'East', 'West'];

for (let i = 0; i < 365; i++) {
  const date = new Date('2024-01-01');
  date.setDate(date.getDate() + i);
  
  categories.forEach(category => {
    regions.forEach(region => {
      const baseValue = Math.random() * 50000 + 10000;
      const seasonality = Math.sin((i / 365) * 2 * Math.PI) * 0.3;
      const trend = i * 50;
      const noise = (Math.random() - 0.5) * 5000;
      
      const actual = Math.max(0, baseValue + seasonality * baseValue + trend + noise);
      const predicted = actual + (Math.random() - 0.5) * actual * 0.1;
      const uncertainty = actual * 0.15;
      
      salesForecastData.push({
        date: date.toISOString().split('T')[0],
        actual: Math.round(actual),
        predicted: Math.round(predicted),
        upperBound: Math.round(predicted + uncertainty),
        lowerBound: Math.round(Math.max(0, predicted - uncertainty)),
        category,
        region
      });
    });
  });
}

// Model Performance Metrics
export const modelPerformanceData = {
  churnModel: {
    accuracy: 0.89,
    precision: 0.85,
    recall: 0.82,
    f1Score: 0.83,
    auc: 0.91,
    featureImportance: [
      { feature: 'Monthly Charges', importance: 0.28 },
      { feature: 'Tenure', importance: 0.24 },
      { feature: 'Contract Type', importance: 0.18 },
      { feature: 'Total Charges', importance: 0.15 },
      { feature: 'Payment Method', importance: 0.09 },
      { feature: 'Internet Service', importance: 0.06 }
    ]
  },
  salesModel: {
    mape: 8.5, // Mean Absolute Percentage Error
    rmse: 2341,
    mae: 1876,
    r2: 0.94,
    foreccastAccuracy: 0.915
  },
  abTestResults: {
    statisticalSignificance: 0.032, // p-value
    confidenceInterval: [0.018, 0.056], // 95% CI for difference
    effect: 'Treatment shows 25% improvement in conversion rate',
    recommendation: 'Deploy treatment to all users'
  }
};
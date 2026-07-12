import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const cropPrices = [
  { name: 'Maize (Masara)', price: '₦45,000', change: '+2%', trend: 'up', unit: '100kg bag' },
  { name: 'Rice (Shinkafa)', price: '₦85,000', change: '-1%', trend: 'down', unit: '50kg bag' },
  { name: 'Tomatoes (Tumatir)', price: '₦25,000', change: '0%', trend: 'stable', unit: 'Big Basket' },
  { name: 'Beans (Wake)', price: '₦60,000', change: '+5%', trend: 'up', unit: '100kg bag' },
];

export const MarketDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/11bdc084-973d-43bf-81d2-05e5fa3585ff/hero-market-nigeria-43e9e683-1783600122061.webp" 
          alt="Market" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
          <div className="text-white">
            <h2 className="text-2xl font-bold">Kasuwa (Market)</h2>
            <p className="text-sm opacity-90">Farashin Yau a Nigeria (Today's Prices)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {cropPrices.map((crop) => (
          <Card key={crop.name} className="overflow-hidden border-none shadow-sm bg-white/80 backdrop-blur">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-semibold text-lg text-green-900">{crop.name}</p>
                <p className="text-sm text-gray-500">{crop.unit}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-green-700">{crop.price}</p>
                <div className="flex items-center justify-end space-x-1 mt-1">
                  {crop.trend === 'up' && <TrendingUp className="w-3 h-3 text-red-500" />}
                  {crop.trend === 'down' && <TrendingDown className="w-3 h-3 text-green-500" />}
                  {crop.trend === 'stable' && <Minus className="w-3 h-3 text-gray-400" />}
                  <span className={`text-xs font-medium ${
                    crop.trend === 'up' ? 'text-red-500' : 
                    crop.trend === 'down' ? 'text-green-500' : 'text-gray-400'
                  }`}>
                    {crop.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-4 bg-green-100 rounded-xl border border-green-200">
        <p className="text-xs text-green-800 font-medium">
          Note: Prices are based on national averages and may vary by location.
          (Lura: Farashin ya dogara ne akan matsakaicin kasa kuma yana iya bambanta dangane da wuri.)
        </p>
      </div>
    </div>
  );
};

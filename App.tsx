import React, { useState, useEffect } from 'react';
import { MarketDashboard } from '@/components/MarketDashboard';
import { SellForm } from '@/components/SellForm';
import { BuyList } from '@/components/BuyList';
import { LayoutDashboard, ShoppingBasket, CirclePlus } from 'lucide-react';
import { Toaster } from 'sonner';

const App = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'sell' | 'buy'>('dashboard');
  const [listings, setListings] = useState<any[]>([]);

  // Load listings from localStorage
  useEffect(() => {
    const savedListings = localStorage.getItem('kasuwa_listings');
    if (savedListings) {
      try {
        setListings(JSON.parse(savedListings));
      } catch (e) {
        console.error("Failed to parse listings", e);
      }
    }
  }, []);

  // Save listings to localStorage
  const addListing = (newListing: any) => {
    const updatedListings = [...listings, newListing];
    setListings(updatedListings);
    localStorage.setItem('kasuwa_listings', JSON.stringify(updatedListings));
    setActiveTab('buy');
  };

  // Delete a listing by ID
  const deleteListing = (id: string) => {
    const updatedListings = listings.filter((l) => l.id !== id);
    setListings(updatedListings);
    localStorage.setItem('kasuwa_listings', JSON.stringify(updatedListings));
  };

  return (
    <div className="min-h-screen bg-green-50 pb-24 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-green-100 px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-green-700 tracking-tight">Kasuwa-Direct</h1>
            <p className="text-[10px] text-green-600 font-medium -mt-0.5">Kasuwar Manoma (Farmers' Market)</p>
          </div>
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
            Nigeria
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-md mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'dashboard' && <MarketDashboard />}
        {activeTab === 'sell' && <SellForm onAddListing={addListing} />}
        {activeTab === 'buy' && <BuyList listings={listings} onDeleteListing={deleteListing} />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-green-100 px-6 py-3 pb-8 z-20 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center space-y-1 transition-colors ${
              activeTab === 'dashboard' ? 'text-green-700' : 'text-gray-400'
            }`}
          >
            <LayoutDashboard className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-wider leading-tight text-center">
              <span className="block">Kasuwa</span>
              <span className="block text-[8px] font-normal normal-case opacity-70">Market</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('sell')}
            className={`flex flex-col items-center space-y-1 transition-colors ${
              activeTab === 'sell' ? 'text-green-700' : 'text-gray-400'
            }`}
          >
            <CirclePlus className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-wider leading-tight text-center">
              <span className="block">Siyarwa</span>
              <span className="block text-[8px] font-normal normal-case opacity-70">Sell</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('buy')}
            className={`flex flex-col items-center space-y-1 transition-colors ${
              activeTab === 'buy' ? 'text-green-700' : 'text-gray-400'
            }`}
          >
            <ShoppingBasket className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-wider leading-tight text-center">
              <span className="block">Sayayya</span>
              <span className="block text-[8px] font-normal normal-case opacity-70">Buy</span>
            </span>
          </button>
        </div>
      </nav>

      <Toaster position="top-center" expand={false} richColors />
    </div>
  );
};

export default App;
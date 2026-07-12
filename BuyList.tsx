import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Tag, Package, Calendar, Trash2, MessageCircle } from 'lucide-react';

function generateWhatsAppLink(phone: string, cropName: string, price: string): string {
  const message = `Hello! I am interested in your ${cropName} listed on Kasuwa-Direct for ₦${price}. Is it still available?

Sannu! Ina sha'awar ${cropName} dinka da aka rubuta a Kasuwa-Direct akan farashin ₦${price}. Shin akwai sauran shi?`;
  return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}

export const BuyList = ({ listings, onDeleteListing }: { listings: any[]; onDeleteListing: (id: string) => void }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-green-900">Sayayya (Buy Crops)</h2>
        <span className="bg-green-200 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
          {listings.length} Akwai (Available)
        </span>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-green-200">
          <Package className="w-12 h-12 text-green-200 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Babu amfanin gona a halin yanzu</p>
          <p className="text-sm text-gray-400">No crops available right now. (Babu abin da ake sayarwa)</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {listings.map((item) => (
            <Card key={item.id} className="overflow-hidden border-none shadow-md bg-white">
              <CardContent className="p-0">
                <div className="p-4 flex items-start justify-between">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-green-900">{item.cropName}</h3>
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        {item.date}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-gray-600">
                        <Tag className="w-4 h-4 mr-1 text-green-600" />
                        <span className="font-bold text-green-800">₦{item.price}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Package className="w-4 h-4 mr-1 text-green-600" />
                        <span>{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-full">
                    <TractorIcon className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                
                <div className="p-4 pt-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Button
                      onClick={() => onDeleteListing(item.id)}
                      variant="outline"
                      className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 h-10 text-sm"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      <span>Goge (Delete)</span>
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      asChild
                      className="flex-1 bg-green-600 hover:bg-green-700 flex items-center justify-center space-x-2 h-11"
                    >
                      <a href={`tel:${item.phone}`}>
                        <Phone className="w-4 h-4" />
                        <span>Kira (Call)</span>
                      </a>
                    </Button>
                    <Button 
                      asChild
                      className="flex-1 bg-emerald-500 hover:bg-emerald-400 active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2 h-11 shadow-md"
                    >
                      <a 
                        href={generateWhatsAppLink(item.phone, item.cropName, item.price)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )).reverse()}
        </div>
      )}
    </div>
  );
};

const TractorIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m10 11 11 .9c.6 0 .9.5.8 1.1l-.8 7.1c-.1.5-.5.9-1 .9H4c-.5 0-.9-.4-1-.9L2.1 13c-.1-.6.3-1.1.8-1.1l11-.9" />
    <path d="M7 11V8a4 4 0 0 1 8 0v3" />
    <path d="M12 2v2" />
    <path d="M12 11v4" />
    <circle cx="7" cy="20" r="2" />
    <circle cx="17" cy="20" r="2" />
  </svg>
);
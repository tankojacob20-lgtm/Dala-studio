import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Tractor, Phone } from 'lucide-react';

const formSchema = z.object({
  cropName: z.string().min(2, { message: 'Sunan amfanin gona ya yi gajarta / Crop name is too short' }),
  price: z.string().min(1, { message: 'Ana buƙatar farashi / Price is required' }),
  quantity: z.string().min(1, { message: 'Ana buƙatar yawa / Quantity is required' }),
  phone: z.string().min(10, { message: 'Ana buƙatar lambar waya / Phone number is required' }),
});

export const SellForm = ({ onAddListing }: { onAddListing: (listing: any) => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropName: '',
      price: '',
      quantity: '',
      phone: '',
    },
  });

  function normalizePhone(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    if (digits.startsWith('0')) {
      return '234' + digits.slice(1);
    }
    if (digits.startsWith('234')) {
      return digits;
    }
    return '234' + digits;
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newListing = {
      id: Date.now().toString(),
      ...values,
      phone: normalizePhone(values.phone),
      date: new Date().toLocaleDateString(),
    };
    
    onAddListing(newListing);
    toast.success('An saka amfanin gona don sayarwa! (Listing added successfully!)');
    form.reset();
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center justify-center p-3 bg-green-200 rounded-full text-green-700 mb-2">
          <Tractor className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-green-900">Siyarwa (Sell Crops)</h2>
        <p className="text-gray-600">Shigar da bayanan abin da kake son sayarwa. (Enter crop details to sell.)</p>
      </div>

      <Card className="border-none shadow-md">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="cropName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amfanin Gona (Crop Name)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Rice, Maize" {...field} className="bg-green-50/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Farashi (Price)</FormLabel>
                      <FormControl>
                        <Input placeholder="₦" {...field} className="bg-green-50/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Yawa (Quantity)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 5 bags" {...field} className="bg-green-50/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lambar Waya (Phone Number)</FormLabel>
                    <FormControl>
                      <Input placeholder="080..." {...field} className="bg-green-50/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg font-semibold mt-4">
                Saka a Kasuwa (Add to Market)
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
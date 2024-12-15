"use client";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion } from "framer-motion";
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { clearCart, removeFromCart } from '@/app/store/features/cart/cartSlice';
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ShoppingBag, MapPin, Truck, Package, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Cart() {
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);
  const totalAmount = useSelector((state: any) => state.cart.totalAmount);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get('/api/address');
      setAddresses(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch addresses",
        variant: "destructive"
      });
    }
  };

  const handleRemoveItem = (id: string, size: string, color: string) => {
    dispatch(removeFromCart({ id, size, color }));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart"
    });
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast({
        title: "Select Address",
        description: "Please select a delivery address",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      const orderData = {
        products: cartItems.map((item: any) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
          size: item.size,
          color: item.color
        })),
        total: totalAmount,
        shipping_address: selectedAddressId
      };

      await axios.post('/api/orders', orderData);
      dispatch(clearCart());

      toast({
        title: "Order Placed Successfully!",
        description: "We'll deliver your order within 5-7 business days"
      });

      router.push('/user');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to place order",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen pt-[100px] px-4 bg-black">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <div className="relative w-48 h-48 mx-auto mb-8">
              <Image
                src="/deauthCircleIcon2.png"
                alt="Empty Cart"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-3xl font-heading1 mb-4">Your cart is empty</h2>
            <p className="text-white/70 mb-6">Start adding some awesome products!</p>
            <Button
              onClick={() => router.push('/')}
              className="bg-accent hover:bg-accent/90 rounded-full py-6 px-8"
            >
              Continue Shopping <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen pt-[100px] px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          {/* Cart Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-heading1 text-white mb-4">Your Cart</h1>
            <div className="flex items-center justify-center gap-2 text-accent">
              <ShoppingBag className="w-5 h-5" />
              <span>{cartItems.length} items</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-6">
              {cartItems.map((item: any, index: number) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex gap-6">
                    {item.image && (
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-heading1 text-lg text-white mb-2">{item.name}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-white/70">
                        <span className="px-3 py-1 bg-white/5 rounded-full">Size: {item.size}</span>
                        <span className="px-3 py-1 bg-white/5 rounded-full">Color: {item.color}</span>
                        <span className="px-3 py-1 bg-white/5 rounded-full">Qty: {item.quantity}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                      <div className="text-xl font-heading1 text-accent">₹{item.price}</div>
                      <Button
                        variant="ghost"
                        className="text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-full p-2"
                        onClick={() => handleRemoveItem(item.id, item.size, item.color)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                </motion.div>
              ))}
            </div>

            {/* Order Summary & Address Selection */}
            <div className="space-y-6">
              {addresses.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-white"
                >
                  <MapPin className="w-8 h-8 text-accent mb-4" />
                  <p className="mb-4 font-heading1">Please add a delivery address first</p>
                  <Button
                    onClick={() => router.push('/user')}
                    className="w-full bg-accent rounded-full"
                  >
                    Add Address
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-white"
                >
                  <h3 className="font-heading1 text-lg mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-accent" />
                    Select Delivery Address
                  </h3>
                  <div className="space-y-3">
                    {addresses.map((address: any) => (
                      <div
                        key={address._id}
                        className={`p-4 rounded-xl cursor-pointer border transition-all duration-300 
                          ${selectedAddressId === address._id
                            ? 'border-accent bg-accent/10'
                            : 'border-white/10 hover:border-accent/50'
                          }`}
                        onClick={() => setSelectedAddressId(address._id)}
                      >
                        <p className="font-medium">{address.address_line1}</p>
                        <p className="text-sm text-white/70">
                          {address.city}, {address.state}
                        </p>
                        <p className="text-sm text-white/70">{address.postal_code}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-white"
              >
                <h2 className="text-xl font-heading1 mb-6 flex items-center gap-2">
                  <Package className="w-5 h-5 text-accent" />
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-white/70">Subtotal</span>
                    <span className="font-heading1">₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-accent" />
                      <span className="text-white/70">Delivery</span>
                    </div>
                    <span className="text-accent font-heading1">FREE</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-heading1">
                    <span>Total</span>
                    <span className="text-accent">₹{totalAmount}</span>
                  </div>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing || !selectedAddressId}
                  className="w-full mt-6 bg-accent hover:bg-accent/90 rounded-full py-6 font-heading1"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div>
                      Processing...
                    </div>
                  ) : (
                    "Place Order (Cash on Delivery)"
                  )}
                </Button>

                <p className="text-sm text-white/50 text-center mt-4">
                  Free delivery • 7 day easy returns
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
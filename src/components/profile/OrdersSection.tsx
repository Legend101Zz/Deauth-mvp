"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Clock, Calendar, Truck, CheckCircle2, ChevronDown, MapPin } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';

interface IOrderStatus {
    id: string;
    date: string;
    status: "Pending" | "Confirmed" | "Shipped" | "Delivered";
    total: number;
    shipping_address: string;
    items: {
        name: string;
        size: string;
        color: string;
        quantity: number;
        price: number;
        image?: string;
    }[];
}

const OrderStatusTimeline = ({ status }: { status: string }) => {
    const steps = ["Pending", "Confirmed", "Shipped", "Delivered"];
    const currentStep = steps.indexOf(status);

    return (
        <div className="flex items-center justify-between w-full mt-4">
            {steps.map((step, index) => (
                <div key={step} className="flex flex-col items-center relative">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center 
            ${index <= currentStep ? 'bg-accent' : 'bg-white/10'}`}>
                        {index === 0 && <Package className="w-4 h-4 text-white" />}
                        {index === 1 && <Clock className="w-4 h-4 text-white" />}
                        {index === 2 && <Truck className="w-4 h-4 text-white" />}
                        {index === 3 && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <div className="absolute w-full text-center mt-10">
                        <span className={`text-xs ${index <= currentStep ? 'text-white' : 'text-white/50'}`}>
                            {step}
                        </span>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`absolute w-[calc(100%+2rem)] h-[2px] top-4 left-8 
              ${index < currentStep ? 'bg-accent' : 'bg-white/10'}`} />
                    )}
                </div>
            ))}
        </div>
    );
};

const OrderCard = ({ order }: { order: IOrderStatus }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [shippingAddress, setShippingAddress] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShippingAddress = async () => {
            try {
                if (order.shipping_address) {
                    const response = await axios.get(`/api/address/${order.shipping_address}`);
                    setShippingAddress(response.data);
                }
            } catch (error) {
                console.error("Error fetching shipping address:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchShippingAddress();
    }, [order.shipping_address]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Delivered": return "text-green-500 bg-green-500/10";
            case "Shipped": return "text-blue-500 bg-blue-500/10";
            case "Confirmed": return "text-yellow-500 bg-yellow-500/10";
            default: return "text-accent bg-accent/10";
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-secondaryBackground rounded-xl overflow-hidden backdrop-blur-sm border border-white/5"
        >
            <div className="p-6 border-b border-white/5">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-xl font-heading1 text-white mb-1">Order #{order.id}</h3>
                        <div className="flex items-center gap-4 text-sm text-white/70">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {order.date}
                            </div>
                            <div className="flex items-center gap-1">
                                <Package className="w-4 h-4" />
                                {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <span className={`px-4 py-2 rounded-full text-sm font-heading1 ${getStatusColor(order.status)}`}>
                            {order.status}
                        </span>
                        <span className="text-xl font-heading1 text-accent">₹{order.total}</span>
                    </div>
                </div>

                <OrderStatusTimeline status={order.status} />
            </div>

            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-4 flex items-center justify-center text-white/70 hover:text-white gap-2 transition-colors"
            >
                <span className="text-sm">Order Details</span>
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-4 h-4" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-white/5"
                    >
                        <div className="p-6 space-y-6">
                            <div className="space-y-4">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex gap-4 py-4 border-b border-white/5 last:border-0">
                                        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white/5">
                                            <Image
                                                src={item.image || "/C_hoodie.png"}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-white font-heading1">{item.name}</h4>
                                            <p className="text-white/70 text-sm mt-1">
                                                Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                                            </p>
                                            <p className="text-accent font-heading1 mt-2">₹{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2 text-white">
                                    <MapPin className="w-4 h-4" />
                                    <h4 className="font-heading1">Shipping Address</h4>
                                </div>
                                {loading ? (
                                    <div className="animate-pulse space-y-2">
                                        <div className="h-4 bg-white/10 rounded w-3/4"></div>
                                        <div className="h-4 bg-white/10 rounded w-1/2"></div>
                                    </div>
                                ) : shippingAddress ? (
                                    <p className="text-white/70 text-sm">
                                        {shippingAddress.address_line1}<br />
                                        {shippingAddress.address_line2 && <>{shippingAddress.address_line2}<br /></>}
                                        {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postal_code}<br />
                                        {shippingAddress.country}
                                    </p>
                                ) : (
                                    <p className="text-white/70 text-sm">
                                        Shipping address not available
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export const OrdersSection = ({ orders, loading }: { orders: IOrderStatus[], loading: boolean }) => {
    if (loading) {
        return (
            <div className="space-y-6">
                {Array(2).fill(0).map((_, i) => (
                    <div key={i} className="bg-secondaryBackground rounded-xl p-6 animate-pulse">
                        <div className="flex justify-between items-start mb-4">
                            <div className="space-y-3">
                                <div className="h-6 bg-white/10 rounded w-32"></div>
                                <div className="h-4 bg-white/10 rounded w-24"></div>
                            </div>
                            <div className="h-8 bg-white/10 rounded w-24"></div>
                        </div>
                        <div className="h-4 bg-white/10 rounded w-full mt-6"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-secondaryBackground rounded-xl p-8 text-center"
            >
                <Package className="w-16 h-16 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-heading1 text-white mb-2">No orders yet</h3>
                <p className="text-white/70">
                    Your orders will appear here once you make a purchase
                </p>
            </motion.div>
        );
    }

    return (
        <div className="space-y-6">
            {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    );
};
"use client";
import { motion } from 'framer-motion';
import { Package, MapPin, Settings, CreditCard } from 'lucide-react';

interface NavItem {
    id: string;
    label: string;
    icon: any;
}

const navItems: NavItem[] = [
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'addresses', label: 'Addresses', icon: MapPin }
];

export const ProfileNavigation = ({
    activeTab,
    setActiveTab
}: {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}) => {
    return (
        <div className="relative mb-8 bg-secondaryBackground rounded-xl p-2">
            <div className="flex justify-between">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`relative flex-1 px-4 py-3 rounded-lg transition-colors
                ${activeTab === item.id ? 'text-white' : 'text-white/50 hover:text-white/70'}`}
                        >
                            <div className="flex flex-col items-center gap-2">
                                <Icon className="w-5 h-5" />
                                <span className="text-sm font-heading1">{item.label}</span>
                            </div>
                            {activeTab === item.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-accent/20 rounded-lg -z-10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Ruler, ShoppingCart, Heart, Check } from "lucide-react";
import { useDispatch } from 'react-redux';
import { useToast } from "@/components/ui/use-toast";
import { addToCart } from "@/app/store/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ProductSelectionSection = () => {
    const [selectedColor, setSelectedColor] = useState("black");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [gender, setGender] = useState<"male" | "female">("male");
    const dispatch = useDispatch();
    const { toast } = useToast();
    const router = useRouter();
    const { data: session, status } = useSession();

    const colors = [
        { id: "black", name: "Midnight Black", hex: "#000000" },
    ];

    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

    const product = {
        id: "premium-hoodie-1",
        name: "Premium Cotton Hoodie",
        price: 1999,
        image: "/hood.png"
    };

    const handleAddToCart = async () => {
        if (status === "unauthenticated") {
            toast({
                title: "Please sign in",
                description: "You need to be signed in to add items to cart",
                variant: "destructive"
            });
            router.push('/auth/login');
            return;
        }

        if (!selectedSize) {
            toast({
                title: "Please select a size",
                description: "Choose your size before adding to cart",
                variant: "destructive"
            });
            return;
        }

        dispatch(addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            size: selectedSize,
            color: selectedColor,
            image: product.image
        }));

        toast({
            title: "Added to cart",
            description: `${quantity} item(s) added to your cart`
        });
    };

    // Size Chart Config
    const sizeCharts = {
        male: [
            { size: "XS", chest: "34-36", length: "26" },
            { size: "S", chest: "36-38", length: "27" },
            { size: "M", chest: "38-40", length: "28" },
            { size: "L", chest: "40-42", length: "29" },
            { size: "XL", chest: "42-44", length: "30" },
            { size: "XXL", chest: "44-46", length: "31" },
        ],
        female: [
            { size: "XS", chest: "30-32", length: "24" },
            { size: "S", chest: "32-34", length: "25" },
            { size: "M", chest: "34-36", length: "26" },
            { size: "L", chest: "36-38", length: "27" },
            { size: "XL", chest: "38-40", length: "28" },
            { size: "XXL", chest: "40-42", length: "29" },
        ],
    };

    return (
        <section className="relative py-24 bg-black/90">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <motion.div
                            className="relative aspect-square rounded-2xl overflow-hidden bg-accent/5"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Image
                                src="/hood.png"
                                alt="Product"
                                fill
                                className="object-cover hover:scale-105 transition-all duration-500"
                            />
                        </motion.div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-heading1 text-white mb-2">Premium Cotton Hoodie</h1>
                            <p className="text-2xl text-accent font-heading1">₹1,999</p>
                        </div>

                        {/* Color Selection */}
                        <div className="space-y-4">
                            <label className="text-white font-heading1">Color: {colors.find(c => c.id === selectedColor)?.name}</label>
                            <div className="flex gap-3">
                                {colors.map((color) => (
                                    <button
                                        key={color.id}
                                        onClick={() => setSelectedColor(color.id)}
                                        className={`w-12 h-12 rounded-full relative transition-transform ${selectedColor === color.id ? 'scale-110 ring-2 ring-accent' : ''
                                            }`}
                                        style={{ backgroundColor: color.hex }}
                                    >
                                        {selectedColor === color.id && (
                                            <Check className="absolute inset-0 m-auto text-white" size={20} />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-white font-heading1">Size</label>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" className="text-accent">
                                            <Ruler className="mr-2 h-4 w-4" />
                                            Size Chart
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-black text-white">
                                        <DialogHeader>
                                            <DialogTitle>Size Guide</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            {/* Size chart content */}
                                            <div className="flex gap-4">
                                                <Button
                                                    variant={gender === "male" ? "default" : "outline"}
                                                    onClick={() => setGender("male")}
                                                    className="flex-1"
                                                >
                                                    Male
                                                </Button>
                                                <Button
                                                    variant={gender === "female" ? "default" : "outline"}
                                                    onClick={() => setGender("female")}
                                                    className="flex-1"
                                                >
                                                    Female
                                                </Button>
                                            </div>
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b border-white/10">
                                                        <th className="py-2">Size</th>
                                                        <th className="py-2">Chest (inches)</th>
                                                        <th className="py-2">Length (inches)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {sizeCharts[gender].map((row) => (
                                                        <tr key={row.size} className="text-center border-b border-white/10">
                                                            <td className="py-2">{row.size}</td>
                                                            <td className="py-2">{row.chest}</td>
                                                            <td className="py-2">{row.length}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-3 rounded-xl font-heading1 transition-all duration-200 ${selectedSize === size
                                                ? 'bg-accent text-white'
                                                : 'bg-white/5 text-white hover:bg-white/10'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="space-y-4">
                            <label className="text-white font-heading1">Quantity</label>
                            <div className="flex items-center gap-4 w-32">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-8 h-8 rounded-full bg-white/5 text-white hover:bg-white/10"
                                >
                                    -
                                </button>
                                <span className="flex-1 text-center text-white">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-8 h-8 rounded-full bg-white/5 text-white hover:bg-white/10"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <Button
                                onClick={handleAddToCart}
                                className="flex-1 bg-accent hover:bg-accent/90 text-white rounded-full py-6"
                            >
                                <ShoppingCart className="mr-2" /> Add to Cart
                            </Button>
                            <Button variant="outline" className="rounded-full aspect-square p-0">
                                <Heart />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductSelectionSection;
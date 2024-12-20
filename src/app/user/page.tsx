//@ts-nocheck
"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PlusCircle, MapPin, Edit, Trash, LogOut } from "lucide-react";
import axios from "axios";

// Profile components
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileNavigation } from "@/components/profile/ProfileNavigation";
import { BackgroundAnimation } from "@/components/profile/BackgroundAnimation";
import { OrdersSection } from "@/components/profile/OrdersSection";

// Types
interface IAddress {
	_id?: string;
	address_line1: string;
	address_line2: string;
	city: string;
	state: string;
	postal_code: string;
	country: string;
	address_type: "home" | "work" | "other";
	user_id?: string;
}

interface IOrder {
	id: string;
	date: string;
	status: "Pending" | "Confirmed" | "Shipped" | "Delivered";
	total: number;
	items: {
		name: string;
		size: string;
		color: string;
		quantity: number;
		price: number;
	}[];
}

// Dummy Data
const DUMMY_ADDRESSES: IAddress[] = [
	{
		_id: "1",
		address_line1: "123 Main Street",
		address_line2: "Apartment 4B",
		city: "Mumbai",
		state: "Maharashtra",
		postal_code: "400001",
		country: "INDIA",
		address_type: "home",
	},
	{
		_id: "2",
		address_line1: "456 Work Plaza",
		address_line2: "Floor 3",
		city: "Mumbai",
		state: "Maharashtra",
		postal_code: "400002",
		country: "INDIA",
		address_type: "work",
	},
];

const DUMMY_ORDERS: IOrder[] = [
	{
		id: "ORD123456",
		date: "2024-03-15",
		status: "Delivered",
		total: 1999,
		items: [
			{
				name: "Premium Cotton Hoodie",
				size: "L",
				color: "Black",
				quantity: 1,
				price: 1999,
			},
		],
	},
];

export default function UserProfile() {
	const router = useRouter();
	const { toast } = useToast();
	const [activeTab, setActiveTab] = useState<"orders" | "addresses">("orders");
	const [addresses, setAddresses] = useState<IAddress[]>([]);
	const [orders, setOrders] = useState<IOrder[]>([]);
	const [loading, setLoading] = useState(true);
	const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
	const { user } = useAuth();
	const { data: session, status } = useSession();

	const [addressForm, setAddressForm] = useState<IAddress>({
		address_line1: "",
		address_line2: "",
		city: "",
		state: "",
		postal_code: "",
		country: "INDIA",
		address_type: "home",
	});

	const fetchAddresses = async () => {
		try {
			setLoading(true);
			if (!session?.user?.id) return;

			const response = await axios.get("/api/address");
			setAddresses(response.data);
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to fetch addresses",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (session?.user?.id) {
			fetchAddresses();
			fetchOrders();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session]);

	const fetchOrders = async () => {
		try {
			const userId = sessionStorage.getItem("userID");
			const response = await axios.get(`/api/orders/${userId}`);
			setOrders(response.data);
		} catch (error) {
			console.log("Using dummy order data due to API error:", error);
			setOrders(DUMMY_ORDERS);
		}
	};

	const handleAddAddress = async () => {
		try {
			const response = await axios.post("/api/address", addressForm);

			toast({
				title: "Success",
				description: "Address added successfully",
			});

			setIsAddressModalOpen(false);
			fetchAddresses();
			setAddressForm({
				address_line1: "",
				address_line2: "",
				city: "",
				state: "",
				postal_code: "",
				country: "INDIA",
				address_type: "home",
			});
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to add address",
				variant: "destructive",
			});
		}
	};

	const handleLogout = async () => {
		try {
			await signOut({ redirect: false });
			toast({
				title: "Success",
				description: "Logged out successfully",
			});
			router.push("/auth/login");
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to log out",
				variant: "destructive",
			});
		}
	};

	const handleUpdateAddress = async () => {
		try {
			await axios.put(`/api/address/${addressForm._id}`, addressForm);

			toast({
				title: "Success",
				description: "Address updated successfully",
			});

			setIsAddressModalOpen(false);
			fetchAddresses();
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to update address",
				variant: "destructive",
			});
		}
	};

	const handleDeleteAddress = async (addressId: string) => {
		try {
			await axios.delete(`/api/address/${addressId}`);

			toast({
				title: "Success",
				description: "Address deleted successfully",
			});

			fetchAddresses();
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to delete address",
				variant: "destructive",
			});
		}
	};

	return (
		<ProtectedRoute>
			<div className="min-h-screen bg-background">
				{/* Background Animation */}
				<BackgroundAnimation />

				<div className="pt-24 px-4 md:px-8">
					<div className="max-w-7xl mx-auto">
						{/* Enhanced Profile Header */}
						<ProfileHeader user={session?.user} />

						{/* Enhanced Navigation */}
						<ProfileNavigation
							activeTab={activeTab}
							setActiveTab={setActiveTab}
						/>

						{/* Content Area */}
						<div className="space-y-6">
							{/* Orders Section */}
							{activeTab === "orders" && (
								<OrdersSection orders={orders} loading={loading} />
							)}

							{/* Addresses Section */}
							{activeTab === "addresses" && (
								<div className="space-y-6">
									{/* Add New Address Button */}
									<Button
										onClick={() => setIsAddressModalOpen(true)}
										className="w-full bg-accent hover:bg-accent/90 rounded-full font-heading1"
									>
										<PlusCircle className="mr-2" />
										Add New Address
									</Button>

									{/* Addresses List Section */}
									{addresses.length === 0 && !loading ? (
										<div className="bg-secondaryBackground rounded-xl p-8 text-center">
											<div className="mb-4">
												<MapPin className="w-12 h-12 text-accent mx-auto mb-2" />
												<h3 className="text-xl font-heading1 text-white">
													No addresses yet
												</h3>
												<p className="text-white/70 mt-2">
													Add your first delivery address to get started
												</p>
											</div>
											<Button
												onClick={() => setIsAddressModalOpen(true)}
												className="bg-accent hover:bg-accent/90 rounded-full"
											>
												Add Your First Address
											</Button>
										</div>
									) : (
										<div className="grid md:grid-cols-2 gap-6">
											{loading
												? // Loading skeletons
												  Array.from({ length: 2 }).map((_, i) => (
														<div
															key={i}
															className="bg-secondaryBackground rounded-xl p-6 animate-pulse"
														>
															<div className="flex justify-between items-start mb-4">
																<div className="h-4 bg-white/10 rounded w-1/4" />
																<div className="flex gap-2">
																	<div className="h-8 w-16 bg-white/10 rounded" />
																	<div className="h-8 w-16 bg-white/10 rounded" />
																</div>
															</div>
															<div className="space-y-2">
																<div className="h-3 bg-white/10 rounded w-3/4" />
																<div className="h-3 bg-white/10 rounded w-1/2" />
																<div className="h-3 bg-white/10 rounded w-2/3" />
															</div>
														</div>
												  ))
												: // Actual address cards
												  addresses.map((address) => (
														<div
															key={address._id}
															className="bg-secondaryBackground rounded-xl p-6 transition-all duration-200 hover:shadow-lg border border-white/5"
														>
															<div className="flex justify-between items-start mb-4">
																<span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-heading1">
																	{address.address_type.toUpperCase()}
																</span>
																<div className="space-x-2">
																	<Button
																		variant="outline"
																		size="sm"
																		className="text-white/70 hover:text-white hover:bg-accent/20 transition-colors duration-200"
																		onClick={() => {
																			setAddressForm(address);
																			setIsAddressModalOpen(true);
																		}}
																	>
																		<Edit size={16} className="mr-1" />
																		Edit
																	</Button>
																	<Button
																		variant="outline"
																		size="sm"
																		className="text-white/70 hover:text-red-500 hover:bg-red-500/10 transition-colors duration-200"
																		onClick={() =>
																			address._id &&
																			handleDeleteAddress(address._id)
																		}
																	>
																		<Trash size={16} className="mr-1" />
																		Delete
																	</Button>
																</div>
															</div>
															<div className="text-white/70 space-y-1">
																<p className="font-medium text-white">
																	{address.address_line1}
																</p>
																{address.address_line2 && (
																	<p className="text-white/70">
																		{address.address_line2}
																	</p>
																)}
																<p>
																	{address.city}, {address.state}
																</p>
																<p>{address.postal_code}</p>
																<p>{address.country}</p>
															</div>
														</div>
												  ))}
										</div>
									)}

									{/* Address Form Modal */}
									<Dialog
										open={isAddressModalOpen}
										onOpenChange={setIsAddressModalOpen}
									>
										<DialogContent className="bg-secondaryBackground text-white">
											<DialogHeader>
												<DialogTitle className="font-heading1">
													{addressForm._id ? "Edit Address" : "Add New Address"}
												</DialogTitle>
											</DialogHeader>

											<div className="grid gap-4">
												<div className="space-y-2">
													<label className="text-sm text-white/70">
														Address Type
													</label>
													<div className="flex gap-4">
														{["home", "work", "other"].map((type) => (
															<button
																key={type}
																onClick={() =>
																	setAddressForm({
																		...addressForm,
																		address_type:
																			type as IAddress["address_type"],
																	})
																}
																className={`px-4 py-2 rounded-full text-sm font-heading1 
                                                                    ${
																																			addressForm.address_type ===
																																			type
																																				? "bg-accent text-white"
																																				: "bg-white/10 text-white/70 hover:bg-white/20"
																																		}`}
															>
																{type.charAt(0).toUpperCase() + type.slice(1)}
															</button>
														))}
													</div>
												</div>

												<Input
													placeholder="Address Line 1"
													className="bg-background"
													value={addressForm.address_line1}
													onChange={(e) =>
														setAddressForm({
															...addressForm,
															address_line1: e.target.value,
														})
													}
												/>

												<Input
													placeholder="Address Line 2 (Optional)"
													className="bg-background"
													value={addressForm.address_line2}
													onChange={(e) =>
														setAddressForm({
															...addressForm,
															address_line2: e.target.value,
														})
													}
												/>

												<div className="grid grid-cols-2 gap-4">
													<Input
														placeholder="City"
														className="bg-background"
														value={addressForm.city}
														onChange={(e) =>
															setAddressForm({
																...addressForm,
																city: e.target.value,
															})
														}
													/>
													<Input
														placeholder="State"
														className="bg-background"
														value={addressForm.state}
														onChange={(e) =>
															setAddressForm({
																...addressForm,
																state: e.target.value,
															})
														}
													/>
												</div>

												<Input
													placeholder="PIN Code"
													className="bg-background"
													value={addressForm.postal_code}
													onChange={(e) =>
														setAddressForm({
															...addressForm,
															postal_code: e.target.value,
														})
													}
												/>
											</div>

											<div className="flex gap-4">
												<Button
													onClick={
														addressForm._id
															? handleUpdateAddress
															: handleAddAddress
													}
													className="flex-1 bg-accent hover:bg-accent/90 rounded-full font-heading1"
												>
													{addressForm._id ? "Update" : "Save"} Address
												</Button>
												<Button
													variant="outline"
													onClick={() => {
														setIsAddressModalOpen(false);
														setAddressForm({
															address_line1: "",
															address_line2: "",
															city: "",
															state: "",
															postal_code: "",
															country: "INDIA",
															address_type: "home",
														});
													}}
													className="flex-1 text-white hover:text-accent rounded-full font-heading1"
												>
													Cancel
												</Button>
											</div>
										</DialogContent>
									</Dialog>
								</div>
							)}

							{/* Logout Button */}
							<Button
								variant="outline"
								className="w-full mt-8 text-white hover:text-accent rounded-full font-heading1"
								onClick={handleLogout}
							>
								<LogOut className="mr-2" />
								Logout
							</Button>
						</div>
					</div>
				</div>
			</div>
		</ProtectedRoute>
	);
}

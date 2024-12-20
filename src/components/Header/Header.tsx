"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import MenuMobile from "./MenuMobile";
import { useSession, signOut } from "next-auth/react";
import { CgProfile } from "react-icons/cg";
import { MdLogout, MdOutlineLogin } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";
import { DashboardIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";

interface Category {
	id: number;
	attributes: {
		slug: string;
		name: string;
		products: {
			data: any[];
		};
	};
}

const Header = () => {
	const { data: session, status } = useSession();
	const { toast } = useToast();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [mobileMenu, setMobileMenu] = useState<boolean>(false);
	const [showCatMenu, setShowCatMenu] = useState<boolean>(false);
	const [show, setShow] = useState<string>("translate-y-0");
	const [lastScrollY, setLastScrollY] = useState<number>(0);
	const [categories, setCategories] = useState<Category[] | null>(null);
	const [active, setActive] = useState<boolean>(true);
	const cartItems = useSelector((state: any) => state.cart.items);
	const pathName = usePathname();
	const router = useRouter();

	useEffect(() => {
		if (pathName.includes("auth")) {
			setActive(false);
		} else {
			setActive(true);
		}
		// Set default categories
		setCategories([
			{
				id: 1,
				attributes: {
					name: "T-Shirts",
					slug: "/",
					products: { data: [] },
				},
			},
			{
				id: 2,
				attributes: {
					name: "Hoodies",
					slug: "/",
					products: { data: [] },
				},
			},
		]);
	}, [pathName]);

	const toggleDropdown = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen]);

	const handleMouseEvents = useCallback(() => {
		setIsHovered(!isHovered);
	}, [isHovered]);

	const controlNavbar = () => {
		if (window.scrollY >= 150) {
			setShow("bg-black");
		} else {
			setShow("bg-transparent");
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", controlNavbar);
		return () => {
			window.removeEventListener("scroll", controlNavbar);
		};
	}, [lastScrollY]);

	const handleLogOut = async () => {
		try {
			await signOut({ redirect: false });
			toast({
				title: "Success",
				description: "Logged out successfully",
			});
			router.push("/");
			setIsOpen(false);
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to log out",
				variant: "destructive",
			});
		}
	};

	return (
		<div
			className={`${
				active ? "block" : "hidden"
			} w-full h-[50px] md:h-[80px] flex justify-between z-20 fixed bg-black top-0 transition-all duration-500 px-5`}
		>
			{/* Logo */}
			<div className="flex gap-2 items-center  ml-5 h-full">
				<Link href="/">
					<div className="flex h-full max-h-full gap-2 overflow-hidden items-center">
						<Image
							src="/logos/logo.webp"
							height={100}
							width={100}
							alt="logo"
							className="inset-0 overflow-clip"
						/>
					</div>
				</Link>
			</div>

			{/* Mobile Menu */}
			{mobileMenu && (
				<div>
					<MenuMobile
						showCatMenu={showCatMenu}
						setShowCatMenu={setShowCatMenu}
						setMobileMenu={setMobileMenu}
						categories={(categories as Category[]) || undefined}
					/>
				</div>
			)}

			{/* Navigation Items */}
			<div className="flex items-center gap-1 justify-end w-full">
				{status === "authenticated" ? (
					<>
						<Link href="/user">
							<p className="hidden md:flex du-btn du-btn-md du-btn-ghost my-auto items-center justify-center font-heading1 text-lg text-white">
								Your Profile
								<DashboardIcon width={18} />
							</p>
						</Link>
						{/* 
						<div className="hidden md:flex w-8 md:w-12 h-8 md:h-12 rounded-full justify-center items-center hover:bg-white/10 cursor-pointer relative">
							<IoMdHeartEmpty className="text-[19px] md:text-[24px] text-white" />
							<div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-accent absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
								0
							</div>
						</div> */}

						<Link href="/cart" className="hidden md:block">
							<div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-white/10 cursor-pointer relative">
								<BsCart className="text-[15px] md:text-[20px] text-white" />
								{cartItems.length > 0 && (
									<div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-white text-xs flex items-center justify-center">
										{cartItems.length}
									</div>
								)}
							</div>
						</Link>
					</>
				) : (
					<>
						<Link
							href="/auth/login"
							className="hidden md:flex du-btn du-btn-md du-btn-ghost my-auto items-center justify-center font-heading1 text-lg text-white"
						>
							Log In
						</Link>
						<Link
							href="/auth/signup"
							className="hidden md:flex du-btn du-btn-md du-btn-ghost my-auto items-center justify-center font-heading1 text-lg text-white"
						>
							Sign Up
						</Link>
					</>
				)}

				{/* Profile Icon & Dropdown */}
				<div onClick={toggleDropdown} onMouseOver={handleMouseEvents}>
					<div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center cursor-pointer relative hover:bg-white/10">
						<CgProfile className="text-[17px] md:text-[25px] text-white" />
					</div>
				</div>

				{/* Mobile Menu Toggle */}
				<div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-white/10 cursor-pointer relative -mr-2">
					{mobileMenu ? (
						<VscChromeClose
							className="text-[16px] text-white"
							onClick={() => setMobileMenu(false)}
						/>
					) : (
						<BiMenuAltRight
							className="text-[20px] text-white"
							onClick={() => setMobileMenu(true)}
						/>
					)}
				</div>
			</div>

			{/* Profile Dropdown */}
			{isOpen && (
				<div className="absolute right-0 mt-16 w-36 bg-white border rounded-lg shadow-lg z-50">
					{status === "authenticated" ? (
						<button
							onClick={handleLogOut}
							className="w-full flex gap-2 items-center px-4 py-2 text-gray-800 hover:bg-gray-200"
						>
							<MdLogout /> Logout
						</button>
					) : (
						<Link href="/auth/login">
							<div className="flex gap-2 items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
								<MdOutlineLogin /> Login
							</div>
						</Link>
					)}
				</div>
			)}
		</div>
	);
};

export default Header;

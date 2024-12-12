"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { BsChevronDown } from "react-icons/bs";

interface MenuItem {
	id: number;
	name: string;
	url?: string;
	subMenu?: boolean;
	authRequired?: boolean;
	guestOnly?: boolean;
}

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

interface MenuMobileProps {
	showCatMenu: boolean;
	setShowCatMenu: (show: boolean) => void;
	setMobileMenu: (show: boolean) => void;
	categories?: Category[];
}

const MenuMobile: React.FC<MenuMobileProps> = ({
	showCatMenu,
	setShowCatMenu,
	setMobileMenu,
	categories,
}) => {
	const { data: session, status } = useSession();

	const menuItems: MenuItem[] = [
		{ id: 1, name: "Home", url: "/" },
		{ id: 2, name: "Explore", url: "/explore-designs" },
		{
			id: 3,
			name: "Wishlist",
			url: "/wishlist",
			authRequired: true
		},
		{
			id: 4,
			name: "Cart",
			url: "/cart",
			authRequired: true
		},
		{ id: 5, name: "Categories", subMenu: true },
		{
			id: 6,
			name: "Profile",
			url: "/user",
			authRequired: true
		},
		{
			id: 7,
			name: "Login",
			url: "/auth/login",
			guestOnly: true
		},
		{
			id: 8,
			name: "Sign Up",
			url: "/auth/signup",
			guestOnly: true
		},
	];

	// Filter menu items based on auth status
	const filteredMenuItems = menuItems.filter(item => {
		if (status === "authenticated") {
			return !item.guestOnly;
		} else {
			return !item.authRequired;
		}
	});

	return (
		<ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-black text-white">
			{filteredMenuItems.map((item) => (
				<React.Fragment key={item.id}>
					{item.subMenu ? (
						<li
							className="cursor-pointer py-4 px-5 border-b border-white/10 flex flex-col relative"
							onClick={() => setShowCatMenu(!showCatMenu)}
						>
							<div className="flex justify-between items-center">
								{item.name}
								<BsChevronDown size={14} />
							</div>

							{showCatMenu && (
								<ul className="bg-white/5 -mx-5 mt-4 -mb-4">
									{categories?.map(({ attributes: c, id }) => (
										<Link
											key={id}
											href={`/category/${c.slug}`}
											onClick={() => {
												setShowCatMenu(false);
												setMobileMenu(false);
											}}
										>
											<li className="py-4 px-8 border-t border-white/10 flex justify-between">
												{c.name}
												<span className="opacity-50 text-sm">
													{`(${c.products.data.length})`}
												</span>
											</li>
										</Link>
									))}
								</ul>
							)}
						</li>
					) : (
						<li className="py-4 px-5 border-b border-white/10">
							<Link
								href={item.url!}
								onClick={() => setMobileMenu(false)}
								className="hover:text-accent transition-colors"
							>
								{item.name}
							</Link>
						</li>
					)}
				</React.Fragment>
			))}
		</ul>
	);
};

export default MenuMobile;
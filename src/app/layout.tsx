import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./store/provider";
import { Suspense } from "react";
import Loading from "./loading";
import { AuthProvider } from "@/components/auth/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Deauth",
	description: "Deauth is a fashion ecommerce website ... where designers can place there designs on a product and sell them",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthProvider>
					<Providers>
						<Header />
						<div className="bg-background">
							{/* <Suspense fallback={<Loading />}></Suspense> */}
							{children}
							<Toaster />
							<Footer />
						</div>
					</Providers>
				</AuthProvider>
			</body>
		</html>
	);
}
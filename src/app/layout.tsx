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
	title: "Deauth | Where Art Meets Apparel",
	description: "Premium custom apparel featuring unique designs from independent artists. Shop hoodies, t-shirts and more. Join our community of creators.",
	keywords: ["deauth", "custom apparel", "artist marketplace", "designer clothing", "custom hoodies", "independent artists", "art marketplace"],
	openGraph: {
		title: "Deauth - Premium Custom Apparel",
		description: "Shop unique designs from independent artists on premium apparel",
		url: "https://deauth.in",
		siteName: "Deauth",
		images: [
			{
				url: "/og-image.jpeg",
				width: 1200,
				height: 630,
				alt: 'Deauth - Where Art Meets Apparel'
			}
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Deauth - Premium Custom Apparel',
		description: 'Shop unique designs from independent artists on premium apparel',
		images: ['/og-image.jpeg'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: {
		shortcut: "/favicon.ico",
	},
	verification: {
		google: "google-site-verification=tvHUO5XHVzjcKKQ_RGNGmpvrM2_oG99kMjvczoXWxJo",
	}
};


const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Organization",
	"name": "Deauth",
	"url": "https://deauth.in",
	"logo": "https://deauth.in/deauthCircleIcon2.png",
	"sameAs": [
		"https://instagram.com/deauth",
		"https://twitter.com/deauth"
	],
	"description": "Premium custom apparel featuring unique designs from independent artists"
};
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
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
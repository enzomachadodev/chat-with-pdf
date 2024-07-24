import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { cn } from "@/utils/cn";

const font = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
	title: "Chat With PDF",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={cn(
						"w-full min-h-screen bg-slate-50 font-sans antialiased",
						font.variable
					)}
				>
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}

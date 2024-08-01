import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/utils/cn";
import "./globals.css";

const font = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
	title: "Chat With PDF",
	description: "Generated by create next app",
};

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={cn(
						"w-full min-h-screen overflow-x-hidden bg-slate-50 font-sans antialiased",
						font.variable
					)}
				>
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
};

export default RootLayout;


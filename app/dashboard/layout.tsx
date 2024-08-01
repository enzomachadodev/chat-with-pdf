import { Header } from "@/components/header";
import { ClerkLoaded } from "@clerk/nextjs";
import React from "react";

const DashboardLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<ClerkLoaded>
			<div className="flex-1 flex flex-col h-screen">
				<Header />

				{children}
			</div>
		</ClerkLoaded>
	);
};

export default DashboardLayout;


import { Header } from "@/components/header";
import React from "react";

const DashboardLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div className="flex-1 flex flex-col h-screen">
			<Header />

			<main className="flex-1 overflow-y-auto">{children}</main>
		</div>
	);
};

export default DashboardLayout;


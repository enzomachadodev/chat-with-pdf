import { Documents } from "@/components/documents";
import React from "react";

export const dynamic = "force-dynamic";

const Dashboard = () => {
	return (
		<main className="w-full h-full overflow-y-auto">
			<div className="h-full max-w-7xl mx-auto">
				<h1 className="text-3xl p-5 bg-gray-100 font-light text-indigo-600">
					My Documents
				</h1>

				<Documents />
			</div>
		</main>
	);
};

export default Dashboard;


import { Documents } from "@/components/documents";

export const dynamic = "force-dynamic";

const Dashboard = () => {
	return (
		<main className="w-full h-full overflow-y-auto">
			<div className="h-full max-w-6xl mx-auto bg-stone-900">
				<h1 className="text-3xl p-5  font-light text-rose-500">My Documents</h1>
				<Documents />
			</div>
		</main>
	);
};

export default Dashboard;


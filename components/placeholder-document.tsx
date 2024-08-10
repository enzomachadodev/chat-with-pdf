"use client";

import { useRouter } from "next/navigation";
import { FrownIcon, PlusCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import useSubscription from "@/hooks/use-subscription";

export const PlaceholderDocument = () => {
	const router = useRouter();
	const { isOverFileLimit } = useSubscription();

	const handleClick = () => {
		if (isOverFileLimit) {
			router.push("/dashboard/upgrade");
		} else {
			router.push("/dashboard/upload");
		}
	};

	return (
		<Button
			onClick={handleClick}
			className="flex flex-col items-center w-64 h-80 rounded-xl dark:bg-stone-950 dark:hover:bg-stone-950 dark:text-stone-50 dark:hover:text-rose-500 p-4"
		>
			{isOverFileLimit ? (
				<FrownIcon className="h-16 w-16" />
			) : (
				<PlusCircleIcon className="h-16 w-16" />
			)}

			<p className="font-semibold text-wrap mt-4">
				{isOverFileLimit ? "Upgrade to add more documents" : "Add a document"}
			</p>
		</Button>
	);
};


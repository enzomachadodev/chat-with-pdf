"use client";

import { useRouter } from "next/navigation";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "./ui/button";

export const PlaceholderDocument = () => {
	const router = useRouter();

	const handleClick = () => {
		router.push("/dashboard/upload");
	};
	return (
		<Button
			onClick={handleClick}
			className="flex flex-col items-center w-64 h-80 rounded-xl dark:bg-stone-950 dark:hover:bg-stone-950 dark:text-stone-50 dark:hover:text-rose-500"
		>
			<PlusCircleIcon className="h-16 w-16" />

			<p className="font-semibold mt-2">Add a document</p>
		</Button>
	);
};


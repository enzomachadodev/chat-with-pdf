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
			className="flex flex-col items-center w-64 h-80 rounded-xl bg-gray-200 hover:bg-gray-300 drop-shadow-md text-gray-400"
		>
			<PlusCircleIcon className="h-16 w-16" />

			<p className="font-semibold">Add a document</p>
		</Button>
	);
};


"use client";

import byteSize from "byte-size";
import { useRouter } from "next/navigation";
import { DownloadCloud } from "lucide-react";
import { Button } from "./ui/button";

interface DocumentProps {
	id: string;
	name: string;
	size: number;
	downloadUrl: string;
}

export const Document = ({ id, name, size, downloadUrl }: DocumentProps) => {
	const router = useRouter();

	return (
		<div className="flex flex-col w-64 h-80 rounded-xl bg-stone-950 drop-shadow-md justify-between p-4 transition-all transform hover:scale-105 hover:text-rose-500 cursor-pointer group">
			<div
				className="flex-1"
				onClick={() => {
					router.push(`/dashboard/files/${id}`);
				}}
			>
				<p className="font-semibold line-clamp-2">{name}</p>
				<p className="text-sm text-stone-500 group-hover:text-rose-100">
					{byteSize(size).value} KB
				</p>
			</div>

			<div className="flex space-x-2 justify-end">
				<Button
					variant="outline"
					asChild
				>
					<a
						href={downloadUrl}
						download
					>
						<DownloadCloud className="h-6 w-6 text-rose-500" />
					</a>
				</Button>
			</div>
		</div>
	);
};


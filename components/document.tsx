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
		<div className="flex flex-col w-64 h-80 rounded-xl bg-white drop-shadow-md justify-between p-4 transition-all transform hover:scale-105 hover:bg-indigo-600 hover:text-white cursor-pointer group">
			<div
				className="flex-1"
				onClick={() => {
					router.push(`/dashboard/files/${id}`);
				}}
			>
				<p className="font-semibold line-clamp-2">{name}</p>
				<p className="text-sm text-gray-500 group-hover:text-indigo-100">
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
						<DownloadCloud className="h-6 w-6 text-indigo-600" />
					</a>
				</Button>
			</div>
		</div>
	);
};


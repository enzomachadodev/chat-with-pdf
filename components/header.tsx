import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { FilePlus2 } from "lucide-react";

export const Header = () => {
	return (
		<header className="w-full flex justify-between items-center bg-white shadow-sm p-5 border-b">
			<Link
				href="/dashboard"
				className="text-2xl font-bold"
			>
				Chat to <span className="text-indigo-600">PDF</span>
			</Link>
			<div className="flex items-center space-x-2">
				<Button
					asChild
					variant="link"
					className="hidden md:flex"
				>
					<Link href="/dashboard/upgrade">Pricing</Link>
				</Button>

				<Button
					asChild
					variant="outline"
				>
					<Link href="/dashboard">My Documents</Link>
				</Button>

				<Button
					asChild
					variant="outline"
				>
					<Link href="/dashboard/upload">
						<FilePlus2 />
					</Link>
				</Button>
			</div>
		</header>
	);
};


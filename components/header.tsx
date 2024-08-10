import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { FilePlus2 } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { UpgradeButton } from "./upgrade-button";

export const Header = () => {
	return (
		<header className="w-full flex justify-between items-center bg-stone-950 shadow-sm p-5 border-b border-stone-700">
			<Link
				href="/dashboard"
				className="text-2xl font-bold"
			>
				Chat to <span className="text-rose-500">PDF</span>
			</Link>

			<SignedIn>
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

					<UpgradeButton />
					<UserButton />
				</div>
			</SignedIn>
		</header>
	);
};


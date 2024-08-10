"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2Icon, StarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { createStripePortal } from "@/actions/create-stripe-portal";
import useSubscription from "@/hooks/use-subscription";

export const UpgradeButton = () => {
	const { hasActiveMembership, loading } = useSubscription();
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleAccount = () => {
		startTransition(async () => {
			const stripePortalUrl = await createStripePortal();
			router.push(stripePortalUrl);
		});
	};

	if (!hasActiveMembership && !loading)
		return (
			<Button
				asChild
				variant="default"
				className="dark:border-rose-600 dark:bg-rose-600 dark:hover:bg-rose-600/90"
			>
				<Link
					href="/dashboard/upgrade"
					className="dark:text-white"
				>
					Upgrade{" "}
					<StarIcon className="ml-3 dark:fill-white dark:text-rose-600" />
				</Link>
			</Button>
		);

	if (loading)
		return (
			<Button
				variant="default"
				className="border-rose-600"
			>
				<Loader2Icon className="animate-spin" />
			</Button>
		);
	return (
		<Button
			onClick={handleAccount}
			disabled={isPending}
			variant="default"
			className="border-rose-600 bg-rose-600"
		>
			{isPending ? (
				<Loader2Icon className="animate-spin" />
			) : (
				<p>
					<span className="font-extrabold">PRO </span>
					Account
				</p>
			)}
		</Button>
	);
};


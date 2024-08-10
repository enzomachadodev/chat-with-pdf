"use client";

import { createCheckoutSession } from "@/actions/create-checkout-session";
import { createStripePortal } from "@/actions/create-stripe-portal";
import { Button } from "@/components/ui/button";
import useSubscription from "@/hooks/use-subscription";
import { getStripe } from "@/lib/stripe-js";
import { useUser } from "@clerk/nextjs";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

export type UserDetails = {
	email: string;
	name: string;
};

const Pricing = () => {
	const { user } = useUser();
	const router = useRouter();
	const { hasActiveMembership, loading } = useSubscription();
	const [isPending, startTransition] = useTransition();

	const handleUpgrade = () => {
		if (!user) return;

		const userDetails: UserDetails = {
			email: user.primaryEmailAddress?.toString()!,
			name: user.fullName!,
		};

		startTransition(async () => {
			const stripe = await getStripe();

			if (hasActiveMembership) {
				const stripePortalUrl = await createStripePortal();
				return router.push(stripePortalUrl);
			}

			const sessionId = await createCheckoutSession(userDetails);

			await stripe?.redirectToCheckout({
				sessionId,
			});
		});
	};

	return (
		<main className="w-full py-24 sm:py-32">
			<div className="max-w-4xl mx-auto text-center">
				<h2 className="text-base font-semibold leading-7 text-rose-600">
					Pricing
				</h2>
				<p className="mt-2 text-4xl font-bold tracking-tight text-stone-50 sm:text-5xl">
					Supercharge your Document Companion
				</p>
			</div>

			<p className="mx-auto mt-6 max-w-2xl px-10 text-center text-lg leading-8 text-stone-300">
				Choose an affordable plan thats packed with the best features for
				interacting with your PDFs, enhancing productivity, and streamlining
				your workflow.
			</p>

			<div className="max-w-md mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 md:max-w-2xl gap-8 lg:max-w-4xl">
				<div className="ring-1 ring-stone-200 p-8 h-fit pb-12 rounded-3xl">
					<h3 className="text-lg font-semibold leading-8 text-stone-50">
						Starter Plan
					</h3>
					<p className="mt-4 text-sm leading-6 text-stone-300">
						Explore Core Features at No Cost
					</p>
					<p className="mt-6 flex items-baseline gap-x-1">
						<span className="text-4xl font-bold tracking-tight text-stone-50">
							Free
						</span>
					</p>

					<ul
						role="list"
						className="mt-8 space-y-3 text-sm leading-6 text-stone-300"
					>
						<li className="flex gap-x-3">
							<CheckIcon className="h-6 w-5 flex-none text-rose-600" />2
							Documents
						</li>
						<li className="flex gap-x-3">
							<CheckIcon className="h-6 w-5 flex-none text-rose-600" />
							Up to 3 messages per document
						</li>
						<li className="flex gap-x-3">
							<CheckIcon className="h-6 w-5 flex-none text-rose-600" />
							Try out the AI Chat Functionality
						</li>
					</ul>
				</div>

				<div className="ring-2 ring-rose-600 rounded-3xl p-8">
					<h3 className="text-lg font-semibold leading-8 text-rose-600">
						Pro Plan
					</h3>
					<p className="mt-4 text-sm leading-6 text-stone-300">
						Maximize Productivity with PRO Features
					</p>
					<p className="mt-6 flex items-baseline gap-x-1">
						<span className="text-4xl font-bold tracking-tight text-stone-50">
							$5.99
						</span>
						<span className="text-sm font-semibold leading-6 text-stone-300">
							/ month
						</span>
					</p>

					<Button
						className="bg-rose-600 w-full text-white shadow-sm hover:bg-rose-500 mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
						disabled={loading || isPending}
						onClick={handleUpgrade}
					>
						{isPending || loading
							? "Loading..."
							: hasActiveMembership
							? "Manage Plan"
							: "Upgrade to Pro"}
					</Button>

					<ul
						role="list"
						className="mt-8 space-y-3 text-sm leading-6 text-stone-300"
					>
						<li className="flex gap-x-3">
							<CheckIcon className="h-6 w-5 flex-none text-rose-600" />
							Store upto 20 Documents
						</li>
						<li className="flex gap-x-3">
							<CheckIcon className="h-6 w-5 flex-none text-rose-600" />
							Ability to Delete Documents
						</li>
						<li className="flex gap-x-3">
							<CheckIcon className="h-6 w-5 flex-none text-rose-600" />
							Up to 100 messages per document
						</li>
						<li className="flex gap-x-3">
							<CheckIcon className="h-6 w-5 flex-none text-rose-600" />
							Full Power AI Chat Functionality with Memory Recall
						</li>
						<li className="flex gap-x-3">
							<CheckIcon className="h-6 w-5 flex-none text-rose-600" />
							Advanced analytics
						</li>
						<li className="flex gap-x-3">
							<CheckIcon className="h-6 w-5 flex-none text-rose-600" />
							24-hour support response time
						</li>
					</ul>
				</div>
			</div>
		</main>
	);
};

export default Pricing;

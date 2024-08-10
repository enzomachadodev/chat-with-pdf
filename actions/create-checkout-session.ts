"use server";

import { UserDetails } from "@/app/dashboard/upgrade/page";
import { adminDb } from "@/firebase-admin";
import { stripe } from "@/lib/stripe";
import { getBaseUrl } from "@/utils/get-base-url";
import { auth } from "@clerk/nextjs/server";

export async function createCheckoutSession(userDetails: UserDetails) {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("User not found");
	}

	let stripeCustomerId;

	const user = await adminDb.collection("users").doc(userId).get();
	stripeCustomerId = user.data()?.stripeCustomerId;

	if (!stripeCustomerId) {
		const customer = await stripe.customers.create({
			email: userDetails.email,
			name: userDetails.name,
			metadata: {
				userId,
			},
		});

		await adminDb.collection("users").doc(userId).set({
			stripeCustomerId: customer.id,
		});

		stripeCustomerId = customer.id;
	}

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: [
			{
				price: "price_1PmGKU09LiGFJBYAZJdi7TIX",
				quantity: 1,
			},
		],
		mode: "subscription",
		customer: stripeCustomerId,
		success_url: `${getBaseUrl()}/dashboard?upgrade=true`,
		cancel_url: `${getBaseUrl()}/dashboard/upgrade`,
	});

	return session.id;
}


import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_API_KEY;

if (!stripeSecretKey) {
	throw new Error("STRIPE_API_KEY is not set");
}

export const stripe = new Stripe(stripeSecretKey);


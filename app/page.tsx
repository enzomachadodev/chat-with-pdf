import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { features } from "@/data";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function Home() {
	return (
		<main className="w-full h-full relative">
			<BackgroundGradientAnimation containerClassName="fixed" />
			<div className="w-full top-0 left-0 absolute z-50 py-24 sm:py-32">
				<div className="flex flex-col justify-center items-center mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl sm:text-center">
						<h2 className="text-base font-semibold leading-7 text-rose-500">
							Your Interactive Document Companion
						</h2>

						<p className="mt-2 text-3xl font-bold tracking-tight sm:text-6xl">
							Transform Your PDFs into Interactive Conversations
						</p>

						<p className="mt-6 text-lg leading-8 text-stone-300">
							Introducing{" "}
							<span className="font-bold text-rose-500">Chat with PDF.</span>
							<br />
							<br /> Upload your document, and our chatbot will answer
							questions, summarize content, and answer all your Qs. Ideal for
							everyone, <span className="text-rose-500">
								Chat with PDF
							</span>{" "}
							turns static documents into{" "}
							<span className="font-bold">dynamic conversations</span>,
							enhancing productivity 10x fold effortlessly.
						</p>
					</div>

					<Button
						asChild
						className="mt-10"
					>
						<Link href="/dashboard">Get Started</Link>
					</Button>
				</div>

				<div className="pt-16 mx-auto max-w-7xl px-6 lg:px-8">
					<Image
						alt="App screenshot"
						src="/screenshot.webp"
						width={2432}
						height={1442}
						className="rounded-xl shadow-2xl ring-1 ring-stone-50/10"
					/>
				</div>

				<div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
					<dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-stone-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
						{features.map((feature) => (
							<div
								key={feature.name}
								className="relative pl-9"
							>
								<dt className="inline font-semibold text-stone-300">
									<feature.icon
										aria-hidden="true"
										className="absolute left-1 top-1 h-5 w-5 text-rose-500"
									/>
								</dt>

								<dd>{feature.description}</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</main>
	);
}


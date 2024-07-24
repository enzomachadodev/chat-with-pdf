import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";

export default function Home() {
	return (
		<main className="w-full min-h-screen flex items-center justify-center">
			<SignedOut>
				<SignInButton>
					<Button>Sign In</Button>
				</SignInButton>
			</SignedOut>
			<SignedIn>
				<UserButton>
					<Button>Profile</Button>
				</UserButton>
			</SignedIn>
		</main>
	);
}


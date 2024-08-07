"use client";

import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { Loader2Icon } from "lucide-react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { askQuestion } from "@/actions/ask-question";
import { ChatMessage } from "./chat-message";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export type Message = {
	id?: string;
	role: "human" | "ai" | "placeholder";
	message: string;
	createdAt: Date;
};

interface ChatProps {
	id: string;
}

export const Chat = ({ id }: ChatProps) => {
	const { user } = useUser();
	const { toast } = useToast();

	const [input, setInput] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [isPending, startTransition] = useTransition();
	const bottomOfChatRef = useRef<HTMLDivElement>(null);

	const [snapshot, loading, error] = useCollection(
		user &&
			query(
				collection(db, "users", user?.id, "files", id, "chat"),
				orderBy("createdAt", "asc")
			)
	);

	useEffect(() => {
		bottomOfChatRef.current?.scrollIntoView({
			behavior: "smooth",
		});
	}, [messages]);

	useEffect(() => {
		if (!snapshot) return;

		console.log("Updated snapshot", snapshot.docs);

		const lastMessage = messages.pop();

		if (lastMessage?.role === "ai" && lastMessage.message === "Thinking...") {
			return;
		}

		const newMessages = snapshot.docs.map((doc: any) => {
			const { role, message, createdAt } = doc.data();

			return {
				id: doc.id,
				role,
				message,
				createdAt: createdAt.toDate(),
			};
		});

		setMessages(newMessages);

		//eslint-disable-next-line
	}, [snapshot]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const q = input;

		setInput("");

		// Optimistic UI update
		setMessages((prev) => [
			...prev,
			{
				role: "human",
				message: q,
				createdAt: new Date(),
			},
			{
				role: "ai",
				message: "Thinking...",
				createdAt: new Date(),
			},
		]);

		startTransition(async () => {
			const { success, message } = await askQuestion(id, q);

			console.log("DEBUG", success, message);

			if (!success) {
				toast({
					variant: "destructive",
					title: "Error",
					description: message,
				});

				setMessages((prev) =>
					prev.slice(0, prev.length - 1).concat([
						{
							role: "ai",
							message: `Whoops... ${message}`,
							createdAt: new Date(),
						},
					])
				);
			}
		});
	};

	return (
		<div className="flex flex-col h-full overflow-y-auto">
			{/* Chat contents */}
			<div className="flex-1 w-full">
				{/* chat messages... */}

				{loading ? (
					<div className="flex items-center justify-center">
						<Loader2Icon className="animate-spin h-20 w-20 text-rose-500 mt-20" />
					</div>
				) : (
					<div className="p-5">
						{messages.length === 0 && (
							<ChatMessage
								key={"placeholder"}
								message={{
									role: "ai",
									message: "Ask me anything about the document!",
									createdAt: new Date(),
								}}
							/>
						)}

						{messages.map((message, index) => (
							<ChatMessage
								key={index}
								message={message}
							/>
						))}

						<div ref={bottomOfChatRef} />
					</div>
				)}
			</div>

			<form
				onSubmit={handleSubmit}
				className="flex sticky bottom-0 space-x-2 p-5 bg-stone-700/75"
			>
				<Input
					placeholder="Ask a Question..."
					value={input}
					onChange={(e) => setInput(e.target.value)}
					className="outline-none ring-0"
				/>

				<Button
					type="submit"
					disabled={!input || isPending}
					className="dark:bg-rose-600 dark:hover:bg-rose-800 dark:text-stone-50"
				>
					{isPending ? (
						<Loader2Icon className="animate-spin text-rose-600" />
					) : (
						"Ask"
					)}
				</Button>
			</form>
		</div>
	);
};


import { Chat } from "@/components/chat";
import { PdfView } from "@/components/pdf-view";
import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

interface ChatWithFileProps {
	params: { id: string };
}

const ChatWithFile = async ({ params: { id } }: ChatWithFileProps) => {
	auth().protect();
	const { userId } = await auth();

	const ref = await adminDb
		.collection("users")
		.doc(userId!)
		.collection("files")
		.doc(id)
		.get();

	const url = ref.data()?.downloadUrl;

	return (
		<div className="grid lg:grid-cols-5 h-full overflow-hidden">
			<div className="col-span-5 lg:col-span-2 overflow-y-auto">
				<Chat id={id} />
			</div>

			<div className="col-span-5 lg:col-span-3 bg-stone-900 border-r-2 lg:border-rose-500 lg:-order-1 overflow-auto">
				<PdfView url={url} />
			</div>
		</div>
	);
};

export default ChatWithFile;


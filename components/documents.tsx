import { auth } from "@clerk/nextjs/server";
import { PlaceholderDocument } from "./placeholder-document";
import { adminDb } from "@/firebase-admin";
import { Document } from "./document";

export const Documents = async () => {
	auth().protect();

	const { userId } = await auth();

	if (!userId) {
		throw new Error("User not found");
	}

	const documentsSnapshot = await adminDb
		.collection("users")
		.doc(userId)
		.collection("files")
		.get();

	return (
		<div className="p-5 rounded-sm gap-5 max-w-6xl flex flex-wrap items-center justify-between md:grid-cols-2 lg:grid-cols-4 mx-auto">
			{documentsSnapshot.docs.map((doc) => {
				const { name, downloadUrl, size } = doc.data();

				return (
					<Document
						key={doc.id}
						id={doc.id}
						name={name}
						size={size}
						downloadUrl={downloadUrl}
					/>
				);
			})}

			<PlaceholderDocument />
		</div>
	);
};


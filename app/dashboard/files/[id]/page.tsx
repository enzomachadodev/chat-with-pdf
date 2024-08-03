import { PageProps } from "@/.next/types/app/page";
import { NextPage } from "next";

interface ChatWithFileProps extends PageProps {
	params: { id: string };
}

const ChatWithFile = ({ params: { id } }: ChatWithFileProps) => {
	return <div>ChatWithFile Page {id}</div>;
};

export default ChatWithFile;


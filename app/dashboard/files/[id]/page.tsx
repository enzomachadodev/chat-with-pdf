interface ChatWithFileProps {
	params: { id: string };
}

const ChatWithFile = ({ params: { id } }: ChatWithFileProps) => {
	return <div>ChatWithFile Page {id}</div>;
};

export default ChatWithFile;


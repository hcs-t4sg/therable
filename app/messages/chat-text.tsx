import { type Database } from "@/lib/schema";

type Message = Database["public"]["Tables"]["messages"]["Row"];

interface ChatTextProps {
  userId: string;
  message: Message;
}

export default function ChatText({ userId, message }: ChatTextProps) {
  const author = (message.sender == userId) ?
    "You" : "Sender"

  return (
    <div className="p-4">
      {author + ": " + message.message}
    </div>
  );
}

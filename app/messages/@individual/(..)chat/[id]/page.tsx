import ChatDisplay from "@/components/chat-display";

export default function Page({ params: { id: id } }: { params: { id: string } }) {
  return (
    <>
      <div className="h-3/4">
        <ChatDisplay />
      </div>
      <div className="h-1/4">The ID for this user is {id}</div>
    </>
  );
}

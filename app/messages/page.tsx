import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import ChatDisplay from "./chat-display";

export default async function Page() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  const userId = session.user.id;
  const previews = await supabase.from("latest_messages").select().eq("receiver", userId);
  const messages = await supabase.from("messages").select().or(`sender.eq.${userId}, receiver.eq.${userId}`);

  if (previews.error ?? messages.error) {
    return;
  }

  return <ChatDisplay userId={userId} previews={previews.data} messages={messages.data} />;
}

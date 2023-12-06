import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import ChatDisplay from "./chat-display";
import { type Database } from "@/lib/schema";

type Views<T extends keyof Database["public"]["Views"]> = Database["public"]["Views"][T]["Row"];
type Preview = Views<"latest_messages">;

export default async function Page() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  const userId = session.user.id;
  const previews = await supabase.from("latest_messages").select().or(`sender.eq.${userId}, receiver.eq.${userId}`);
  const messages = await supabase.from("messages").select().or(`sender.eq.${userId}, receiver.eq.${userId}`);

  if (previews.error ?? messages.error) {
    return;
  }

  return <ChatDisplay userId={userId} previews={previews.data} messages={messages.data} />;
}

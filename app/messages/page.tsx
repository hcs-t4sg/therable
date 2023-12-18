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
  const previews = await supabase.from("latest_messages").select().or(`sender.eq.${userId}, receiver.eq.${userId}`);
  const messages = await supabase.from("messages").select().or(`sender.eq.${userId}, receiver.eq.${userId}`);

  if (previews.error ?? messages.error) {
    return;
  }

  const filteredPrevs: typeof previews.data = [];
  for (let i = 0; i < previews.data.length; i++) {
    const other = previews.data[i]?.sender == userId ? previews.data[i]?.receiver : previews.data[i]?.sender;
    if (filteredPrevs.some((cmp) => cmp.sender == other || cmp.receiver == other)) {
      continue;
    }

    let min = i;
    for (let j = i + 1; j < previews.data.length; j++) {
      const minTime = Date.parse(previews.data[min]?.time_sent ?? "");
      const cmpTime = Date.parse(previews.data[j]?.time_sent ?? "");

      if ((previews.data[j]?.sender == other || previews.data[j]?.receiver == other) && cmpTime > minTime) {
        min = j;
      }
    }

    filteredPrevs.push(previews.data[min]!);
  }

  return <ChatDisplay userId={userId} previews={filteredPrevs} messages={messages.data} />;
}

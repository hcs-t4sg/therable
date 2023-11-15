import ChatSideBar from "@/components/chat-side-bar";
import { createServerSupabaseClient } from "@/lib/server-utils";

export default async function Page() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return;
  const user_id = session.user.id;

  // TODO There's probably a better way to only grab rows that below to this user i.e. without having to grab the id from the seesion?
  const { data, error } = await supabase
    .from("latest_messages")
    .select("*")
    .eq("receiver", user_id); // only recieved messages?
    // .or(`sender.eq.${user_id}, receiver.eq.${user_id}`);
  if (error) return;

  return <ChatSideBar this_user_id={user_id} data={data} />;
}

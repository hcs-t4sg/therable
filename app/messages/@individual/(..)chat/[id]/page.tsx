import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import ChatDisplay from "@/components/chat-display";

export default async function Page({ params: { id: id } }: { params: { id: string } }) {
  // TODO: check if `id` matches clinic owner if patient, or is a current patient if clinician

  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  const userId = session.user.id;

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .or(`sender.eq.${userId}, receiver.eq.${userId}`);

  if (error) {
    redirect("/");
  }

  return (
    <>
      <div className="h-3/4">
        <ChatDisplay userId={userId} messages={data} />
      </div>
      <div className="h-1/4">The ID for this sender is {id}</div>
    </>
  );
}

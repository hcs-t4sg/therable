"use client";

import { type Database } from "@/lib/schema";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import ChatCard from "./chat-card";
import ChatText from "./chat-text";

type Views<T extends keyof Database["public"]["Views"]> = Database["public"]["Views"][T]["Row"];
type Preview = Views<"latest_messages">;
type Message = Database["public"]["Tables"]["messages"]["Row"];

interface ChatDisplayProps {
  userId: string;
  previews: Preview[];
  messages: Message[];
}

export default function ChatDisplay({ userId, previews, messages }: ChatDisplayProps) {
  const [focus, setFocus] = useState<string | undefined>();
  const [prevs, setPrevs] = useState<Preview[]>(previews);
  const [msgs, setMsgs] = useState<Message[]>(messages);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from("latest_messages").select().eq("receiver", userId);
      if (!error && data) {
        setPrevs(data);
      }
    };

    const recieve = supabase
      .channel(userId + ":recieve")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `receiver=eq.${userId}`,
        },
        (payload) => {
          setMsgs([...msgs, payload.new as Message]);
          void getData();
        },
      )
      .subscribe();

    const send = supabase
      .channel(userId + ":send")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `sender=eq.${userId}`,
        },
        (payload) => {
          setMsgs([...msgs, payload.new as Message]);
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(recieve);
      void supabase.removeChannel(send);
    };
  }, [userId, supabase, prevs, msgs]);

  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="col-span-3 p-6">
        <ScrollArea.Root>
          <ScrollArea.Viewport>
            {prevs.map((prev, idx) => (
              <ChatCard
                key={idx}
                senderId={prev.sender ?? ""}
                senderName={prev.sender_display_name ?? ""}
                preview={prev.message ?? ""}
                focus={prev.sender == focus}
                setFocus={setFocus}
              />
            ))}
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="horizontal">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Scrollbar orientation="vertical">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
      </div>
      <div className="col-span-7 h-screen p-6">
        {focus && (
          <div className="h-full rounded-md border-2 border-slate-900 px-4 py-6">
            {msgs.map((msg, idx) => (
              <ChatText key={idx} userId={userId} message={msg} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

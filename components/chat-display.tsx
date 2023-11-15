"use client";

import { type Database } from "@/lib/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import ChatText from "./chat-text";

type Message = Database["public"]["Tables"]["messages"]["Row"];

interface ChatDisplayProps {
  userId: string;
  messages: Message[];
}

export default function ChatDisplay({ userId, messages }: ChatDisplayProps) {
  const [texts, setTexts] = useState<Message[]>(messages);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const receive = supabase
      .channel(userId  + "receive")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `receiver=eq.${userId}`
        },
        (payload) => {
          setTexts([...texts, payload.new as Message]);
        },
      )
      .subscribe();

      const send = supabase
        .channel(userId  + "send")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `sender=eq.${userId}`
          },
          (payload) => {
            setTexts([...texts, payload.new as Message]);
          },
        )
        .subscribe();

    return () => {
      void supabase.removeChannel(receive);
      void supabase.removeChannel(send);
    };
  }, [userId, supabase, texts, setTexts]);

  return (
    <div className="h-full rounded-md border-2 border-slate-900 px-4 py-6">
      {texts.map((text, idx) => (
        <ChatText key={idx} userId={userId} message={text} />
      ))}
    </div>
  );
}

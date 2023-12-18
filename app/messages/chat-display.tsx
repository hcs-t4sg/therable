"use client";

import { type Database } from "@/lib/schema";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import ChatCard from "./chat-card";
import ChatInput from "./chat-input";
import ChatText from "./chat-text";

type Views<T extends keyof Database["public"]["Views"]> = Database["public"]["Views"][T]["Row"];
type Preview = Views<"latest_messages">;
type Message = Database["public"]["Tables"]["messages"]["Row"];

export interface Target {
  targetId: string;
  targetName: string;
}

interface ChatDisplayProps {
  userId: string;
  previews: Preview[];
  messages: Message[];
}

export default function ChatDisplay({ userId, previews, messages }: ChatDisplayProps) {
  const [focus, setFocus] = useState<Target | undefined>();
  const [prevs, setPrevs] = useState<Preview[]>(previews);
  const [msgs, setMsgs] = useState<Message[]>(messages);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from("latest_messages")
        .select()
        .or(`sender.eq.${userId}, receiver.eq.${userId}`);
      if (!error && data) {
        const filteredPrevs: typeof data = [];
        for (let i = 0; i < data.length; i++) {
          const other = data[i]?.sender == userId ? data[i]?.receiver : data[i]?.sender;
          if (filteredPrevs.some((cmp) => cmp.sender == other || cmp.receiver == other)) {
            continue;
          }

          let min = i;
          for (let j = i + 1; j < data.length; j++) {
            const minTime = Date.parse(data[min]?.time_sent ?? "");
            const cmpTime = Date.parse(data[j]?.time_sent ?? "");

            if ((data[j]?.sender == other || data[j]?.receiver == other) && cmpTime > minTime) {
              min = j;
            }
          }

          filteredPrevs.push(data[min]!);
        }

        setPrevs(filteredPrevs);
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
          void getData();
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
            {prevs
              .sort((a, b) => Date.parse(b.time_sent ?? "") - Date.parse(a.time_sent ?? ""))
              .map((prev, idx) => {
                const otherId = prev.sender == userId ? prev.receiver : prev.sender;
                const otherName = prev.sender == userId ? prev.receiver_display_name : prev.sender_display_name;
                let previewMsg = prev.sender;

                if (prev.sender == userId) {
                  const diff = Date.now() - Date.parse(prev.time_sent!);
                  const time = Math.floor(diff / (1000 * 60));

                  if (time < 60) {
                    previewMsg = `Sent ${time}m ago`;
                  } else if (60 <= time && time < 1440) {
                    previewMsg = `Sent ${Math.floor(time / 60)}h ago`;
                  } else if (time >= 1440) {
                    previewMsg = `Sent ${Math.floor(time / (60 * 24))}d ago`;
                  }
                }

                return (
                  <ChatCard
                    key={idx}
                    otherId={otherId ?? ""}
                    otherName={otherName ?? ""}
                    preview={previewMsg ?? ""}
                    focused={otherId == focus?.targetId}
                    setFocus={setFocus}
                  />
                );
              })}
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
            <div className="h-[80%] overflow-auto">
              {msgs.map(
                (msg, idx) =>
                  (msg.sender == focus.targetId || msg.receiver == focus.targetId) && (
                    <ChatText key={idx} userId={userId} message={msg} targetName={focus.targetName} />
                  ),
              )}
            </div>
            <ChatInput userId={userId} targetId={focus.targetId} />
          </div>
        )}
      </div>
    </div>
  );
}

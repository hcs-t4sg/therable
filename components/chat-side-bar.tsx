"use client";

import { type Database } from "@/lib/schema";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import ChatCard from "./chat-card";

type Views<T extends keyof Database["public"]["Views"]> = Database["public"]["Views"][T]["Row"];

export default function ChatSideBar({
  this_user_id,
  data,
}: {
  this_user_id: string;
  data: Views<"latest_messages">[];
}) {
  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport>
        {data.map((message_data, idx) => (
          <ChatCard
            key={idx}
            this_user_id={this_user_id}
            other_user_id={message_data.sender ?? ""}
            name={message_data.sender_display_name ?? ""}
            preview={message_data.message ?? ""}
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
  );
}

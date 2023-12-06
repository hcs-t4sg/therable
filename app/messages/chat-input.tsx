import { toast } from "@/components/ui/use-toast";
import { type Database } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { type BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

const messageSchema = z.object({
  message: z.string().min(1, { message: "Nonempty input required." }),
});

type MessageData = z.infer<typeof messageSchema>;

interface ChatInputProps {
  userId: string;
  targetId: string;
}

export default function ChatInput({ userId, targetId }: ChatInputProps) {
  const router = useRouter();

  const form = useForm<MessageData>({
    resolver: zodResolver(messageSchema),
    mode: "onChange",
  });

  const onSubmit = async (input: MessageData) => {
    const supabase = createClientComponentClient<Database>();
    const { error } = await supabase.from("messages").insert({
      message: input.message,
      sender: userId,
      receiver: targetId,
    });

    if (error) {
      return toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }

    form.reset(input);
    router.refresh();
  };

  return (
    <form onSubmit={(e: BaseSyntheticEvent) => void form.handleSubmit(onSubmit)(e)}>
      <div className="grid h-fit grid-cols-10 gap-2">
        <div className="col-span-9">
          <textarea
            className="h-full w-full rounded-md border-2 border-slate-900 p-2"
            placeholder="Send a message..."
            id="message"
            {...form.register("message")}
          />
        </div>
        <div className="col-span-1">
          <button className="h-full w-full rounded-md border-2 border-slate-900 p-2" type="submit">
            Send
          </button>
        </div>
      </div>
    </form>
  );
}

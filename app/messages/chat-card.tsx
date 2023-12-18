import { type Target } from "./chat-display";

function trim_text(text: string, length: number, with_ellipsis = false) {
  length = Math.min(text.length, length);
  return text.substring(0, length) + (with_ellipsis && text.length != length ? "..." : "");
}

const max_preview_length = 40;

interface ChatCardProps {
  otherId: string;
  otherName: string;
  preview: string;
  focused: boolean;
  setFocus: (target: Target) => void;
}

export default function ChatCard({ otherId, otherName, preview, focused, setFocus }: ChatCardProps) {
  const border = focused ? "border-slate-900" : "border-slate-500";
  const style = "flex flex-row gap-4 rounded-lg border-2 p-4";

  return (
    <button onClick={() => setFocus({ targetId: otherId, targetName: otherName })}>
      <div className={style + " " + border}>
        <div className="shrink">
          <div className="h-24 w-24 rounded-3xl border-2 border-slate-500"></div>
        </div>
        <div className="flex flex-auto flex-col text-left">
          <div className="mb-2 text-xl">{trim_text(otherName, max_preview_length / 3, true)}</div>
          <div className="text-sm text-slate-700">{trim_text(preview, max_preview_length, true)}</div>
        </div>
      </div>
    </button>
  );
}

"use client";

import Link from "next/link";

function trim_text(text: string, length: number, with_ellipsis = false) {
  length = Math.min(text.length, length);
  return text.substring(0, length) + (with_ellipsis && text.length != length ? "..." : "");
}

const max_preview_length = 40;

export default function ChatCard({
  this_user_id,
  other_user_id,
  name,
  preview,
}: {
  this_user_id: string;
  other_user_id: string;
  name: string;
  preview: string;
}) {
  return (
    <Link href={`/chat/${other_user_id}`}>
      <div className="flex flex-row gap-4 rounded-lg border-2 border-slate-900 p-4">
        <div className="shrink">
          <div className="h-24 w-24 rounded-3xl border-2 border-slate-900"></div>
        </div>
        <div className="flex flex-auto flex-col">
          <div className="mb-2 text-xl">{trim_text(name, max_preview_length / 2, true)}</div>
          <div className="text-sm text-slate-700">{trim_text(preview, max_preview_length, true)}</div>
        </div>
      </div>
    </Link>
  );
}

"use client";
import React from "react";

interface ClipboardProps {
  text: string;
}
const CopyToClipBoard = ({ text }: ClipboardProps) => {
  const [copyState, setCopyState] = React.useOptimistic<"idle" | "copied">(
    "idle"
  );
  const [, startTransition] = React.useTransition();
  return (
    <button
      onClick={() => {
        startTransition(async () => {
          await navigator.clipboard.writeText(text);
          setCopyState("copied");
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setCopyState("idle");
        });
      }}
      type="button"
    >
      {copyState == "idle" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-copy"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-check"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      )}
    </button>
  );
};

export default CopyToClipBoard;

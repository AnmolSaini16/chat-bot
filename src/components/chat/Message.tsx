import React, { LegacyRef } from "react";
import { Result } from "./chat.interface";
import { Bot, User } from "lucide-react";

type Props = { result: Result };

const ChatMessage = React.forwardRef(({ result }: Props, ref) => {
  return (
    <div
      ref={ref as LegacyRef<HTMLDivElement>}
      className="flex items-center gap-2"
    >
      <ChatIcon result={result} />

      {!!result?.message.length && (
        <div
          className={`p-4 rounded-lg ${
            result.from === "user" ? "bg-gray-800" : "bg-gray-700"
          }`}
        >
          <p className="text-sm">{result.message}</p>
        </div>
      )}
    </div>
  );
});

export default ChatMessage;

const ChatIcon = ({ result }: { result: Result }) => {
  return (
    <div className="self-start">
      {result?.from === "bot" && <Bot />}
      {result?.from === "user" && <User />}
    </div>
  );
};

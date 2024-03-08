import React, { LegacyRef } from "react";
import { Result } from "./chat.interface";

type Props = { result: Result };

const ChatMessage = React.forwardRef(({ result }: Props, ref) => {
  return (
    <div
      ref={ref as LegacyRef<HTMLDivElement>}
      className={`flex ${
        result.from === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {!!result?.message.length && (
        <div
          className={`p-4 rounded-lg ${
            result.from === "user"
              ? "bg-gray-100 dark:bg-gray-800"
              : "bg-gray-200 dark:bg-gray-850"
          }`}
        >
          <p className="text-sm">{result.message}</p>
        </div>
      )}
    </div>
  );
});

export default ChatMessage;

"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowUp, BotMessageSquare, Loader2 } from "lucide-react";
import { Result } from "./chat.interface";
import Message from "./Message";
import useSubmitUserChat from "@/hooks/useSubmitUserChat";

type Props = {};

const Chat = (props: Props) => {
  const [text, setText] = useState<string>("");
  const [results, setResults] = useState<Result[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const chatRef = useRef<HTMLDivElement>(null);

  const { submitUserChat } = useSubmitUserChat({
    setLoading,
    setResults,
    text,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.length || loading) return;

    setText("");

    submitUserChat();
  };

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [results]);

  return (
    <div className=" bg-gray-100/50 dark:bg-gray-800/50">
      <ChatHeader />
      <main className="flex flex-col justify-between h-[calc(100vh-60px)]">
        <div className="container flex flex-col gap-4 px-4 md:px-6 py-4 md:py-8 overflow-auto">
          <div className="mx-auto max-w-[800px] min-w-[400px] space-y-4">
            <div className="space-y-4">
              {!results?.length ? (
                <p>Type a message to start chatting...</p>
              ) : (
                <div className="space-y-4">
                  {results?.map((result, index) => (
                    <Message
                      result={result}
                      key={`${index}-${result?.message}`}
                      ref={results.length - 1 === index ? chatRef : null}
                    />
                  ))}
                  {loading && <LoadingSkeleton />}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="container px-4 md:px-6 py-4 md:py-8">
          <form className="flex items-center space-x-3" onSubmit={handleSubmit}>
            <Input
              className="flex-1 min-w-0"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              type="submit"
              disabled={!Boolean(text?.length) || loading}
              className="flex items-center gap-2 bg-red-500 text-white hover:bg-red-700"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Send
              <ArrowUp size={16} />
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Chat;

const LoadingSkeleton = () => {
  return (
    <div className="p-4 w-fit rounded-lg bg-gray-700 flex items-center space-x-2">
      <div className="w-3 h-3 bg-gray-400 rounded-full animate-ping"></div>
      <div className="w-3 h-3 bg-gray-400 rounded-full animate-ping"></div>
      <div className="w-3 h-3 bg-gray-400 rounded-full animate-ping"></div>
    </div>
  );
};

export const ChatHeader = () => {
  return (
    <header className="p-2">
      <Button variant="link">
        REQUMATOR <BotMessageSquare className="ml-2" />
      </Button>
    </header>
  );
};

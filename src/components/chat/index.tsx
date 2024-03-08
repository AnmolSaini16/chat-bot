"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
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
    <>
      <main className="flex-1 bg-gray-100/50 dark:bg-gray-800/50 h-[calc(100vh-180px)] overflow-auto">
        <div className="container flex flex-col gap-4 px-4 md:px-6 py-4 md:py-8 ">
          <div className="mx-auto max-w-[600px] min-w-[300px] space-y-4">
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
      </main>
      <div className="border-t border-gray-200 border-gray-200 dark:border-gray-800">
        <div className="container px-4 md:px-6 py-4 md:py-8">
          <form className="flex items-center space-x-2" onSubmit={handleSubmit}>
            <Input
              className="flex-1 min-w-0"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button type="submit" disabled={!Boolean(text?.length) || loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;

const LoadingSkeleton = () => {
  return (
    <div className="p-4 w-fit rounded-lg bg-gray-200 dark:bg-gray-850 flex items-center space-x-2">
      <div className="w-3 h-3 bg-gray-400 rounded-full animate-ping"></div>
      <div className="w-3 h-3 bg-gray-400 rounded-full animate-ping"></div>
      <div className="w-3 h-3 bg-gray-400 rounded-full animate-ping"></div>
    </div>
  );
};

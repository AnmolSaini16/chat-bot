"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type Props = {};

const Chat = (props: Props) => {
  const [text, setText] = useState<string>("");
  const [results, setResults] = useState<Results[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const chatRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.length || loading) return;

    setLoading(true);
    try {
      const resp = await fetch(
        "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=AIzaSyAHu7ojdpZsfjIo5YEkp-GIwcVIKEirjpM",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: {
              text,
            },
          }),
        }
      );
      const data: ChatResponseInterface = await resp.json();
      setResults((prev) => [
        ...(prev ?? []),
        { from: "user", message: text },
        { from: "bot", message: data?.candidates[0]?.output ?? "" },
      ]);
      setText("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
          <div className="mx-auto max-w-[600px] space-y-4">
            <div className="space-y-4">
              {!results?.length ? (
                <p>Type a message, to start chatting...</p>
              ) : (
                results?.map((result, index) => {
                  if (result.from === "user") {
                    return (
                      <div className="flex flex-col items-end space-y-2">
                        <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                          <p className="text-sm">{result.message}</p>
                        </div>
                      </div>
                    );
                  } else if (result.from === "bot") {
                    return (
                      <div
                        ref={results?.length - 1 === index ? chatRef : null}
                        className="p-4 rounded-lg bg-gray-200 dark:bg-gray-850"
                      >
                        <p className="text-sm">{result.message}</p>
                      </div>
                    );
                  } else return <></>;
                })
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

interface Results {
  from: "user" | "bot";
  message: string;
}

interface ChatResponseInterface {
  candidates: {
    output: string;
  }[];
}

import {
  ChatResponseInterface,
  Result,
} from "@/components/chat/chat.interface";
import { toast } from "@/components/ui/use-toast";
import React from "react";

type Props = {
  setResults: (value: React.SetStateAction<Result[] | null>) => void;
  setLoading: (value: React.SetStateAction<boolean>) => void;
  text: string;
};

const useSubmitUserChat = ({ setResults, setLoading, text }: Props) => {
  const submitUserChat = async () => {
    setLoading(true);

    setResults((prev) => [...(prev ?? []), { from: "user", message: text }]);
    try {
      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${process.env.NEXT_PUBLIC_API_KEY}`,
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
      if (resp.ok) {
        const data: ChatResponseInterface = await resp.json();
        setResults((prev) => [
          ...(prev ?? []),
          {
            from: "bot",
            message: data?.candidates ? data?.candidates[0]?.output : "",
          },
        ]);
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { submitUserChat };
};

export default useSubmitUserChat;

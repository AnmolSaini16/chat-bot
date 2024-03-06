import Chat from "@/components/chat";
import Header from "@/components/header";

import OpenAI from "openai";

const API_KEY = "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";

const openai = new OpenAI({
  apiKey: API_KEY,
});

export default function Home() {
  return (
    <>
      <Header />
      <div className="w-full h-[calc(100vh-3.6rem)] flex flex-col ">
        <Chat />
      </div>
    </>
  );
}

import Chat from "@/components/chat";
import Header from "@/components/header";

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

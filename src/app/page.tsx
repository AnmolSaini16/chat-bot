import SideBar from "@/components/SideBar";
import Chat from "@/components/chat";

export default function Home() {
  return (
    <div className="h-screen grid grid-cols-5">
      <div className="col-span-1">
        <SideBar />
      </div>

      <div className="col-span-4">
        <Chat />
      </div>
    </div>
  );
}

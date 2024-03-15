import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { GripHorizontal, Headset, NotebookTabs } from "lucide-react";

type Props = {};

const SideBar = (props: Props) => {
  return (
    <div className="h-screen grid grid-rows-2">
      <div className="space-y-4">
        <header className="sticky top-0 z-10 dark:border-gray-800">
          <div className="container flex items-center justify-between h-14 px-4 md:px-6">
            <h1 className="text-lg font-semibold flex items-center">
              <Image src="/logo.png" width={100} height={100} alt="logo" />
            </h1>
            <Button asChild size="sm" variant="outline">
                Contact us
            </Button>
          </div>
        </header>

        <Button
          variant="outline"
          className="w-[90%] m-auto flex justify-between items-center"
        >
          New Chat <GripHorizontal />
        </Button>
      </div>

      <div className="mt-auto p-4">
        <Button asChild size="sm" variant="outline">
            <Headset className="mr-2 h-4 w-4" /> Support
        </Button>
      </div>
    </div>
  );
};

export default SideBar;

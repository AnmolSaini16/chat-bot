import React from "react";
import { Button } from "../ui/button";
import { BotMessageSquare } from "lucide-react";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 border-gray-200 dark:border-gray-800">
      <div className="container flex items-center justify-between h-14 px-4 md:px-6">
        <h1 className="text-lg font-semibold flex items-center">
          REQUMATOR <BotMessageSquare className="ml-2" />
        </h1>
        <Button size="sm" variant="outline">
          Help
        </Button>
      </div>
    </header>
  );
};

export default Header;

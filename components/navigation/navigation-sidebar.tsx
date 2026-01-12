import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { NavigationAction } from "@/components/navigation/navigation-action";
import { ScrollArea } from "@/components/ui/scroll-area";

import NavigationItem from "@/components/navigation/navigation-item";
import { ModeToggle } from "../mode-toggle";
import { NavigationMessages } from "./navigation-messages";
import { SignOutButton } from "@clerk/nextjs";
import { UserButtonWrapper } from "../user-button-wrapper";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#121214] py-3">
      <NavigationMessages />
      <div className="h-0.5 bg-zinc-300 w-10 flex-none dark:bg-zinc-700 rounded-xl mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              imageUrl={server.imageUrl}
              name={server.name}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <div className="h-0.5 bg-zinc-300 w-10 flex-none dark:bg-zinc-700 rounded-md mx-auto" />

        <NavigationAction />

        {/* <ModeToggle /> */}
        <UserButtonWrapper />
      </div>
    </div>
  );
};

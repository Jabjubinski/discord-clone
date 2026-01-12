"use client";

import { MemberRole } from "@/prisma/generated/prisma/enums";
import { ServerWithMembersWithProfiles } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  UserPlus,
  Settings,
  Users,
  PlusCircle,
  Trash,
  LogOut,
} from "lucide-react";
import ActionTooltip from "../action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <div className="flex items-center h-12 w-full px-3 border-neutral-200 border-none bg-white dark:bg-[#121214]">
      <DropdownMenu>
        <DropdownMenuTrigger
          className="focus:outline-none flex-1 min-w-0"
          asChild
        >
          <button className="flex px-2.5 items-center justify-start gap-x-1 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition py-1 rounded-md">
            <span className="text-md font-semibold truncate">
              {server.name}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-0.5">
          {isAdmin && (
            <>
              <DropdownMenuItem
                className="px-3 py-2 text-sm cursor-pointer"
                onClick={() => onOpen("editServer", { server })}
              >
                Server Settings
                <Settings className="h-4 w-4 ml-auto" />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onOpen("members", { server })}
                className="px-3 py-2 text-sm cursor-pointer"
              >
                Manage Members
                <Users className="h-4 w-4 ml-auto" />
              </DropdownMenuItem>
            </>
          )}
          {isModerator && (
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => onOpen("createChannel")}
            >
              Create Channel
              <PlusCircle className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isModerator && <DropdownMenuSeparator />}
          {isAdmin && (
            <DropdownMenuItem
              onClick={() => onOpen("deleteServer", { server })}
              className="px-3 py-2 text-sm cursor-pointer text-red-400"
            >
              Delete Server
              <Trash className="h-4 w-4 ml-auto text-inherit" />
            </DropdownMenuItem>
          )}
          {!isAdmin && (
            <DropdownMenuItem
              onClick={() => onOpen("leaveServer", { server })}
              className="px-3 py-2 text-sm cursor-pointer text-red-400"
            >
              Leave Server
              <LogOut className="h-4 w-4 ml-auto text-inherit" />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {isModerator && (
        <ActionTooltip label="Invite to server" side="bottom" align="center">
          <button
            onClick={() => onOpen("invite", { server })}
            className="ml-auto p-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 rounded-md transition text-zinc-500 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400"
          >
            <UserPlus className="h-5 w-5" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};

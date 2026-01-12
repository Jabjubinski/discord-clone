"use client";

import { SignOutButton, useClerk, useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { LogOut, Settings } from "lucide-react";
import { useState } from "react";

import { useRouter } from "next/navigation";

export function UserButtonWrapper() {
  const { signOut, openUserProfile } = useClerk();
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleSignOut = async () => {
    setOpen(false);

    await signOut(() => router.push("/sign-in"));
  };

  const handleSettings = () => {
    setOpen(false);
    openUserProfile();
  };

  if (!user) return null;

  const displayName = user.fullName || user.username || "User";
  const displayEmail = user.primaryEmailAddress?.emailAddress;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="relative h-10 w-10 rounded-full overflow-hidden transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="User menu"
        >
          <Image
            src={user.imageUrl}
            alt={displayName}
            fill
            sizes="40px"
            className="object-cover"
            priority
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none truncate">
              {displayName}
            </p>
            {displayEmail && (
              <p className="text-xs leading-none text-muted-foreground truncate">
                {displayEmail}
              </p>
            )}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Manage Account</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

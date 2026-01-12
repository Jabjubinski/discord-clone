"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CheckIcon, Copy, RefreshCw, Search } from "lucide-react";
import { Button } from "../ui/button";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";

export const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "invite";
  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );

      onOpen("invite", { server: response.data });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden sm:max-w-lg">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-semibold text-center">
            Invite Friends to "ADD SERVER NAME LATER"
          </DialogTitle>
          <div className="flex flex-row relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search friends" />
          </div>
        </DialogHeader>

        <div className="p-6">
          <Label>Or send a server invite link to a friend</Label>
          <div className="flex items-center mt-2 gap-x-2 relative">
            <Input value={inviteUrl} disabled={isLoading} readOnly />
            <Button onClick={onCopy} size="icon-sm" disabled={isLoading}>
              {copied ? <CheckIcon /> : <Copy />}
            </Button>
          </div>
          <Button
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4"
            disabled={isLoading}
            onClick={onNew}
          >
            Generate a new link
            <RefreshCw className="w-4 h-4" />
          </Button>
          <div className="text-muted-foreground text-[10px] pt-3">
            Your invite link expires in 7 days.
            <span className="ml-1.5 text-blue-400 cursor-pointer hover:border-b border-blue-400">
              Edit invite link
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

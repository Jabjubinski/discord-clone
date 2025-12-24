"use client";

import { Plus } from "lucide-react";

import ActionTooltip from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

export const NavigationAction = () => {
  const { onOpen } = useModal();

  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <button
          onClick={() => onOpen("createServer")}
          className="group flex items-center"
        >
          <div className="flex mx-3 h-11 w-11 rounded-2xl transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500 group-hover:dark:bg-emerald-500">
            <div className="bg-white rounded-full h-6 w-6 flex justify-center items-center">
              <Plus
                className="group-hover:text-emerald-500 transition text-stone-500"
                size={20}
              />
            </div>
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

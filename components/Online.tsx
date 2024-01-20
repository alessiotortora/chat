"use client";

import { useUser } from "@/lib/store/user";
import { supabaseBrowser } from "@/lib/supabase/browser";
import React, { useEffect } from "react";

export default function Online() {
  const user = useUser((state) => state.user);
  const supabase = supabaseBrowser();

  useEffect(() => {
    const channel = supabase.channel("room1");
    channel
      .on("presence", { event: "sync" }, () => {
        console.log("Synced presence state: ", channel.presenceState());
        const userIds = []
        for ( const id in channel.presenceState()) {
            userIds.push(channel.presenceState()[id])
        }
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            online_at: new Date().toISOString(),
            user_id: user?.id,
          });
        }
      });
  }, [user]);

  if (!user) {
    return <div className="h-3 w-1"></div>;
  }
  return (
    <div className="flex items-center gap-2">
      <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
      <h1 className="text-sm text-gray-400">2 online</h1>
    </div>
  );
}

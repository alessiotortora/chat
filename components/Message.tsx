import { Imessage } from "@/lib/store/messages";
import Image from "next/image";

export default function Message({ message }: { message: Imessage }) {
  return (
    <div className="flex items-center gap-2">
      <div>
        <Image
          src={message.users?.avatar_url!}
          alt={message.users?.avatar_url!}
          width={40}
          height={40}
          className="rounded-full ring-1"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h1 className="font-bold">{message.users?.display_name}</h1>
          <h1 className="text-xs text-gray-400">
            {new Date(message.created_at).toDateString()}
          </h1>
        </div>
        <p className="text-gray-300">{message.text}</p>
      </div>
    </div>
  );
}

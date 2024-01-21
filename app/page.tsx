import ChatAbout from "@/components/ChatAbout";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import Header from "@/components/header";
import InitUser from "@/lib/store/InitUser";
import { supabaseServer } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = supabaseServer();

  const { data } = await supabase.auth.getSession();

  return (
    <>
      <div className="max-w-3xl mx-auto md:py-10 h-screen">
        <div className="h-full border rounded-md flex flex-col relative">
          <Header user={data.session?.user} />
          {data.session?.user ? (
            <>
              <ChatMessages />
              <ChatInput />
            </>
          ) : (
            <ChatAbout />
          )}
        </div>
      </div>
      <InitUser user={data.session?.user} />
    </>
  );
}

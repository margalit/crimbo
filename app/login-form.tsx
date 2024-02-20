"use client";

import { createBrowserClient } from "@supabase/ssr";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

import { Avatar, Button, View } from "reshaped";

export default function LoginForm({ session }: { session: Session | null }) {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSignIn = async () => {
    try {
      const response = await fetch("/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const { data } = await response.json();
      if (!data?.url) throw new Error("No url returned");
      router.push(data.url);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <View direction="row" align="center" gap={3}>
      <Button
        variant="outline"
        size="small"
        onClick={() => router.push("/faq")}
      >
        FAQ
      </Button>
      {session ? (
        <>
          <Button variant="outline" size="small" onClick={handleSignOut}>
            Sign out
          </Button>
          <Avatar src={session.user.user_metadata.avatar_url} size={8} />
        </>
      ) : (
        <Button variant="outline" size="small" onClick={handleSignIn}>
          Sign in
        </Button>
      )}
    </View>
  );
}

"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import type { Session } from "@supabase/auth-helpers-nextjs";
import { Avatar, Button, View } from "reshaped";

export default function LoginForm({ session }: { session: Session | null }) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
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

import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Actionable, Avatar, Button, DropdownMenu } from "reshaped";

const UserAuth = () => {
  const supabase = useSupabaseClient();
  const user = useUser();

  const onSignIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const onSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (user) {
    const avatarUrl = user.user_metadata.avatar_url as string;
    return (
      <DropdownMenu position="bottom-end">
        <DropdownMenu.Trigger>
          {(attributes) => (
            <Actionable attributes={attributes}>
              <Avatar src={avatarUrl} size={8} />
            </Actionable>
          )}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item size="small" onClick={() => void onSignOut()}>
            Sign out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    );
  }
  return (
    <Button size="small" variant="ghost" onClick={() => void onSignIn()}>
      Sign in
    </Button>
  );
};

export default UserAuth;

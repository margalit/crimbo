import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Actionable, Avatar, Button, DropdownMenu } from "reshaped";

const UserAuth = () => {
  const supabase = useSupabaseClient();
  const user = useUser();

  if (user) {
    const onSignOut = async () => {
      await supabase.auth.signOut();
    };
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
          <DropdownMenu.Item size="small" onClick={onSignOut}>
            Sign out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    );
  }
  return (
    <Button
      size="small"
      variant="ghost"
      onClick={async () =>
        await supabase.auth.signInWithOAuth({ provider: "google" })
      }
    >
      Sign in
    </Button>
  );
};

export default UserAuth;

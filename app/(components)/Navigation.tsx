"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Navigation.module.css";

import {
  Actionable,
  Button,
  FormControl,
  Icon,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  View,
  useToggle,
  Text,
} from "reshaped";
import { addPost } from "../postActions";
import { FeedIcon, ScoresIcon, PostIcon } from "./Icons";

function NavigationItem({
  isActive,
  icon,
  label,
  onClick,
}: {
  isActive: boolean;
  icon: () => React.ReactElement;
  label: string;
  onClick: () => void;
}) {
  return (
    <View.Item grow className={`${styles.item} ${isActive && styles.active}`}>
      <Actionable fullWidth onClick={onClick}>
        <View
          height={16}
          direction="row"
          gap={1}
          align="center"
          justify="center"
        >
          <Icon svg={icon} size={5} />
          <Text variant="body-2" weight="medium">
            {label}
          </Text>
        </View>
      </Actionable>
    </View.Item>
  );
}

export default function Navigation() {
  const { active, activate, deactivate } = useToggle(false);

  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClientComponentClient();

  const handlePost = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });
      router.refresh();
    } else {
      activate();
    }
  };

  return (
    <>
      <View
        className={styles.root}
        position="fixed"
        insetBottom={0}
        insetStart={0}
        insetEnd={0}
        backgroundColor="page-faded"
        direction="row"
        align="center"
        textAlign="center"
        zIndex={90}
      >
        <NavigationItem
          isActive={!active && pathname === "/"}
          icon={FeedIcon}
          label="Feed"
          onClick={() => router.push("/")}
        />
        <NavigationItem
          isActive={active}
          icon={PostIcon}
          label="Post"
          onClick={handlePost}
        />
        <NavigationItem
          isActive={!active && pathname === "/leaderboard"}
          icon={ScoresIcon}
          label="Score"
          onClick={() => router.push("/leaderboard")}
        />
      </View>

      <Modal active={active} onClose={deactivate} position="bottom">
        <form action={addPost}>
          <View gap={4}>
            <FormControl required>
              <FormControl.Label>Image</FormControl.Label>
              <TextField name="image" inputAttributes={{ type: "file" }} />
            </FormControl>
            <FormControl required>
              <FormControl.Label>Location</FormControl.Label>
              <TextField
                name="location"
                placeholder="Enter a street and suburb"
              />
            </FormControl>
            <FormControl group required>
              <RadioGroup name="is_synthetic">
                <View gap={3}>
                  <Radio value="false">This tree is natural</Radio>
                  <Radio value="true">This tree is synthetic</Radio>
                </View>
              </RadioGroup>
            </FormControl>
            <Button type="submit">Submit</Button>
          </View>
        </form>
      </Modal>
    </>
  );
}

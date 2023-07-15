import Login from "./login";
import { Icon, View } from "reshaped";
import { LogoIcon } from "./Icons";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <View
      className={styles.root}
      position="fixed"
      insetTop={0}
      insetStart={0}
      insetEnd={0}
      paddingInline={4}
      backgroundColor="page-faded"
      direction="row"
      height={16}
      zIndex={90}
      align="center"
      width="100%"
    >
      <View.Item grow>
        <Icon size={5} svg={<LogoIcon />} />
      </View.Item>
      <View.Item>
        {/* @ts-expect-error next version of TS will fix this */}
        <Login />
      </View.Item>
    </View>
  );
}

import { Button, View, useTheme } from "reshaped";
import { MoonIcon, SunIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import SubmitHarvest from "../components/SubmitHarvest";
import { useUser } from "@supabase/auth-helpers-react";
import UserAuth from "./UserAuth";

const Navigation = () => {
  const user = useUser();
  return (
    <View justify="end" align="center" direction="row" gap={3} height={8}>
      {user && <SubmitHarvest user={user} />}
      <Button.Aligner>
        <ColorModeButton />
      </Button.Aligner>
      <Button.Aligner>
        <UserAuth />
      </Button.Aligner>
    </View>
  );
};

const ColorModeButton = () => {
  const { setColorMode, colorMode } = useTheme();
  if (colorMode === "dark") {
    return (
      <Button
        variant="ghost"
        size="small"
        onClick={() => setColorMode("light")}
        startIcon={<SunIcon />}
        endIcon={<ChevronDownIcon />}
      >
        Dark
      </Button>
    );
  }
  return (
    <Button
      variant="ghost"
      size="small"
      onClick={() => setColorMode("dark")}
      startIcon={<MoonIcon />}
      endIcon={<ChevronDownIcon />}
    >
      Light
    </Button>
  );
};

export default Navigation;

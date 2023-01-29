import { Button, View, useTheme } from "reshaped";
import { MoonIcon, SunIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

const Navigation = () => {
  return (
    <View justify="end" align="center" direction="row" gap={3}>
      <ColorModeButton />
    </View>
  );
};

const ColorModeButton = () => {
  const { setColorMode, colorMode } = useTheme();
  if (colorMode === "dark") {
    return (
      <Button
        variant="outline"
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
      variant="outline"
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

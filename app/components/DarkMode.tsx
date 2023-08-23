import { MoonIcon } from "./ui/MoonIcon";
import { Button } from "@nextui-org/button";
import { useTheme } from "next-themes";
import { SunIcon } from "./ui/SunIcon";

export default function DarkMode() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="absolute md:relative top-0 md:left-2 flex justify-end w-full md:w-10">
      {theme === "dark" ? (
        <Button
          aria-label="Sun"
          isIconOnly
          className="mr-14 md:mr-0"
          onClick={() => setTheme("light")}
        >
          <SunIcon />
        </Button>
      ) : (
        <Button
          aria-label="Moon"
          isIconOnly
          className="mr-14 md:mr-0"
          onClick={() => setTheme("dark")}
        >
          <MoonIcon />
        </Button>
      )}
    </div>
  );
}

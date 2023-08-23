import useNavbarStore from "@/store/navbarStore";
import { AiOutlineMenu } from "react-icons/ai";

export default function MenuOpen() {
  const { toggleMenu } = useNavbarStore();

  return (
    <div className="absolute lg:hidden left-0 top-2 z-10">
      <AiOutlineMenu
        size={22}
        className="text-third cursor-pointer"
        onClick={toggleMenu}
      />
    </div>
  );
}

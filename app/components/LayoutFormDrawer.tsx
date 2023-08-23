import { Button } from "@nextui-org/button";
import { RxCross1 } from "react-icons/rx";

type Prop = {
  children: React.ReactNode;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  closeDrawerForm: () => void;
  title?: string | undefined;
};

export default function LayoutFormDrawer({
  children,
  closeDrawerForm,
  handleSubmit,
  title,
}: Prop) {
  return (
    <div className="bg-slate-500/50 fixed w-full right-0 left-0 bottom-0 top-0 z-20">
      <div className="bg-primary dark:bg-darkprimary fixed right-0 top-0 lg:w-[40%] md:w-3/5 w-full h-full px-6 py-4 overflow-auto min-h-screen shadow-xl md:rounded-tl-[20px] md:rounded-bl-[20px]">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center justify-center mb-4 h-10">
            <div
              onClick={closeDrawerForm}
              className="bg-third absolute top-0 left-0 cursor-pointer w-10 h-10 flex justify-center items-center rounded-full"
            >
              <RxCross1 size={22} className="text-primary" />
            </div>
            <span className="text-textPrimary dark:text-darktextPrimary font-lg font-bold">
              {title}
            </span>
          </div>
          {children}
          <Button type="submit" className="bg-third text-primary mt-3">
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
}

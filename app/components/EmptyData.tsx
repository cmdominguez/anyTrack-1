import Image from "next/image";
import img from "../../public/nodata-2.png";

type Prop = {
  title: string;
};

export default function EmptyData({ title }: Prop) {
  return (
    <div className="h-[85vh] flex flex-col gap-y-4 items-center justify-center">
      <h3 className="text-textPrimary dark:text-darktextPrimary font-bold md:text-2xl text-lg">
        {title}
      </h3>
      <Image src={img} alt="no-data" className="w-96 h-96" />
    </div>
  );
}

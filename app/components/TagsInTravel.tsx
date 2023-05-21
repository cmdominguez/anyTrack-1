import React from "react";
import { BsClock } from "react-icons/bs";

type Prop = {
  title: string;
};

export default function TagsInTravel({ title }: Prop) {
  return (
    <div className="flex items-center gap-2 px-2 py-1 mt-1 max-w-[90px] rounded-full bg-green-400/20">
      <BsClock size={13} className="text-green-700" />
      <p className="text-[13px] text-green-700">{title}</p>
    </div>
  );
}

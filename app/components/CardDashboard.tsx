import React from "react";

interface Shipping {
  name: string;
  modelCart: string;
  destino: string;
}

type Prop = {
  item: Shipping;
  onPress: (item: Shipping) => void;
};

export default function CardDashboard({ onPress, item }: Prop) {
  return (
    <div
      className="bg-red-500 rounded-lg p-3 cursor-pointer"
      onClick={() => onPress(item)}
    >
      <p>{item.name}</p>
      <p>{item.modelCart}</p>
      <p>{item.destino}</p>
    </div>
  );
}

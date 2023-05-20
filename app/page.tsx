"use client";
import React, { useState } from "react";
import Image from "next/image";
import CardDashboard from "./components/CardDashboard";
import Drawer from "./components/Drawer";

const data = [
  {
    name: "Marcelo Dominguez",
    modelCart: "Toyota",
    destino: "Palermo, Buenos Aires",
  },
  {
    name: "Carlos Gonzalez",
    modelCart: "Toyota",
    destino: "Palermo, Buenos Aires",
  },
  {
    name: "Lucas Perz",
    modelCart: "Toyota",
    destino: "Palermo, Buenos Aires",
  },
  {
    name: "Alicia Fernandez",
    modelCart: "Toyota",
    destino: "Palermo, Buenos Aires",
  },
];

interface Shipping {
  name: string;
  modelCart: string;
  destino: string;
}

export default function Home() {
  const [shippingSelected, setShippingSelected] = useState<Shipping | null>(
    null
  );

  const onPress = (item: Shipping) => {
    setShippingSelected(item);
  };

  return (
    <section className="flex-1 mx-5 px-2">
      <h1 className="mb-5 mt-3 font-bold tracking-[0.5px] text-lg text-slate-800">
        Shipping
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {data.map((item, index) => {
          return <CardDashboard key={index} item={item} onPress={onPress} />;
        })}
      </div>
      <Drawer
        showDrawer={!!shippingSelected}
        toggleDrawer={() => setShippingSelected(null)}
        item={shippingSelected!}
      />
    </section>
  );
}

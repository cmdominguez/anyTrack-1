import React, { useState } from "react";
import { useShippingStore } from "@/store/shippingStore";
import InputCustom from "../InputCustom";
import LayoutFormDrawer from "../LayoutFormDrawer";
import SearchDriverBar from "../formShipping/SearchDriverBar";
import SearchReceivedClientBar from "../formShipping/SearchReceivedClientBar";
import SearchSentClientBar from "../formShipping/SearchSentClientBar";
import SearchVehicleBar from "../formShipping/SearchVehicleBar";
import ShippingTextArea from "../formShipping/ShippingTextArea";
import { useValidate } from "@/app/hook/useValidate";
import { Shipping } from "@/app/interface/interfaceShipping";

type Prop = {
  closeDrawerForm: () => void;
};

export default function DrawerFormShipping({ closeDrawerForm }: Prop) {
  const { addShipping } = useShippingStore();
  const [sent, setSent] = useState(false);
  const [valueInput, setValueInput] = useState({
    driverName: "",
    sentClient: "",
    receivedClient: "",
    patent: "",
    origen: "",
    destino: "",
  });
  const [shipping, setShipping] = useState<Shipping>({
    shipload: "",
    driverId: null,
    receiverId: null,
    senderId: null,
    vehicleId: null,
    origin: {},
    destination: {},
  });

  const errors = useValidate(valueInput);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput({ ...valueInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);

    if (
      !valueInput.driverName ||
      !valueInput.sentClient ||
      !valueInput.receivedClient ||
      !valueInput.patent ||
      !valueInput.origen ||
      !valueInput.destino
    ) {
      return;
    }

    closeDrawerForm();
    addShipping(shipping);
  };

  return (
    <LayoutFormDrawer
      closeDrawerForm={closeDrawerForm}
      handleSubmit={handleSubmit}
      title="Crear Envío"
    >
      <SearchDriverBar
        valueInput={valueInput}
        setValueInput={setValueInput}
        sent={sent}
        shipping={shipping}
        setShipping={setShipping}
      />
      <SearchSentClientBar
        valueInput={valueInput}
        setValueInput={setValueInput}
        sent={sent}
        shipping={shipping}
        setShipping={setShipping}
      />
      <SearchReceivedClientBar
        valueInput={valueInput}
        setValueInput={setValueInput}
        sent={sent}
        shipping={shipping}
        setShipping={setShipping}
      />
      <SearchVehicleBar
        valueInput={valueInput}
        setValueInput={setValueInput}
        sent={sent}
        shipping={shipping}
        setShipping={setShipping}
      />
      <InputCustom
        label="Origen"
        placeholder="Palermo, Buenos Aires"
        sent={sent}
        errors={errors.origen}
        handleChange={handleChange}
        valueInput={valueInput.origen}
        name="origen"
      />
      <InputCustom
        label="Destino"
        placeholder="Moreno, Buenos Aires"
        sent={sent}
        errors={errors.destino}
        handleChange={handleChange}
        valueInput={valueInput.destino}
        name="destino"
      />
      <ShippingTextArea shipping={shipping} setShipping={setShipping} />
    </LayoutFormDrawer>
  );
}

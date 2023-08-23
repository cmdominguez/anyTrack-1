import { useContextDrivers } from "@/app/context/ContextDrivers";
import InputCustom from "../InputCustom";
import LayoutFormDrawer from "../LayoutFormDrawer";
import { useEffect, useState } from "react";
import { useDriversStore } from "@/store/driversStore";
import { useValidateFormDrivers } from "@/app/hook/useValidateFormDrivers";
import useAnimationStore from "@/store/formAnimation";

export default function DrawerFormDrivers() {
  const { closeFormDrivers, showFormDrivers, objectToEdit, driverId } =
    useContextDrivers();
  const [sent, setSent] = useState(false);
  const { addDriver, editDriver } = useDriversStore();
  const { toggleAnimationForm } = useAnimationStore();
  const [valueInput, setValueInput] = useState({
    email: "",
    name: "",
    dni: "",
  });

  const errors = useValidateFormDrivers(valueInput);

  useEffect(() => {
    if (objectToEdit !== null) {
      setValueInput({
        email: objectToEdit.email,
        name: objectToEdit.name,
        dni: objectToEdit.dni,
      });
    }

    if (!showFormDrivers) {
      setValueInput({ email: "", name: "", dni: "" });
      setSent(false);
    }
  }, [showFormDrivers]);

  if (!showFormDrivers) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput({ ...valueInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);

    if (!valueInput.name || !valueInput.email || !valueInput.dni) return;

    if (objectToEdit !== null) {
      editDriver(driverId!, valueInput);
    } else {
      addDriver(valueInput);
    }

    //para realizar la animacion cuando cierra el drawer
    setTimeout(() => {
      closeFormDrivers();
    }, 300);

    toggleAnimationForm();
  };

  return (
    <LayoutFormDrawer
      handleSubmit={handleSubmit}
      closeDrawerForm={closeFormDrivers}
      title={objectToEdit !== null ? "Editar chofer" : "Agregar chofer"}
    >
      <InputCustom
        label="Nombre del chofer"
        placeholder="James Doe"
        handleChange={handleChange}
        valueInput={valueInput.name}
        name="name"
        errors={errors.name}
        sent={sent}
      />
      <InputCustom
        label="Email del chofer"
        placeholder="james@gmail.com"
        handleChange={handleChange}
        valueInput={valueInput.email}
        name="email"
        errors={errors.email}
        sent={sent}
      />
      <InputCustom
        label="DNI del chofer"
        placeholder="50259874"
        handleChange={handleChange}
        valueInput={valueInput.dni}
        name="dni"
        errors={errors.dni}
        sent={sent}
      />
    </LayoutFormDrawer>
  );
}

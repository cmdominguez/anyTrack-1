import React from "react";

type Prop = {
  label: string;
  sent?: boolean; //sent: para que no marque el input requerido la primera vez
  valueInput: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: string;
  placeholder: string;
  name: string;
};

export default function InputCustom({ ...props }: Prop) {
  const { label, sent, valueInput, handleChange, errors, name, placeholder } =
    props;

  return (
    <>
      <label className="text-slate-800 text-[13px] font-bold leading-tight tracking-normal">
        {label}
      </label>
      <div className="relative">
        <input
          className="mb-5 mt-2 text-gray-600 bg-primary focus:outline-none focus:border focus:border-blue-500 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder={placeholder}
          name={name}
          value={valueInput}
          onChange={handleChange}
        />
        {sent && errors ? (
          <p className="absolute top-[41px] text-[11px] italic text-red-600">
            {errors}
          </p>
        ) : null}
      </div>
    </>
  );
}

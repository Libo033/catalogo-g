import {
  Checkbox,
  FormControlLabel,
  TextField,
  InputAdornment,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import PinkButton from "./PinkButton";

interface FilterProductsProps {
  filter: boolean;
  setFilter: React.Dispatch<React.SetStateAction<boolean>>;
  categorias: string[];
}

const FilterProducts = ({
  filter,
  setFilter,
  categorias,
}: Readonly<FilterProductsProps>) => {
  return (
    <div className="relative">
      <div
        className={`w-screen ease-in-out duration-300 z-30 fixed flex gap-0 justify-center items-center top-[50%] left-[50%] translate-y-[-50%] lg:hidden ${
          filter
            ? "translate-x-[-50%]"
            : "translate-x-[-142%] md:translate-x-[-133.66%]"
        }`}
      >
        <div className="w-10/12 h-fit rounded-lg border bg-white p-4 shadow-xl z-30 md:w-4/6">
          <div className="flex justify-between border-b">
            <p className="text-3xl font-medium">Filtros</p>
            <Image
              className="mx-2 cursor-pointer"
              onClick={() => setFilter(false)}
              src={"/img/close.svg"}
              alt="close"
              width={18}
              height={18}
            />
          </div>
          <div className="py-4 flex flex-col gap-4">
            <div className="flex flex-col">
              <p className="font-medium text-lg">Categorias</p>
              {categorias.length > 0 &&
                categorias.map((cat) => (
                  <FormControlLabel
                    key={cat}
                    sx={{ width: "99%" }}
                    control={<Checkbox />}
                    label={cat}
                  />
                ))}
            </div>
            <div>
              <p className="font-medium text-lg">Precio</p>
              <div className="flex gap-2 pt-2">
                <TextField
                  fullWidth
                  id="max"
                  label="Minimo"
                  type="number"
                  variant="filled"
                  autoComplete="off"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  id="max"
                  label="Maximo"
                  type="number"
                  variant="filled"
                  autoComplete="off"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
          </div>
          <PinkButton
            props={{
              fullWidth: true,
              variant: "contained",
              sx: { marginTop: "0.5rem" },
            }}
          >
            Filtrar
          </PinkButton>
        </div>
        <div
          onClick={() => setFilter(!filter)}
          className="w-fit h-full bg-transparent rotate-90 z-20 cursor-pointer"
        >
          <p className="bg-[#ff6bb599] fixed bottom-0 right-0 translate-x-[47px] z-50 text-white font-semibold uppercase px-4 rounded-t-lg">
            filtros
          </p>
        </div>
      </div>
      {filter && (
        <span
          className={`lg:hidden fixed opacity-70 ease-in-out duration-300 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black h-screen w-screen z-20`}
        ></span>
      )}
    </div>
  );
};

export default FilterProducts;

import Image from "next/image";
import React from "react";

const NavigationBar = () => {
  return (
    <nav className="pink-grad m-auto max-w-screen-2xl w-full h-20">
      <ul className="h-full flex justify-center items-center">
        <li className="text-2xl font-medium">Catalogo Griselda</li>
        {false && (
          <li className="absolute right-6 md:right-10 lg:right-16">
            <Image src={"/img/menu.svg"} alt="admin" width={33} height={33} />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar;

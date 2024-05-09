"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavigationBar = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/admin" && (
        <div className="mx-auto w-full max-w-screen-2xl">
          <nav className="pink-grad fixed w-full mx-auto max-w-screen-2xl h-20 z-50">
            <ul className="h-full flex justify-center items-center">
              <li>
                <Link href={"/"}>
                  <h1 className="text-2xl font-medium">Catalogo Griselda</h1>
                </Link>
              </li>
              {false && (
                <li className="absolute right-6 md:right-10 lg:right-16">
                  <Image
                    src={"/img/menu.svg"}
                    alt="admin"
                    width={33}
                    height={33}
                  />
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default NavigationBar;

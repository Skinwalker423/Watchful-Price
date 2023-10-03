import Image from "next/image";
import Link from "next/link";
import React from "react";
import { navIcons } from "@/constants";

const NavBar = () => {
  return (
    <header className='w-full'>
      <nav className='nav'>
        <Link
          href={"/"}
          className='flex items-center gap-1'
        >
          <Image
            src={"assets/icons/logo.svg"}
            alt='watchful price logo'
            width={27}
            height={27}
          />
          <p className='nav-logo'>
            Watchful{" "}
            <span className='text-primary'>Price</span>
          </p>
        </Link>
        <div>
          <ul className='flex items-center gap-5'>
            {navIcons.map(({ src, alt }) => {
              return (
                <li
                  key={alt}
                  className='p-2 rounded-full hover:bg-slate-100 cursor-pointer'
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={28}
                    height={28}
                    className='object-contain'
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;

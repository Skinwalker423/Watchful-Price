import Image from "next/image";
import Link from "next/link";
import React from "react";

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
      </nav>
    </header>
  );
};

export default NavBar;

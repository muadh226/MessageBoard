import React from "react";
import { Link } from 'react-scroll';
import logo  from '../images/logo.png';


const Navbar = () => {
  return (
    <div className="Navbar shadow-lg"> {/*Adds page scroll on logo click*/}
      <Link
        to="Main"
        smooth={true}
        offset={0}
        duration={700}
        > <img src={logo} className="logo" alt="Logo" /> </Link>
    </div>
  );
}

export default Navbar;

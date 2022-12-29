import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from "react-icons/ai";

import { Cart} from './'
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const {showCart, setShowCart, tatalQuantities} = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Gregory Headphones</Link>
      </p>
      <button className="cart-icon" type="button" onClick={() => setShowCart(true)}>
        <AiOutlineShopping/>
        <span className="cart-item-qty">{tatalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar
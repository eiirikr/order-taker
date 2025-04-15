import React from 'react'
import { PrimaryNav, MenuLink, Menu, Hamburger } from './NavbarElements'
const Navbar = () => {
  return (
    <>
      <PrimaryNav>
        <Hamburger />
        <Menu>
          <MenuLink to="/products" activeStyle>
            Products
          </MenuLink>
          <MenuLink to="/cart" activeStyle>
            Cart
          </MenuLink>
          <MenuLink to="/ordered" activeStyle>
            Ordered
          </MenuLink>
          <MenuLink to="/waitingList" activeStyle>
            Waiting List
          </MenuLink>
          <MenuLink to="/manageProduct" activeStyle>
            Manage Product
          </MenuLink>
        </Menu>
      </PrimaryNav>
    </>
  )
}
export default Navbar
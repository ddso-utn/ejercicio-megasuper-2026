import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import styled from '@emotion/styled';
import { theme } from '../../theme.js';
import { useCarrito } from '../../context/CarritoContext.jsx';

const NavbarBg = styled.header`
  background-color: ${theme.colors.primaryGreen};
  font-size: 1.5rem;
  height: 8rem;
  padding: 1rem 1rem;
`;

const Nav = styled.nav`
  color: ${theme.colors.primaryWhite};
  margin: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const NavbarSection = styled.div`
  display: flex;
  align-items: center;
`;

const BrandText = styled.h1`
  color: ${theme.colors.primaryWhite};
  margin: 0;
`;

const MenuIcon = styled.button`
  color: ${theme.colors.primaryWhite};
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
`;

const CartButton = styled.button`
  display: flex;
  align-items: center;
  color: ${theme.colors.primaryWhite};
  font-size: 1.25rem;
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const CartCount = styled.span`
  margin: 0 0 0 1rem;
  color: ${theme.colors.primaryWhite};
  background-color: transparent;
`;

const LinkNoStyle = styled(Link)`
  all: unset;
  cursor: pointer;
  display: inline;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const { carrito } = useCarrito();
  const [cantUnidades, setCantUnidades] = useState(0);

  const irACheckout = () => {
    navigate('/checkout');
  };

  const cantUnidadesEnCarrito = () => {
    let suma = 0;
    for (const producto of carrito) {
      suma += producto.unidades;
    }
    return suma;
  };

  useEffect(() => {
    setCantUnidades(cantUnidadesEnCarrito());
  }, [carrito]);

  return (
    <NavbarBg>
      <Nav>
        <NavbarSection>
          <MenuIcon>☰</MenuIcon>
        </NavbarSection>

        <NavbarSection>
          <LinkNoStyle to="/">
            <BrandText>Megasuper.com</BrandText>
          </LinkNoStyle>
        </NavbarSection>

        <NavbarSection>
          <CartButton onClick={irACheckout}>
            <FaShoppingCart color="white" />
            <CartCount>{cantUnidades}</CartCount>
          </CartButton>
        </NavbarSection>
      </Nav>
    </NavbarBg>
  );
};

export default Navbar;

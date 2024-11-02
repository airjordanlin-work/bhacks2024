"use client"
import styled from 'styled-components';

export default function Navbar() {
    return (
        <NavContainer>
            <NavLinks>
                <NavLink>Page1</NavLink>
            </NavLinks>
        </NavContainer>
    );
};


// Styled Components
const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #1c1c1e; /* Dark background */
  color: white;
  height: 50px;
`;


const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const NavLink = styled.a`
  text-decoration: none;
    justify-content: center;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #a5a5a7; /* Light gray for hover */
  }
`;



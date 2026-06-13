import styled from "@emotion/styled";
import { theme } from "../../theme.js";

const StyledHeader = styled.header`
  text-align: center;
  color: ${theme.colors.primaryWhite};
  background-color: ${theme.colors.secondaryGreen};
`;

const Header = (props) => {
  return (
    <StyledHeader>
      ¡Hola {props.username}, aprovecha 3 y 6 cuotas sin interes en toda tu compra!
    </StyledHeader>
  );
};

export default Header;

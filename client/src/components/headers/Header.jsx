import './Header.css';

const Header = (props) => {
  return (
    <header className="header">
        ¡Hola {props.username}, aprovecha 3 y 6 cuotas sin interes en toda tu compra!
    </header>
  );
};

export default Header;
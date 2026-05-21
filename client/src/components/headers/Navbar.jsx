import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './Navbar.css';
import '../../index.css';

const Navbar = () => {
  return (
    <header className="navbar-bg">
      <nav className="navbar">
        <div className="navbar-section left">
          <button className="menu-icon">☰</button>
        </div>

        <div className="navbar-section center">
          <div className="brand">
            <Link to={`/`} className="link-no-style"><h1 className="brand-text"> Megasuper.com </h1></Link>
          </div>
        </div>

        <div className="navbar-section right">
          <button className="cart">
            <FaShoppingCart color="white"/>
            <span className="cart-count">0</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

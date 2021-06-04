import { Link } from 'react-router-dom';
import './nav-style.css';
import iconLogo from './icon-logo.png';

function Nav() {
  return (
    <nav className="navbar navbar-expand-sm ">
      <img className="icon-logo" src={iconLogo} alt="" />
      <Link className="nav-title navbar-brand" to="/companies">
        <h2 className="nav-title">Parsity-CRM </h2>
      </Link>
    </nav>
  );
}

export default Nav;

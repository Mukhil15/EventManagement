import { Link } from 'react-router-dom';
import '../css/TopBar.css'
const TopBar = ({admin}) => {
  return (
    <div className="top-bar">
      <div className="logo">The Events Hub</div>
      <div className="nav-links">
        <Link to="/"><div>Home</div></Link>
        <Link to="/EventsTable"><div>Events</div></Link>
        {admin?<div>Login</div>:<Link to="/AddEvents"><div>Add Events</div></Link>}
      </div>
    </div>
  );
};

export default TopBar;

import Bars3Icon from "../../assets/icons/Bars3icon";
import "./Sidebar.css";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Bars3Icon />
      <ul className="sidebar-menu">
        <li>
          <img src="/images/home.png" alt="home" />
        </li>
        <li>
          <img src="/images/list.png" alt="list" />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

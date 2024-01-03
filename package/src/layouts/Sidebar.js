import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import DisplayAvatarBar from "./DisplayAvatarBar";
const navigation = [
  {
    title: "Dashboard",
    href: "/maindashboard",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Lessons",
    href: "/moduletype",
    icon: "bi bi-bell",
  },
  {
    title: "Leaderboard",
    href: "/badges",
    icon: "bi bi-patch-check",
  },
  {
    title: "Settings",
    href: "/buttons",
    icon: "bi bi-hdd-stack",
  }
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <>
    <div className="">
      <div className="d-flex align-items-center">
        <Logo />
        <span className="ms-auto d-lg-none">
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
        </span>
      </div>
      <div className="pt-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
            
          ))}
        </Nav>
       
      </div>
     
    </div>
     
     </>
  );
};

export default Sidebar;

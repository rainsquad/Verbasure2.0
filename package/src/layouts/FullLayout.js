import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header"
import { Container } from "reactstrap";
import ShowPoints from "../views/ShowPoints";
import background from '../assets/images/bg/sample-background.png'
const FullLayout = () => {
  return (
    <main  class="bg-image"
    style={{ backgroundImage:`url(${background})`,backgroundRepeat:"no-repeat",backgroundSize:"cover" , width: '100vw',
    height: '100vh'
    }} >
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          
          
          {/********Middle Content**********/}
          <Container className=" contentArea" fluid >
          <Outlet />

          </Container>
        </div>

      </div>
    </main>
  );
};

export default FullLayout;

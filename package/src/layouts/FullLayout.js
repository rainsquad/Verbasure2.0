import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "../components/Header"
import { Container } from "reactstrap";
import ShowPoints from "../views/ShowPoints";
import background from '../assets/images/bg/sample-background2.svg'
const FullLayout = () => {
  return (
    <main  
    
    class="bg-image"
    style={{ backgroundImage:`url(${background})`,backgroundRepeat:"no-repeat",
    backgroundSize:"cover" , width: '100%',
    height: '100%'
    }} >





      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          <Header/>
          
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

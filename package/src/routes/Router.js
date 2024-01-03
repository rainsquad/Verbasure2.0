import { lazy } from "react";
/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const LoginRegLayout = lazy(() => import("../layouts/loginregLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const ModuleType = lazy(() => import("../views/ModuleType.js"));
const VideoModule = lazy(() => import("../views/VideoModule.js"));
const ListenModule = lazy(() => import("../views/ListenModule.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
const Login = lazy(() => import("../views/login.js"));
const Signup = lazy(() => import("../views/Signup.js"));
const GetStarted = lazy(() => import("../views/GetStarted.js"));
const UploadPicture = lazy(() => import("../views/FileUpload.js"));
const ReadModule = lazy(() => import("../views/ReadModule.js"));
const MainDashboard = lazy(() => import("../views/MainDashboard.js"));
/*****Routes******/

const ThemeRoutes = [


  
  {
    path:"/",
    element:<LoginRegLayout/>,
    children: [
      { path: "/", exact: true, element: <GetStarted /> },
      { path: "/login", exact: true, element: <Login /> },
      { path: "/signup", exact: true, element: <Signup /> },
      { path: "/getstarted", exact: true, element: <GetStarted /> },
      { path: "/upload", exact: true, element: <UploadPicture /> },
    ],
  },
  
  
  {
    path: "/",
    element: <FullLayout />,
    children: [
      
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/maindashboard", exact: true, element: <MainDashboard /> },
      { path: "/videomodule", exact: true, element: <VideoModule /> },
      { path: "/readmodule", exact: true, element: <ReadModule /> },
      { path: "/listenmodule", exact: true, element: <ListenModule /> },
      { path: "/moduletype", exact: true, element: <ModuleType /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
    ],


  },
 
 
];



export default ThemeRoutes;
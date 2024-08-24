import AllUsers from "../components/AllUsers";
import AllFiles from "../components/file-manager/AllFiles";
import UserIcon from "../Icons/UserIcon";
import FilesIcon from "../Icons/FilesIcon";
import AllOrganisations from "../components/Organisation-manager/AllOrganisations";
import OrganisationUsers from "../components/Organisation-manager/OrganisationUsers";
import Dashboard from "../components/Dashboard";
import HomeIcon from "../Icons/HomeIcon";
import APIs from "../components/APIs";
import APIIcon from "../Icons/API-Icon";

const appRoutes = [
  {
    path: "/",
    index:true,
    element: <Dashboard />,
    state: "Dashboard",
    role: ["Admin", "User"],
    sidebarProps: {
      displayText: "Dashboard",
      icon: <HomeIcon />
    }
  },
  // {
  //   path: "/files",
  //   index:true,
  //   role:['User', 'Admin'],
  //   element: <AllFiles />,
  //   state: "file",
  //   sidebarProps: {
  //     displayText: "Files",
  //     icon: <FilesIcon />
  //   }
  // },
 {
    path: "/users",
    index:true,
    role:['User', 'Admin'],
    element: <AllUsers/>,
    state: "User",
    sidebarProps: {
      displayText: "Users",
      icon: <UserIcon />
    }
  },

  {
    path: "/api",
    index:true,
    role:['User', 'Admin'],
    element: <APIs/>,
    state: "API",
    sidebarProps: {
      displayText: "API",
      icon: <APIIcon />
    }
  },

  // {
  //   path: "/Organisations/users",
  //   // index:true,
  //   role:['User', 'Admin'],
  //   element: <OrganisationUsers/>,
  //   state: "file",
  //   // sidebarProps: {
  //   //   displayText: "Files",
  //   //   icon: <FilesIcon />
  //   // }
  // },

];

export default appRoutes;




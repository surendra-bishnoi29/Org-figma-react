
import { Route } from "react-router-dom";
import PageWrapper from "./PageWrapper";
import appRoutes from "./appRoutes";
import { getItem } from "../login/storageService";
// import { RouteType } from "./config";

const role = getItem('role');
console.log("role", role);

export const generateRoute = (routes) => {
  return routes.map((route, index) => 
    {
    //   if (!route.role || !route.role.includes(role)) {
    //   return null; // Skip routes that don't match the user's role
    // }
   return route.index ? (
      <Route
        index
        path={route.path}
        element={<PageWrapper state={route.state}>
          {route.element}
        </PageWrapper>}
        key={index}
      />
    ) : (
      <Route
        path={route.path}
        element={
          <PageWrapper state={route.child ? undefined : route.state}>
            {route.element}
          </PageWrapper>
        }
        key={index}
      >
        {route.child && (
          generateRoute(route.child)
        )}
      </Route>
    )}
  );
};
console.log("appRoutes", generateRoute(appRoutes));
export const routes =  generateRoute(appRoutes);


//  const Gen = ()=>{

//   return (
//     <>
//     {
//       appRoutes.map((route, index) => 
//       {
//         //   if (!route.role || !route.role.includes(role)) {
//         //   return null; // Skip routes that don't match the user's role
//         // }
//        return  (
//           <Route
//             index
//             path={route.path}
//             element={<PageWrapper state={route.state}>
//               {route.element}
//             </PageWrapper>}
//             key={index}
//           />
//         ) 
//       })
//     }
      
//     </>
//   )

// }

// export default Gen; 
import { ReactNode, useEffect, useContext } from "react";

import { ContextApp } from "../ContextAPI";


const PageWrapper = (props) => {
  // const dispatch = useDispatch();
  const { appState, setAppState} = useContext(ContextApp);
  useEffect(() => {
   
    if (props.state) {
      setAppState(props.state)
    }
  }, [props]);

  return (
    <>{props.children}</>
  );
};

export default PageWrapper;
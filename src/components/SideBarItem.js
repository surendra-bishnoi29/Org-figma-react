import React, {useContext} from "react";
import { ContextApp } from "../ContextAPI";
import { NavHashLink } from "react-router-hash-link";
import { useLocation } from "react-router-dom";
import { classNames } from "../shared/Utils";

function SideBarItem({item}) {
    const { appState, setAppState} = useContext(ContextApp);
    // const navigate = useNavigate()
    const location = useLocation()
    console.log(item, "apart from item ", location)
    return (
      item.sidebarProps && item.path ? (
       <NavHashLink
       to={(appState != item.state) ? (item.path + '#top'):location.pathname+location.search}
       className={classNames(
        appState === item.state? "  border-l-2 border-[#0E5FD9]" :null,
        "cursor-pointer hover:bg-[#F0F6FF] text-black  h-[40px]   select-none p-[10px] px-[22px]  flex items-center flex-row gap-4"
      )}
       style={appState === item.state?{ display:'flex', backgroundColor:'#F0F6FF'}:{display:'flex'}}
       >
     <span className={
      classNames(
        appState === item.state?" text-[#260ed9]":null, "text-sm"
      )
     } >{item.sidebarProps.icon} </span>
     <span className="font-sans   font-light leading-5 text-left text-sm">{item.sidebarProps.displayText}</span>
        </NavHashLink>
      ) : null
    );
}

export default SideBarItem
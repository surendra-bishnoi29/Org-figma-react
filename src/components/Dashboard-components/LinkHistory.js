
import React, { useEffect, useMemo, useState, useCallback, useContext } from 'react'
// import Table from '../shared/Table'
import { AvatarCell, ModifiedStatusCell, SelectColumnFilter, shortenNameCell, StatusPill } from "../../shared/tableUtilities"
import { DeleteIcon } from '../../Icons/DeleteIcon';
import { PencilIcon } from '../../Icons/PencilIcon';
import EyeIcon from '../../Icons/EyeIcon';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { deleteUser, getAllUsers } from '../../Actions/userAction';
import loadable from '@loadable/component'
import { useMediaQuery } from 'react-responsive';
import Notification from '../../Notification';
import { Toaster, ToastIcon, toast, resolveValue } from "react-hot-toast";
import WarningPage from '../utilities/WarningPage';
// import { getItem } from '../login/storageService';
import { ContextApp } from '../../ContextAPI';
import TableWrapper from '../../shared/TableWrapper';
import { deleteLinkById, getLinkHistory, getSession } from '../../Actions/DashboardActions';

const EditLink = loadable(() => import('./EditLink'));



function LinkHistory() {
    const navigate = useNavigate();
  const location = useLocation();

  // const loggedIn = getItem('loggedIn');
  // if(loggedIn!=true){

  //   navigate('/login')
  // }
  // console.log("role in all-users", role)
  const {role} = useContext(ContextApp)
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 639 });

  const [warning, setWarning] = useState(false);

  const [deleteConfig, setDeleteConfig] = useState(undefined);

  // const n = getData();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const memoData = useMemo(() => { return data }, [data])

  useEffect(() => {
    console.log("location", location)
    getAllLinksList();
  }, [location])

  

  const getAllLinksList = async () => {
    // This function call API function from ACTIONS.
    setLoading(true);
    const response = await getLinkHistory();
    console.log("response to check token ", response)
    if (response) {
      if(response.message == 'Token is invalid!')
        {
          navigate('/login')
        }
        if(response?.status)
        {
          setData(response?.data);
          notification("Links history fetched", 'success')
        }else{
          notification("failed to get All links", 'error')
        }
      
    }
    setLoading(false)
  }

  useEffect(()=>{
    console.log("checking role", role )
    if(role != 'Admin'){
      // navigate('/files')
    }
    
  },[role, location])


  const getRemoteSession = async(link) =>{
    const response = await getSession({link, mail: 'user@example.com' });
    console.log("org remote session", response)
    if(response){
      return response
    }else{
      return false
    }
    // const response = await fetch('http://127.0.0.1:4320/create-session', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ link, mail: 'user@example.com' }),
    //   });
    
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    
    //   const data = await response.json();
    //   if (data.status) {
    //     return data;
    //   } else {
    //     throw new Error('Failed to create session');
    //   }
}

  const commonAction = async (actionName, dataId, row,  confirmation = false, openWarning = true ) => {
    console.log("x in the common actions", row)
    if (actionName == 'delete') {
      if (openWarning) {
        setDeleteConfig({dataId, row, commonAction:true})
        setWarning(true);
        return;
      }
      if (confirmation) {
      // const newData = kData.filter((d1)=>{return !(d1.id==dataId)});
      // const temp_user = data.find((d1) => { return d1._id == dataId });
      // console.log("temp_user", temp_user)
      // const fileName = temp_user?.name + '-' + temp_user?._id;
      // console.log("fileName", fileName)
      const response = await deleteLinkById(dataId);

      if (response?.status) {
        setData((prev) => prev.filter((d1) => { return !(d1.id == dataId) }));
        notification('Link Deleted Successfully', 'success')

      } else {
        notification('Link Not Deleted', 'error')
      }
    }
      // pData = newData;

    }
    if(actionName == 'view'){
      const data = await getRemoteSession(row.link)
      if (data && data.port) {
        window.open(`https://main.d1m8sxuk2ob2sn.amplifyapp.com?session_id=${data.session_id}`, '_blank');  // '_blank' opens the URL in a new tab
      }else{
        notification("failed to open remote browser","error")
      }
    }
    if (actionName == 'edit') {
      const postUrls = `${location.pathname}?openModal=true&mode=${actionName}&id=${dataId}`
      navigate(postUrls)
    } 
  }


  const columns = React.useMemo(() => [
    {
      Header: "Link",
      accessor: 'link',
      Cell:shortenNameCell,
      imgAccessor: "image",
      emailAccessor: "email",
      secondAccessor: 'city',
      mobileAccessor: 'mobile',
      firstAccessor: 'role',
      thirdAccessor: 'organisation'
    },
    {
      id: 'Status',
      Header: "Status",
      accessor: 'link_prediction',
      Cell: StatusPill,
    },
    {
      id:'Modified_status',
      Header: "Modified Status",
      accessor: 'modified_status',
      Cell:ModifiedStatusCell
    }
    // {
    //   id: 'mobile',
    //   Header: "Mobile No.",
    //   accessor: 'mobile',
    // },
    // {
    //   id: 'organisation',
    //   Header: "Organisation",
    //   accessor: 'organisation',
    // },
    // {
    //   id: 'role',
    //   Header: "Role",
    //   accessor: 'role',
    // //   Cell: StatusPill,
    // },




    // {
    //   Header: "Title",
    //   accessor: 'title',
    // },
    // {
    //   Header: "Status",
    //   accessor: 'status',
    //   Cell: StatusPill,
    // },
    // {
    //   Header: "Age",
    //   accessor: 'age',
    // },
    // {
    //   Header: "Role",
    //   accessor: 'role',
    //   Filter: SelectColumnFilter,  // new
    //   filter: 'includes',
    // },

  ], [])

  const Actions = [
    {
      element: <div className=' cursor-pointer flex gap-2'> <EyeIcon /> Open Link</div>,
      actionName: "view",
      action: commonAction
    },
    {
      element: <div className=' text-green-800 cursor-pointer flex gap-2'><PencilIcon /> Edit Status </div>,
      actionName: "edit",
      action: commonAction
      // onClick: props.onClick,
    },
    {
      element: <div className=' text-red-800 cursor-pointer flex gap-2'><DeleteIcon /> Delete Link</div>,
      actionName: "delete",
      action: commonAction
    }
  ]


  const deleteMultipleRows = (selectedFlatRows, confirmation = false, openWarning = true) => {
    if (openWarning) {
      setDeleteConfig({selectedFlatRows})
      setWarning(true);
      return;
    }
    if (confirmation) {
      selectedFlatRows.map((row) => {
        commonAction("delete", row.original.id, row.original,  true, false)
      })
    }
  }

  const getPermissionToDelete = (c) => {
    setWarning(false);
    if(deleteConfig?.commonAction){
      commonAction('delete', deleteConfig.dataId, deleteConfig.row, c, false)
      return;
    }
    // commonAction('delete', deleteConfig.dataId, deleteConfig, p, false)
    deleteMultipleRows(deleteConfig.selectedFlatRows, c, false)
  }

  const notification = (msg, type) => {
    toast[type](msg);
  }


  const addNewElement = (
    <div className=' flex justify-center items-center' >
      <span className=' px-1 inline-block'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" width="18" height="18">
          <path d="M11 5a3 3 0 11-6 0 3 3 0 016 0zM2.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 018 18a9.953 9.953 0 01-5.385-1.572zM16.25 5.75a.75.75 0 00-1.5 0v2h-2a.75.75 0 000 1.5h2v2a.75.75 0 001.5 0v-2h2a.75.75 0 000-1.5h-2v-2z"></path>
        </svg>               </span>
      {/* <div className=' inline-block'>Add User</div> */}
    </div>
  )
  // let data = React.useMemo(() => getData(), [])

  return role=="Admin"?  (
    <>
      <Notification />
      {warning ? <WarningPage targetFunction={getPermissionToDelete} /> : ''}
      <div className="w-full h-full   ">
        <main className=" mx-auto ">
          <div className="">
            {/* <h1 className="text-xl font-semibold">Table Header</h1> */}
          </div>
          {isDesktop && <div className=" ">
            <TableWrapper enableGlobalSearch={true} ModalLoadedComponent={EditLink} loading={loading} header={"Links History"}  columns={columns} data={memoData} Actions={Actions} deleteMultipleRows={deleteMultipleRows} addNewElement={addNewElement} />
          </div>}
          {isTablet && <div className=" ">
            <TableWrapper enableGlobalSearch={true} ModalLoadedComponent={EditLink} loading={loading} header={"Links History"} enableRowSelect={false} hideColums={['city', 'role', 'mobile']}  columns={columns} data={memoData} Actions={Actions} deleteMultipleRows={deleteMultipleRows} addNewElement={addNewElement} />
          </div>}
          {isMobile && <div className=" ">
            <TableWrapper enableGlobalSearch={true} ModalLoadedComponent={EditLink} loading={loading} header={"Links History"} enableRowSelect={false} hideColums={['city', 'role', 'organisation', 'mobile']}  columns={columns} data={memoData} Actions={Actions} deleteMultipleRows={deleteMultipleRows} addNewElement={addNewElement} />
          </div>}
        </main>
      </div>

    </>
  ):
  ''
  ;
}

export default LinkHistory
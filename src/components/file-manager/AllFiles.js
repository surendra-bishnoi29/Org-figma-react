import React, { useState, useEffect, useMemo, useContext } from 'react'
import Card from '../utilities/Card'
import SelectUser from '../utilities/SelectUser'
import AddFileIcon from '../../Icons/AddFileIcon'
// import AddFile from './AddFile'
import SelectDocumentType from './SelectDocumentType'
import { useMediaQuery } from 'react-responsive';
import Table from '../../shared/Table'
// import { getAllFiles } from '../../Actions/fileActions'
import { AvatarCell, SelectColumnFilter, StatusPill } from "../../shared/tableUtilities"
import { DeleteIcon } from '../../Icons/DeleteIcon'
import { PencilIcon } from '../../Icons/PencilIcon'
import EyeIcon from '../../Icons/EyeIcon'
import loadable from '@loadable/component'
import Tabs from '../utilities/Tabs'
import PersonalIcon from '../../Icons/PersonalIcon'
import FinancialIcon from '../../Icons/FinancialIcon'
import { getAllUsers, getCurrentUser } from '../../Actions/userAction'
import { deleteFile, getDownloadableUrl, getUserFiles } from '../../Actions/fileActions'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Notification from '../../Notification'
import { Toaster, ToastIcon, toast, resolveValue } from "react-hot-toast";
import DownloadIcon from '../../Icons/DownloadIcon'
import ShareIcon from '../../Icons/ShareIcon'
import { getFileNameFromUrl, getS3KeyFromUrl } from '../utilities/utilityFunctions'
import WarningPage from '../utilities/WarningPage'
import { ContextApp } from '../../ContextAPI'

const years = Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, i) => 2000 + i);
const financialYears = years.map(year => `${year}-${year % 100 + 1}`).reverse();


const AddFile = loadable(() => import('./AddFile'));

function AllFiles() {

  const [searchParams] = useSearchParams();
  const userId = searchParams.get('id');

  const [loading, setLoading] = useState(false);
  // const [selected, setSelected] = useState('Personal')
  const [allFiles, setAllFiles] = useState([])
  const [activeTab, setActiveTab] = useState('personal')
  // const [data, setData] = useState([]);
  // const memoData = useMemo(() => { return allFiles }, [allFiles])
  const memoFinancialData = useMemo(() => { return allFiles.filter((d1) => { return d1.document_type == 'financial' }) }, [allFiles])
  const memoPersonalData = useMemo(() => { return allFiles.filter((d1) => { return d1.document_type == 'personal' }) }, [allFiles])
  const memoFiles = useMemo(() => { return allFiles }, [allFiles, loading])
  const [selectedUser, setSelectedUser] = useState('')
  const [currentUser, setCurrentUser] = useState('')

  const [dowloadableUrl, setDowloadableUrl] = useState('')
  const [deleteConfig, setDeleteConfig] = useState(undefined)
  const [warning, setWarning] = useState(false)

  const navigate = useNavigate();
  const location = useLocation();

  const {role, loggedIn} = useContext(ContextApp)

  useEffect(() => {
    // fetch all files
    // const response = getAllFiles();
    // setAllFiles(response);
    console.log("all files render", loggedIn)
    if(!loggedIn){
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    if (userId) {
      //setSelectedUser(userId)
      setUserFromUrl()
    }else{
    getUser()
    }
  }, [userId])

  


  const setUserFromUrl = async () => {
    const response = await getAllUsers();
    if (response) {
      const user = response.find((u) => u._id == userId);
      console.log("user found from url", user)
      if (user) {
        notification('user fetched successfully', 'success')
        setSelectedUser(user);
      } else {
        notification('user not found', 'error')
        navigate('/files')
      }
    } else {
      notification('failed to get all users', 'error')
      getUser()
    }
  }

  const getUser = async () => {
    setLoading(true);
    const response = await getCurrentUser();
    console.log("current user from side nav", response)
    if (response?.user) {
      setCurrentUser(response.user);
      setSelectedUser(response.user);
    }
    setLoading(false);
  }

  useEffect(() => {
    console.log("location", location)
    getAllfiles();
  }, [selectedUser, location])

  const getAllfiles = async () => {
    setLoading(true);
    const response = await getUserFiles(selectedUser._id);
    console.log(response)
    if (response?.files) {
      response?.files?.sort((a, b) => {
        return financialYears.indexOf(a.financial_year) - financialYears.indexOf(b.financial_year);
      });
      console.log("files", response?.files)
      setAllFiles(response.files);
    }
    else {
      notification('Failed to get files', 'error')

    }
    setLoading(false);
  }

  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const hideAddFile = useMediaQuery({ maxWidth: 440 });



  const commonAction = async (actionName, dataId,  row,  deleteConfig={}, confirmation=false, openWarning=true) => {
      // console.log("deleteConfig", deleteConfig)
    if (openWarning) {
      setDeleteConfig({ actionName, dataId, row })
      setWarning(true);
      return;
    }
    const s3_key =  getS3KeyFromUrl(row.s3_url);
    if (confirmation) {
      {
        if (actionName == 'delete') {

            const response = await deleteFile(dataId, s3_key);
            console.log("response", response)
            if (response?.message) {
              setAllFiles((prev) => prev.filter((d1) => { return !(d1._id == dataId) }));
              notification('File Deleted Successfully', 'success')
            } else {
              notification('File Not Deleted', 'error')
            }
          
        }
      }
    }
      // if (actionName == 'view' || actionName == 'edit') {
      //   const postUrls = `${location.pathname}?openModal=true&mode=${actionName}&id=${dataId}`
      //   navigate(postUrls)
      // }
    
  }

    const tabs = [
      {
        name: <div className=' flex justify-center items-center gap-2'><PersonalIcon /> <span>Personal</span></div>,
        id: 'personal',
        onClick: () => setActiveTab('personal')
      },
      {
        name: <div className=' flex justify-center items-center gap-2'><FinancialIcon /> <span>Financial</span></div>,
        id: 'financial',
        onClick: () => setActiveTab('financial')
      }
    ]

    const downloadFile = async (actionName, dataId, row) => {
      const url = row?.s3_url;
      const response = await getDownloadableUrl(url);
      const presignedUrl = response?.url;
      if (presignedUrl) {

        try {
          const res = await fetch(presignedUrl);
          const blob = await res.blob();
          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadUrl;
          const filename = url.split('/').pop();  // Extracts filename from key
          link.setAttribute('download', filename);  // Forces download of the blob
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
          notification('Failed to download file', 'error')
        }
      } else {
        notification('Failed to get download url', 'error')
      }
    }

    //   const getFiledownload = async (url) => {
    //     const response = await getDownloadableUrl(url);
    //     const presignedUrl = response.url;

    //     const res = await fetch(presignedUrl);
    //     const blob = await res.blob();
    //     const downloadUrl = window.URL.createObjectURL(blob);
    //     const link = document.createElement('a');
    //     link.href = downloadUrl;
    //     const filename = url.split('/').pop();  // Extracts filename from key
    //     link.setAttribute('download', filename);  // Forces download of the blob
    //     document.body.appendChild(link);
    //     link.click();
    //     link.parentNode.removeChild(link);
    //     window.URL.revokeObjectURL(downloadUrl);
    // }

    const sharefile = async (actionName, dataId, row) => {
      const url_data = row?.s3_url;
      console.log("url_data", row)
      const response = await getDownloadableUrl(url_data)
      if (response?.url) {

      } else {
        notification('Failed to get download url', 'error')
        return;
      }

      try {
        const file_name = getFileNameFromUrl(response?.url);
        const res = await fetch(response?.url);
        const blob = await res.blob();
        console.log("res", res, blob, file_name)
        const file = new File([blob], file_name, { type: blob.type });
        console.log("file", navigator.canShare)
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'Share File',
            text: 'Check out this file!',
            files: [file],
          });
          console.log('File shared successfully');
        } else {
          notification('File sharing not supported in this browser', 'error')
        }
      } catch (error) {
        notification(`Failed to share file: ${error}`, 'error')
      }
    }

    // const getDownloadPresingedUrl = async (dataId) => {
    //   const s3_url = allFiles.find((d1) => { return d1._id == dataId })?.s3_url;
    //   console.log("s3_url", allFiles)
    //   const response = await getDownloadableUrl(s3_url)
    //   if(response?.url){
    //     setDowloadableUrl(response.url)
    //   }
    // }


    const getPermissionToDelete = (p) => {
      setWarning(false);
      commonAction('delete', deleteConfig.dataId, deleteConfig.row, deleteConfig, p, false)
    }


    const Actions = [
      // {
      //   element: <div> <EyeIcon /></div>,
      //   actionName: "view",
      //   action: commonAction
      // },
      // {
      //   element: <div className=' text-green-800'><PencilIcon /> </div>,
      //   actionName: "edit",
      //   action: commonAction
      //   // onClick: props.onClick,
      // },
      {
        element: <div className=' text-blue-500'><DownloadIcon /></div>,
        actionName: "download",
        action: downloadFile,
        hide: false
      },
      {
        element: <div className=' text-green-800'><ShareIcon /></div>,
        actionName: "share",
        action: sharefile,
        hide:false
      },
      {
        element: <div className=' text-red-800'><DeleteIcon /></div>,
        actionName: "delete",
        action: commonAction,
        hide: role!='Admin'
      },


    ]


    const notification = (msg, type) => {
      toast[type](msg);
    }

    const financial_columns = React.useMemo(() => [
      {
        Header: "File",
        accessor: 'file_name',
        Cell: AvatarCell,
        // imgAccessor: "image",
        // emailAccessor: "email",
        // cityAccessor:'city',
        // mobileAccessor:'mobile',
        // roleAccessor :'role'
        firstAccessor: 'description',
        secondAccessor: 'financial_year',
      },
      {
        id: 'description',
        Header: "Description",
        accessor: 'description',
      },
      {
        id: 'category_type',
        Header: "Category Type",
        accessor: 'categoryType',
      },
      {
        id: 'year',
        Header: "Year",
        accessor: 'financial_year',
      },
      // {
      //   id:'role',
      //   Header: "Role",
      //   accessor: 'role',
      //   Cell: StatusPill,
      // },

    ], [])

    const personal_columns = React.useMemo(() => [
      {
        Header: "File",
        accessor: 'file_name',
        Cell: AvatarCell,
        // imgAccessor: "image",
        // emailAccessor: "email",
        // cityAccessor:'city',
        // mobileAccessor:'mobile',
        // roleAccessor :'role'
        firstAccessor: 'description',
      },
      {
        id: 'description',
        Header: "Description",
        accessor: 'description',
      },
      {
        id: 'category_type',
        Header: "Category Type",
        accessor: 'categoryType',
      },
      // {
      //   id:'year',
      //   Header: "Year",
      //   accessor: 'year',
      // },
      // {
      //   id:'role',
      //   Header: "Role",
      //   accessor: 'role',
      //   Cell: StatusPill,
      // },

    ], [])



    const addNewElement = (
      <div className=' flex justify-center items-center' >
        <span className=' px-1 inline-block'>
          <AddFileIcon />
        </span>
        {/* <div className=' inline-block'>Add User</div> */}
      </div>
    )


    return (
      <>
        <Notification />
        {warning ? <WarningPage targetFunction={getPermissionToDelete} /> : ''}
        <div className=' sm:p-[5%]'>
          <Card>
            <div className='min-h-[250px]'>


              {/* admin use */}
              <div className=' flex items-center justify-between mb-8'>
                <div className='w-full max-w-[30%] min-w-[180px]'>
                  {role=='Admin'?<SelectUser selected={selectedUser} setSelected={setSelectedUser} />:''}
                </div>
                <div className='flex items-center  gap-5'>
                  {/* { <div className=' hover:bg-slate-200 rounded-full p-2 text-blue-800'>
                <AddFile />
              </div>} */}
                  {/* <SelectDocumentType selected={selected} setSelected={setSelected} /> */}
                </div>
              </div>
              {/* end admin use */}
              <Tabs tabs={tabs} activeTab={activeTab} />
              {isDesktop && <div className=" ">
                <Table columns={activeTab == 'personal' ? personal_columns : financial_columns} data={activeTab == 'personal' ? memoPersonalData : memoFinancialData} Actions={Actions} ModalLoadedComponent={AddFile} ModalUser={selectedUser ? selectedUser : currentUser} enableRowSelect={false} addNewElement={addNewElement} />
              </div>}
              {isTablet && <div className=" ">
                <Table notifcation={notification} enableRowSelect={false} hideColums={['type', 'description', 'category_type']} ModalLoadedComponent={AddFile} ModalUser={selectedUser ? selectedUser : currentUser} columns={activeTab == 'personal' ? personal_columns : financial_columns} data={activeTab == 'personal' ? memoPersonalData : memoFinancialData} Actions={Actions} addNewElement={addNewElement} />
              </div>}
              {isMobile && <div className=" ">
                <Table notifcation={notification} enableRowSelect={false} hideColums={['type', 'year', 'description', 'category_type']} ModalLoadedComponent={AddFile} ModalUser={selectedUser ? selectedUser : currentUser} columns={activeTab == 'personal' ? personal_columns : financial_columns} data={activeTab == 'personal' ? memoPersonalData : memoFinancialData} Actions={Actions} addNewElement={addNewElement} />
              </div>}
              {/* end user use */}

            </div>
          </Card>
        </div>
      </>
    )
  }

  export default AllFiles
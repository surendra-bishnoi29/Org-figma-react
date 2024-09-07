import React, { useEffect, useState } from "react";
import Modal from '../Modal/Modal'
import Input from "../utilities/Input";
import Card from '../utilities/Card'
// import UploadImage from "../shared/UploadImage";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
// import { createUser, getAllUsers, updateUser } from "../Actions/userAction";
import LoadingSpinner from "../utilities/LoadingSpinner";
import SelectValues from "../utilities/SelectValues";
import Notification from "../../Notification";
// import { generateTempUrl } from "../Actions/fileActions";
// import { ensureUrlSafety, generateAlphanumericId } from "./utilities/utilityFunctions";
import { Toaster, ToastIcon, toast, resolveValue } from "react-hot-toast";
// import { removeQueryParameters } from "../shared/Utils";
// import TextArea from "./utilities/TextArea";
import { getLinkHistoryById, modifyLinkById } from "../../Actions/DashboardActions";
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import { storage } from "../../firebase"; 
  



const CreateUser = (props) => {
    console.log("CreateUser", props)
    const navigate = useNavigate();
    const uriLocation = useLocation();
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode');
    const linkId = searchParams.get('id');
    console.log("mode", mode, "userId", linkId)


    

    // const [user, setUser] = useState({});
    // const [file, setFile] = useState(undefined);
    // const [name, setName] = useState('');
    // const [mobile, setMobile] = useState('');
    // const [city, setCity] = useState('');
    // const [district, setDistrict] = useState('');
    // const [address, setAddress] = useState('');
    // const [state, setState] = useState('');
    const [disabled, setDisabled] = useState(mode == 'view' ? true : false);
    // const [image, setImage] = useState('');
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [title, setTitle] = useState("Create Link");
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [organisation, setOrganisation] = useState('');
    // const [role, setRole] = useState('User');
    // const [clientType, setClientType] = useState('');
    // const [id, setId] = useState('');


    const [link, setLink] = useState('');
    const [maliciousStatus, setMaliciousStatus] = useState(null)
    


    useEffect(() => {
        if (mode == 'view' || mode == 'edit') {
            setTitle(mode == 'view' ? 'View Link' : 'Edit Link')
            getLink();
            // if (intity) {
            //     setName(intity.name);
            //     setMobile(intity.mobile);
            //     setCity(intity.city);
            //     setAddress(intity.address);
            //     setState(intity.state);
            //     setDistrict(intity.location);
            //     setImage(intity.image);
            //     console.log("intity", intity)
            // } else {
            //     setMessage("User not found");
            // }
        }
        // setTimeout(() => {
        //     setIsLoading(false);
        // }, 1000)
    }, [])

    const getLink = async() =>{
        const response = await getLinkHistoryById(linkId)
        console.log("got link by id", response)
        if(response){
            if(response.status){
                setLink(response.data.link);
                if(response.data.modified_status){
                    setMaliciousStatus(response.data.modified_status)
                }else{
                    setMaliciousStatus(response.data.link_prediction)
                }
            }
        }

        setIsLoading(false);
    }

    // const getUser = async() => {
    //     const response = await getAllUsers();
    //     let intity
    //     console.log("userId", userId, response)
    //     response.map((i) => {
    //         if (i._id == userId) {
    //             intity = i
    //             console.log("found", intity)
    //         }
    //     })
    //     if (intity) {
    //         setId(intity._id);
    //         setName(intity.name);
    //         setMobile(intity.mobile);
    //         setCity(intity.city);
    //         setDistrict(intity.district);
    //         setAddress(intity.address);
    //         setState(intity.state);
    //         setPassword(intity.password);
    //         setClientType(intity?.clientType);
    //         setEmail(intity.email);
    //         setRole(intity.role);
    //         setOrganisation(intity.organisation);
    //         setImage(intity.image);
    //         console.log("intity", intity)
    //     } else {
    //         setMessage("User not found");
    //     }
    //     return intity;
    // }

    const notification = (msg, type) => {
        toast[type](msg); 
    }

   

    // const handleSubmit = async(e) => {
    //     e.preventDefault();
    //     let temp_id
    //     if(id){
    //         temp_id = id
    //     }else{
    //         temp_id = generateAlphanumericId(10);
    //     }
        
    //     const dir_name = ensureUrlSafety(name.trim());

    //     // const id = generateAlphanumericId(10);
    //     const key = `${dir_name}-${temp_id}/personal/profile/profileImage`
    //     let imgUrl = null
    //     let tempUrl = ''
    //     if(file)
    //     {   
    //         console.log("file found in handleSubmit", file)
    //         tempUrl = await generateTempUrl(key)
    //         if (!tempUrl?.url) 
    //             {
    //             notification('Error generating presigned url', 'error')
    //             return;
    //         }
    //     }
    //     if(tempUrl?.url){
    //         const uploadResponse = await uploadFile(file, tempUrl?.url);
    //         if(uploadResponse.statusText == 'OK')
    //         {
    //             console.log("file uploaded", uploadResponse)
    //             imgUrl = removeQueryParameters(uploadResponse?.url);
    //             console.log("imgUrl", imgUrl)
    //             setImage(imgUrl);
    //         }
    //         else{
    //             notification('Error uploading file', 'error')
    //             return;
    //         }
    //     }
        
        
       
    //     const sendUser = {
    //         _id: temp_id,
    //         name: name.trim(),
    //         mobile: mobile.trim(),
    //         email: email.trim(),
    //         address: address.trim(),
    //         city: city.trim(),
    //         password: password.trim(),
    //         role: 'Admin',
    //         clientType: clientType.trim(),
    //         state: state.trim(),
    //         district: district.trim(),
    //         organisation: organisation.trim(),
    //         address: address.trim()
    //     }

    //     if(imgUrl){
    //         sendUser.image = imgUrl;
    //     }else{
    //         sendUser.image = image;
    //     }

    //     console.log("sendUser", sendUser)
    //     if (mode == 'edit') {
           
    //         updateUser(sendUser, userId);
    //         props?.notification('User Updated Successfully', 'success');
    //         onClose();
    //     }   else {  
    //         createUser(sendUser)
    //         props?.notification('User Created Successfully', 'success');
    //         onClose();
    //     }
    //     console.log('submit');
    // }

    const handleSubmit = async (e) =>{
        console.log("hii, in modify function")
        e.preventDefault();
        const res = await modifyLinkById(linkId, {
            modified_status: maliciousStatus
        })
        if(res){
            if(res.status){
                props?.notification('Link Updated Successfully', 'success');
                onClose();
            }else{
                props?.notification(`error : ${res.error}`, 'error');
            }
        }else{
            props?.notification(`Server Error`, 'error');
        }
    }


    const onClose = () => {
        props.close();
        navigate(uriLocation.pathname);
    }

   


   
    return (
        <>
        <Notification />
        <Modal>
            {isLoading ? <LoadingSpinner /> :
                (<Card header={title} close={onClose}>
                    {message ? <div className=" p-5 text-center w-[300px]"> {message}</div> :
                        <form onSubmit={handleSubmit}>
                            {/* <div class="flex flex-wrap justify-center">
                    <div class=" w-28">
                        <img src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-4-470x470.png" alt="..." class="shadow-lg rounded-full max-w-full h-auto align-middle border-none" />
                    </div>
                </div> */}

                            {/* <div>
                                <UploadImage image={image} handleFile={handleFile} disabled={disabled} />
                            </div> */}
                            <div className="  space-y-2 mt-3 w-full">
                                <Input id='Link' value={link} onChange={setLink} disabled={true} required={true} />
                                <SelectValues id='Link_Status' items={["Malicious", "Benign"]} label={'Status'} setSelectedItem={setMaliciousStatus} selectedItem={maliciousStatus} />
                                {/* <Input id='Organisation' value={organisation} onChange={setOrganisation} disabled={disabled} required={false} /> */}
                            </div>
                            {/* <div className=" flex space-x-2 mt-3">
                                <Input id='Mobile' value={mobile} onChange={setMobile} disabled={disabled} required={true} />
                                <Input id='Email' value={email} onChange={setEmail} disabled={disabled} required={false} />
                            </div>
                            <div className=" flex space-x-2 mt-3">
                            <TextArea id='Address' value={address} onChange={setAddress} disabled={disabled} required={false} />
                            </div>
                            <div className=" flex space-x-2 mt-3">
                          
                            <Input id='City' value={city} onChange={setCity} disabled={disabled} required={true} />
                            <Input id='District' value={district} onChange={setDistrict} disabled={disabled} required={true} />
                            </div>
                            <div className=" flex space-x-2 mt-3">
                          
                                <Input id='State' value={state} onChange={setState} disabled={disabled} required={true} />
                                <Input id='Client Type' value={clientType} onChange={setClientType} disabled={disabled} required={false} />
                            </div>
                            <div className=" flex items-center space-x-2 mt-3 "> */}
                                {/* <SelectValues id='User Role' items={["Admin", "User"]} label={'Role'} setSelectedItem={setRole} selectedItem={role} /> */}
                                {/* <Input id='Password' value={password} onChange={setPassword} disabled={disabled} required={true} />
                            </div> */}
                            <div className="flex justify-center mt-5">
                               { mode=='view'?"": <button type="submit" className= " cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  >Submit</button>}
                            </div>
                        </form>
                    }
                </Card>)}
        </Modal>
</>
    )
}
export default CreateUser;







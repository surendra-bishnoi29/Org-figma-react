import React, { useEffect, useState } from "react";
import Modal from './Modal/Modal'
import Input from "./utilities/Input";
import Card from './utilities/Card'
import UploadImage from "../shared/UploadImage";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { createUser, getAllUsers, getUserById, updateUser } from "../Actions/userAction";
import LoadingSpinner from "./utilities/LoadingSpinner";
import SelectValues from "./utilities/SelectValues";
import Notification from "../Notification";
import { generateTempUrl } from "../Actions/fileActions";
import { ensureUrlSafety, generateAlphanumericId } from "./utilities/utilityFunctions";
import { Toaster, ToastIcon, toast, resolveValue } from "react-hot-toast";
import { removeQueryParameters } from "../shared/Utils";
import TextArea from "./utilities/TextArea";
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import { storage } from "../../firebase"; 
  



const CreateUser = (props) => {
    console.log("CreateUser", props)
    const navigate = useNavigate();
    const uriLocation = useLocation();
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode');
    const userId = searchParams.get('id');
    console.log("mode", mode, "userId", userId)


    

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
    const [title, setTitle] = useState("Create User");
    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [organisation, setOrganisation] = useState('');
    const [role, setRole] = useState('User');
    // const [clientType, setClientType] = useState('');
    // const [id, setId] = useState('');


    // const [role, setRole]


    useEffect(() => {
        if (mode == 'view' || mode == 'edit') {
            setTitle(mode == 'view' ? 'View User' : 'Edit User')
            getUser();
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
        
           
       
    }, [])


    const getUser = async() => {
        setIsLoading(true);
        const response = await getUserById(userId);
        if(response){
            if(response.status){
                setEmail(response.data.email);
                setRole(response.data.role);
                notification("user fetch was successful", "success")
            }else{
                notification("got error while fetching user", "error")
            }
        }else{
            notification("unexpected error while fetching user", "error")
        }



        setIsLoading(false);
        // const response = await getAllUsers();
        // let intity
        // console.log("userId", userId, response)
        // response.map((i) => {
        //     if (i._id == userId) {
        //         intity = i
        //         console.log("found", intity)
        //     }
        // })
        // if (intity) {
        //     setId(intity._id);
        //     setName(intity.name);
        //     setMobile(intity.mobile);
        //     setCity(intity.city);
        //     setDistrict(intity.district);
        //     setAddress(intity.address);
        //     setState(intity.state);
        //     setPassword(intity.password);
        //     setClientType(intity?.clientType);
        //     setEmail(intity.email);
        //     setRole(intity.role);
        //     setOrganisation(intity.organisation);
        //     setImage(intity.image);
        //     console.log("intity", intity)
        // } else {
        //     setMessage("User not found");
        // }
        // return intity;
    }

    const notification = (msg, type) => {
        toast[type](msg); 
    }

    const uploadFile = async (file, url) => {

        const res = await fetch(url, { method: 'PUT', body: file });
        console.log(res)
    
        return res;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const res = await updateUser(userId ,{
            role
        })
        if(res){
            if(res.status){
                notification("user updated successfully", "success")
                onClose();
            }else{
                notification("user update was unsuccessful", "error")
            }
        }else{
            notification("user update got unexpected error", "error")
        }
        // let temp_id
        // if(id){
        //     temp_id = id
        // }else{
        //     temp_id = generateAlphanumericId(10);
        // }
        
        // const dir_name = ensureUrlSafety(name.trim());

        // // const id = generateAlphanumericId(10);
        // const key = `${dir_name}-${temp_id}/personal/profile/profileImage`
        // let imgUrl = null
        // let tempUrl = ''
        // if(file)
        // {   
        //     console.log("file found in handleSubmit", file)
        //     tempUrl = await generateTempUrl(key)
        //     if (!tempUrl?.url) 
        //         {
        //         notification('Error generating presigned url', 'error')
        //         return;
        //     }
        // }
        // if(tempUrl?.url){
        //     const uploadResponse = await uploadFile(file, tempUrl?.url);
        //     if(uploadResponse.statusText == 'OK')
        //     {
        //         console.log("file uploaded", uploadResponse)
        //         imgUrl = removeQueryParameters(uploadResponse?.url);
        //         console.log("imgUrl", imgUrl)
        //         setImage(imgUrl);
        //     }
        //     else{
        //         notification('Error uploading file', 'error')
        //         return;
        //     }
        // }
        
        
       
        // const sendUser = {
        //     _id: temp_id,
        //     name: name.trim(),
        //     mobile: mobile.trim(),
        //     email: email.trim(),
        //     address: address.trim(),
        //     city: city.trim(),
        //     password: password.trim(),
        //     role: 'Admin',
        //     clientType: clientType.trim(),
        //     state: state.trim(),
        //     district: district.trim(),
        //     organisation: organisation.trim(),
        //     address: address.trim()
        // }

        // if(imgUrl){
        //     sendUser.image = imgUrl;
        // }else{
        //     sendUser.image = image;
        // }

        // console.log("sendUser", sendUser)
        // if (mode == 'edit') {
           
        //     updateUser(sendUser, userId);
        //     props?.notification('User Updated Successfully', 'success');
        //     onClose();
        // }   else {  
        //     createUser(sendUser)
        //     props?.notification('User Created Successfully', 'success');
        //     onClose();
        // }
        // console.log('submit');
    }




    const onClose = () => {
        props.close();
        navigate(uriLocation.pathname);
    }

   


    const handleFile = (e) => {
        // let cur_file = e.target.files[0];
        // const tempFileArray = []
        // for (let i = 0; i < file.length; i++) {
        //     const fileType = file[i]['type'];
        //     const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        //     if (validImageTypes.includes(fileType)) {
        //         let tempFile = {
        //             id: i + 'ABC' + Math.floor(Math.random() * 1000),
        //             file: file[i],
        //             isPrimary: false,
        //             urlOfFile: URL.createObjectURL(file[i])
        //         }
        //         if (files.length == 0 && i == 0) {
        //             tempFile = { ...tempFile, isPrimary: true }
        //         }
        //         tempFileArray.push(tempFile)
        //         // setFile([...files, tempFile]);
        //     } else {
        //         setMessage("only images accepted");
        //     }
        // }
       // setFile(cur_file);
        // setImage(URL.createObjectURL(cur_file));
    };
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
                            <div className="  space-y-2 mt-3">
                            <Input id='Email' value={email} onChange={setEmail} disabled={true} required={true} />
                            <SelectValues id='role' items={["Admin", "User"]} label={'Role'} setSelectedItem={setRole} selectedItem={role} />
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
                             </div>*/}
                            <div className="flex justify-center mt-5">
                               { mode=='view'?"": <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={disabled} >Submit</button>}
                            </div> 
                        </form>
                    }
                </Card>)}
        </Modal>
</>
    )
}
export default CreateUser;







// import React, {useState} from 'react'
// import Modal from './Modal/Modal'
// import Card from './utilities/Card'
// import UploadImage from '../shared/UploadImage'
// import UploadUserImage from '../shared/UploadUserImage'

// function CreateUser() {
//     const [image, setImage] = useState('')
//     const handleFile = (e) => {
//         const file = e.target.files[0];
//         console.log("file here",e)
//         console.log(URL.createObjectURL(file))
//         setImage(URL.createObjectURL(file))
//     }
//   return (
//     <>
//     <Modal>
//         <Card
//         header={"title"} close={()=>console.log('close')}
//         >
//             <UploadImage image={image} handleFile={handleFile}/>
//             {/* <UploadUserImage image={image} handleFile={handleFile}/> */}
//         </Card>
    
//     </Modal>
//     </>
//   )
// }

// export default CreateUser
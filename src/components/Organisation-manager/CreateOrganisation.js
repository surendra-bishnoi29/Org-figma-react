import React, { useEffect, useState } from "react";
import Modal from '../Modal/Modal'
import Input from "../utilities/Input";
import Card from '../utilities/Card'
import UploadImage from "../../shared/UploadImage";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { createUser, getAllUsers, updateUser } from "../../Actions/userAction";
import LoadingSpinner from "../utilities/LoadingSpinner";
import SelectValues from "../utilities/SelectValues";
import Notification from "../../Notification";
import { generateTempUrl } from "../../Actions/fileActions";
import { ensureUrlSafety, generateAlphanumericId } from "../utilities/utilityFunctions";
import { Toaster, ToastIcon, toast, resolveValue } from "react-hot-toast";
import { removeQueryParameters } from "../../shared/Utils";
import TextArea from "../utilities/TextArea";
import { createOrganisation, getAllOrganisations, getOrganisationDetails, updateOrganisation } from "../../Actions/OrganisationActions";
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import { storage } from "../../firebase"; 
  



const CreateUser = (props) => {
    console.log("CreateUser", props)
    const navigate = useNavigate();
    const uriLocation = useLocation();
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode');
    const orgId = searchParams.get('id');
    console.log("mode", mode, "orgId", orgId)


    

    const [user, setUser] = useState({});
    const [file, setFile] = useState(undefined);
    const [name, setName] = useState('');
    const [credits, setCredits] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [disabled, setDisabled] = useState(mode == 'view' ? true : false);
    const [image, setImage] = useState('');
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [title, setTitle] = useState("Create Organisation");
    const [expiryDuration, setExpiryDuration] = useState();
    const [password, setPassword] = useState('');
    const [domain, setDomain] = useState('');
    const [role, setRole] = useState('User');
    const [clientType, setClientType] = useState('');
    const [id, setId] = useState('');


    useEffect(() => {
        if (mode == 'view' || mode == 'edit') {
            setTitle(mode == 'view' ? 'View Organisation' : 'Edit Organisation')
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
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
    }, [])


    const getUser = async() => {
        const response = await getOrganisationDetails(orgId);
        // let intity
        // console.log("userId", orgId, response)
        // response.map((i) => {
        //     if (i._id == orgId) {
        //         intity = i
        //         console.log("found", intity)
        //     }
        // })
        if (response.status) {
            setId(response.org?._id);
            setName(response.org?.name);
            setCredits(response.org?.credits);
            setExpiryDuration(response.org?.expiryDuration);
            // setCity(intity.city);
            // setDistrict(intity.district);
            // setAddress(intity.address);
            // setState(intity.state);
            // setPassword(intity.password);
            // setClientType(intity?.clientType);
            // setEmail(intity.email);
            // setRole(intity.role);
            setDomain(response.org?.domain);
            // setImage(intity.image);
            console.log("org intity", response)
        } else {
            setMessage("Org not found");
        }
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
        let temp_id
        if(id){
            temp_id = id
        }else{
            temp_id = generateAlphanumericId(10);
        }
        
        const dir_name = ensureUrlSafety(name.trim());

        // const id = generateAlphanumericId(10);
        const key = `${dir_name}-${temp_id}/personal/profile/profileImage`
        let imgUrl = null
        let tempUrl = ''
        if(file)
        {   
            console.log("file found in handleSubmit", file)
            tempUrl = await generateTempUrl(key)
            if (!tempUrl?.url) 
                {
                notification('Error generating presigned url', 'error')
                return;
            }
        }
        if(tempUrl?.url){
            const uploadResponse = await uploadFile(file, tempUrl?.url);
            if(uploadResponse.statusText == 'OK')
            {
                console.log("file uploaded", uploadResponse)
                imgUrl = removeQueryParameters(uploadResponse?.url);
                console.log("imgUrl", imgUrl)
                setImage(imgUrl);
            }
            else{
                notification('Error uploading file', 'error')
                return;
            }
        }
        
        
       
        const sendUser = {
            name: name.trim(),
            credits: credits,
            expiryDuration: expiryDuration,
            // email: email.trim(),
            // address: address.trim(),
            // city: city.trim(),
            // password: password.trim(),
            // role: role.trim(),
            // clientType: clientType.trim(),
            // state: state.trim(),
            // district: district.trim(),
            domain: domain.trim(),
            // address: address.trim()
        }

        // if(imgUrl){
        //     sendUser.image = imgUrl;
        // }else{
        //     sendUser.image = image;
        // }

        console.log("sendUser", sendUser)
        if (mode == 'edit') {
           
            const res = await updateOrganisation(sendUser, orgId);
            console.log("res while updating org", res)
            if (res.status){
            props?.notification('Organiation Updated Successfully', 'success');
            onClose();
            }else{
                props?.notification('failed to update', 'error');
            }
            
        }   else { 
            const res = await createOrganisation(sendUser)
            console.log("res while creating org", res)
            if (res.status){
            props?.notification('Organisation Created Successfully', 'success');
            onClose();
            }else{
                props?.notification('failed to create organisation', 'error');
            }
        }
        console.log('submit');
    }




    const onClose = () => {
        props.close();
        navigate(uriLocation.pathname);
    }

   


    // const handleFile = (e) => {
    //     let cur_file = e.target.files[0];
    //     const tempFileArray = []
    //     // for (let i = 0; i < file.length; i++) {
    //     //     const fileType = file[i]['type'];
    //     //     const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    //     //     if (validImageTypes.includes(fileType)) {
    //     //         let tempFile = {
    //     //             id: i + 'ABC' + Math.floor(Math.random() * 1000),
    //     //             file: file[i],
    //     //             isPrimary: false,
    //     //             urlOfFile: URL.createObjectURL(file[i])
    //     //         }
    //     //         if (files.length == 0 && i == 0) {
    //     //             tempFile = { ...tempFile, isPrimary: true }
    //     //         }
    //     //         tempFileArray.push(tempFile)
    //     //         // setFile([...files, tempFile]);
    //     //     } else {
    //     //         setMessage("only images accepted");
    //     //     }
    //     // }
    //     setFile(cur_file);
    //     setImage(URL.createObjectURL(cur_file));
    // };
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
                            <div className=" flex space-x-2 mt-3">
                                <Input id='Organisation Name' value={name} onChange={setName} disabled={disabled} required={true} />
                                <Input id='Domain' value={domain} onChange={setDomain} disabled={disabled} required={true} />
                            </div>
                            <div className=" flex space-x-2 mt-3">
                                <Input id='Credits' value={credits} onChange={setCredits} disabled={disabled} required={true} type="number" />
                                <Input id='Expiry Duration (in days)' value={expiryDuration} onChange={setExpiryDuration} disabled={disabled} required={true} type="number"  />
                            </div>
                            {/* <div className=" flex space-x-2 mt-3">
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
                            <div className=" flex items-center space-x-2 mt-3 ">
                                <SelectValues id='User Role' items={["Admin", "User"]} label={'Role'} setSelectedItem={setRole} selectedItem={role} />
                                <Input id='Password' value={password} onChange={setPassword} disabled={disabled} required={true} />
                            </div> */}
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
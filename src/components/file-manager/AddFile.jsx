import React, { useEffect, useState, useRef } from 'react'
import Modal from '../Modal/Modal'
import Card from '../utilities/Card'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import SelectValues from '../utilities/SelectValues';
import SelectDocumentType from './SelectDocumentType';
import UploadFiles from '../utilities/UploadFiles';
import TextArea from '../utilities/TextArea';
import Input from '../utilities/Input';
import { addFile, generateTempUrl } from '../../Actions/fileActions';
import { ensureUrlSafety, generateAlphanumericId, getExtension } from '../utilities/utilityFunctions';
import axios from "axios";
import { Toaster, ToastIcon, toast, resolveValue } from "react-hot-toast";
import Notification from '../../Notification';
import { removeQueryParameters } from '../../shared/Utils';

const years = Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, i) => 2000 + i);
const financialYears = years.map(year => `${year}-${year % 100 + 1}`).reverse();

function AddFile(props) {

  console.log("ADD FILES", props)
  const navigate = useNavigate();
  const uriLocation = useLocation();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const userId = searchParams.get('id');
  console.log("mode", mode, "userId", userId)

  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');

  const [fileName, setFileName] = useState(null);
  const [description, setDescription] = useState(null);

  const [selectedYear, setSelectedYear] = useState(financialYears[0]);
  const [documentType, setDocumentType] = useState('personal');

  const [category, setCategory] = useState('');
  const [categoryType, setCategoryType] = useState(''); 

  // Generate a list of financial years from 2000 to the current year



  // const { files = [], handleFile, existingImages = [], disabled } = props;

  const handleFile = async (e) => {
    const selectedFile = e.target.files[0];
    console.log("selectedFile", selectedFile)
    setFile(selectedFile)
    // key = ''
    // const tempUrl = await generateTempUrl(selectedFile.name, )

    // const uploadResponse = await fetch(tempUrl?.url, {
    //   method: 'PUT',
    //   headers: { 
    //     'Content-Type': selectedFile.type 

    //   },
    //   body: selectedFile,
    //   onUploadProgress: (progressEvent) => {
    //     const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    //     console.log("percentCompleted", percentCompleted)
    //     setUploadProgress(percentCompleted);
    //   }
    // });

    // uploadFile(selectedFile, tempUrl?.url, tempUrl?.file_name);
  }


  const uploadFile = async (file, url) => {

    const res = await fetch(url, { method: 'PUT', body: file });
    console.log(res)

    return res;
    // const uploadResponse = await axios.put(url, file, {
    //   headers: {
    //     "Content-Type": file.type,
    //     "Access-Control-Allow-Origin": "*"
    //   },
    //   onUploadProgress: (progressEvent) => {
    //     const percentCompleted = Math.round(
    //       (progressEvent.loaded * 100) / progressEvent.total
    //     );
    //     // setUploadProgress(percentCompleted);
    //     console.log(`Upload Progress: ${percentCompleted}%`);
    //   },
    // });
    // console.log("upload response ", uploadResponse);
    // const xhr = new XMLHttpRequest();
    // xhr.open('PUT', url, true);
    // xhr.setRequestHeader('Content-Type', file.type);

    // xhr.upload.onprogress = (event) => {
    //   if (event.lengthComputable) {
    //     const percentCompleted = Math.round((event.loaded * 100) / event.total);
    //     setUploadProgress(percentCompleted);
    //   }
    // };

    // xhr.onload = () => {
    //   if (xhr.status === 200) {
    //     // setUploadedFileName(fileName);
    //     // setUploadedFileUrl(url.split('?')[0]);
    //   } else {
    //     console.log('Upload failed:', xhr.responseText);
    //   }
    // };

    // xhr.onerror = () => {
    //   console.error('Upload error:', xhr.responseText);
    // };

    // xhr.send(file);
  };

  // const inputRef = useRef(null);

  // const onInputChange = (e) => {
  //   handleFile(e)
  //   if (inputRef.current) {
  //     inputRef.current.value = '';
  //   }

  // }

  const notification = (msg, type) => {
    toast[type](msg);
  }



  const submitFiles = async () => {
    const file_name = fileName.trim();
    if (!file_name || !description || !file) {
      notification('Please fill all the fields', 'error')
      return;
    }
    if (documentType == "financial" && !selectedYear) {
      notification('Please select a financial year', 'error')
      return;
    }
    let fileUrl = '';
    let key = ''
    let parsed_user_name = ensureUrlSafety(props?.modalUser?.name?.trim());
    let parsed_file_name = ensureUrlSafety(file_name);
    console.log("check file type of file", file)
    let parsed_extension = getExtension(file.name);
    if (documentType == "financial") {
      key = `${parsed_user_name}-${props?.modalUser?._id}/financial/${selectedYear}/${parsed_file_name}.${parsed_extension}`
    }
    else {
      key = `${parsed_user_name}-${props?.modalUser?._id}/personal/${parsed_file_name}.${parsed_extension}`
    }
    const tempUrl = await generateTempUrl(key)
    if (!tempUrl?.url) {
      notification('Error generating presigned url', 'error')
      return;
    }
    const uploadResponse = await uploadFile(file, tempUrl?.url);

    if (uploadResponse.statusText == 'OK') {
      console.log("file uploaded", uploadResponse)
      fileUrl = removeQueryParameters(uploadResponse?.url);
      console.log("fileUrl", fileUrl)
    }
    else {
      notification('Error uploading file', 'error')
      return;
    }



    const file_data = {
      user_id: props.modalUser._id,
      file_name: file_name,
      s3_url: fileUrl,
      description,
      category,
      categoryType,
      type: file.type,
      document_type: documentType,
      //financial_year,
      created_at: Date.now(),
      // modified_at
    }
    if (documentType == "financial") {
      file_data.financial_year = selectedYear;
    }
    console.log("file_data", file_data)


    const response = await addFile(file_data);
    console.log("response", response)
    if (response) {
      onClose();
    }
  }

  const onClose = () => {
    props.close();
    console.log("hii",uriLocation)
    navigate(uriLocation.pathname+`?id=${userId}`);
  }
  return (
    <>
      <Notification />
      <Modal>
        <Card header={"Add File"} close={onClose}>
          <div className=' flex flex-col gap-2 '>
            <sapn  className=' w-full flex justify-center'><UploadFiles files={file} handleFile={handleFile} disabled={false} /></sapn>
            <Input id='File Name' value={fileName} onChange={(value) => { setFileName(value) }} />
            <span className=' text-[10px] text-blue-400 -mt-2'>please avoid special characters and space in file name except hyphen ('-')</span>
            <TextArea id='Description' value={description} onChange={(value) => { setDescription(value) }} />
            <div className=' flex min-w-[300px] gap-2'>
              <SelectValues items={["personal", "financial"]} label={'Document Type'} setSelectedItem={setDocumentType} selectedItem={documentType} />
              {documentType == "financial" && <SelectValues items={financialYears} label={'Financial Year'} setSelectedItem={setSelectedYear} selectedItem={selectedYear} />}
            </div>
            <div className=' flex gap-2'>
              <Input id='Category' onChange={(value) => { setCategory(value) }} value={category} disabled={false} />
              <Input id='Category Type' onChange={(value) => { setCategoryType(value) }} value={categoryType} disabled={false} />
            </div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ' onClick={submitFiles}>submit</button>
          </div>
        </Card>
      </Modal>
    </>
  )
}

export default AddFile



// import React from 'react'
// import AddFileIcon from '../../Icons/AddFileIcon'

// function AddFile(props) {
//     const {showText = false} = props
//   return (
//     <>
//     <span className=' flex items-center gap-2'>
//     <span className=' w-6 h-6'><AddFileIcon/></span>
//    {showText && <span className=''>Add File</span>}
//     </span>
//     </>
//   )
// }

// export default AddFile
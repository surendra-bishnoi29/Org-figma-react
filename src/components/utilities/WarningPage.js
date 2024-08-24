import React from 'react'
import Modal from '../Modal/Modal'
import Card from './Card'


function WarningPage(props) {
    const {warningMsg = 'Are you sure you want to delete ?' } = props;
    const confirmation = (c)=>{
        props.targetFunction(c)
    }
  return (
    <Modal>
        <Card>
            <div className='mt-2 mb-4 '>{warningMsg}</div>
            <div className=' flex gap-2 w-full justify-center'>
            <div className=' bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer' onClick={()=>{confirmation(true)}}> OK</div>
            <div className=' bg-gray-500 text-white px-5 py-2 rounded-full cursor-pointer' onClick={()=>{confirmation(false)}}>Cancel</div>
            </div>
        </Card>
    </Modal>
  )
}

export default WarningPage
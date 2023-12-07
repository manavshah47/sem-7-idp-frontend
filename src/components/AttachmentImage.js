import React from 'react'

const AttachmentImage = ({url, closeFunc}) => {
  return (
    <div className='attachment-image flex justify-center items-center' style={{cursor:'zoom-out'}} onClick={closeFunc}>
        <img src={url} alt="" />
    </div>
  )
}

export default AttachmentImage

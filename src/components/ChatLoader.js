import React from 'react'

const ChatLoader = () => {
  return (
    <div className='flex justify-center items-center' style={{justifyContent : 'center' , zIndex : 99}}>
    <img autoPlay={true} loop={true} src="/images/chatLoader-unscreen.gif" type="image/gif" />
    </div>
  )
}

export default ChatLoader

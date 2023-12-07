import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify';
import CircleLoader from './CircleLoader';
import ChatLoader from './ChatLoader'
import Loader from './Loader';
import { connect } from 'react-redux';
import '../companyform.css'
import AttachmentImage from './AttachmentImage';

// import PDFViewer from 'pdf-viewer-reactjs'
// import { PDFViewer } from 'react-view-pdf';

import { pdfjs, Document, Page, Outline } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();


const mapStateToProps = ({ session }) => ({
  session
})

const CONNECTED_EVENT = "connected";
const DISCONNECT_EVENT = "disconnect";
const JOIN_CHAT_EVENT = "joinChat";
const NEW_CHAT_EVENT = "newChat";
const TYPING_EVENT = "typing";
const STOP_TYPING_EVENT = "stopTyping";
const MESSAGE_RECEIVED_EVENT = "messageReceived";
const LEAVE_CHAT_EVENT = "leaveChat";
const UPDATE_GROUP_NAME_EVENT = "updateGroupName";

const ChatHome = ({ session, socket }) => {

    // const currentChat = useRef(null);
    const [currentChat, setCurrentChat] = useState(null)

    const [currentParticipant, setCurrentParticipant] = useState({})

    const [ currentUserImage , setCurrentUserImage ] = useState("images/dp.jpg")

    // show attachment image in big screen
    const [showImage, setShowImage] = useState({})
 
    // onclick event on iframe
    const [iframeMouseOver , setIframeMouseOver] = useState(false)
    const [PDFUrl, setPDFUrl] = useState()

    const [availableUsers ,setAvailableUsers] = useState([])

    // To keep track of the setTimeout function
    const typingTimeoutRef = useRef(null);

    const [showModal, setShowModal] = useState(false) 

    
    const ref = useRef(null);
    const attachmentRef = useRef(null)
  
    // Define state variables and their initial values using 'useState'
    const [isConnected, setIsConnected] = useState(false); // For tracking socket connection
    const [circleLoaderState,setCircleLoader] = useState(false)
    const [loader,setLoader] = useState(false)
    const [openAddChat, setOpenAddChat] = useState(false); // To control the 'Add Chat' modal
    const [loadingChats, setLoadingChats] = useState(false); // To indicate loading of chats
    const [loadingMessages, setLoadingMessages] = useState(false); // To indicate loading of messages

    const [chats, setChats] = useState([]); // To store user's chats
    const [messages, setMessages] = useState([]); // To store chat messages
    const [unreadMessages, setUnreadMessages] = useState(
      []
    ); // To track unread messages
  
    const [isTyping, setIsTyping] = useState(false); // To track if someone is currently typing
    const [selfTyping, setSelfTyping] = useState(false); // To track if the current user is typing
  
    const [message, setMessage] = useState(""); // To store the currently typed message
    const [attachment, setAttachment] = useState("")

    useEffect(() => {
      localStorage.removeItem("currentChat")
    }, [])

    const findMember = async () => {
        axios.defaults.withCredentials = true
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/chat/search-users`, {}, {"headers": {"Content-Type":"application/json"}})
        if(response.data.success){
          setShowModal(true)
          setAvailableUsers(response.data.users)
        } else {
          toast(response.data.message)
        }
    }

    const toggleModal = () => {
      setShowModal(!showModal)
    }

    const createChatWithUser = async (receiverPhone) => {
        axios.defaults.withCredentials = true
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/chat/get-one-to-one-chat/${receiverPhone}`)
        if(response.data.success) {
          getChats()
        } else {
          toast(response.data.message)
        }
        toggleModal()
        setAvailableUsers([])
    }

    /**
   *  A  function to update the last message of a specified chat to update the chat list
   */
  const updateChatLastMessage = (
    chatToUpdateId,
    message // The new message to be set as the last message
  ) => {
    // Search for the chat with the given ID in the chats array
    const chatToUpdate = chats.find((chat) => chat._id === chatToUpdateId);

    // Update the 'lastMessage' field of the found chat with the new message
    chatToUpdate.lastMessage = message;

    // Update the 'updatedAt' field of the chat with the 'updatedAt' field from the message
    chatToUpdate.updatedAt = message?.updatedAt;

    // Update the state of chats, placing the updated chat at the beginning of the array
    setChats([
      chatToUpdate, // Place the updated chat first
      ...chats.filter((chat) => chat._id !== chatToUpdateId), // Include all other chats except the updated one
    ]);
  };

  const getChats = async () => {
    setLoader(true)
    axios.defaults.withCredentials = true
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/chat/all-chats`, {headers: {"Content-Type":"application/json"}})
    setLoader(false)
    if(response.data.success) {
      setChats(response.data.chats || [])
    } else {  
      toast(response.data.message)
    }
  };

  const getMessages = async () => {
    // Check if a chat is selected, if not, show an alert
    if (!currentChat?._id) return;
    
    //  alert("No chat is selected");
    
    // Check if socket is available, if not, show an alert
    if (!socket) return alert("Socket not available");
    
    setCircleLoader(true)
    setMessages([])
    // Emit an event to join the current chat
    socket.emit(JOIN_CHAT_EVENT, currentChat?._id);
    
    // Filter out unread messages from the current chat as those will be read
    setUnreadMessages(
      unreadMessages.filter((msg) => msg.chat !== currentChat?._id)
      );
      
      
      axios.defaults.withCredentials = true
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/chat/get-chat-messages/${currentChat?._id || ""}`, {headers: {"Content-Type":"application/json"}})
      if(response.data.success) {
        setMessages(response.data.messages || [])
      } else {  
        toast(response.data.message)
      }
      setCircleLoader(false)
  };

  // Function to send a chat message
  const sendChatMessage = async () => {
    // If no current chat ID exists or there's no socket connection, exit the function
    if (!currentChat?._id || !socket) return;

    // Emit a STOP_TYPING_EVENT to inform other users/participants that typing has stopped
    socket.emit(STOP_TYPING_EVENT, currentChat?._id);

    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/chat/send-message/${currentChat?._id || ""}`, {content: message, file: attachment}, {"headers":{"Content-Type":"multipart/form-data"}})
    if(response.data.success) {
      // if message sent is type of String message then do accordingly
        setMessage("")
        setAttachment("")
        setMessages((prev) => [...prev, response.data.message]);
        updateChatLastMessage(currentChat?._id || "", response.data.message);
    } else {
      toast(response.data.message)
    }
  };

  const handleOnMessageChange = (e) => {
    // Update the message state with the current input value
    setMessage(e.target.value.trimStart());

    // If socket doesn't exist or isn't connected, exit the function
    if (!socket || !isConnected) return;

    // Check if the user isn't already set as typing
    if (!selfTyping) {
      // Set the user as typing
      setSelfTyping(true);

      // Emit a typing event to the server for the current chat
      socket.emit(TYPING_EVENT, currentChat?._id);
    }

    // Clear the previous timeout (if exists) to avoid multiple setTimeouts from running
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Define a length of time (in milliseconds) for the typing timeout
    const timerLength = 3000;

    // Set a timeout to stop the typing indication after the timerLength has passed
    typingTimeoutRef.current = setTimeout(() => {
      // Emit a stop typing event to the server for the current chat
      socket.emit(STOP_TYPING_EVENT, currentChat?._id);

      // Reset the user's typing state
      setSelfTyping(false);
    }, timerLength);
  };

  const onConnect = () => {
    setIsConnected(true);
  };
  
  const onDisconnect = () => {
    setIsConnected(false);
  };

  /**
   * Handles the "typing" event on the socket.
   */
  const handleOnSocketTyping = (chatId) => {
    // Check if the typing event is for the currently active chat.
    if (chatId !== currentChat?._id) return;
    
    // Set the typing state to true for the current chat.
    setIsTyping(true);
  };

  /**
   * Handles the "stop typing" event on the socket.
  */
 const handleOnSocketStopTyping = (chatId) => {
    // Check if the stop typing event is for the currently active chat.
    if (chatId !== currentChat?._id) return;

    // Set the typing state to false for the current chat.
    setIsTyping(false);
  };

  /**
   * Handles the event when a new message is received.
   */
  const onMessageReceived = (message) => {
    // Check if the received message belongs to the currently active chat
    if (message?.chat !== currentChat?._id) {
      // If not, update the list of unread messages
      setUnreadMessages((prev) => [message, ...prev]);
    } else {
      // If it belongs to the current chat, update the messages list for the active chat
      setMessages((prev) => [...prev, message]);
    }

    // Update the last message for the chat to which the received message belongs
    updateChatLastMessage(message.chat || "", message);
  };

  const onNewChat = (chat) => {
    setChats((prev) => [chat, ...prev]);
  };

  // This function handles the event when a user leaves a chat.
  const onChatLeave = (chat) => {
    let currentCHT = JSON.parse(localStorage.getItem("currentChat"))

    // Check if the chat the user is leaving is the current active chat.
    if (chat._id === currentCHT?._id) {
      // If the user is in the group chat they're leaving, close the chat window.
      setCurrentChat(null);
      localStorage.setItem("currentChat", null)
      // Remove the currentChat from local storage.
      // LocalStorage.remove("currentChat");
    }
    // Update the chats by removing the chat that the user left.
    setChats((prev) => prev.filter((c) => c._id !== chat._id));
  };

  useEffect(() => {
    // Fetch the chat list from the server.
    getChats();

    // we will join the chat when user clicks on button
    // Retrieve the current chat details from local storage.
    const _currentChat = JSON.parse(localStorage.getItem("currentChat"))
    // If there's a current chat saved in local storage:
    if (_currentChat) {
      // Set the current chat reference to the one from local storage.
      setCurrentChat(_currentChat);
      // If the socket connection exists, emit an event to join the specific chat using its ID.
      socket?.emit(JOIN_CHAT_EVENT, _currentChat?._id);
      // Fetch the messages for the current chat.
      getMessages();
    }

    // An empty dependency array ensures this useEffect runs only once, similar to componentDidMount.
  }, []);

  

  // This useEffect handles the setting up and tearing down of socket event listeners.
  useEffect(() => {
    // If the socket isn't initialized, we don't set up listeners.
    if (!socket) return;

    // Set up event listeners for various socket events:
    // Listener for when the socket connects.
    socket.on(CONNECTED_EVENT, onConnect);
    // Listener for when the socket disconnects.
    socket.on(DISCONNECT_EVENT, onDisconnect);
    // Listener for when a user is typing.
    socket.on(TYPING_EVENT, handleOnSocketTyping);
    // Listener for when a user stops typing.
    socket.on(STOP_TYPING_EVENT, handleOnSocketStopTyping);
    // Listener for when a new message is received.
    socket.on(MESSAGE_RECEIVED_EVENT, onMessageReceived);
    // Listener for the initiation of a new chat.
    socket.on(NEW_CHAT_EVENT, onNewChat);
    // Listener for when a user leaves a chat.
    socket.on(LEAVE_CHAT_EVENT, onChatLeave);
    // Listener for when a group's name is updated.
    // socket.on(UPDATE_GROUP_NAME_EVENT, onGroupNameChange);

    // When the component using this hook unmounts or if `socket` or `chats` change:
    return () => {
      // Remove all the event listeners we set up to avoid memory leaks and unintended behaviors.
      socket.off(CONNECTED_EVENT, onConnect);
      socket.off(DISCONNECT_EVENT, onDisconnect);
      socket.off(TYPING_EVENT, handleOnSocketTyping);
      socket.off(STOP_TYPING_EVENT, handleOnSocketStopTyping);
      socket.off(MESSAGE_RECEIVED_EVENT, onMessageReceived);
      socket.off(NEW_CHAT_EVENT, onNewChat);
      socket.off(LEAVE_CHAT_EVENT, onChatLeave);
      // socket.off(UPDATE_GROUP_NAME_EVENT, onGroupNameChange);
    };

    // Note:
    // The `chats` array is used in the `onMessageReceived` function.
    // We need the latest state value of `chats`. 
    // If we don't pass `chats` in the dependency array, the `onMessageReceived` will consider the initial value of the `chats` array, which is empty.
    // This will not cause infinite renders because the functions in the socket are getting mounted and not executed.
    // So, even if some socket callbacks are updating the `chats` state, it's not
    // updating on each `useEffect` call but on each socket call.
  }, [socket, chats]);

  const fetchCurrentImage = async (imgURL) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/get-profile-image`, {url:imgURL} , {headers: {"Content-Type":"application/json"}})
      return response.data
    } catch (error) {
      return error
    }
  }

  const fetchCurrentChatProfileImages = async () => {
    const resp2 = await fetchCurrentImage(session.profileImage)
    if(resp2.success){
      setCurrentUserImage(resp2.url)
    }
  }
    
  useEffect(() => {
    setCurrentParticipant(currentChat?.participants.find((participant) => participant._id != session._id))
    getMessages()
    fetchCurrentChatProfileImages()
    localStorage.setItem("currentChat", JSON.stringify(currentChat))
  }, [currentChat])

  const getParticipant = (chat) => {
    return chat?.participants.find((participant) => participant._id != session._id)
  }

  const scrollToLastChat = () => {
    const lastChildElement = ref.current?.lastElementChild;
    lastChildElement?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToLastChat()
  }, [messages])

  const onAttchmentChange = (event) => {
    setAttachment(event.target?.files[0])
  }

  useEffect(() => {
    if(attachment != ""){
      sendChatMessage()
    }
  }, [attachment])

  const deleteChat = async (chat) => {
    const confirmation = window.confirm("Are you sure, you want to delete the chat?")
    if(confirmation){
      axios.defaults.withCredentials = true
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/chat/delete-one-to-one-chat/${chat._id}`)
      if(response.data.success) {
        setChats((prev) => prev.filter((c) => c._id != chat._id))
        if(currentChat?._id == chat._id){
          setCurrentChat(null)
        }
        socket.emit(LEAVE_CHAT_EVENT, chat);
      }
    }
  }

  const clickFileInput = () => {
    attachmentRef.current.click();
  }

  const openAttachment = (file) => {
    if(file.type == "image") {
      setShowImage({showImage: true, url:file.url})
    } else if(file.type == "pdf") {
      window.open(file.url + "#toolbar=0")
    }
  }
  
  const closeImageShow = () => {
    setShowImage({})
  }

  if(!socket || session.isApproved == false) {
    return (
      <div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', color:'black' }}>
        <p> Only Approved Members can acccess chat </p>
      </div>
    )
  }

  if(loader){
    return (
    <div style={{width : '100%', height:'100%'}}>
        <Loader/>
    </div>
    )
  } else {
  return (
    <div style={{ padding:"0 65px", maxHeight:'100vh', overflow:'hidden', background:'white' }}>
      {showModal && (
        <div className=" fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="addMember relative w-auto my-6 mx-auto " style={{width:"30%"}}>
            {/* Modal content */}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* Header */}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className='' style={{paddingTop:'20px',fontWeight:"bold", fontSize: '15px', letterSpacing:'0.5px',textTransform:"uppercase", color:'#0f3c69'}}>Member's List</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={toggleModal}
                >
                  <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none" style={{color:'red', fontSize:'35px'}}>
                    ×
                  </span>
                </button>
              </div>
              {/* Body */}
              <div className="relative flex-auto">
                {availableUsers?.map((user, index) => (
                  <div
                    key={user.phone}
                    className="flex justify-between items-center hover:bg-[#A9A9A9] rounded-md"
                    style={{padding:'1rem'}}>
                    <div>
                      <p style={{color :'black',fontWeight:"bold", fontSize: '15px', letterSpacing:'0.5px',textTransform:"uppercase", color:'#0f3c69'}}>
                        {index + 1}. {user?.firstName} {user?.lastName}
                      </p>
                    </div>
                    <div>
                      <button
                        name="add"
                        className="bg-[#0F3C69] text-white font-bold py-2 px-4 rounded"
                        onClick={() => createChatWithUser(user.phone)}
                        style={{textTransform:"uppercase"}}
                        >
                        Add
                      </button>
                      </div>
                  </div>
                ))}
              </div>
              {/* Footer */}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  // className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={toggleModal}
                  style={{color:'red', fontWeight:'bold',textTransform:'uppercase', marginRight:'10px'}}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    { showImage.showImage ?
      <AttachmentImage url={showImage.url} closeFunc={closeImageShow} /> : null
    }

    <div className={showModal ?  `opacity flex` : 'flex'}>
      <div  style={{width:"30%", height:'85vh', marginTop:'10px'}}>
        <div style={{position : "absolute",bottom : '10px'}}>
          <button name="fine-member" className='plus-button' style={{ width: "50px", height:"50px" , background:"#0F3C69", borderRadius:'100%', fontSize:'30px', fontWeight:'600' }} onClick={findMember}> + </button>
        </div>
        { 
        chats?.map((chat, index) => {
          const participant = getParticipant(chat)
          const unreadChats = unreadMessages?.filter((n) => n.chat === chat._id).length
          return (
            <div>
              <div key={index} className={chat._id == currentChat?._id ? 'current-chat chat-block flex' : 'chat-block flex'} onClick={() => setCurrentChat(chat)}>
                <div className='chatProfilePhoto'>
                  <img src={participant?.profileImage} style={{borderRadius:'50%', margin:'0 5px'}} />
                </div>
                <div>
                  <p style={{fontWeight:"bold",fontSize : '12px', letterSpacing:'0.5px', textTransform:"uppercase"}}>{participant?.firstName + " " + participant?.lastName}  {unreadChats ? <span style={{background:'#0f3c69', color:'white', padding:'6px 10px', borderRadius:'50%'}}>{unreadChats > 9 ? "9+" : unreadChats}</span> : null} </p>
                  <p style={{fontSize:'10px', letterSpacing:'0.5px'}}>{participant?.phone}</p>
                </div>
              </div>
            </div>
          )}
        )}
      </div>

      <div className='chatBorder chatBack'style={{width:"70%", height: '100vh'}}>
        {currentChat && currentChat?._id && 
          <div style={{color:"black"}}>
            <div className="chat-header flex justify-between">
              <div className='flex items-center justify-center'>
                <div className='chatProfilePhoto'>
                  <img src={currentParticipant?.profileImage} style={{borderRadius:'50%'}} />
                </div>
                <div>
                  <p style={{fontWeight:"bold", fontSize: '12px', letterSpacing:'0.5px',textTransform:"uppercase"}}>{currentParticipant?.firstName + " " + currentParticipant?.lastName}</p>
                  <p style={{fontSize:'10px', letterSpacing:'0.5px'}}>{currentParticipant?.phone}</p>
                </div>
              </div>
              <div style={{width:"35px", height:"35px", display:"flex", justifyContent:'center', alignItems:'center'}}>
                <img src="/images/delete.svg" alt="alternative" className='delete-icon' onClick={() => deleteChat(currentChat)} />
              </div>
          </div>

            
            {
              circleLoaderState ? <div style={{paddingLeft:"100px" ,display:'flex', width:'95%', color: 'black', flexDirection:'column', height:'79vh', justifyContent:"center",allignItems : 'center'}}> <ChatLoader/> </div>: 
            
         
            <div ref={ref} style={{display:'flex', width:'107.5%', color: 'black', flexDirection:'column', padding:"20px 20px", height:'79vh', overflowY:"auto"}}>
            {messages?.map((msg, index) => {
              if(msg.sender._id === session._id) {
                return (
                  <>
                  <div key={index} style={{maxWidth : "49%",overflowWrap : 'break-word' , background : 'gray' ,margin : "2px 0px", alignSelf : 'end',borderRadius : '10px', fontSize:"13px", letterSpacing:"0.5px"}}>
                    {msg.content && <p style={{color:"white", margin:"10px"}} >{msg.content}</p>}
                    {msg.attachment && 
                      <div onClick={() => openAttachment(msg.attachment)} style={{cursor:'pointer', margin: "5px 0",boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",}}>
                        {
                          msg.attachment.type == "pdf" ? 
                            <Document loading={<div className='flex justify-center items-center' style={{width:'300px', height:'300px'}}> <CircleLoader/> </div>} file={msg.attachment.url}> 
                              <Page pageNumber={1} /> 
                            </Document>
                             : 
                            <div style={{ margin: "5px 0",boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", cursor:"zoom-in"}} onClick={()=> openAttachment(msg.attachment)}> 
                              <img style={{ width:'300px', height:'300px', borderRadius:'5px' }} src={msg.attachment.url} /> 
                            </div>
                        }
                      </div>
                    }
                  </div>
                </>
              )
            } else {
              return (
                <>
                <div key={index} style={{maxWidth : "49%" ,overflowWrap : 'break-word',lineHeight:'1.58', background : '#0F3C69' ,margin : "2px 0px", alignSelf : "start",borderRadius : '10px', fontSize:"13px", letterSpacing:"0.5px"}}>      
                  {msg.content && <p style={{color:"white", margin:"10px"}} className={msg.sender._id === session._id ? "text-left" : ""} >{msg?.content}</p>}
                  {msg.attachment && 
                    <div onClick={() => openAttachment(msg.attachment)} style={{cursor:'pointer', margin: "5px 0",boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",}}>
                      {
                        msg.attachment.type == "pdf" ? 
                          <Document loading={<CircleLoader/>} file={msg.attachment.url}> 
                            <Page pageNumber={1} /> 
                          </Document>
                            : 
                          <div style={{ margin: "5px 0",boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", cursor:"zoom-in"}} onClick={()=> openAttachment(msg.attachment)}> 
                            <img style={{ width:'300px', height:'300px', borderRadius:'5px' }} src={msg.attachment.url} /> 
                          </div>
                      }
                    </div>
                  }
                </div>
              </>
            )
            }
            })}
          </div>
        }
          <div className='inputMsg' style={{width:'107.8%', display:'flex', justifyContent:'space-evenly',  alignItems:'center', padding: "10px 10px 0px 10px"}}>
            <div style={{width:'10%', height:"60px"}} className='flex justify-center items-center'>
              <img
                src='/images/attach.svg'
                alt='Send'
                style={{ width: '40px', cursor: 'pointer'}}
                className='chat-pointer'
                onClick={clickFileInput}
                />
                <input 
                  ref={attachmentRef}
                  type="file"
                  onChange={onAttchmentChange}
                  style={{display:'none'}}
                />
              </div>
            <div style={{width:'80%'}} className='flex justify-center items-center'>
              <input
                className='chat-input'
                placeholder="Type a message"
                value={message}
                onChange={handleOnMessageChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendChatMessage();
                  }
                }}
                style={{width:'100%',  marginLeft: '5px', alignItems:'center'}}
                />
            </div>
            <div style={{width:'10%', height:"60px"}} className='flex justify-center items-center'>
              <img
                src='/images/sendMsg.svg'
                alt='Send'
                style={{ width: '40px', cursor: 'pointer'}}
                className='chat-pointer'
                onClick={sendChatMessage}
                />
            </div>
       </div>
            
          </div>
      }
      </div>

    </div>
    </div>

  )
  }
}

export default connect(
  mapStateToProps
)(ChatHome)
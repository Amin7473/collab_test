"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { openAddPopup } from "@/common/store/slices/common";
import { Button, Popover, Select, TextInput, Menu, Table, Avatar, Group, rem, Text, Paper, ActionIcon, Stack} from '@mantine/core';
import { IconUpload, IconPhoto, IconX , IconDownload } from '@tabler/icons-react';
import { Dropzone, MIME_TYPES, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IoNotificationsOutline, IoSearchSharp } from "react-icons/io5";
import { FaGear, FaEllipsisVertical } from "react-icons/fa6";
import { RiDeleteBin6Line  } from "react-icons/ri";
import { FaPencilAlt  } from "react-icons/fa";
import ChatSideBar from "./chatSidebar";
import { MdOutlineChat } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { FaPhone, FaPaperPlane } from "react-icons/fa6";
import { ImAttachment } from "react-icons/im";
import { useSendMessage } from "../hooks/useSendMessage";
import { getSession } from "next-auth/react";
import { GiConversation } from "react-icons/gi";
import { useSelector } from "react-redux";
import UserAvatars from "./userAvatars";
import { useSendMessageGroup } from "../hooks/useSendMessageGroup";


function FileCard({ file, onRemove }) {
  return (
    <Paper
      shadow="xs"
      radius="md"
      withBorder
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        marginTop: '8px',
        border : 'none',
        padding : '7px'
      }}
    >
      <Text size="sm" truncate style={{ maxWidth: '150px' }}>
        {file.name}
      </Text>
      <ActionIcon color="red" variant="light" onClick={onRemove}>
        <IconX size={12} />
      </ActionIcon>
    </Paper>
  );
}

const handleDownload = (file) => {
  fetch(file.file_url)
    .then((response) => response.blob()) // Get file as a Blob
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = file.file_name || 'downloaded_file'; // Default file name if none provided
      anchor.click();
      window.URL.revokeObjectURL(blobUrl); // Clean up URL object
    })
    .catch((error) => console.error('Download failed:', error));
};

function MessageFileCard({ file }) {
  return (
    <Paper
      shadow="xs"
      radius="md"
      withBorder
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        marginTop: '8px',
        border : 'none',
        padding : '10px',
        // backgroundColor : 'white'
      }}
    >
      <Text size="sm" truncate style={{ maxWidth: '150px' }}>
        {file.file_name}
      </Text>
      <ActionIcon color="blue" variant="light" onClick={()=>{handleDownload(file)}}>
        <IconDownload size={14} />
      </ActionIcon>
    </Paper>
  );
}

export default function Chat() {
  const playNotificationSound = () => {
    console.log("playing sound")
    const audio = new Audio('/assets/audios/new_message_notification.wav'); // Use the correct path
    audio.play().catch((error) => {
      console.error('Error playing sound:', error);
    });
  };
    const user = useSelector((state) => state.auth?.user);
    const loginUser = user?.user_id;
    const dispatch = useDispatch();
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [messages, setMessages] = useState([]);
    const { control, setValue, watch  } = useForm();
    const socketRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [fileModalOpen, setFileModalOpen] = useState(false);


    const handleDrop = (acceptedFiles) => {
      setFiles(acceptedFiles);
      console.log('files bruh', acceptedFiles)
    };

    const handleRemoveFile = (index) => {
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const {
      mutate: sendMessageAPI,
      isSuccess: sendMessageSuccess,
      isError: sendMessageError,
      error: sendMessageErrors,
    } = useSendMessage();

    const {
      mutate: sendGroupMessageAPI,
      isSuccess: sendGroupMessageSuccess,
      isError: sendGroupMessageError,
      error: sendGroupMessageErrors,
    } = useSendMessageGroup();

    const messagesEndRef = useRef(null);
    const formatDateTime = (datetime) => {
      if (!datetime){
        return '-'
      }
      const date = new Date(datetime);
      return date.toLocaleString('en-US', {
        // weekday: 'short', // e.g., 'Mon'
        year: 'numeric',
        month: 'short', // e.g., 'Jan'
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        // second: '2-digit',
      });
    };

    const formatDateTimeShort = (datetime) => {
      if (!datetime){
        return '-'
      }
      const date = new Date(datetime);
      return date.toLocaleString('en-US', {
        // weekday: 'short', // e.g., 'Mon'
        // year: 'numeric',
        // month: 'short', // e.g., 'Jan'
        // day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        // second: '2-digit',
      });
    };

    useEffect(() => {
      if (selectedItem !== null | selectedGroup !== null) {
        setValue("search", ""); // Clear the 'search' field
        setFileModalOpen(false); // Clear the attachments field
        setFiles([]);
      }
    }, [selectedItem, setValue, selectedGroup]);


    const sendMessage = () => {
      console.log("in one-on-one msg");
    
      if (watch("search")?.length === 0 && !files?.length) {
        return;
      }
    
      const payload = {
        message: watch('search'),
        user_id: selectedItem?.id,
        attachments: files, // Array of selected files
      };
    
      sendMessageAPI(payload);
      setValue("search", "");
      setFiles([]); // Clear selected files after sending
      setFileModalOpen(false);
      // Scroll to the bottom of the chat (if applicable)
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    };

    const sendGroupMessage =() =>{
      console.log("in group msg");
      if (watch("search")?.length === 0){
        return (() => {});
      }
      console.log(watch("search"));
      sendGroupMessageAPI({
        message : watch('search'),
        group_id : selectedGroup?.id,
        attachments: files,
      })
      setValue("search", "");
      setFiles([]); // Clear selected files after sending
      setFileModalOpen(false);
    }

    useEffect(() => {
      if (selectedItem === null & selectedGroup === null){
        return (() => {});
      }
      const setupWebSocket = async () => {
        // Retrieve session
        const session = await getSession();
        const token = session?.accessToken;
        // setLoginUser(session.user.user_id);
        // Establish WebSocket connection with token as a query parameter
        let socket;
        if (selectedItem){
          const chat_id = selectedItem?.id;
          socket = new WebSocket(
            `${process.env.NEXT_PUBLIC_WEBSOCKET_BASEURL}ws/conversation-chat/?token=${token}&chat_id=${chat_id}`
          );
        }
        else if(selectedGroup){
          const group_id = selectedGroup?.id;
          socket = new WebSocket(
            `${process.env.NEXT_PUBLIC_WEBSOCKET_BASEURL}ws/group-chat/?token=${token}&group_id=${group_id}`
          );
        }
        if (!socket){
          console.log("socket dicsconnected",)
          return (() => {});
        }
        // Handle connection open event
        socket.onopen = () => {
          console.log("WebSocket connected");
        };
  
        // Handle incoming messages
        socket.onmessage = (event) => {
          console.log("Message received:", event.data);
          let data = JSON.parse(event?.data);
          console.log(data);
          if (data?.type == "one_to_one_chat" | data?.type == "group_chat"){
            setMessages(data?.results);
            console.log("check before sound",data?.results)
            
            // playNotificationSound(); // Play sound only for messages from others
            
          }
          else if (data?.type == "new_message" | data?.type == "new_message_group"){
            console.log("new message")
            setMessages(data?.results);
            if (data?.results[data?.results.length - 1]?.created_by != loginUser) {
              console.log("implement sound", data?.results[data?.results.length - 1]?.created_by,  loginUser )
              playNotificationSound(); // Play sound only for messages from others
            }
          }
        };
  
        // Handle connection close event
        socket.onclose = () => {
          console.log("WebSocket disconnected");
        };
  
        // Handle errors
        socket.onerror = (error) => {
          console.error("WebSocket error:", error);
        };
  
        return () => {
          socket.close(); // Cleanup on component unmount
        };
      };
  
      setupWebSocket();
    }, [selectedItem, selectedGroup]);

    useEffect(() => {
      // Scroll to the bottom whenever messages are updated
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    console.log('selectedItem | selectedGroup', selectedItem | selectedGroup)
    return (
        <div className="flex flex-row w-[85%] justify-between h-full fixed">
          {
            (selectedItem ? selectedItem : selectedGroup)
            ?
            <div className="flex flex-col w-full">
              <div className="text-white bg-primary-card shadow-md w-full h-[5rem] py-4 px-3">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row items-center gap-4">
                    {
                      selectedItem
                      ?
                      <img src="/assets/images/avatar-27.jpg" alt="User" className='h-[38px] rounded-[50%]' />
                      :
                      <UserAvatars users = {selectedGroup?.users} />
                    }
                    <div className="flex flex-col">
                      <span className="text-[1.3rem]">{selectedItem ? selectedItem.username : selectedGroup.group_name}</span>
                      {
                        selectedItem
                        ?
                        <p className="text-[0.7rem]">Last logged in at {formatDateTime(selectedItem.last_login)}</p>
                        :
                        <p className="text-[0.7rem]">Created at {formatDateTime(selectedGroup.created_at)}</p>

                      }
                    </div>
                  </div>
                  <div className="flex flex-row gap-7 items-center">
                    <FaPhone size={25}/>
                    <FaVideo size={25}/>
                    <FaGear size={25}/>
                  </div>
                </div>
              </div>
              <div className="w-full text-white h-[70.5vh] p-5 overflow-y-auto flex flex-col">
              {messages.length === 0 ? (
                <div className="text-[11rem] font-normal mt-[100px] ml-[10px]">
                  <div className="flex flex-col items-center gap-3">
                    <GiConversation />
                    <p className="text-[1rem]">Send a message to start a conversation :)</p>
                  </div>
                </div>
              ) : (
                messages.map((msg) => (
                  <div className="flex flex-row items-center gap-3">
                    {
                      (selectedGroup && loginUser !== msg.created_by)
                      &&
                      (<img
                        src="/assets/images/avatar-27.jpg"
                        alt="User"
                        className="h-[33px] rounded-[50%]"
                        />)
                    }
                    
                  <div className={`w-full flex flex-col ${
                    loginUser == msg.created_by ? 'items-end' : 'items-start'
                  }`}>
                    <div
                        key={msg.id}
                        ref={messagesEndRef}
                        className={`flex  gap-4 py-3 px-4 h-auto mt-2 rounded-[20px] w-auto max-w-[50%] ${
                          loginUser == msg.created_by ? 'bg-neutral-900 rounded-r-none rounded-t-[20px]' : 'bg-[#312d29]  rounded-l-none rounded-t-[20px]'
                        }`}
                        >
                          <div className={`flex flex-col gap-2`}>
                            <p className="text-[1rem] text-white">{msg.message}</p>
                            {
                              msg.attachments.length !== 0
                              &&
                              <div className="flex flex-row justify-start gap-2 items-center">
                                {msg.attachments.map((file, index) => (
                                  <MessageFileCard key={index} file={file} />
                                ))}  
                              </div>
                            }
                          </div>
                        </div>
                        <div className="flex gap-5 mt-1">
                              {
                                (selectedGroup && (loginUser !== msg.created_by))&& (<p className="text-[0.65rem] text-gray-300">{msg.created_by_name}</p>)
                              }
                              <p className="text-[0.65rem] text-gray-300">{formatDateTimeShort(msg.created_at)}</p>
                        </div>
                  </div>
                  </div>
                  
                ))
              )}
              </div>
              <div className={`text-white bg-primary-card shadow-md w-full ${fileModalOpen ? 'h-[64%]' : 'h-[5rem]'} py-4 pl-6`}>
                <div className="ml-[8%] flex flex-row gap-5 items-center w-full">
                  <div className=" w-[4%] cursor-pointer" onClick={() => setFileModalOpen(!fileModalOpen)}>
                    <ImAttachment size={27}/>
                  </div>
                  
                  <div className="flex flex-row items-center w-[85%]">
                    <Controller
                        name='search'
                        control={control}
                        render={({ field }) => (
                        <TextInput
                            {...field}
                            placeholder='Type message..'
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault(); // Prevents the default form submission behavior
                                if (selectedItem){
                                  sendMessage(); // Calls the sendMessage function
                                }
                                else{
                                  sendGroupMessage();
                                }
                              }
                            }}
                            
                            classNames={{
                            section: '',
                            input:
                                ' !text-[0.9rem] placeholder:!font-["CircularStd, sans-serif"] placeholder:!text-[#d4d9d6] !w-[800px] md:!h-[3rem] !rounded-l-lg !text-base !text-white !border-0 !bg-[#FFFFFF1A] !rounded-r-none',
                            }}
                        />
                        )}
                    />
                    <Button disabled={watch("search")?.length === 0} onClick={()=>{selectedItem ? sendMessage() : sendGroupMessage()}} className="!bg-primary-gradient !px-3 !py-2 !h-[3rem] !rounded-r-lg !rounded-l-none !text-white">
                      <FaPaperPlane size={23}/>
                    </Button>
                  </div>
                  
                </div>
                {
                  fileModalOpen
                  &&
                  (
                   <div>

                    <Dropzone
                      onDrop={handleDrop}
                      onReject={(files) => console.log('rejected files', files)}
                      maxSize={5 * 1024 ** 2}
                      accept={MIME_TYPES}
                      classNames={{
                        label: '!text-primary !font-medium !text-base',
                        root: `!border-2 !border-[#464547] !rounded-lg !mt-3 !p-3 !w-[78%] !ml-[8%] !cursor-pointer`,
                        section: '!w-[1.2rem]',
                      }}
                    >
                      <Group justify="center" gap="xl" mih={100} style={{ pointerEvents: 'none' }}>
                        <Dropzone.Accept>
                          <IconUpload
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                            stroke={1.5}
                          />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                          <IconX
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                            stroke={1.5}
                          />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                          <IconPhoto
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                            stroke={1.5}
                          />
                        </Dropzone.Idle>

                        <div>
                          <Text size="xl" inline>
                            Drag images here or click to select files
                          </Text>
                          <Text size="sm" c="dimmed" inline mt={7}>
                            Attach as many files as you like, each file should not exceed 5mb
                          </Text>
                        </div>
                      </Group>
                    </Dropzone>
                      <div className="flex flex-row justify-start gap-2 items-center !w-[78%] !ml-[8%]">
                        {files.map((file, index) => (
                          <FileCard key={index} file={file} onRemove={() => handleRemoveFile(index)} />
                        ))}  
                      </div>
                   </div>
                )
                }
              </div>
            </div>
            :
            <div className="text-white w-full h-full text-center mt-[15rem] flex flex-col text-[1.5rem] items-center gap-2">
              <MdOutlineChat  size={40}/>
              Click on a conversation to chat
            </div>
          }
          <div className="">
            <ChatSideBar selectedItem={selectedItem} setSelectedItem={setSelectedItem} selectedGroup = {selectedGroup} setSelectedGroup={setSelectedGroup}/>
          </div>
        </div>
        );
    }

"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import AddHolidayForm from "./addHolidayForm";
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { openAddPopup } from "@/common/store/slices/common";
import { Button, Popover, Select, TextInput, Menu, Table} from '@mantine/core';
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

export default function Chat() {
  
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);
  const [loginUser, setLoginUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const { control, setValue, watch  } = useForm();
    const socketRef = useRef(null);
    
    const {
      mutate: sendMessageAPI,
      isSuccess: sendMessageSuccess,
      isError: sendMessageError,
      error: sendMessageErrors,
    } = useSendMessage();
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

    useEffect(() => {
      if (selectedItem !== null) {
        setValue("search", ""); // Clear the 'search' field
      }
    }, [selectedItem, setValue]);


    const sendMessage =() =>{
      console.log(watch("search"));
      sendMessageAPI({
        message : watch('search'),
        user_id : selectedItem?.id
      })
      setValue("search", "");
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    useEffect(() => {
      if (selectedItem === null){
        return (() => {});
      }
      const setupWebSocket = async () => {
        // Retrieve session
        const session = await getSession();
        const token = session?.accessToken;
        setLoginUser(session.user.user_id);
        // Establish WebSocket connection with token as a query parameter
        const chat_id = selectedItem?.id;
        const socket = new WebSocket(
          `${process.env.NEXT_PUBLIC_WEBSOCKET_BASEURL}ws/conversation-chat/?token=${token}&chat_id=${chat_id}`
        );
  
        // Handle connection open event
        socket.onopen = () => {
          console.log("WebSocket connected");
        };
  
        // Handle incoming messages
        socket.onmessage = (event) => {
          console.log("Message received:", event.data);
          let data = JSON.parse(event?.data);
          console.log(data);
          if (data?.type == "one_to_one_chat"){
            setMessages(data?.results);
            
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
    }, [selectedItem]);

    return (
        <div className="flex flex-row w-full justify-between h-full">
          {
            selectedItem
            ?
            <div className="flex flex-col w-full">
              <div className="text-white bg-primary-card shadow-md w-full h-[5rem] py-4 px-3">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row items-center gap-4">
                    <img src="/assets/images/avatar-27.jpg" alt="User" className='h-[38px] rounded-[50%]' />
                    <div className="flex flex-col">
                      <span className="text-[1.3rem]">{selectedItem.username}</span>
                      <p className="text-[0.7rem]">Last logged in at {formatDateTime(selectedItem.last_login)}</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 items-center">
                    <FaPhone size={25}/>
                    <FaVideo size={25}/>
                    <FaGear size={25}/>
                  </div>
                </div>
              </div>
              <div className="w-full text-white h-[67vh] p-5 overflow-y-auto flex flex-col">
              {messages.length === 0 ? (
                <div className="text-[11rem] font-normal mt-[100px] ml-[10px]">
                  <div className="flex flex-col items-center gap-3">
                    <GiConversation />
                    <p className="text-[1rem]">Send a message to start a conversation :)</p>
                  </div>
                </div>
              ) : (
                messages.map((msg) => (
                  <div className={`w-full flex flex-col ${
                    loginUser == msg.created_by ? 'items-end' : 'items-start'
                  }`}>
                    <div
                        key={msg.id}
                        ref={messagesEndRef}
                        className={`flex gap-2 p-3 mt-2 rounded-[20px] w-auto max-w-[50%] ${
                          loginUser == msg.created_by ? 'bg-neutral-900 flex-row-reverse rounded-r-none rounded-t-[20px]' : 'bg-[#312d29] flex-row rounded-l-none rounded-t-[20px]'
                        }`}
                        >
                          {/* <img
                            src="/assets/images/avatar-27.jpg"
                            alt="User"
                            className="h-[33px] rounded-[50%]"
                            /> */}
                          <div className={`flex flex-col gap-2 ${loginUser == msg.created_by? 'items-end' : ''}`}>
                            <p className="text-[1rem] text-white">{msg.message}</p>
                            <div className={`flex flex-col ${loginUser == msg.created_by? 'items-end' : 'items-start'} w-full`}>
                              {/* <p className="text-[0.75rem] text-white">{msg.created_by_name}</p> */}
                              <p className="text-[0.6rem] text-white">{formatDateTime(msg.created_at)}</p>
                            </div>

                          </div>
                        </div>
                  </div>
                  
                ))
              )}
              </div>
              <div className="text-white bg-primary-card shadow-md w-full h-[5rem] py-4 pl-6">
                <div className="flex flex-row gap-5 items-center w-full">
                  <div className=" w-[4%]">
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
                                sendMessage(); // Calls the sendMessage function
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
                    <Button onClick={sendMessage} className="!bg-primary-gradient !px-3 !py-2 !h-[3rem] !rounded-r-lg !rounded-l-none !text-white">
                      <FaPaperPlane size={23}/>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            :
            <div className="text-white w-full h-full text-center mt-[11rem] flex flex-col text-[1.5rem] items-center gap-2">
              <MdOutlineChat  size={40}/>
              Click on a conversation to chat
            </div>
          }
          <div className="">
            <ChatSideBar selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
          </div>
        </div>
        );
    }

import logoSvg from '@/../public/assets/icons/logo.svg'
import logo2 from '@/../public/assets/images/logo2.png'
import collapseLogo from '@/../public/assets/icons/collapse-logo.svg'
import { Button, Popover, Select, TextInput } from '@mantine/core';
import Image from 'next/image'
import { Controller, useForm } from 'react-hook-form';
import { FaRegMessage } from "react-icons/fa6";
import { RiArrowDropDownLine, RiArrowDropUpLine  } from "react-icons/ri";
import { IoNotificationsOutline, IoSearchSharp } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import { useSelector } from 'react-redux';



export default function NavBar({sideBarOpen, setSideBarOpen}){
    const { control, watch } = useForm();
    const user = useSelector((state) => state.auth?.user);
    console.log(user)
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [isLangOpen, setLangOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const playNotificationSound = () => {
      console.log("playing sound")
      const audio = new Audio('/assets/audios/new_message_notification.wav'); // Use the correct path
      audio.play().catch((error) => {
        console.error('Error playing sound:', error);
      });
    };
    useEffect(() => {

      const setupWebSocket = async () => {
        // Retrieve session
        const session = await getSession();
        const token = session?.accessToken;
        let socket;
        socket = new WebSocket(
          `${process.env.NEXT_PUBLIC_WEBSOCKET_BASEURL}ws/notifications/?token=${token}`
        );
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
          if (data?.type == "notification_list"){
            setNotifications(data?.notifications);
            console.log("check before sound",data?.notifications)
            
            // playNotificationSound(); // Play sound only for messages from others
            
          }
          else if (data?.type == "new_notification") {
            playNotificationSound(); // Play sound only for messages from others
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
    }, []);


    return (
    <div className="header px-6 flex flex-row items-center justify-between transition-width duration-500 ease-in-out">
        <div className='flex flex-row items-center justify-between gap-6'>
            <div className="header-left">
                    {sideBarOpen ? (<Image
                        src={logoSvg}
                        alt='Dream Tech'
                        width={120}
                        height={120}
                    />) : (<Image
                        src={collapseLogo}
                        alt='Dream Tech'
                        width={30}
                        height={30}
                    />)}
            </div>
            <div>
                <button id="toggle_btn" onClick={()=>{setSideBarOpen(!sideBarOpen)}}>
                    <span className={`bar-icon ${sideBarOpen ? 'ml-[5rem]' : ''} mt-[30px]`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>
            </div>
            <div class="page-title-box font-normal">
                <h3 className='text-[1.3rem]'>Aptagrim Limited</h3>
            </div>
        </div>
        <div className='flex flex-row items-center justify-between gap-4'>
            <Controller
                name='search'
                control={control}
                render={({ field }) => (
                <TextInput
                    {...field}
                    placeholder='Search here'
                    rightSection={
                      <IoSearchSharp size={20} color='#d4d9d6'/>
                    }
                    classNames={{
                    section: '',
                    input:
                        ' !text-[0.9rem] placeholder:!font-["CircularStd, sans-serif"] placeholder:!text-[#d4d9d6] md:!w-[17rem] 2xl:!w-[14.5rem] md:!h-[2.35rem] !rounded-lg !text-base !text-white !border-0 !bg-[#FFFFFF1A]',
                    }}
                />
                )}
            />
            <Controller
              name='status'
              control={control}
              render={({ field }) => (
                <Select
                  onClick= {()=>{setLangOpen(!isLangOpen)}}
                  placeholder='Select Language'
                  {...field}
                  defaultValue=''
                  data={[
                    { label: 'English', value: '' },
                    { label: 'French', value: 'FRENCH' },
                    { label: 'Spanish', value: 'SPANISH' },
                    { label: 'German', value: 'GERMAN' },
                  ]}
                  leftSection={
                    <CiFilter size={20} color='#d4d9d6'/>
                  }
                  rightSection={
                    isLangOpen
                    ? <RiArrowDropUpLine size={50} color='#d4d9d6'/>
                    : <RiArrowDropDownLine size={50} color='#d4d9d6'/>
                  }
                  classNames={{
                    input:
                      '!text-[0.9rem] md:!w-[15rem] 2xl:!w-[12.5rem] md:!h-[2.4rem] !rounded-lg placeholder:!text-[#d4d9d6] !text-base !text-white !bg-[#FFFFFF1A] !border-0 !transition-all !duration-500',
                    dropdown: '!text-primary-login !text-black !bg-white',
                    option: '!text-black hover:!bg-gray-200'
                  }}
                />
              )}
            />
            <div className='bg-[#FFFFFF1A] p-1.5 rounded'>
                <IoNotificationsOutline size={26} className='text-white'/>
            </div>
            <div className='bg-[#FFFFFF1A] p-2.5 rounded'>
                <FaRegMessage size={18} className='text-white'/>
            </div>
            <div className='flex flex-row justify-between items-center gap-1'>
                <img src="/assets/images/avatar-27.jpg" alt="User" className='h-[30px] rounded-[50%]' />
                <h4>{user?.username}</h4>
                <button onClick={()=>{setProfileOpen(!isProfileOpen)}}>
                    {isProfileOpen ?
                    <RiArrowDropUpLine className='text-[2rem] text-white'/>
                    :
                    <RiArrowDropDownLine className='text-[2rem] text-white'/>}
                </button>
                <div class={`dropdown-content ${isProfileOpen? 'block' : 'hidden'}`}>
                    <a href="#">My Profile</a>
                    <a href="#">Settings</a>
                    <Link href="/auth/login">Logout</Link>
                </div>
            </div>
        </div>
    </div>
    )
}
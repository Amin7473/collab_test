import { useState } from 'react';
import { IoSpeedometerOutline } from "react-icons/io5";
import { RiArrowDropDownLine, RiArrowDropRightLine } from "react-icons/ri";
import { IoCubeOutline, IoPerson, IoRocketOutline  } from "react-icons/io5";
import { LiaTicketAltSolid } from "react-icons/lia";
import { FaDashcube } from "react-icons/fa";
import Link from 'next/link';
import { useGetUsers } from '../hooks/useGetUsers';

export default function ChatSideBar({selectedItem, setSelectedItem}) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isSidebarOpen = true;
  const [openMenuIndex, setOpenMenuIndex] = useState(1);
  

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

  const toggleMenu = (index) => {
    console.log(index)
    console.log(openMenuIndex)
    setOpenMenuIndex(openMenuIndex === index ? null : index);
    // setSelectedItem(null);
    console.log(openMenuIndex)
  };

  const { data: users } = useGetUsers({});
  console.log(users)
// onMouseOver={()=>{setSideBarOpen(true)}} onMouseOut={()=>{setSideBarOpen(false)}}
  return (
    <div  className={`overflow-y-auto flex p-4 w-64 bg-[#171617] text-white transition-width duration-500 h-full`}>
      <div className="flex flex-col justify-between w-full ">
        <nav className="flex-1">
            {users?.results?.map((user) => (
                <div onClick={()=>{setSelectedItem(user)}} className={`flex flex-row gap-4 p-3 mt-3 rounded-[10px] items-center w-full ${selectedItem?.id == user.id ? 'bg-[#312d29]' : ''} hover:bg-primary-body hover:cursor-pointer`}>
                    <img src="/assets/images/avatar-27.jpg" alt="User" className='h-[33px] rounded-[50%]' />
                    <div className='flex flex-col'>
                      <p className={`text-[1rem] text-white`}>{user.username}</p>
                    </div>
                    
                </div>
            ))}
          
        </nav>
      </div>
    </div>
  );
}

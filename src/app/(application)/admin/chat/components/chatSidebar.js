import { useState } from 'react';
import { IoSpeedometerOutline } from "react-icons/io5";
import { RiArrowDropDownLine, RiArrowDropRightLine } from "react-icons/ri";
import { IoCubeOutline, IoPerson, IoRocketOutline  } from "react-icons/io5";
import { LiaTicketAltSolid } from "react-icons/lia";
import { FaDashcube } from "react-icons/fa";
import Link from 'next/link';
import { useGetUsers } from '../hooks/useGetUsers';
import AddGroupForm from './addGroupForm';
import { FaPlus } from 'react-icons/fa6';
import { openAddPopup } from '@/common/store/slices/common';
import { useDispatch } from 'react-redux';
import { useGetGroups } from '../hooks/useGetGroups';


export default function ChatSideBar({selectedItem, setSelectedItem, selectedGroup, setSelectedGroup}) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isSidebarOpen = true;
  const [openMenuIndex, setOpenMenuIndex] = useState(1);
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    dispatch(
        openAddPopup({
          title: 'groups',
          type: 'add',
          defaultValues: {
            group_name: '',
            users: [],
          },
        }))
}

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };
  const handleGroupSelect = (group) =>{
    setSelectedGroup(group);
    setSelectedItem(null);
  }

  const handleItemSelect = (item) =>{
    setSelectedGroup(null);
    setSelectedItem(item);
  }

  const toggleMenu = (index) => {
    console.log(index)
    console.log(openMenuIndex)
    setOpenMenuIndex(openMenuIndex === index ? null : index);
    // setSelectedItem(null);
    console.log(openMenuIndex)
  };

  const { data: users } = useGetUsers({});
  const { data: groups } = useGetGroups({});
  console.log(users)
// onMouseOver={()=>{setSideBarOpen(true)}} onMouseOut={()=>{setSideBarOpen(false)}}
  return (
    <div  className={`overflow-y-auto flex p-4 w-64 bg-[#171617] text-white transition-width duration-500 h-full`}>
      <AddGroupForm/>
      <div className="flex flex-col justify-between w-full ">
        <h1 className='text-gray-300 text-[1.4rem] text-center'>Direct Chat</h1>
        <nav className="flex-1">
            {users?.results?.map((user) => (
                <div onClick={()=>{handleItemSelect(user)}} className={`flex flex-row gap-4 p-3 mt-3 rounded-[10px] items-center w-full ${selectedItem?.id == user.id ? 'bg-[#312d29]' : ''} hover:bg-primary-body hover:cursor-pointer`}>
                    <img src="/assets/images/avatar-27.jpg" alt="User" className='h-[33px] rounded-[50%]' />
                    <div className='flex flex-col'>
                      <p className={`text-[1rem] text-white`}>{user.username}</p>
                    </div>
                    
                </div>
            ))}
          
        </nav>
        <div className='flex flex-row justify-center items-center '>
          <h1 className='text-gray-300 text-[1.4rem]'>Group Chat</h1>
          <span className='text-white hover:cursor-pointer p-1 rounded-[50%] hover:bg-gray-700 ml-7'>
            <FaPlus onClick={handleOpenModal} size={22}/>
          </span>
        </div>
        <nav className="flex-1">
            {groups?.results?.map((group) => (
                <div onClick={()=>{handleGroupSelect(group)}} className={`flex flex-row gap-4 p-3 mt-3 rounded-[10px] items-center w-full ${selectedGroup?.id == group?.id ? 'bg-[#312d29]' : ''} hover:bg-primary-body hover:cursor-pointer`}>
                    <div className='flex flex-col'>
                      <p className={`text-[1rem] text-white`}>{group.group_name}</p>
                    </div>
                    
                </div>
            ))}
          
        </nav>
      </div>
    </div>
  );
}

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
import { Button, Popover, Select, TextInput, Menu, Table, Avatar, Tooltip } from '@mantine/core';

export default function userAvatars({users}) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openMenuIndex, setOpenMenuIndex] = useState(1);
  console.log("inside group avatars")
  console.log(users)
// onMouseOver={()=>{setSideBarOpen(true)}} onMouseOut={()=>{setSideBarOpen(false)}}
  return (
    <div className='text-white'>
        <Tooltip.Group openDelay={300} closeDelay={100}>
        <Avatar.Group spacing="sm">
            {
                users.map((user) => (
                    <div>
                        <Tooltip label={user?.username} withArrow styles={{
                            tooltip: {
                                color: 'white', // Change the text color to white
                                backgroundColor: '#1c1c1a', // Optionally, customize the background
                              },
                              arrow: {
                                backgroundColor: '#1c1c1a', // Match arrow background to tooltip
                              },
                        }}>
                            <Avatar src="/assets/images/avatar-27.jpg" radius="xl" />
                        </Tooltip>
                    </div>
                ))
            }
        </Avatar.Group>
        </Tooltip.Group>
    </div>
  );
}

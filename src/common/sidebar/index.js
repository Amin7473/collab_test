import { useState } from 'react';
import { IoSpeedometerOutline } from "react-icons/io5";
import { RiArrowDropDownLine, RiArrowDropRightLine } from "react-icons/ri";
import { IoCubeOutline, IoPerson, IoRocketOutline  } from "react-icons/io5";
import { LiaTicketAltSolid } from "react-icons/lia";
import { FaDashcube } from "react-icons/fa";
import Link from 'next/link';

export default function Sidebar({sideBarOpen, setSideBarOpen}) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isSidebarOpen = sideBarOpen;
  const [openMenuIndex, setOpenMenuIndex] = useState(1);
  const [selectedItem, setSelectedItem] = useState(6);
  

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

  const menuItems = [
    {
        title: 'MAIN',
        items: [{
                id : 1,
                title: 'Dashboard',
                icon  : <FaDashcube size={18}/>,
                path : '/admin/dashboard',
                // items: [{ id: 6, title: 'Admin Dashboard' },
                // { id: 7, title: 'Employee Dashboard' },],
                items : []
            },
            {
                id : 2,
                title: 'Apps',
                icon  : <IoCubeOutline size={18}/>,
                path : '/admin/dashboard',
                items: [
                { id: 2, title: 'Calendar', path : '/admin/calendar', },
                { id: 3, title: 'Contacts', path : '/admin/contacts', },
                { id: 4, title: 'Chat', path : '/admin/chat' },
                // { id: 5, title: 'File Manager' }
              ],
            }
    ],
    },
    {
        title: 'EMPLOYEES',
        items: [{
                id : 3,
                title: 'Employees',
                icon  : <IoPerson size={18}/>,
                path : '/admin/dashboard',
                items: [{ id: 8, title: 'All Employees', path : '/admin/employees',},
                { id: 9, title: 'Holidays', path : '/admin/holidays', },
                { id: 10, title: 'Leaves', path : '/admin/dashboard', },
                { id: 11, title: 'Departments', path : '/admin/dashboard', },
                { id: 12, title: 'Designations', path : '/admin/dashboard', }],
            },
            {
                id : 4,
                title: 'Projects',
                icon  : <IoRocketOutline  size={18}/>,
                path : '/admin/dashboard',
                items: [{ id: 13, title: 'Projects', path : '/admin/dashboard', },
                { id: 14, title: 'Tasks', path : '/admin/dashboard', },
                { id: 15, title: 'Task Board', path : '/admin/dashboard', }],
            },
            {
                id : 5,
                title: 'Tickets',
                path : '/admin/dashboard',
                icon  : <LiaTicketAltSolid size={18}/>,
                items: [{ id: 16, title: 'Tickets', path : '/admin/dashboard', },
                { id: 17, title: 'Tickets Details', path : '/admin/dashboard', }],
            },
    ],
    }

  ];
// onMouseOver={()=>{setSideBarOpen(true)}} onMouseOut={()=>{setSideBarOpen(false)}}
  return (
    <div  className={`overflow-y-auto flex ${isSidebarOpen ? 'w-64' : 'w-16'} bg-[#171617] px-2 py-1 text-white transition-width duration-500`}>
      <div className="flex flex-col w-full h-screen">
        <nav className="flex-1">
            {menuItems.map((mainHeader) => (
                <div>
                    <p className={`ml-6 mt-5 text-[0.8rem] ${isSidebarOpen ? 'block' : 'invisible'} text-sm text-white relative before:absolute before:left-[-1rem] before:top-[50%] before:transform before:-translate-y-1/2 before:w-1 before:h-1 before:bg-orange-500 before:rounded-full`}>{mainHeader.title}</p>
                    
                    {mainHeader.items.map((menu) => (
                    <div key={menu.id}>
                      <button
                        onClick={() => toggleMenu(menu.id)}
                        className={`w-full p-2 text-left focus:outline-none ${openMenuIndex === menu.id ? 'text-white' : 'text-gray-400'} hover:text-white flex flex-row gap-3 items-center justify-between`}>
                            <div className='flex flex-row gap-3 items-center'><Link className={`${openMenuIndex === menu.id ? 'text-white' : 'text-gray-400'} hover:text-white flex flex-row gap-3 items-center justify-between`} href={menu.path}>{menu.icon} {isSidebarOpen && menu.title}</Link></div>
                            {menu.id !== 1 && (openMenuIndex === menu.id ?
                            <RiArrowDropDownLine size={30}/>
                            :
                            <RiArrowDropRightLine size={30}/>)}
                      </button>
                      {menu.id !== 1 && (<div className={`px-2 py-3 ${openMenuIndex === menu.id ? 'block' : 'hidden'} ${isSidebarOpen ? '' : 'hidden'} bg-[#312d29] rounded`}>
                        {menu.items.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={()=> {setSelectedItem(item.id)}}
                            className={`ml-5 ${isSidebarOpen ? 'block' : 'hidden'} px-2 py-1.5 text-sm ${selectedItem === item.id ? 'text-orange-500' : 'text-gray-400' } hover:text-white relative before:absolute before:left-[-0.5rem] before:top-[50%] before:transform before:-translate-y-1/2 before:w-1 before:h-1 before:bg-gray-400 before:rounded-full`}>
                            <Link className={`${selectedItem === item.id ? 'text-orange-500' : 'text-gray-400' } hover:text-white`} href={item.path}>{item.title}</Link>
                          </button>
                        ))}
                      </div>)}
                    </div>
                  ))}
                </div>
            ))}
          
        </nav>
      </div>
    </div>
  );
}

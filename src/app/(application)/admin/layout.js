"use client";
import { useState } from "react";
import Navbar from "@/common/navbar/index";
import Sidebar from "@/common/sidebar/index";

// import SidebarLayout from "../../common/sidebar";

export default function ApplicationLayout({ children }) {
    const [sideBarOpen, setSideBarOpen] = useState(true);
    return (
        <div className="min-h-screen flex flex-col">
            <div className="fixed w-full">
                <Navbar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
            </div>

            <div className="flex flex-grow">
                <div className="fixed top-[65px]">
                    <Sidebar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen}/>
                </div>

                <div className={`${sideBarOpen ? 'ml-64' : 'ml-16'} mt-[66px] w-full  transition-all duration-500`}>
                    {children}
                </div>
            </div>
            </div>
    );
}

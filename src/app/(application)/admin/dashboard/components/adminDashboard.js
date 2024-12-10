"use client";
import Image from "next/image";
import Link from "next/link";
import MainLogo from '@/../public/assets/images/logo2.png'
import eyeClose from '@/../public/assets/icons/eyeClose.svg'
import eyeOpen from '@/../public/assets/icons/eyeOpen.svg'
import { useState, useEffect } from "react";
import { FaCubes, FaDollarSign  } from "react-icons/fa";
import { IoDiamondOutline, IoPerson } from "react-icons/io5";
import BarChart from '../components/dbBarChart';
import LineChart from '../components/dbSplineChart';
import { data } from "autoprefixer";
import ProgressBar from '../components/progressBar';
import { FaRegDotCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const dataCountItems = [
    {
        id : 1,
        title : "Projects",
        count : 112,
        icon : <FaCubes />
    },
    {
        id : 2,
        title : "Clients",
        count : 44,
        icon : <FaDollarSign  />
    },
    {
        id : 3,
        title : "Tasks",
        count : 37,
        icon : <IoDiamondOutline />
    },
    {
        id : 4,
        title : "Employees",
        count : 218,
        icon : <IoPerson  />
    },
]

const statisticData = [
    {
        title : "New Employees",
        percent : "+10%",
        positive : true,
        value : "10",
        baseText : "Overall Employees 218"
    },
    {
        title : "Earnings",
        percent : "+12.5%",
        positive : true,
        value : "$1,42,300",
        baseText : "Previous Month $1,15,852"
    },
    {
        title : "Expenses",
        percent : "-2.8%",
        positive : false,
        value : "$8,500",
        baseText : "Previous Month $7,500"
    },
    {
        title : "Profit",
        percent : "-75.5%",
        positive : false,
        value : "$1,12,000",
        baseText : "Previous Month $1,42,000"
    },
]

const statsProgress = [
    {
        title : "Today leave",
        progress : 30,
        total : 65,
        present : 4,
        bgColor : 'bg-orange-500'
    },
    {
        title : "Pending Invoice",
        progress : 30,
        total : 92,
        present : 15,
        bgColor : 'bg-yellow-500'
    },
    {
        title : "Completed Projects",
        progress : 60,
        total : 112,
        present : 85,
        bgColor :' bg-green-700'
    },
    {
        title : "Open Tickets",
        progress : 60,
        total : 212,
        present : 190,
        bgColor : 'bg-red-700'
    },
    {
        title : "Closed Tickets",
        progress : 20,
        total : 212,
        present : 22,
        bgColor : 'bg-blue-500'
    },
]

const taskStatistics = [
    {
        title : 'Completed Tasks',
        icon : <FaRegDotCircle color="#9368e9"/>,
        value : 166
    },
    {
        title : 'Inprogress Tasks',
        icon : <FaRegDotCircle color="#FFBC34"/>,
        value : 115
    },
    {
        title : 'On Hold Tasks',
        icon : <FaRegDotCircle color="#55CE63"/>,
        value : 31
    },
    {
        title : 'Pending Tasks',
        icon : <FaRegDotCircle color="#FC133D"/>,
        value : 47
    },
    {
        title : 'Review Tasks',
        icon : <FaRegDotCircle color="#009EFB"/>,
        value : 5
    }
]

export default function AdminDashboard() {
    const user = useSelector((state) => state.auth?.user);
    return (
        <div className="text-white p-5">
            <h3>Welcome {user?.username}!</h3>
            <p className="text-gray-300">Dashboard</p>
            <br />
            {/* Data count */}
            <div className="flex flex-row justify-between items-center">
                {
                    dataCountItems.map((dataItem, idx)=>(
                        <div className="bg-primary-card rounded px-5 py-5 border-0 shadow-lg w-[23%]">
                            <div className="flex flex-row justify-between items-center">
                                <div className="bg-orange-opacity text-[#FF902F] p-3 text-[2rem] rounded-[50%]">
                                    {dataItem.icon}
                                </div>
                                <div className="flex flex-col gap-2 items-end">
                                    <h3>{dataItem.count}</h3>
                                    <span>{dataItem.title}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* bar and line chart */}
            <div className=" mt-7 flex flex-row justify-between items-center">
                <div className="bg-primary-card rounded px-6 py-7 border-0 shadow-lg w-[49%] ">
                    <h1 className="text-2xl font-bold text-center mb-7">Total Revenue</h1>
                    <BarChart />
                </div>
                <div className="bg-primary-card rounded px-6 py-7 border-0 shadow-lg w-[49%]">
                    <h1 className="text-2xl font-bold text-center mb-7">Sales Overview</h1>
                    <LineChart />
                </div>
            </div>
            {/* statistics */}
            <div className=" mt-7 flex flex-row justify-between items-center">
                {
                    statisticData.map((dataItem, idx)=>(
                    <div className="bg-primary-card rounded px-6 py-7 border-0 shadow-lg w-[24%]">
                        <div className="flex flex-col gap-2">
                            <div className="text-[0.9rem] flex flex-row items-center justify-between">
                                <p>{dataItem.title}</p>
                                <span className={`${dataItem.positive ? 'text-green-500' : 'text-red-500'}`}>{dataItem.percent}</span>
                            </div>
                            <h3>{dataItem.value}</h3>
                            <ProgressBar progress={70} height={"h-1.5"} color={"bg-orange-500"}/>
                            <p className="text-[0.9rem]">{dataItem.baseText}</p>
                        </div>
                    </div>
                    ))
                }
            </div>
            {/* stat data */}
            <div className="flex flex-row justify-between items-center">
                <div className="bg-primary-card rounded py-5 px-6 border-1 shadow-lg w-[32%] h-[450px] mt-7 flex flex-row justify-between items-center">
                    <div className="flex flex-col gap-3 w-full">
                        <h3>Statistics</h3>
                        <div className="flex flex-col gap-1 w-full text-[0.8rem]">
                            {
                                statsProgress.map((dataItem, idx)=>(
                                <div className="bg-primary-card rounded px-3 py-3 w-full border-2 border-[#464547] shadow-lg">
                                    <div className="flex flex-col">
                                        <div className="flex flex-row items-center justify-between">
                                            <p>{dataItem.title}</p>
                                            <b>{dataItem.present} / {dataItem.total}</b>
                                        </div>
                                        <ProgressBar progress={dataItem.progress} height={"h-[0.25rem]"} color={dataItem.bgColor}/>
                                    </div>
                                </div>
                                ))
                            }
                        </div>
                        
                    </div>
                </div>
                            
                {/* Task Statistics */}
                <div className="bg-primary-card rounded py-5 px-6 border-1 shadow-lg w-[32%] h-[450px] mt-7 ">
                    <div className="flex flex-col gap-5 w-full">
                        <h3>Task Statistics</h3>
                        <div className="flex flex-row justify-between items-center text-[0.9rem]">
                            <div className="flex flex-col items-center w-[48%] justify-between leading-none border-2 border-[#464547] bg-[#292623] py-2">
                                <p>Total Tasks</p>
                                <h3>385</h3>
                            </div>
                            <div className="flex flex-col items-center w-[48%] justify-between leading-none border-2 border-[#464547] bg-[#292623] py-2">
                                <p>Overdue Tasks</p>
                                <h3>385</h3>
                            </div>
                        </div>
                        <div className={`mt-2 w-full bg-gray-300 rounded-full h-5 overflow-hidden text-[0.75rem] flex flex-row items-start`}>
                            <div
                                className={`bg-[#9368e9] h-full p-1 text-center text-white font-medium leading-none rounded-l-full`}
                                style={{ width: `30%` }}
                            >30%
                            </div>
                            <div
                                className={`bg-[#FFBC34] h-full  p-1 text-center text-white font-medium leading-none`}
                                style={{ width: `22%` }}
                            >22%
                            </div>
                            <div
                                className={`bg-[#55CE63] h-full  p-1 text-center text-white font-medium leading-none`}
                                style={{ width: `24%` }}
                            >24%
                            </div>
                            <div
                                className={`bg-[#FC133D] h-full border-b-0  p-1 text-center text-white font-medium leading-none`}
                                style={{ width: `21%` }}
                            >21%
                            </div>
                            <div
                                className={`bg-[#009EFB] h-full p-1 text-center text-white font-medium leading-none rounded-r-full`}
                                style={{ width: `10%` }}
                            >10%
                            </div>
                        </div>
                        {taskStatistics.map((dataItem, idx)=>(
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex items-center gap-2"><span>{dataItem.icon}</span> <span>{dataItem.title}</span></div>
                                <span>{dataItem.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Today absent */}
                <div className="bg-primary-card rounded py-5 px-6 border-1 shadow-lg w-[32%] h-[450px] mt-7 ">
                    <div className="flex flex-col gap-5 w-full">
                        <div className="flex flex-row items-center gap-3">
                            <h3>Today Absent</h3>
                            <div className="px-3 py-[0.1rem] rounded border-0 bg-[#FF66701F] text-red-500">5</div>
                        </div>
                        <div className="bg-primary-card px-3 py-3 w-full border-2 border-[#464547] shadow-lg">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-row items-center gap-3">
                                    <img src="/assets/images/user.jpg" alt="User" className='h-[35px] rounded-[50%]'/>
                                    <p>Martin Lewis</p>
                                </div>
                                <div className="flex flex-row items-center justify-between">
                                    <div className="flex flex-col leading-none gap-2">
                                        <span>4 Sep 2019</span>
                                        <span className="text-[#7C7B7C]">Leave Date</span>
                                    </div>
                                    <div className="py-[2px] px-[4px] text-[0.8rem] rounded-md border-0 bg-[#FF66701F] text-red-500">Pending</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-primary-card px-3 py-3 w-full border-2 border-[#464547] shadow-lg">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-row items-center gap-3">
                                    <img src="/assets/images/user.jpg" alt="User" className='h-[35px] rounded-[50%]'/>
                                    <p>Martin Lewis</p>
                                </div>
                                <div className="flex flex-row items-center justify-between">
                                    <div className="flex flex-col leading-none gap-2">
                                        <span>4 Sep 2019</span>
                                        <span className="text-[#7C7B7C]">Leave Date</span>
                                    </div>
                                    <div className="py-[2px] px-[4px] text-[0.8rem] rounded-md border-0 bg-[#0FB76B1F] text-green-500">Approved</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <button className="text-[0.9rem] py-2 border-2 border-[#464547] shadow-lg w-[110px]">
                                Load More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>);}

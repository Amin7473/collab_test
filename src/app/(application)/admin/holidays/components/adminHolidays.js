"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import AddHolidayForm from "./addHolidayForm";
import { useDispatch } from "react-redux";
import { openAddPopup } from "@/common/store/slices/common";
import { Button, Popover, Select, TextInput, Menu, Table} from '@mantine/core';
import { IoNotificationsOutline, IoSearchSharp } from "react-icons/io5";
import { FaGear, FaEllipsisVertical } from "react-icons/fa6";
import { RiDeleteBin6Line  } from "react-icons/ri";
import { FaPencilAlt  } from "react-icons/fa";

const holidays = [
    {
      id: 1,
      title: "New Year",
      holiday_date: "1 Jan 2019",
      day: "Sunday"
    },
    {
      id: 2,
      title: "Good Friday",
      holiday_date: "14 Apr 2019",
      day: "Friday"
    },
    {
      id: 3,
      title: "May Day",
      holiday_date: "1 May 2019",
      day: "Monday"
    },
    {
      id: 4,
      title: "Memorial Day",
      holiday_date: "28 May 2019",
      day: "Monday"
    },
    {
      id: 5,
      title: "Ramzon",
      holiday_date: "26 Jun 2019",
      day: "Monday"
    },
    {
      id: 6,
      title: "Bakrid",
      holiday_date: "2 Sep 2019",
      day: "Saturday"
    },
    {
      id: 7,
      title: "Deepavali",
      holiday_date: "18 Oct 2019",
      day: "Wednesday"
    },
    {
      id: 8,
      title: "Christmas",
      holiday_date: "25 Dec 2019",
      day: "Monday"
    }
  ];

const rows = holidays.map((holiday, index) => (
    <Table.Tr key={holiday.id}
      className={`h-[50px] ${index % 2 === 0 ? '!bg-primary-body' : '!bg-primary-card'} !shadow-lg !border-primary-border`}>
      <Table.Td>{holiday.id}</Table.Td>
      <Table.Td>{holiday.title}</Table.Td>
      <Table.Td>{holiday.holiday_date}</Table.Td>
      <Table.Td>{holiday.day}</Table.Td>
      <Table.Td className="!text-right">
      <Menu shadow="md" width={150} classNames={{
            "dropdown" : "!border-primary-border !mr-10",
            "item" : "!text-white hover:!text-black"
        }}>
            <Menu.Target>
                <button><FaEllipsisVertical className="text-[#d4d9d6] hover:cursor-pointer" size={20}/></button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item leftSection={<FaPencilAlt/>}>Edit</Menu.Item>
                <Menu.Item leftSection={<RiDeleteBin6Line/>}>Delete</Menu.Item>
            </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
))

export default function AdminHolidays() {

    const dispatch = useDispatch();
    const handleOpenModal = () => {
        dispatch(
            openAddPopup({
              title: 'events',
              type: 'add',
              defaultValues: {
                folder_name: '',
                brand: '',
                articles: '',
                dropzone: null,
              },
            }))
        console.log("yoooo");
    }

    return (
        <div className="text-white px-4 mb-5">
            <AddHolidayForm />
            <div className="flex flex-row items-center justify-between">
                <div>
                    <h3 className="text-[1.8rem]">Holidays 2024</h3>
                    <p className="text-gray-300">Dashboard &nbsp;/&nbsp; Holidays</p>
                </div>
                <button onClick={handleOpenModal} className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-full flex flex-row items-center gap-3"><FaPlus/><span>Add Holiday</span></button>
            </div>
            <br />
            <div className="mt-3 border-t-2 border-b-2 border-primary-border">
            <Table >
                <Table.Thead
                className="h-16 !border-primary-border !bg-primary-card">
                    <Table.Tr className="!border-primary-border !text-[1.1rem] !font-normal">
                        <Table.Th>#</Table.Th>
                        <Table.Th>Title</Table.Th>
                        <Table.Th>Holiday Date</Table.Th>
                        <Table.Th>Day</Table.Th>
                        <Table.Th className="!text-right">Action</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            </div>
        </div>
        );
    }

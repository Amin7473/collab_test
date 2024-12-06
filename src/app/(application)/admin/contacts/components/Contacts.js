"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaPlus, FaPencilAlt  } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import AddContactForm from "./addContactForm";
import { useDispatch } from "react-redux";
import { Button, Popover, Select, TextInput, Menu } from '@mantine/core';
import { openAddPopup } from "@/common/store/slices/common";
import { IoNotificationsOutline, IoSearchSharp } from "react-icons/io5";
import { FaGear, FaEllipsisVertical } from "react-icons/fa6";
import { RiDeleteBin6Line  } from "react-icons/ri";
import { useGetContacts } from "../hooks/useGetContacts";
import { useDeleteContact } from "../hooks/useDeleteContact";

// const defaultContacts = [
//     {
//         id : 1,
//         name : "John Doe",
//         email : "john.doe@aptagrim.com",
//         contact : "8925762388",
//         status : true
//     },
//     {
//         id : 2,
//         name : "Richard Miles",
//         email : "richard.miles@aptagrim.com",
//         contact : "8925762388",
//         status : true
//     },
//     {
//         id : 3,
//         name : "John Smith",
//         email : "john.smith@aptagrim.com",
//         contact : "8925762388",
//         status : true
//     },
//     {
//         id : 4,
//         name : "Mike Litorus",
//         email : "mike.litorus@aptagrim.com",
//         contact : "8925762388",
//         status : true
//     },
//     {
//         id : 5,
//         name : "Wilmer Deluma",
//         email : "wilmer.deluma@aptagrim.com",
//         contact : "8925762388",
//         status : true
//     },
//     {
//         id : 6,
//         name : "John Doe",
//         email : "john.doe@aptagrim.com",
//         contact : "8925762388",
//         status : true
//     },
//     {
//         id : 7,
//         name : "Richard Miles",
//         email : "richard.miles@aptagrim.com",
//         contact : "8925762388",
//         status : true
//     },
//     {
//         id : 8,
//         name : "John Smith",
//         email : "john.smith@aptagrim.com",
//         contact : "8925762388",
//         status : true
//     },
//     {
//         id : 9,
//         name : "Mike Litorus",
//         email : "mike.litorus@aptagrim.com",
//         contact : "8925762388",
//         status : true
//     },
//     {
//         id : 10,
//         name : "Wilmer Deluma",
//         email : "wilmer.deluma@aptagrim.com",
//         contact : "8925762388",
//         status : true
//     }
// ]

export default function AdminContacts() {
    const { data: contactsDataList } = useGetContacts({});
    const dispatch = useDispatch();
    const handleOpenModal = () => {
        dispatch(
            openAddPopup({
              title: 'contacts',
              type: 'add',
              defaultValues: {
                folder_name: '',
                brand: '',
                articles: '',
                dropzone: null,
              },
            }))
    }
    const {
        mutate: deleteContact,
        isSuccess: deleteContactSuccess,
        isError: deleteContactError,
        error: deleteContactErrors,
      } = useDeleteContact();
    const onDelete = (id) => {

        console.log("INside on delete")
        const obj = {
            id : id
        }
        console.log("after dahe")
        console.log(obj)
        deleteContact(obj);
        console.log("rwall")
        // dispatch(closeAddPopup());
        // reset();
        return obj;
        };
    const { control, watch } = useForm();
    return (
        <div className="text-white p-5 mb-5">
            <AddContactForm />
            <div className="pb-4 flex flex-row items-center justify-between w-full">
                <div>
                    <h3 className="text-[1.8rem]">Contacts</h3>
                </div>
                <div className="flex flex-row items-center gap-4">
                    <Controller
                        name='search'
                        control={control}
                        render={({ field }) => (
                        <TextInput
                            {...field}
                            placeholder='Search'
                            rightSection={
                            <IoSearchSharp size={20} color='#d4d9d6'/>
                            }
                            classNames={{
                            section: '!p-1',
                            input:
                                ' !text-[0.9rem] placeholder:!font-["CircularStd, sans-serif"] placeholder:!text-[#d4d9d6] !py-6 !px-5 !rounded-full !text-base !text-white !border-0 !bg-[#FFFFFF1A]',
                            }}
                        />
                        )}
                    />
                        <FaGear size={23} className="text-[#d4d9d6] hover:cursor-pointer"/>
                </div>
            </div>
            <br />
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-col gap-5 w-[25%]">
                    <button onClick={handleOpenModal} className="text-[1.1rem] bg-orange-500 hover:bg-orange-600 py-2 rounded flex flex-row items-center justify-center gap-3"><FaPlus/><span>Add Contact</span></button>
                    <div className="flex flex-col bg-primary-card rounded shadow-lg">
                        <div className="pl-3 hover:cursor-pointer hover:bg-[#292623] border-l-4 border-orange-500 py-3 w-full">All</div>
                        <div className="pl-3 hover:cursor-pointer hover:bg-[#292623] hover:pl-[8px] hover:border-l-4 hover:border-orange-500 py-3">Company</div>
                        <div className="pl-3 hover:cursor-pointer hover:bg-[#292623] hover:pl-[8px] hover:border-l-4 hover:border-orange-500 py-3">Client</div>
                        <div className="pl-3 hover:cursor-pointer hover:bg-[#292623] hover:pl-[8px] hover:border-l-4 hover:border-orange-500 py-3">Staff</div>
                    </div>
                </div>
                <div className="w-[70%]">
                    <div className="flex flex-col bg-primary-card rounded">
                        {
                            contactsDataList?.results?.map((contact, idx) => (
                                <div className="flex flex-row justify-between items-center px-3 py-4 border-b-2 border-primary-border shadow-lg">
                                    <div className="flex flex-row items-center gap-3">
                                        <img src="/assets/images/avatar-27.jpg" alt="User" className='h-[37px] rounded-[50%]' />
                                        <div className="flex flex-col gap-1">
                                            <span>{contact.name}</span>
                                            <span className="text-[12px] text-[#d4d9d6]">{contact.email}</span>
                                        </div>
                                    </div>
                                    <Menu shadow="md" width={150} classNames={{
                                        "dropdown" : "!border-primary-border !mr-10",
                                        "item" : "!text-white hover:!text-black"
                                    }}>
                                        <Menu.Target>
                                            <button><FaEllipsisVertical className="text-[#d4d9d6] hover:cursor-pointer" size={20}/></button>
                                        </Menu.Target>

                                        <Menu.Dropdown>
                                            <Menu.Item leftSection={<FaPencilAlt/>}>Edit</Menu.Item>
                                            <Menu.Item onClick={()=>onDelete(contact.id)} leftSection={<RiDeleteBin6Line/>}>Delete</Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
        );
    }

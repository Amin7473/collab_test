"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import MyCalendar from "./calendar";
import { FaPlus } from "react-icons/fa";
import AddEventForm from "./addEventForm";
import { useDispatch } from "react-redux";
import { openAddPopup } from "@/common/store/slices/common";

export default function AdminCalendar() {

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
            <AddEventForm />
            <div className="flex flex-row items-center justify-between">
                <div>
                    <h3 className="text-[1.8rem]">Events</h3>
                    <p className="text-gray-300">Dashboard &nbsp;/&nbsp; Events</p>
                </div>
                <button onClick={handleOpenModal} className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-full flex flex-row items-center gap-3"><FaPlus/><span>Add Event</span></button>
            </div>
            <br />
            <MyCalendar/>
        </div>
        );
    }

"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { openAddPopup } from "@/common/store/slices/common";
import { Button, Popover, Select, TextInput, Menu, Table} from '@mantine/core';
import { IoNotificationsOutline, IoSearchSharp } from "react-icons/io5";
import { FaGear, FaEllipsisVertical } from "react-icons/fa6";
import { RiDeleteBin6Line  } from "react-icons/ri";
import { FaPencilAlt  } from "react-icons/fa";

// import { SheetsDirective, SheetDirective, RangesDirective, RangeDirective, SpreadsheetComponent, clearRange } from '@syncfusion/ej2-react-spreadsheet';
import HandsontableSheet from "./handsOnTable";
import LuckySheet from "./luckySheet";
import AGGridSheet from "./AGGridSheet";
import SpreadsheetComponent from "./reactSpreadSheet";

export default function AdminSheets() {
    return (
        <div>
            <h1>Luckysheet in Next.js</h1>
            <LuckySheet />
            {/* <HandsontableSheet /> */}
            {/* <AGGridSheet /> */}
            {/* <SpreadsheetComponent /> */}

        </div>
    );
}

'use client';

import React, { useState } from 'react';
import Spreadsheet from 'react-spreadsheet';

export default function SpreadsheetComponent() {
    // Initial data for the spreadsheet
    // const [data, setData] = useState([
    //     [{ value: 'Tesla' }, { value: 'Model S' }, { value: 70000 }],
    //     [{ value: 'Ford' }, { value: 'Mondeo' }, { value: 32000 }],
    //     [{ value: 'Porsche' }, { value: 'Boxster' }, { value: 72000 }],
    // ]);

    // // Handle cell edit
    // const handleUpdate = (updates) => {
    //     setData((prevData) => {
    //         const newData = [...prevData];
    //         updates.forEach(({ row, column, value }) => {
    //             // Ensure row and column are valid before updating
    //             if (newData[row] && newData[row][column]) {
    //                 newData[row][column].value = value;
    //             } else {
    //                 console.error(`Invalid update at row ${row}, column ${column}`);
    //             }
    //         });
    //         return newData;
    //     });
    // };

    const handleUpdate = (updates) =>{
        setData(updates);
        console.log(updates);
    }

    const [data, setData] = useState([
        [{ value: "Vanilla" }, { value: "Chocolate" }, { value: "" }],
        [{ value: "Strawberry" }, { value: "Cookies" }, { value: "" }],
      ]);
    return <Spreadsheet data={data} onChange={handleUpdate} />;
}

'use client';

import React, { useEffect, useRef, useState } from 'react';
import LuckyExcel from 'luckyexcel';
import 'luckysheet/dist/plugins/css/pluginsCss.css';
import 'luckysheet/dist/plugins/plugins.css';
import 'luckysheet/dist/css/luckysheet.css';
import 'luckysheet/dist/assets/iconfont/iconfont.css';
import 'jquery-mousewheel'; // Import mousewheel explicitly
import 'spectrum-colorpicker';
import { useGetExcelData } from '../hooks/useGetExcelData';
import { useSendExcelData } from '../hooks/useSendExcelData';

export default function LuckySheet() {
    const luckysheetRef = useRef(null);
    const [sheetData, setSheetData] = useState(null);
    const saveTimeoutRef = useRef(null);
    const {
        mutate: sendExcelData,
        isSuccess: deleteExcelData,
        isError: deleteExcelData2,
        error: deleteExcelDataErrors,
    } = useSendExcelData();
    const { data: excelData } = useGetExcelData({});
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const $ = require('jquery'); // Dynamically load jQuery
            require('jquery-mousewheel');
            require('spectrum-colorpicker');
            window.$ = window.jQuery = $;
            
            const luckysheet = require('luckysheet');
            console.log(122,"excelData.message", excelData?.message);
            if (excelData?.message != null){
                console.log("not null")
                luckysheet.create({
                    container: 'luckysheet',
                    title: 'Luckysheet Demo',
                    showinfobar: false,
                    plugins: ['chart'],
                    hook: {
                        updated: handleAutoSave,
                    },
                    data : excelData.message
                });
            }
            // Add Ctrl+S event listener
        const handleSaveShortcut = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault(); // Prevent the browser's default save behavior
                console.log('Ctrl+S detected. Saving...');
                handleAutoSave();
            }
        };

        window.addEventListener('keydown', handleSaveShortcut);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('keydown', handleSaveShortcut);
        };
            // luckysheet.on('cellUpdated', () => {
            //     handleAutoSave();
            // });
        }
    }, [excelData]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) {
            alert('No file selected!');
            return;
        }

        LuckyExcel.transformExcelToLucky(file, (exportJson, luckysheetfile) => {
            if (exportJson.sheets == null || exportJson.sheets.length === 0) {
                alert('Failed to read the content of the excel file, currently does not support xls files!');
                return;
            }

            const luckysheet = require('luckysheet');
            luckysheet.destroy();

            luckysheet.create({
                container: 'luckysheet',
                showinfobar: false,
                data: exportJson.sheets,
                title: exportJson.info.name,
                userInfo: exportJson.info.creator,
                hook: {
                    updated: handleAutoSave,
                },
            });
            setSheetData(exportJson.sheets);
            console.log(exportJson.sheets);;
        });
    };

    const handleAutoSave = () => {
        // Clear previous timeout
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        // Set new timeout
        saveTimeoutRef.current = setTimeout(() => {
            const luckysheet = require('luckysheet');
            const data = luckysheet.getAllSheets();

            console.log('Auto-saving data:', data);
            setSheetData(data); // Update React state with latest data

            // You can also make an API call here to save the data to a backend
            const sendData = {
                data : data
            }
            sendExcelData(sendData);
            console.log("sent");
            // Example: saveDataToBackend(data);
        }, 1000); // Save after 1 second of inactivity
    };

    const luckyCss = {
        // margin: '0px',
        // padding: '0px',
        position: 'fixed',
        width: '80%',
        height: '80%',
        // left: '0px',
        // top: '50px',
        maxWidth : '80%'
    }

    return (
        <div>
            <input type="file" onChange={handleFileUpload} accept=".xlsx, .xls" />
            <div id="luckysheet" ref={luckysheetRef} style={luckyCss}></div>
        </div>
    );
}


// onKeyDown={(e) => {
//                 if (e.key === 'Enter') {
//                   e.preventDefault(); // Prevents the default form submission behavior
//                   if (selectedItem){
//                     sendMessage(); // Calls the sendMessage function
//                   }
//                   else{
//                     sendGroupMessage();
//                   }
//                 }
//               }}
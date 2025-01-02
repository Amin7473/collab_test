'use client';

import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ModuleRegistry, ClientSideRowModelModule } from 'ag-grid-community';

ModuleRegistry.registerModules([ ClientSideRowModelModule ]); 

export default function AGGridSheet() {
    const gridRef = useRef(); // Reference to access AG Grid instance

    // Sample data for the grid
    const [rowData, setRowData] = useState([
        { make: 'Tesla', model: 'Model S', price: 70000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxster', price: 72000 },
    ]);

    // Column definitions
    const [columnDefs] = useState([
        { headerName: 'Make', field: 'make', editable: true },
        { headerName: 'Model', field: 'model', editable: true },
        { headerName: 'Price', field: 'price', editable: true },
    ]);

    // Handle Save Data
    const handleSave = () => {
        const rowData = [];
        gridRef.current.api.forEachNode((node) => rowData.push(node.data));
        console.log('Saved Data:', rowData);
    };

    return (
        <div style={{ height: '100%' }}>
            <button onClick={handleSave} style={{ marginBottom: '10px' }}>
                Save Data
            </button>
            <div
                className="ag-theme-alpine"
                style={{ width: '100%', height: 'calc(100vh - 50px)' }} // Adjusted for header space
            >
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={{ resizable: true, sortable: true }}
                    rowSelection="multiple"
                    animateRows={true}
                />
            </div>
        </div>
    );
}

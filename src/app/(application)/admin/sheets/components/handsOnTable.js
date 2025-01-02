'use client';

import React, { useRef } from 'react';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';
import HyperFormula from 'hyperformula';

export default function HandsontableSheet() {
    const hotRef = useRef(null);

    const initialData = [
        ['', 'Tesla', 'Nissan', 'Toyota', 'Honda'],
        ['2019', 10, 11, 12, 13],
        ['2020', 20, 11, 14, 13],
        ['2021', 30, 15, 12, 13],
        ['Image', '', '', '', ''],
        ['Formula', '=A2+B2', '', '', ''],
        ['Styled Text', 'Bold Text', 'Italic Text', '', '']
    ];

    // Custom Renderer for Images
    const imageRenderer = (instance, td, row, col, prop, value) => {
        if (value && value.startsWith('img:')) {
            const imgUrl = value.replace('img:', '');
            td.innerHTML = `<img src="${imgUrl}" alt="Image" style="width:50px;height:50px;">`;
        } else {
            td.innerText = value || '';
        }
    };

    // Custom Renderer for Styled Text
    const styledTextRenderer = (instance, td, row, col, prop, value) => {
        if (value === 'Bold Text') {
            td.style.fontWeight = 'bold';
        } else if (value === 'Italic Text') {
            td.style.fontStyle = 'italic';
        } else {
            td.innerText = value || '';
        }
    };

    const handleSave = () => {
        const hotInstance = hotRef.current.hotInstance;
        console.log('Current Data:', hotInstance.getData());
    };

    return (
        <div>
            <button onClick={handleSave}>Save Data</button>
            <HotTable
                ref={hotRef}
                data={initialData}
                colHeaders={true}
                rowHeaders={true}
                width="100%"
                height="500px"
                licenseKey="non-commercial-and-evaluation"
                formulas={{
                    engine: HyperFormula.buildEmpty()
                }}
                mergeCells={true}
                cell={[
                    { row: 4, col: 1, renderer: imageRenderer },
                    { row: 6, col: 1, renderer: styledTextRenderer },
                    { row: 6, col: 2, renderer: styledTextRenderer },
                ]}
            />
        </div>
    );
}

import {profiles} from "./luckeysheetData";

const apiDataConfig = {
    demo: {
        "name": "Profiles", //Worksheet name
        "color": "", //Worksheet color
        "index": 0, //Worksheet index
        "status": 1, //Worksheet active status
        "order": 0, //The order of the worksheet
        "hide": 0,//Whether worksheet hide
        "row": 36, //the number of rows in a sheet
        "column": 18, //the number of columns in a sheet
        "defaultRowHeight": 19, //Customized default row height
        "defaultColWidth": 73, //Customized default column width
        "celldata": [], //Initial the cell data
        "config": {
            "merge": {}, //merged cells
            "rowlen": {}, //Table row height
            "columnlen": {}, //Table column width
            "rowhidden": {}, //hidden rows
            "colhidden": {}, //hidden columns
            "borderInfo": {}, //borders
            "authority": {}, //Worksheet protection
        },
        "scrollLeft": 0, //Left and right scroll bar position
        "scrollTop": 0, //Up and down scroll bar position
        "luckysheet_select_save": [], //selected area
        "calcChain": [],//Formula chain
        "isPivotTable": false,//Whether is pivot table
        "pivotTable": {},//Pivot table settings
        "filter_select": {},//Filter range
        "filter": null,//Filter configuration
        "luckysheet_alternateformat_save": [], //Alternate colors
        "luckysheet_alternateformat_save_modelCustom": [], //Customize alternate colors
        "luckysheet_conditionformat_save": {},//condition format
        "frozen": {}, //freeze row and column configuration
        "chart": [], //Chart configuration
        "zoomRatio": 1, // zoom ratio
        "image": [], //image
        "showGridLines": 1, //Whether to show grid lines
    }
}


const api = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            let ret = []
            //map column title
            Object.entries(profiles[0]).forEach(([key, value], index) => {
                ret.push({
                    'r': 0,
                    'c': index,
                    'v': {
                        ct: {fa: "General", t: "g"},
                        m: key,
                        v: key
                    }
                })
            })
            //map row data
            profiles.forEach((item, i) => {
                Object.entries(item).forEach(([key, value], index) => {
                    ret.push({
                        'r': i + 1,
                        'c': index,
                        'v': {
                            ct: {fa: "General", t: "g"},
                            m: value,
                            v: value
                        }
                    })
                })
            })
            apiDataConfig.demo.celldata = ret
            resolve(apiDataConfig.demo)
        }, 3000)
    })
}
export {
    api
}
import { columnTitles } from "../data/settings.ts";
import { columnTitleColors } from "../data/settings.ts";
import { columnColors } from "../data/settings.ts";
import { units } from "../data/settings.ts";
import { addPlus } from "../data/settings.ts";
import { roundToDigits } from "../data/settings.ts";
import { legend } from "../data/settings.ts";

import { calculateCell } from "./calculations.ts";


export const dataTable = (startAt: number, endAt: number, stepSize: number, lengthReference: number) => {


    const numberTableBodyRows = (endAt - startAt) / stepSize + 1;

    const firstColumnValues = new Array(numberTableBodyRows);
    const firstColumnCellHtml = new Array(numberTableBodyRows);

    let tableBodyValues = new Array(numberTableBodyRows);
    for (let i = 0; i < numberTableBodyRows; i++) {
        tableBodyValues[i] = new Array(columnTitles.length);
    }
    for (let i = 0; i < numberTableBodyRows; i++) {
        for (let j = 0; j < columnTitles.length; j++) {
            tableBodyValues[i][j] = new Array(legend.length);
        }
    }

    let tableBodyTeamsCellHtml = new Array(numberTableBodyRows - 1);
    for (let i = 0; i < numberTableBodyRows; i++) {
        tableBodyTeamsCellHtml[i] = new Array(columnTitles.length - 2);
    }

    let dataSetSingleCell = new Array(legend.length);

    let tableHtml = "";
    let tableHeadHtml = "";


    /* ======================================= table head ======================================= */

    tableHeadHtml = "<thead>";
    tableHeadHtml += "<tr>"

    for (let i = 0; i < columnTitles.length; i++) {

        tableHeadHtml += "<td class='data-titles' style='background-color: #" +
            columnTitleColors[i] + ";'>" + columnTitles[i] + "</td>";
    }

    tableHeadHtml += "</tr>";
    tableHeadHtml += "</head>";


    /* ======================================= table body first column ======================================= */

    /* =============== calculation =============== */
    for (let i = 0; i < numberTableBodyRows; i++) {

        firstColumnValues[i] = startAt + i * stepSize;
    }

    /* =============== cell html =============== */
    for (let i = 0; i < numberTableBodyRows; i++) {
        firstColumnCellHtml[i] = "";
        firstColumnCellHtml[i] += "<td style='background-color: #" + columnTitleColors[0] + ";'>";
        firstColumnCellHtml[i] += firstColumnValues[i];
        firstColumnCellHtml[i] += "</td>";
    }

    /* ======================================= table body teams ======================================= */

    /* =============== calculation =============== */

    for (let i = 0; i < numberTableBodyRows; i++) {

        for (let j = 0; j < columnTitles.length - 2; j++) {

            /* values by teams' formulas for a whole table cell */
            dataSetSingleCell = calculateCell(columnTitles[j + 1], firstColumnValues[i], lengthReference);

            /* copy returned cell array to table body array */
            for (let k = 0; k < legend.length; k++) {

                tableBodyValues[i][j][k] = dataSetSingleCell[k];
            }
        }
    }

    /* ===== table body teams cell html ===== */

    let unitSpaceMax = 0;
    for (let i = 0; i < units.length; i++) {
        if (units[i].length > unitSpaceMax) unitSpaceMax = units[i].length;
    }

    for (let i = 0; i < numberTableBodyRows; i++) {

        for (let j = 0; j < columnTitles.length - 2; j++) {

            tableBodyTeamsCellHtml[i][j] = "";

            tableBodyTeamsCellHtml[i][j] += "<td style='background-color: #" + columnColors[j + 1] + ";'>";

            for (let k = 0; k < legend.length; k++) {
                if (addPlus[k] && tableBodyValues[i][j][k] > 0) tableBodyTeamsCellHtml[i][j] += "+";

                tableBodyTeamsCellHtml[i][j] += tableBodyValues[i][j][k].toFixed(roundToDigits[k]);
                tableBodyTeamsCellHtml[i][j] += "&nbsp";
                tableBodyTeamsCellHtml[i][j] += units[k];

                let unitlength = Number(units[k].length);
                if (unitSpaceMax > unitlength) {
                    for (let m = unitlength; m < unitSpaceMax; m++) {
                        tableBodyTeamsCellHtml[i][j] += "&nbsp";
                    }
                }

                tableBodyTeamsCellHtml[i][j] += "<br>";
            }

            tableBodyTeamsCellHtml[i][j] += "</td>";
        }
    }

    /* ======================================= table body average ======================================= */

    /* =============== calculation average =============== */

    let average = new Array(numberTableBodyRows);
    for (let i = 0; i < numberTableBodyRows; i++) {
        average[i] = new Array(columnTitles.length - 2);
    }

    let addToAverage = 0;

    for (let i = 0; i < numberTableBodyRows; i++) {

        for (let k = 0; k < legend.length; k++) {

            addToAverage = 0;

            for (let j = 0; j < columnTitles.length - 2; j++) {

                addToAverage += tableBodyValues[i][j][k];
            }

            average[i][k] = addToAverage / (columnTitles.length - 2);
        }
    }

    /* ===== cell html average ===== */

    let averageHtml = new Array(numberTableBodyRows);

    for (let i = 0; i < numberTableBodyRows; i++) {

        averageHtml[i] = "<td style='background-color: #" + columnTitleColors[columnTitles.length - 1] + ";'>";

        for (let k = 0; k < legend.length; k++) {

            averageHtml[i] += average[i][k].toFixed(roundToDigits[k]);
            averageHtml[i] += "&nbsp;";
            averageHtml[i] += units[k];
            if (k < legend.length - 1) averageHtml[i] += "<br>";

            let unitlength = Number(units[k].length);
            if (unitSpaceMax > unitlength) {
                for (let m = unitlength; m < unitSpaceMax; m++) {
                    averageHtml[i] += "&nbsp";
                }
            }
        }

        averageHtml[i] += "</td>";
    }

    /* ======================================= whole table ======================================= */

    tableHtml = "<table class='data'>";

    /* =============== add table head =============== */
    tableHtml += tableHeadHtml;

    /* =============== add table body =============== */
    tableHtml += "<tbody>";

    for (let i = 0; i < numberTableBodyRows; i++) {

        /* first column */
        tableHtml += "<tr>";
        tableHtml += firstColumnCellHtml[i];

        /* teams' calculations */
        for (let j = 0; j < columnTitles.length - 2; j++) {

            tableHtml += tableBodyTeamsCellHtml[i][j];
        }

        /* average */
        tableHtml += averageHtml[i];
    }

    tableHtml += "</tr>";
    tableHtml += "</tbody";
    tableHtml += "</table>";

    console.log("numberTableBodyRows = ",numberTableBodyRows);
    console.log("averageHtml.length = ",averageHtml.length);
    console.log(" = ",);
    console.log(" = ",);
    console.log(" = ",);
    console.log(" = ",);
    console.log(" = ",);
    console.log(" = ",);


    return tableHtml;
};
import { columnTitles } from "../data/settings.ts";
import { columnTitleColors } from "../data/settings.ts";

export const dataTable = (startAt, endAt, stepSize, lengthReference) => {


    let tableHtml: string = "";
    tableHtml += "<table class='data'>";


    /* ======================================= table head ======================================= */

    tableHtml += "<tbody>";
    tableHtml += "<tr>"

    for (let i = 0; i < columnTitles.length; i++) {
        tableHtml += "<td style='background-color: #" + columnTitleColors[i] + ";'>" + columnTitles[i] + "</td>";
    }

    tableHtml += "</tr>";
    tableHtml += "<tbody>";

    /* ======================================= table body ======================================= */








    /* ======================================= whole table ======================================= */


    tableHtml += "<table>";

    return tableHtml;
};
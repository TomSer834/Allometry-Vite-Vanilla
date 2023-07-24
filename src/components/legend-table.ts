import { legend } from "../data/settings.ts";


export const legendTable = () => {

    let tableHtml: string = "";

    tableHtml += "<table class='legend'>";
    tableHtml += "<tbody>";

    let index: bigint = 0n;

    for (const rowText of legend) {

        index++;

        tableHtml += "<tr>" +
                        "<td>" + index + ". Cell entry:</td>" +
                        "<td>" + rowText + "</td>" +
                    "</tr>";
    }

    tableHtml += "<tbody>";
    tableHtml += "<table>";

    return tableHtml;
};
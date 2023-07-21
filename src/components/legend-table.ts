import text from "../data/legend-table.json";


export const legendTable = () => {

    let tableHtml: string = "";

    tableHtml += "<table class='legend'>";
    tableHtml += "<tbody>";

    let index: bigint = 0n;

    for (const rowText of text) {

        index++;

        tableHtml += "<tr>" +
                        "<td>" + index + ". Cell entry:</td>" +
                        "<td>" + rowText.description + "</td>" +
                    "</tr>";
    }

    tableHtml += "<tbody>";
    tableHtml += "<table>";

    return tableHtml;
};
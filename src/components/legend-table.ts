import text from "../data/legend-table.json";

export const legendTable = () => {

    let tableHtml: string = "";

    tableHtml += "<table>";
    tableHtml += "<tbody>";

    let index: bigint = 0n;

    for (const rowText of text) {
        tableHtml += `<tr>
                            <td>${index} + ". Cell entry"</td>
                      </tr>`;
        tableHtml += `<tr>
						    <td>${rowText.description}</td>
					  </tr>`;
        index++;
    }

    tableHtml += "<tbody>";
    tableHtml += "<table>";
};
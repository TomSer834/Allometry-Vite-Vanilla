const Starter = document.getElementById("starter");

Starter.addEventListener("submit", (e) => {
    e.preventDefault();
    makeTables();
});

function makeTables() {
    /* ======================= input field ======================= */

    let length_reference_meters = parseFloat(
        document.getElementById("element_1").value
    );
    let length_reference_centimeters = parseFloat(
        document.getElementById("element_2").value
    );
    let start_at_meters = parseFloat(document.getElementById("element_3").value);
    let start_at_centimeters = parseFloat(
        document.getElementById("element_4").value
    );
    let end_at_meters = parseFloat(document.getElementById("element_5").value);
    let end_at_centimeters = parseFloat(
        document.getElementById("element_6").value
    );
    let step_size_centimeters = parseFloat(
        document.getElementById("element_7").value
    );

    let length_reference =
        length_reference_meters + length_reference_centimeters / 100;
    let start_at = start_at_meters + start_at_centimeters / 100;
    let end_at = end_at_meters + end_at_centimeters / 100;
    let step_size = step_size_centimeters / 100;

    if (start_at > end_at) end_at = start_at;

    /* ======================= settings ======================= */

    /* data table columns settings */
    columnTitles = [
        "Length [m]",
        "MacClain et al.",
        "Gottfried et al.",
        "Kohler et al.",
        "Tricas & McCosker",
        "Mollet & Cailliet",
        "Casey & Pratt",
        "Average",
    ];

    columnTitleColors = [
        "111111",
        "333333",
        "333333",
        "333333",
        "333333",
        "333333",
        "333333",
        "111111",
    ];

    columnColors = [
        "111111",
        "500505",
        "553000",
        "204505",
        "003842",
        "002060",
        "400540",
        "111111",
    ];

    /* data table cell settings */
    const units = ["kg", "kg", "kg", "%"];

    const addPlus = [false, false, true, true];

    const roundToDigits = [0, 0, 0, 1];

    /* legend table settings */
    const legend = [
        "Weight calculated using the authors' equations",
        "Weight calculated using the square-cube law, based on the reference",
        "Difference (1) minus (2) = allometric effect",
        "Allometric addition to (2)",
    ];
    /* ======================= settings end ======================= */

    const numberTableBodyRows = parseInt(
        Math.round((end_at - start_at) / step_size + 1)
    );
    let firstColumnValues = new Array(numberTableBodyRows);

    let tableBodyValues = new Array(
        numberTableBodyRows
    ); /* , columnTitles.length - 1, legend.length); */
    for (let i = 0; i < numberTableBodyRows; i++) {
        tableBodyValues[i] = new Array(columnTitles.length);
    }
    for (let i = 0; i < numberTableBodyRows; i++) {
        for (let j = 0; j < columnTitles.length; j++) {
            tableBodyValues[i][j] = new Array(legend.length);
        }
    }

    let dataSetSingleCell = new Array(legend.length);

    /* ======================= calculation ======================= */

    function calculateCell(team, length, length_reference) {
        let allometricWeight = 0;
        let referenceWeight = 0;
        let squareCubeLawWeight = 0;
        let allometricEffectAbsolute = 0;
        let allometricEffectRelative = 0;

        switch (team) {
            case "MacClain et al.":
                allometricWeight = 9.7723722 * Math.pow(length, 3);
                referenceWeight = 9.7723722 * Math.pow(length_reference, 3);
                break;
            case "Gottfried et al.":
                allometricWeight = 7.331551641 * Math.pow(length, 3.174);
                referenceWeight = 7.331551641 * Math.pow(length_reference, 3.174);
                break;
            case "Kohler et al.":
                allometricWeight =
                    11.19585237 * Math.pow(0.9442 * length - 0.057441, 3.0848);
                referenceWeight =
                    11.19585237 * Math.pow(0.9442 * length_reference - 0.057441, 3.0848);
                break;
            case "Tricas & McCosker":
                allometricWeight = 7.581996797 * Math.pow(length, 3.15);
                referenceWeight = 7.581996797 * Math.pow(length_reference, 3.15);
                break;
            case "Mollet & Cailliet":
                allometricWeight = 7.914 * Math.pow(length, 3.096);
                referenceWeight = 7.914 * Math.pow(length_reference, 3.096);
                break;
            case "Casey & Pratt":
                allometricWeight = 7.43911549848 * Math.pow(length, 3.09497);
                referenceWeight = 7.43911549848 * Math.pow(length_reference, 3.09497);
                break;
        }

        squareCubeLawWeight =
            referenceWeight * Math.pow(length / length_reference, 3);
        allometricEffectAbsolute = allometricWeight - squareCubeLawWeight;
        allometricEffectRelative =
            (allometricEffectAbsolute / squareCubeLawWeight) * 100;

        return [
            allometricWeight,
            squareCubeLawWeight,
            allometricEffectAbsolute,
            allometricEffectRelative,
        ];
    }

    /* ======================= display legend table ======================= */

    let text = "";
    text += "<table class='legend'>";
    for (let i = 0; i < 4; i++) {
        text += "<tr>";

        text +=
            "<td>" +
            "&nbsp" +
            (i + 1) +
            ". Cell entry:" +
            "</td>"; /* column on the left */
        text +=
            "<td>" +
            "<p>" +
            legend[i] +
            " " +
            "</p>" +
            "</td>"; /* column on the right */
        text += "</tr>";
    }
    text += "</table>";

    document.getElementById("legend-table").innerHTML = text;

    /* ======================= data table calculation ======================= */

    /* table body calculation including first column */

    for (let i = 0; i < numberTableBodyRows; i++) {
        let average = [legend.length];
        for (let j = 0; j < legend.length; j++) {
            average[j] = 0;
        }

        for (let j = 0; j < columnTitles.length - 2; j++) {
            /* first column */
            firstColumnValues[i] = start_at + i * step_size;

            /* values by teams' formulas for a whole table cell */
            dataSetSingleCell = calculateCell(
                columnTitles[(i + 1, j + 1)],
                firstColumnValues[i],
                length_reference
            );

            /* copy returned cell array to table body array */
            for (let k = 0; k < legend.length; k++) {
                tableBodyValues[i][j][k] = dataSetSingleCell[k];
            }

            /* add returned cell array values to average */
            for (let k = 0; k < legend.length; k++) {
                average[k] += dataSetSingleCell[k];
            }
        }

        /* copy cell values of average to table body array */
        for (let k = 0; k < legend.length; k++) {
            tableBodyValues[i][columnTitles.length - 1][k] =
                average[k] / (columnTitles.length - 2);
        }
    }

    /* ======================= display data table ======================= */

    /* display table head of data table */

    text = "<table class='data'>";
    text += "<th>";
    text += "<tr class='data-tr'>";
    for (let j = 0; j < columnTitles.length; j++) {
        text += "<td style='background-color: #" + columnTitleColors[j] + ";'>";
        text += "<p>" + columnTitles[j] + " " + "</p><br>";
        text += "</td>";
    }
    text += "</tr>";
    text += "</th>";

    /* display table body of data table */

    text += "<tb>";

    let unitSpaceMax = 0;
    for (let j = 0; j < units.length; j++) {
        if (units[j].length > unitSpaceMax) unitSpaceMax = units[j].length;
    }

    for (let i = 0; i < numberTableBodyRows; i++) {
        /* first column */
        text += "<tr>";
        text +=
            "<td>" +
            "<p style='text-align: center';>" +
            firstColumnValues[i].toFixed(2) +
            " " +
            "</p>" +
            "</td>";

        /* from second to forelast column */
        for (let j = 0; j < columnTitles.length - 2; j++) {
            text += "<td style='background-color: #" + columnColors[j + 1] + ";'>";

            for (let k = 0; k < legend.length; k++) {
                if (addPlus[k] && tableBodyValues[i][j][k] > 0) text += "+";

                if (tableBodyValues[i][j][k] == 0) tableBodyValues[i][j][k] = 0;

                text += tableBodyValues[i][j][k].toFixed(roundToDigits[k]);
                text += "&nbsp";
                text += units[k];

                let unitlength = Number(units[k].length);
                if (unitSpaceMax > unitlength) {
                    for (let m = unitlength; m < unitSpaceMax; m++) {
                        text += "&nbsp";
                    }
                }

                text += "<br>";
            }
            text += "</td>";
        }

        /* last column */
        text +=
            "<td style='background-color: #" +
            columnColors[columnColors.length - 1] +
            ";'>";

        for (let k = 0; k < legend.length; k++) {
            if (addPlus[k] && tableBodyValues[i][columnColors.length - 1][k] > 0)
                text += "+";

            if (tableBodyValues[i][columnColors.length - 1][k] == 0)
                tableBodyValues[i][columnColors.length - 1][k] = 0;
            text += tableBodyValues[i][columnTitles.length - 1][k].toFixed(
                roundToDigits[k]
            );
            text += "&nbsp";
            text += units[k];

            let unitlength = Number(units[k].length);
            if (unitSpaceMax > unitlength) {
                for (let m = unitlength; m < unitSpaceMax; m++) {
                    text += "&nbsp";
                }
            }

            text += "<br>";
        }

        text += "</td>";
        text += "</tr>";
    }
    text += "</tb>";
    text += "</table>";

    document.getElementById("data-table").innerHTML = text;
}

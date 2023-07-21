import { legendTable } from "../components/legend-table.ts";

export const PageShark = () => {
    return /*html*/`
<div class="page pageShark">
	<p>This is the SHARK page.</p>
</div>

<div class="main-substitute">
        <div class="inputField">

            <span class="firstSpan">Choose the size reference for allometric comparison:</span>

            <div class="inputItems">
                <form id="starter" action="" method="">

                    <label for="element_1">
                        <span>length: &nbsp&nbsp</span>
                        <input id="element_1" class="inputElements inputElement-1" name="length_ref_in_meters"
                            type="number" min="1" max="7" step="1" value="3">
                        <span>m&nbsp;</span>
                    </label>

                    <label for="element_2">
                        <input id="element_2" class="inputElements" name="length_ref_in_centimeters" type="number"
                            min="0" max="99" step="1" value="50">
                        <span>cm</span>
                    </label>

                    <hr>

                    <p style="color: #1515FF; font-size: 0.85rem; margin-top: 1rem;">Specify the size range:</p>

                    <label for="element_3">
                        <span>start at:&nbsp;</span>
                        <input id="element_3" class="inputElements inputElement-3" name="start_at_in_meters"
                            type="number" min="1" max="7" step="1" value="2">
                        <span>m&nbsp;</span>
                    </label>

                    <label for="element_4">
                        <input id="element_4" class="inputElements" name="start_in_centimeters"
                            style="width: 4rem; text-align: right;" type="number" min="0" max="90" step="10" value="50">
                        <span>cm</span>
                    </label>

                    <label for="element_5">
                        <span>end at: &nbsp;&nbsp;</span>
                        <input id="element_5" class="inputElements" name="end_at_in_meters"
                            style="width: 4rem; text-align: right;" type="number" min="1" max="20" step="1" value="4">
                        <span>m&nbsp;</span>
                    </label>

                    <label for="element_6">
                        <input id="element_6" class="inputElements" name="end_at_in_centimeters"
                            style="width: 4rem; text-align: right;" type="number" min="0" max="90" step="10" value="50">
                        <span>cm</span>
                    </label>

                    <label for="element_7">
                        <span>step size:</span>
                        <input id="element_7" class="inputElements inputElement-7" name="step_size_in_centimeters"
                            type="number" min="5" max="200" step="5" value="50">
                        <span>cm</span>
                    </label>

                    <hr>

                    <div class="inputFieldBottom">
                        <label for="element_7">
                            <input id="element_7" class="button" type="submit" value="Calculate" name="Calculate">
                        </label>
                    </div>
                </form>
            </div>
        </div>

</div>


    <div id="legend-table"></div>

    <div id="data-table"></div>

`;
}


export const attachEvents = () => {

    const _Starter = document.getElementById("starter");
    if (_Starter) {

        const Starter = _Starter;

        Starter.addEventListener("submit", (e) => {
            e.preventDefault();
            console.log("Button was clicked!");



            const text: string = legendTable();

            console.log(text);





            const _Table_1 = document.getElementById("data-table");
            if (_Table_1) {
                const Table_1 = _Table_1;
                Table_1.innerHTML = text;

            } else {
                console.log("Starter is null!");
            }

        })
    } else {
        console.log("Starter is null!");
    }
}
import {getFormattedEncodedByteStreams} from "./vbEncoding.js";

function onVBSubmitClicked() {
    let numbersList = document.getElementById('vb_numbers_input').value.split(' ')
    numbersList = numbersList.map(n => parseInt(n))

    document.getElementById('vb_para').innerHTML = getFormattedEncodedByteStreams(numbersList, 8).join('   ')
}

console.log("Event added for vb_submit")
document.getElementById('vb_submit').addEventListener('click', onVBSubmitClicked)
import {getFormattedEncodedByteStreams, getVBEncodings} from "./vbEncoding.js";

function displayVBCode(numbers, nBits) {
    document.getElementById('vb_para').innerHTML = getVBEncodings(numbers, nBits).join(' ')
}

function displayByteStreams(numbers, nBits) {
    let bitStreams = getFormattedEncodedByteStreams(numbers, nBits)
    let innerHTML = ''
    for (let bitStream of bitStreams) {
        innerHTML += "<div class='vb_para_bitstream_content' style='display: inline-block; margin-right: 10px; margin-bottom: 5px; border: solid 1px black'>" + bitStream + "</div>"
    }
    document.getElementById('vb_para').innerHTML = innerHTML
}

function isVBCodeOptionEnabled() {
    return document.getElementById('vb_option_code').checked
}

function isByteStreamOptionEnabled() {
    return document.getElementById('vb_option_bytestream').checked
}

function onVBSubmitClicked() {
    let numbersList = document.getElementById('vb_numbers_input').value.split(' ')
    numbersList = numbersList.map(n => parseInt(n))

    if (isVBCodeOptionEnabled()) {
        displayVBCode(numbersList, 8)
    } else {
        displayByteStreams(numbersList, 8)
    }
}


document.getElementById('vb_submit').addEventListener('click', onVBSubmitClicked)
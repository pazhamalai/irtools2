import {getFormattedEncodedByteStreams, getVBEncodings} from "./vbEncoding.js";

function displayVBCode(numbers, nBits) {
    let vbEncodings = getVBEncodings(numbers, nBits)
    let innerHTML = ''
    for (let vbEncoding of vbEncodings) {
        innerHTML += "<div style='display: inline-block; margin-right: 20px; margin-bottom: 5px;'><" + vbEncoding.toString() + "></div>"
    }
    document.getElementById('vb_para').innerHTML = innerHTML
}

function displayByteStreams(numbers, nBits) {
    let bitStreams = getFormattedEncodedByteStreams(numbers, nBits)
    let innerHTML = ''
    for (let bitStream of bitStreams) {
        innerHTML += "<div style='display: inline-block; margin-right: 10px; margin-bottom: 5px; border: solid 1px black'>" + bitStream + "</div>"
    }
    document.getElementById('vb_para').innerHTML = innerHTML
}

function isVBCodeOptionEnabled() {
    return document.getElementById('vb_option_code').checked
}

function isByteStreamOptionEnabled() {
    return document.getElementById('vb_option_bytestream').checked
}

function isNibbleOptionEnabled() {
    return document.getElementById('vb_bit_option_nibble').checked
}

function is8BitOptionEnabled() {
    return document.getElementById('vb_bit_option_8').checked
}

function is16BitOptionEnabled() {
    return document.getElementById('vb_bit_option_16').checked
}

function is32BitOptionEnabled() {
    return document.getElementById('vb_bit_option_32').checked
}

function getNBits() {
    if (isNibbleOptionEnabled()) {
        return 4
    }

    if (is8BitOptionEnabled()) {
        return 8
    }

    if (is16BitOptionEnabled()) {
        return 16
    }

    return 32
}

function onVBSubmitClicked() {
    let numbersList = document.getElementById('vb_numbers_input').value.split(' ')
    numbersList = numbersList.map(n => parseInt(n))

    if (isVBCodeOptionEnabled()) {
        displayVBCode(numbersList, getNBits())
    } else {
        displayByteStreams(numbersList, getNBits())
    }
}


document.getElementById('vb_submit').addEventListener('click', onVBSubmitClicked)
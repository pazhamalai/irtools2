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

function isComputeGapsClicked() {
    return document.getElementById('vb_gaps').checked
}

function computeGaps(numbers) {
    let gaps = Array()
    gaps.push(numbers[0])

    for (let i = 1; i < numbers.length; i++) {
        let diff = numbers[i] - numbers[i-1]
        if (diff < 0) {
            return []
        }
        gaps.push(diff)
    }

    return gaps
}

function onVBSubmitClicked() {
    let numbersList = document.getElementById('vb_numbers_input').value.split(' ')

    if (numbersList.length === 0) {
        alert('Numbers field is empty')
        return
    }

    numbersList = numbersList.map(n => parseInt(n))

    if (isComputeGapsClicked()) {
        numbersList = computeGaps(numbersList)

        if (numbersList.length === 0) {
            alert('Provide numbers in sorted order')
            return;
        }
    }

    if (isVBCodeOptionEnabled()) {
        displayVBCode(numbersList, getNBits())
    } else {
        displayByteStreams(numbersList, getNBits())
    }
}


document.getElementById('vb_submit').addEventListener('click', onVBSubmitClicked)
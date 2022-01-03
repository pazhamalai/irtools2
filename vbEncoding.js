export {getFormattedEncodedByteStreams, getVBEncodings}

function getVBEncoding(number, nBits) {
    // 1 bit is reserved for continuation
    const actualBits = nBits - 1
    let n = number;
    const divisor = Math.pow(2, actualBits)
    const vbCodes = Array()
    while (n !== 0) {
        let remainder = Math.floor(n/divisor)
        let quotient = n%divisor
        vbCodes.push(quotient)
        n = remainder
    }
    vbCodes.reverse()
    return vbCodes
}

function getVBEncodings(numbers, nBits) {
    const vbCodes = Array()
    for (let number of numbers) {
        vbCodes.push(getVBEncoding(number, nBits))
    }
    return vbCodes
}

// Assumes that number is always less than 2^nBits
function getEncodedByteStream(number, nBits) {
    let byteStream = ""
    let n = number
    for (let i = nBits - 1; i >= 0; i--) {
        if (n >= Math.pow(2, i)) {
            byteStream += "1"
            n = n - Math.pow(2, i)
        } else {
            byteStream += "0"
        }
    }
    return byteStream
}

function getEncodedByteStreamFromVBCode(vbCode, nBits) {
    let continuationBit;
    let byteStream = ""
    for (let i = 0; i < vbCode.length; i++) {
        continuationBit = (i === vbCode.length - 1) ? 1 : 0
        byteStream += continuationBit.toString() + getEncodedByteStream(vbCode[i], nBits-1) + " "
    }
    return byteStream
}

function getEncodedByteStreams(numbers, nBits) {
    const vbCodes = getVBEncodings(numbers, nBits)
    const byteStreams = Array()
    for (let vbCode of vbCodes) {
        byteStreams.push(getEncodedByteStreamFromVBCode(vbCode, nBits))
    }
    return byteStreams
}

function getFormattedEncodedByteStreams(numbers, nBits) {
    const byteStreams = getEncodedByteStreams(numbers, nBits)
    const formattedByteStreams = Array()
    for (let byteStream of byteStreams) {
        let nBitStreams = byteStream.trim().split(' ')
        for (let i = 0; i < nBitStreams.length; i++) {
            if (i === nBitStreams.length - 1) {
                nBitStreams[i] = nBitStreams[i].replace('1', "<span style=\'color: cornflowerblue\'>1</span>")
            } else {
                nBitStreams[i] = nBitStreams[i].replace('0', "<span style=\'color: cornflowerblue\'>0</span>")
            }
        }
        formattedByteStreams.push(nBitStreams.join(' '))
    }

    return formattedByteStreams
}

export {getDictionaryAsString, getDictionaryAsFormattedString, getCommonPrefix, getDictionaryAsFrontEncodedString}

// All functions assume that wordsList will be given in sorted order

function getDictionaryAsString(wordsList) {
    let dictionaryString = ""
    wordsList.forEach(word => {
        let length = word.length
        dictionaryString += length.toString() + word
    })
    return dictionaryString
}


function getDictionaryAsFormattedString(wordsList, k) {
    let dictionaryString = ""
    let counter = 1
    wordsList.forEach(word => {
        if (counter === 1) {
            // color and strong length string
            dictionaryString += "<strong style='color: cornflowerblue'>" + word.length.toString() + "</strong>"
        }
        else {
            // only strong the length
            dictionaryString += "<strong>" + word.length.toString() + "</strong>"
        }

        dictionaryString += word

        if (counter === k) {
            counter = 0
            dictionaryString += " "
        }

        counter++
    })
    return dictionaryString
}

function getCommonPrefix(wordsList) {
    const firstWord = wordsList[0]
    let prefixLength = -1

    for (let i = 0; i < firstWord.length; i++) {
        if (firstWord[i] === wordsList[wordsList.length - 1][i]) {
            prefixLength = i
        }
        else {
            break
        }
    }

    return prefixLength === -1 ? null : firstWord.slice(0, prefixLength + 1)
}

function getNormalBlockString(wordsList) {
    return getDictionaryAsFormattedString(wordsList, wordsList.length)
}

function getBlockString(wordsList, formatted=false) {
    const commonPrefix = getCommonPrefix(wordsList)
    let blockString = ""
    let initialLength = wordsList[0].length

    if (commonPrefix === null || commonPrefix.length === 0) {
        return getNormalBlockString(wordsList)
    }

    if (formatted) {
        blockString += "<strong style=\'color: cornflowerblue\'>" + initialLength.toString() + "</strong>"
    } else {
        blockString += initialLength.toString()
    }
    blockString += commonPrefix

    if (wordsList.length === 1) {
        return blockString
    }

    blockString += '*'
    blockString += wordsList[0].slice(commonPrefix.length)

    wordsList = wordsList.slice(1)
    for (let word of wordsList) {
        let rem_length = word.length - commonPrefix.length
        blockString += rem_length.toString()
        blockString += '\u2662'
        blockString += word.slice(commonPrefix.length)
    }

    return blockString
}


function getDictionaryAsFrontEncodedString(wordsList, k, formatted = false) {
    let frontEncodedString = ""
    let index = 0

    while (index < wordsList.length) {
        let block = wordsList.slice(index, index + k)
        frontEncodedString += getBlockString(block, formatted)
        frontEncodedString += " "
        index = index + k
    }

    return frontEncodedString
}

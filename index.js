import {getCommonPrefix, getDictionaryAsFormattedString, getDictionaryAsFrontEncodedString} from "./dictionaryAsString.js";

function onDasSubmitButtonClicked() {
    let input_words = document.getElementById('das_word_input').value
    let words = input_words.split(' ')
    let unique_words = new Set(words)

    let k_string = document.getElementById('das_k_value').value
    let k = parseInt(k_string)
    let unique_words_list = Array.from(unique_words)
    unique_words_list.sort()
    let front_encode_enabled = document.getElementById('das_front_encoding').checked

    let out_string;
    if (front_encode_enabled) {
        out_string = getDictionaryAsFrontEncodedString(unique_words_list, k, true)
    } else {
        out_string = getDictionaryAsFormattedString(unique_words_list, k)
    }
    document.getElementById('das_para').innerHTML = out_string
}

document.getElementById('das_submit').addEventListener('click', onDasSubmitButtonClicked)
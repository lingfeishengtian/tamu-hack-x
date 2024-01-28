import axios, { isCancel, AxiosError } from 'axios';
import { getChromeTabs } from './chrome_tab_extractor';
// const HOST = "http://100.64.27.42:3000/"
const HOST = "http://localhost:4000/"

export async function sendHTMLRequest() {
    let arrs = await getChromeTabs()
    const URL = "api/send-html"

    for (let arr of arrs) {
        let data = {
            "data": {
                "html": arr
            }
        }
        // axios.post(HOST + URL, data)
    }
}

export async function sendChatMessage(message) {
    const URL = "api/send-query"
    let data = {
        "data": {
            "query": message
        }
    }
    return (await axios.post(HOST + URL, data)).data
}

export async function getCategories(cateogory) {
    const URL = "api/get-category"
    return (await axios.post(HOST + URL, {
        "data": {
            "category": cateogory
        }
    })).data
}
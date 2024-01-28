/*global chrome*/

(async () => {
    const tabs = await chrome.tabs.query({});
    let fin = [];
    for (let tab of tabs) {
      try {
        let result = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => document.documentElement.outerHTML,
        });
        fin.push(extractElemList(result[0].result, getBestSiteForUrl(tab.url)));
      } catch (e) {
        console.log(e)
      }
    }
    console.log(fin)
  })();
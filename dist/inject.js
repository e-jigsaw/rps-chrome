window.addEventListener('fetchPage', () => {
  window.postMessage({type: 'pageFetched', page: window.scrapbox.Page}, '*')
}, false)

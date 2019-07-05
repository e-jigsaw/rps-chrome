const el = document.createElement('script')
el.src = chrome.extension.getURL('inject.js')
document.head.appendChild(el)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'fetchPage') {
    const ev = new CustomEvent('fetchPage')
    window.dispatchEvent(ev)
  }
})

window.addEventListener('message', ev => {
  if (ev.data.type === 'pageFetched') {
    chrome.runtime.sendMessage(chrome.runtime.id, {
      type: 'pageFetched',
      page: ev.data.page
    })
  }
})

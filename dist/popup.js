const pub = 'jigsaw'
const prv = 'jgs'
const zpad = n => n.toString().length === 1 ? `0${n}` : n
const openBox = (prj, diff) => () => {
  const day = new Date(new Date().getTime() + (diff * 86400000))
  chrome.tabs.create({
    url: `https://scrapbox.io/${prj}/${day.getFullYear()}${zpad(day.getMonth() + 1)}${zpad(day.getDate())}`
  })
}

document.getElementById('pub-today').addEventListener('click', openBox(pub, 0))
document.getElementById('prv-today').addEventListener('click', openBox(prv, 0))
document.getElementById('pub-yesterday').addEventListener('click', openBox(pub, -1))
document.getElementById('prv-yesterday').addEventListener('click', openBox(prv, -1))

document.getElementById('fetch').addEventListener('click', () => {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, ([tab]) => {
    chrome.tabs.sendMessage(tab.id, {type: 'fetchPage'})
  })
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message)
})

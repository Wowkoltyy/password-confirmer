//Created by wowkoltyy
//https://github.com/wowkoltyy
//
//Supported by metagames
//https://metagames.cf

let togglebutton = $("#toggle-button")
let statusbar = $("#status")

window.onload = () => {
    chrome.runtime.sendMessage({action: 'getToggle'}, (res) => {
        togglebutton.prop('checked', res)
        if(res)return statusbar.css({color: 'rgb(47, 255, 158)'}).text("Enabled")
        statusbar.css({color: 'rgb(255, 30, 30)'}).text("Disabled")
    })
}

togglebutton.on('change', (e) => {
    chrome.runtime.sendMessage({action: 'updateToggle', args: e.target.checked})
    if(e.target.checked)return statusbar.css({color: 'rgb(47, 255, 158)'}).text("Enabled")
    statusbar.css({color: 'rgb(255, 30, 30)'}).text("Disabled")
})

const { app, BrowserWindow, Menu } = require('electron')
const {plantilla} = require("./menu.js")

let menu = Menu.buildFromTemplate(plantilla)

Menu.setApplicationMenu(null)

app.on('ready', () => {
    let win = new BrowserWindow({
    title: 'Desafio 4 - Electron',
    width: 800,
    height: 600
  })
  win.setMenu(menu)
  win.on("close", ()=>{
    BrowserWindow.getAllWindows().forEach(wind => wind.close())
})
})
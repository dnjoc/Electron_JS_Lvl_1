const {app, BrowserWindow} = require("electron");

app.on("ready", ()=>{
    let win = new BrowserWindow();

    win.loadFile("./formulario.html");
});
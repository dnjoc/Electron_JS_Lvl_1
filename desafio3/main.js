const { app, BrowserWindow, dialog } = require('electron')
const url = ["https://angular.dev/","https://www.ferrari.com/es-ES", "https://www.electronjs.org/es/", "https://www.tesla.com/es_es", "https://es.react.dev/"]
app.on('ready', () => {
 const ventana = new BrowserWindow({
    show: false,
    title: 'Desafio 3'
  })
  ventana.loadURL('https://cadif1.com/')
  ventana.once('ready-to-show', () => {
  ventana.show()
    let contador = 30
    setTimeout(() => {
    const contedo = setInterval(() => {
      if (contador > 0) {
        ventana.setTitle(`Quedan ${contador} segundos`)
        if (contador === 15) {
            ventana.maximize()
        }
        contador--
      } else {
        clearInterval(contedo)
        ventana.setTitle('¡Tiempo terminado!')
        dialog.showMessageBox(ventana, {
          type: 'info',
          buttons: ['OK'],
          title: 'Tiempo terminado',
          message: 'Se acabó el tiempo'
        }).then(() => {
          BrowserWindow.getAllWindows().forEach(win => win.close())
        });
      }
    }, 1000)
  })
}, 100);
  ventana.on('maximize', () => {
    dialog.showMessageBox(ventana, {
      type: 'question',
      buttons: ['Sí', 'No'],
      noLink :true,
      title: 'Nueva ventana',
      message: '¿Desea abrir otra pagina?'
    }).then(result => {
        if (result.response == 0) { 
            console.log("contesto si")
            let x = Math.round(Math.random()*640)
            let y = Math.round(Math.random()*80)
            let pagina = Math.floor(Math.random() * 5)
            const ventanacontador = new BrowserWindow({
            })
            ventanacontador.setPosition(x,y)
            ventanacontador.loadURL(url[pagina])
          }
    })
  })
  ventana.on("close", ()=>{
      BrowserWindow.getAllWindows().forEach(win => win.close())
  })
})


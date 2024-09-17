const { BrowserWindow } = require('electron')

module.exports.plantilla = [
    {
        label: 'Alumnos',
        type: 'submenu',
        submenu: [
          {
            label: 'Listado',
            click: () => openWindow('Listado de alumnos'),
          },
          {
            label: 'Nuevo',
            click: () => openWindow('Nuevo alumno'),
          },
          {
            label: 'Buscar',
            click: () => openWindow('Buscar alumno'),
          },
        ],
      },
      {
        label: 'Secciones',
        type: 'submenu',
        submenu: [
          {
            label: 'Abrir Sección',
            click: () => openWindow('Abrir sección'),
          },
          {
            label: 'Inscribir Alumno',
            click: () => openWindow('Inscribir alumno'),
          },
          {
            label: 'Imprimir Facturas',
            click: () => openWindow('Imprimir facturas'),
          },
        ],
      },
    {
      label: 'Sistema',
      type: 'submenu',
      submenu: [
        { 
            label: 'Ayuda',
            role: "help"
        },
        { 
            label: 'Acerca de',
            role: "about"
        },
        { 
            label: 'DevTools',
            role: "toggleDevTools"
        },
        { 
            type: 'separator'
        }, 
        { 
            label: 'Salir',
            role: 'quit'
        }
      ]
    }
  ]
  const windows = {}
  function createWindow(label, windows) {
    const newWin = new BrowserWindow({
        width: 600,
        height: 400
      })
      newWin.setTitle(label)
      windows[label] = newWin
  }
  function openWindow(label) {
    if (windows[label]) {
        if (windows[label].isMinimized()) {
            windows[label].restore()
        } else {
            windows[label].focus()
        } 
        } else {
            createWindow(label, windows)
        }
        windows[label].on("close", ()=>{
            delete windows[label]
        })
  }
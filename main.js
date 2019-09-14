const electron = require('electron')

require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
})
const path = require('path')

const windows = []

function createWindows() {
  const allScreens = electron.screen.getAllDisplays()
  let screenNumber = 1
  allScreens.forEach(screen => {
    console.log(screen)
    const mainWindow = new electron.BrowserWindow({
      width: screen.size.width,
      height: screen.size.height,
      x: screen.bounds.x,
      y: screen.bounds.y,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      },
      movable: false,
      resizable: false,
      alwaysOnTop: false,
      titleBarStyle: 'hiddenInset',
      frame: false,
    })

    mainWindow.loadFile('./screens/' + screenNumber + '.html')
    mainWindow.on('closed', () => {
      // Close one window, close everything.
      electron.app.quit()
    })
    windows.push(mainWindow)
    screenNumber++
  })
}

electron.app.on('ready', createWindows)

electron.app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    electron.app.quit()
  }
})
electron.app.on('activate', function() {
  if (mainWindow === null) {
    createWindows()
  }
})

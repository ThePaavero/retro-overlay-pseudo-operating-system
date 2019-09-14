const electron = require('electron')

require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
})
const path = require('path')

let mainWindow

function createWindows() {

  const allScreens = electron.screen.getAllDisplays()
  allScreens.forEach(screen => {
    console.log(screen)
    mainWindow = new electron.BrowserWindow({
      width: screen.size.width,
      height: screen.size.height,
      x: screen.workArea.x,
      y: screen.workArea.y,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
    mainWindow.loadFile('index.html')
    mainWindow.on('closed', function() {
      mainWindow = null
    })
  })
}

electron.app.on('ready', createWindows)
electron.app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') electron.app.quit()
})
electron.app.on('activate', function() {
  if (mainWindow === null) createWindows()
})

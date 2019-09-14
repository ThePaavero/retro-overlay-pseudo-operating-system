const electron = require('electron')

require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
})
const path = require('path')

let mainWindow

function createWindow() {

  const screenElectron = electron.screen
  const allScreens = screenElectron.getAllDisplays()
  console.log(allScreens)

  mainWindow = new electron.BrowserWindow({
    width: 7680,
    height: 8000,
    x: -1560,
    y: -40,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html')
  mainWindow.on('closed', function() {
    mainWindow = null
  })
}

electron.app.on('ready', createWindow)
electron.app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') electron.app.quit()
})
electron.app.on('activate', function() {
  if (mainWindow === null) createWindow()
})

const electron = require('electron')
const _ = require('lodash')

require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
})
const path = require('path')

const windows = []

function closeAll() {
  console.log('Closing all!')
  windows.forEach(window => {
    if (window) {
      window.close()
    }
  })
}

function createWindows() {
  let mainWindow
  const allScreens = electron.screen.getAllDisplays()
  allScreens.forEach(screen => {
    // console.log(screen)
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
    mainWindow.on('closed', () => {
      // closeAll()
    })
    mainWindow.maximize()
    windows.push(mainWindow)
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

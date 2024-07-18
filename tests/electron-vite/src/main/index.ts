import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  await initDwn()
  await initWeb5()

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
import { DidKey, UniversalResolver } from '@web5/dids';
import { Web5 } from '@web5/api'
import {
  Dwn,
  DataStream,
  Jws,
  RecordsWrite,
  RecordsRead,
  RecordsDelete,
  DataStoreLevel,
  EventLogLevel,
  MessageStoreLevel,
  TestDataGenerator,
  ResumableTaskStoreLevel
} from '@tbd54566975/dwn-sdk-js'

import '../../../util/node-polyfill.js'
import checkWeb5 from '../../../util/web5-test.js'
import checkDwn from '../../../util/dwn-test.js'

let web5Error
let dwnError
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customApp = app as any

async function initWeb5(): Promise<void> {
  try {
    await checkWeb5(Web5)
  } catch (error) {
    web5Error = error
  }
}

export function getWeb5Error(): Error {
  return web5Error
}

customApp.getWeb5Error = getWeb5Error

async function initDwn(): Promise<void> {
  try {
    await checkDwn(
      Dwn,
      UniversalResolver,
      DidKey,
      TestDataGenerator,
      DataStream,
      Jws,
      RecordsWrite,
      RecordsRead,
      RecordsDelete,
      MessageStoreLevel,
      DataStoreLevel,
      EventLogLevel,
      ResumableTaskStoreLevel
    )
  } catch (error) {
    dwnError = error
  }
}

export function getDwnError(): Error {
  return dwnError
}

customApp.getDwnError = getDwnError

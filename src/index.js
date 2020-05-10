const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron')

// 使用全局变量防止被系统垃圾回收
let win = null;
let applicationMenu = null;
let tray = null;
let forceQuit = false;

const quit = function() {
  forceQuit = true;
  tray.destroy();
  app.exit();
};

function setApplicationMenu() {
  const openDevTools = function () {
    if (win) {
      win.webContents.openDevTools();
    }
  };

  applicationMenu = Menu.buildFromTemplate([
    {
      label: '文件',
      submenu: [
        { label: '退出程序', click: quit }
      ]
    },
    {
      label: '关于',
      submenu: [
        { label: '调试工具', click: openDevTools }
      ]
    }
  ]);

  Menu.setApplicationMenu(applicationMenu);
}

function createWindow () {   
  win = new BrowserWindow({
    width: 1000,
    height: 680,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.on('close', function (e) {
    if (!forceQuit && win) {
      e.preventDefault();
      win.hide();
    }
  });

  win.loadURL('https://wx.qq.com');
}

function initTray() {
  const icon = nativeImage.createFromPath('C:\\SideProjects\\MyWeChat\\assets\\avatar.jpg');
  tray = new Tray(icon);

  const openWindow = function() {
    win.show();
  }

  const contextMenu = Menu.buildFromTemplate([
    { label: '打开主界面', type: 'normal', click: openWindow },
    { label: '退出', type: 'normal', click: quit }
  ]);

  tray.setContextMenu(contextMenu);
}

app.whenReady().then(function() {
  setApplicationMenu();
  createWindow();
  initTray();
});

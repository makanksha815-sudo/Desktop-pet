const { app, BrowserWindow, screen, ipcMain } = require("electron");

let win;

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    win = new BrowserWindow({
        width: 350,
        height: 300,

        transparent: true,
        frame: false,
        resizable: false,
        alwaysOnTop: true,
        hasShadow: false,

        show: false,

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile("index.html");

    // Put the girl near the bottom-right
    win.setPosition(width - 380, height - 330);
}


// When the girl finishes her reminder,
// hide the entire window
ipcMain.on("hide-pet", () => {
    win.hide();
});


app.whenReady().then(() => {

    createWindow();

    // TEST TIMER: 10 seconds
    setInterval(() => {

        win.showInactive();

        win.webContents.send("show-reminder");

    }, 60 * 60 * 1000);

});
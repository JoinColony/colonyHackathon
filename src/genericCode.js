/*

 Code used on multiple windows

*/

const electron = require("electron");
const {ipcRenderer,remote} = electron;

function showProcessingPopUp() {

}

/*
 * Show a toast on the current window
 */
ipcRenderer.on("toast:show", function (e, _message, options) {
    let effectiveOptions = (options == null) ? {} : options;

    effectiveOptions["html"] = _message;

    M.toast(effectiveOptions);
});
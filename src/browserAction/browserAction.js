"use strict";

document.title = chrome.i18n.getMessage("extensionName");

function buildActions() {
    const actions = document.getElementById('actions');
    [
        {
            label: "settings",
            action: function () {
                if (chrome.runtime && chrome.runtime.openOptionsPage) {
                    chrome.runtime.openOptionsPage();
                }
                else {
                    window.open(chrome.extension.getURL("options/options.html"), "_blank");
                }
            }
        }
    ].forEach(function (action) {
        const btnAction = document.createElement("button");
        btnAction.className = "action-btn";

        btnAction.appendChild(
            document.createTextNode(
                browser.i18n.getMessage("browserAction_" + action.label) || action.label
            )
        );
        btnAction.addEventListener("click", action.action);
        actions.appendChild(btnAction);
    });
}

buildActions();
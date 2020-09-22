"use strict";

document.title = browser.i18n.getMessage("extensionName") + " Menu";

function buildActions() {
    const actions = document.getElementById('actions');
    [
        {
            label: "settings",
            action: function() {
                if (browser.runtime && browser.runtime.openOptionsPage){
                    browser.runtime.openOptionsPage();
                }
                else {
                    window.open(browser.extension.getURL("options/options.html"), "_blank");
                }
            }
        }
    ].forEach(function(action) {
        const btnAction = document.createElement("button");
        btnAction.className = "action";
        
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
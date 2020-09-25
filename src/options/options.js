"use strict";

document.title = browser.i18n.getMessage("extensionName") + " Options";

function initUI() {
    document.getElementById("title").textContent = "Options";

    document.getElementById("cookiesForPreloadHeader").textContent = "Cookies for preload";
    document.getElementById("cookiesForPreloadFormat").textContent = "Format: <Website>;<Cookie-Payload>";

    document.getElementById("save").value = "Save";

    document.getElementById("save").addEventListener("click", save);
}

function restoreOptions() {
    chrome.storage.local.get({
        version: 1,
        preLoadCookies: {}
    }, function(data) {
        console.log(data);

        var rows = [];

        for (const [key, value] of Object.entries(data.preLoadCookies)) {
            rows.push(`${key};${value}`);
        }

        document.getElementById("cookiesForPreload").value = rows.join("\n");
    });
}


function save() {
    document.getElementById("save-result").textContent = "Saving...";
    document.getElementById("save-result").classList.remove("save-failed");

    try {
        var cookies = {};

        var rows = document.getElementById("cookiesForPreload").value.split("\n");

        rows.forEach(row => {
            var keyVal = row.split(';');
            cookies[keyVal[0]] = keyVal[1];
        });

        chrome.storage.local.set({
            version: 1,
            preLoadCookies: cookies
        }, function() {
            document.getElementById("save-result").textContent = "✅";
        })

    } catch (e) {
        console.error("Failed to save", e);
        document.getElementById("save-result").textContent = "Unable to save: " + e.message;
        document.getElementById("save-result").classList.add("save-failed");
    }

}

initUI();
restoreOptions();
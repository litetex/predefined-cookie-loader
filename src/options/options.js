"use strict";

document.title = browser.i18n.getMessage("extensionName") + " Options";

function initUI() {
    // TODO I18N
    document.getElementById("title").textContent = "Options";

    document.getElementById("cookiesForPreloadHeader").textContent = "Cookies for preload";
    document.getElementById("cookiesForPreloadFormat").textContent = "Format: {\"domain.com\":[{\"name\":\"Cookie1\",\"value\":\"Val1\" },{\"name\":\"Cookie2\",\"value\":\"Val2\"}]}";

    document.getElementById("save").value = "Save and Reload";

    document.getElementById("save").addEventListener("click", save);
}

function restoreOptions() {
    chrome.storage.local.get({
        preLoadCookies: new Map()
    }, function(data) {
        document.getElementById("cookiesForPreload").value = JSON.stringify(strMapToObj(data.preLoadCookies));
    });
}


function save() {
    document.getElementById("save-result").textContent = "⌛";
    document.getElementById("save-result").classList.remove("save-failed");

    try {
        chrome.storage.local.set({
            // TypeScript???
            preLoadCookies: objToStrMap(JSON.parse(document.getElementById("cookiesForPreload").value))
        }, function() {
            document.getElementById("save-result").textContent = "✔️";
            restoreOptions();
        })

    } catch (e) {
        console.error("Failed to save", e);
        document.getElementById("save-result").textContent = "Unable to save: " + e.message;
        document.getElementById("save-result").classList.add("save-failed");
    }
}

function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
        obj[k] = v;
    }
    return obj;
}

function objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}

initUI();
restoreOptions();


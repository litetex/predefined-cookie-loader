"use strict";

document.title = browser.i18n.getMessage("extensionName") + " " + chrome.i18n.getMessage("settings");

function initUI() {
    // TODO I18N
    document.getElementById("title").textContent = chrome.i18n.getMessage("settings");

    document.getElementById("cookiesForPreloadHeader").textContent = chrome.i18n.getMessage("cookies_for_preload");

    let preLoadCookies = new Map();
    preLoadCookies.set(
        "domain.example", [
        { name: "DomainCookie1", value: "Val1" },
        { name: "DomainCookie2", value: "Val2", domain: "sub.domain.example", path: "/path", secure: true }
    ]);
    preLoadCookies.set(
        "domain2.example", [
        { name: "Domain2Cookie1", value: "Val1", secure: true }
    ]);

    document.getElementById("cookiesForPreload").placeholder = JSON.stringify(strMapToObj(preLoadCookies), null, 2);

    document.getElementById("save").value = chrome.i18n.getMessage("save");

    document.getElementById("save").addEventListener("click", save);
}

function restoreOptions() {
    chrome.storage.local.get({
        preLoadCookies: new Map()
    }, function (data) {
        document.getElementById("cookiesForPreload").value =
            (data.preLoadCookies && data.preLoadCookies instanceof Map && data.preLoadCookies.size !== 0) ?
                JSON.stringify(strMapToObj(data.preLoadCookies), null, 2) :
                "";
    });
}


function save() {
    document.getElementById("save-result").textContent = "⌛";
    document.getElementById("save-result").classList.remove("save-failed");

    let docVal = document.getElementById("cookiesForPreload").value;
    try {
        if (!docVal) {
            docVal = "{}";
        }

        chrome.storage.local.set({
            preLoadCookies: objToStrMap(JSON.parse(docVal))
        }, function () {
            document.getElementById("save-result").textContent = "✔️";
            restoreOptions();
        })

        chrome.runtime.sendMessage({});

    } catch (e) {
        console.error("Failed to save", e);
        document.getElementById("save-result").textContent = "Unable to save: " + e.message;
        document.getElementById("save-result").classList.add("save-failed");
    }
}

function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
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


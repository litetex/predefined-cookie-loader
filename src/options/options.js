"use strict";

document.title = translate('settings');

let h2Title = document.getElementById('title');
let taCookiesForPreload = document.getElementById("cookiesForPreload");
let chbxDomainNotPresentPrefixWithDot = document.getElementById('chbxDomainNotPresentPrefixWithDot');

function initUI() {
    h2Title.textContent = translate("settings");

    document.getElementById("chbxDomainNotPresentPrefixWithDotLabel").textContent = translate("setting_domain_not_present_prefix_with_dot");
    document.getElementById("cookiesForPreloadHeader").textContent = translate("setting_cookies_for_preload");

    let preLoadCookies = new Map();
    preLoadCookies.set(
        "domain.example",
        [
            { name: "DomainCookie1", value: "Val1" },
            { name: "DomainCookie2", value: "Val2", domain: "sub.domain.example", path: "/path", secure: true }
        ]
    );
    preLoadCookies.set(
        "domain2.example",
        [
            { name: "Domain2Cookie1", value: "Val1", secure: true }
        ]
    );

    taCookiesForPreload.placeholder = JSON.stringify(strMapToObj(preLoadCookies), null, 2);

    let btnSave = document.getElementById("save");
    btnSave.textContent = translate("save");
    btnSave.addEventListener("click", save);
}

function restoreOptions() {
    chrome.storage.local.get({
        domainNotPresentPrefixWithDot: true,
        preLoadCookies: new Map()
    }, function (data) {
        chbxDomainNotPresentPrefixWithDot.checked = data.domainNotPresentPrefixWithDot;
        document.getElementById("cookiesForPreload").value =
            (data.preLoadCookies && data.preLoadCookies instanceof Map && data.preLoadCookies.size !== 0) ?
                JSON.stringify(strMapToObj(data.preLoadCookies), null, 2) :
                "";
    });
}


function save() {
    let saveResultElement = document.getElementById("save-result");
    saveResultElement.textContent = "⌛";
    saveResultElement.classList.remove("save-failed");

    let docVal = taCookiesForPreload.value;
    try {
        if (!docVal) {
            docVal = "{}";
        }

        chrome.storage.local.set({
            domainNotPresentPrefixWithDot: chbxDomainNotPresentPrefixWithDot.checked,
            preLoadCookies: objToStrMap(JSON.parse(docVal))
        }, function () {
            saveResultElement.textContent = "✔️";
            restoreOptions();
        })

        chrome.runtime.sendMessage({});

    } catch (e) {
        console.error("Failed to save", e);
        saveResultElement.textContent = "Unable to save: " + e.message;
        saveResultElement.classList.add("save-failed");
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

function translate(key) {
    return chrome.i18n.getMessage(key);
}

initUI();
restoreOptions();


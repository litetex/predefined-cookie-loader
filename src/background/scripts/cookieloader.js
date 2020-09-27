"use strict";

function loadDefaultCookies() {
  chrome.storage.local.get({
    preLoadCookies: new Map()
  }, function(data) {

    try {
      if(!data.preLoadCookies || !(data.preLoadCookies instanceof Map)) {
        return;
      }

      data.preLoadCookies.forEach(function(value, key, map) {
        let origin = "https://" + key;

        console.log("Processing: '" + origin + "'");

        value.forEach(cookie => {
          let cookieToSet = Object.assign({ url: origin }, cookie);
          console.log(cookieToSet);

          chrome.cookies.set(cookieToSet);
        });
      });
      
    } catch (e) {
      console.error(e);
    }
  });
}

browser.runtime.onStartup.addListener(loadDefaultCookies);
browser.runtime.onMessage.addListener(loadDefaultCookies);
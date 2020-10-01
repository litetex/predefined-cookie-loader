"use strict";

function loadDefaultCookies() {
  chrome.storage.local.get({
    domainNotPresentPrefixWithDot: true,
    preLoadCookies: new Map()
  }, function (data) {

    try {
      if (!data.preLoadCookies || !(data.preLoadCookies instanceof Map)) {
        return;
      }

      data.preLoadCookies.forEach(function (value, key, map) {
        
        console.log("Processing: '" + key + "'");

        value.forEach(cookie => {
          let origin = "https://" + key;
          console.log("Cookie before processing", cookie);

          let cookieToSet = Object.assign({ url: origin }, cookie);

          // If fix cookies which have no domain
          if (data.domainNotPresentPrefixWithDot && !cookieToSet.domain) {
            cookieToSet.domain = "." + key;
          }

          console.log("Cookie to set (after processing)", cookieToSet);

          chrome.cookies.set(cookieToSet);
        });
      });

    } catch (e) {
      console.error(e);
    }
  });
}

chrome.runtime.onStartup.addListener(loadDefaultCookies);
chrome.runtime.onMessage.addListener(loadDefaultCookies);
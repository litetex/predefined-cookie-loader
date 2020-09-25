"use strict";


function cookieUpdate() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var currentTab = tabs[0];

    chrome.browserAction.setBadgeBackgroundColor({
      tabId: currentTab.id,
      color: "lightgray"
    });
    chrome.browserAction.setBadgeText({
      tabId: currentTab.id,
      text: ""
    });

    chrome.storage.local.get({
        preLoadCookies: new Map()
      }, function(data) {

        try {
          var currentUrl = new URL(currentTab.url);
          var currentDomain = currentUrl.hostname;
          
          if(!data.preLoadCookies || !data instanceof Map) {
            return;
          }

          var cookiesToSet = data.preLoadCookies.get(currentDomain.replace(/^w{2,3}\d*\./i, ''));
          if(!cookiesToSet) {
            return;
          }

          chrome.browserAction.setBadgeText({
            tabId: currentTab.id,
            text: "⌛"
          });

          let cookieSetters = [];
          let requiresReload = false;

          cookiesToSet.forEach(cookieToSet => {
            var cookieFunc = function(cookie) {
              console.log(cookie);
              if(!cookie) {
                chrome.cookies.set(Object.assign({ url: currentTab.url }, cookieToSet));
                requiresReload = true;
                console.log("Setting cookie:", cookieToSet);
              }
            };

            chrome.cookies.get({
              name: cookieToSet.name,
              url: currentTab.url
            }, cookieFunc);
            
            cookieSetters.push(cookieFunc);
          });

          console.log(cookieSetters);

          Promise.all(cookieSetters).then(function() {
            chrome.browserAction.setBadgeText({
              tabId: currentTab.id,
              text: "✔"
            });
            console.log("OK");
            // TODO DEADLOCK!
            if(requiresReload) {
              console.log("Reloading")
              chrome.runtime.reload();
            }
          });
          
          
        } catch (e) {
          console.error(e);
          chrome.browserAction.setBadgeText({
            tabId: currentTab.id,
            text: "❌"
          });
        }
      });
  }); 
}

// chrome.tabs.onUpdated.addListener(cookieUpdate);
// chrome.tabs.onActivated.addListener(cookieUpdate);

// CHECK: Preload ALL cookies at startup?
chrome.cookies.set(Object.assign({ url: currentTab.url }, cookieToSet));
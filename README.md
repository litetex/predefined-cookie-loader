
# <img src="src/icons/icon96.png" width=50 /> predefined-cookie-loader [![Latest Version](https://img.shields.io/github/v/release/litetex/predefined-cookie-loader?style=flat-square&color=9e7549)](https://github.com/litetex/predefined-cookie-loader/releases) [![Firefox Addon](https://img.shields.io/badge/firefox-addon-ff4c37.svg?logo=firefox-browser&labelColor=5936b0)](https://addons.mozilla.org/en-US/firefox/addon/predefined-cookie-loader/) [![Known Vulnerabilities](https://snyk.io/test/github/litetex/predefined-cookie-loader/badge.svg?targetFile=src/package.json)](https://snyk.io/test/github/litetex/predefined-cookie-loader?targetFile=src/package.json)

A browser extension that loads predefined 🍪 cookies into the browser 

## Install
* [Firefox-Addons](https://addons.mozilla.org/en-US/firefox/addon/predefined-cookie-loader/)

## Build status
| Branch | Build |
| --- | --- |
| ``master`` | [![build](https://img.shields.io/github/workflow/status/litetex/predefined-cookie-loader/Master%20CI)](https://github.com/litetex/predefined-cookie-loader/actions?query=workflow%3A%22Master+CI%22) |
| ``develop`` | [![build develop](https://img.shields.io/github/workflow/status/litetex/predefined-cookie-loader/Develop%20CI/develop)](https://github.com/litetex/predefined-cookie-loader/actions?query=workflow%3A%22Develop+CI%22) |

## Use cases
### Private browsing
Your browser automatically deletes everything after you closed it? <br/>
<img src="assets/DeleteBrowsingDataOnClose.png" height=40></img>

And when you start it again everything is full of "We use cookies"-popups?<br/>
<img src="assets/CookiePopupExample.png" height=264></img>

Now you can preload the corresponding cookies and surf 🏄‍ the web in peace
##### Example configuration
```JSON
{
  "<wellknownSearchEngine>.com": [
    {
      "name": "CONSENT",
      "value": "YES+undefined.undefined+V14+undefined",
      "secure": true
    }
  ],
  "<wellknownVideoPlatform>.com": [
    {
      "name": "CONSENT",
      "value": "YES+undefined.undefined+V14+undefined",
      "secure": true
    }
  ]
}
```

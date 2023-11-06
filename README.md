[![Latest Version](https://img.shields.io/github/v/release/litetex/predefined-cookie-loader?style=flat-square&color=9e7549)](https://github.com/litetex/predefined-cookie-loader/releases)
[![build](https://img.shields.io/github/actions/workflow/status/litetex/predefined-cookie-loader/checkBuild.yml?branch=develop)](https://github.com/litetex/TopGHRepos/actions/workflows/checkBuild.yml?branch%3Adevelop)
[![Firefox Addon](https://img.shields.io/badge/firefox-addon-ff4c37.svg?logo=firefox-browser&labelColor=5936b0)](https://addons.mozilla.org/en-US/firefox/addon/predefined-cookie-loader/)

# <img src="src/icons/icon96.png" width=46 /> predefined-cookie-loader 

A browser extension that loads predefined 🍪 cookies into the browser 

## Install
* [Firefox-Addons](https://addons.mozilla.org/en-US/firefox/addon/predefined-cookie-loader/)

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
      "value": "YES+",
      "secure": true
    }
  ],
  "<wellknownVideoPlatform>.com": [
    {
      "name": "CONSENT",
      "value": "YES+",
      "secure": true
    }
  ]
}
```

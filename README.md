[![build](https://img.shields.io/github/workflow/status/litetex/predefined-cookie-loader/Master%20CI?label=build)](https://github.com/litetex/predefined-cookie-loader/actions?query=workflow%3A%22DMaster+CI%22)
[![build develop](https://img.shields.io/github/workflow/status/litetex/predefined-cookie-loader/Develop%20CI?label=build%20develop)](https://github.com/litetex/predefined-cookie-loader/actions?query=workflow%3A%22Develop+CI%22)
# predefined-cookie-loader <img src="src/icons/icon96.png" width=56></img>

Loads, overrides and sets predefined 🍪 cookies into the browser 

## Install
Install as [Firefox-Addon]()

## Use cases
### Private browsing
Your browser automatically deletes everything after you closed it? <br/>
<img src="assets/DeleteBrowsingDataOnClose.png" height=40></img>

And when you start it again everything is full of "We use cookies"-popups?<br/>
<img src="assets/CookiePopupExample.png" height=264></img>

Now you can preload the corresponding cookies:
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

import { selector } from 'utils/Selector.js'

class Main {
  constructor () {
    selector(document).ready(this.bind())
  }

  bind() {
    console.log("Document Ready!!!!! - Loaded Content Scripts")
    InboxSDK.load('1', 'sdk_Gmail-Extension_290e96f7ea').then(function(sdk){
      console.log("Loaded InboxSDK")
      sdk.Compose.registerComposeViewHandler(function(composeView){
        var inboxStatusBar = composeView.addStatusBar()
        inboxStatusBar.el.append("asdfasdfasdfasdfa")
      })
    })
  }


}

export const main = new Main()

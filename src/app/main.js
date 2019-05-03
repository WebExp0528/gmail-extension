import { selector } from 'utils/Selector.js'
import { button } from 'utils/Button.js'

//handle InboxStatusBar
var handleInboxStatusBar

class Main {
  constructor () {
    selector(document).ready(this.bind())
  }

  bind() {

    /**
    * Load InboxSDK
    */
    InboxSDK.load('1', 'sdk_Gmail-Extension_290e96f7ea').then((sdk)=>this.loadingInboxSDK(sdk))

  }

  /**
  *  Load functions in InboxSDK
  */
  loadingInboxSDK(sdk){

    //register Composeview
    sdk.Compose.registerComposeViewHandler(function(composeView){

      //Add StatusBar in Composeview
      //handle InboxStatusBar
      handleInboxStatusBar = composeView.addStatusBar({ height: 60 })

      //add buttons in inboxstatusbar
      var buttons = [
        {
          'el':"<div id=\"btn-followup\" class=\"T-I J-J5-Ji aoO T-I-atl L3 T-I-Zf-aw2 T-I-ax7\" role=\"button\" data-tooltip=\"\" data-tooltip-delay=\"600\" style=\"width: 12ex;-webkit-user-select: none;\">FollowUp  </div>",
          'callback': function(){console.log("clicked FollowUp Button!!!!!!!!!!!")}
        },
      ]

      for (var value of buttons) {
        var startusbarbutton = button(value['el']).click(value['callback'])
        handleInboxStatusBar.el.append(startusbarbutton)
      }

    })
  }

}

export const main = new Main()

import {
  selector
} from 'utils/Selector.js'
import {
  dropdown
} from 'utils/dropdown.js'

//Handle InboxStatusBar
var handleInboxStatusBar
//Handel of This object
var thisobj

/**
 * Define content script functions
 * @type {class}
 */
class Main {
  constructor() {
    selector(document).ready(this.bind())
  }

  /**
   * Document Ready
   * @returns {void}
   */
  bind() {

    //Save this object
    thisobj = this

    //Load InboxSDK
    InboxSDK.load('1', 'sdk_Gmail-Extension_290e96f7ea').then((sdk) => this.loadingInboxSDK(sdk))

    window.onclick = function (event) {
      console.log(event.target)
      if (!event.target.matches('.btndropdown')) {
        var dropdowns = document.getElementsByClassName("dropdown-menu")
        var i
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i]
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show')
          }
        }
      }
    }
  }

  /**
   * Load functions in InboxSDK
   * @param {object} sdk
   * @returns {void}
   */
  loadingInboxSDK(sdk) {

    //register Composeview
    sdk.Compose.registerComposeViewHandler(function (composeView) {

      //Add StatusBar in Composeview
      thisobj.addStatusBar(composeView)
    })
  }

  /**
   * Add functions in StatusBar
   * @param {object} composeView
   * @returns {void}
   */
  addStatusBar(composeView) {

    //Add StatusBar in ComposeView
    handleInboxStatusBar = composeView.addStatusBar({
      height: 60
    })
    handleInboxStatusBar.el.style.overflow = "visible"

    //Add FolloUp Button in StatusBar
    thisobj.addFollowUp()

    //Add Other Buttons in StatusBar
  }

  //TODO: Followup
  /**
   * Add function in FollowUp Button
   * @returns {void}
   */
  addFollowUp() {

    //Configure of FollowUp Button and Dropdown Menu
    var followupButton = {
      container: handleInboxStatusBar.el,
      title: 'Follow Up ',
      dropdownItems: [{
          title: "Once per day",
          callback: function () {
            alert("This is <Once per day> Button")
          }
        },
        {
          title: "Once every 2 days",
          callback: function () {
            alert("This is <Once every 2 days> Button")
          }
        },
        {
          title: "Once every 3 days",
          callback: function () {
            alert("This is <Once every 3 days> Button")
          }
        },
        {
          title: "Once per week",
          callback: function () {
            alert("This is <Once per week> Button")
          }
        }
      ]
    }

    //Render FollowUp Button and Dropdown Menu in StatusBar
    dropdown(followupButton).render()
  }
}

export const main = new Main()
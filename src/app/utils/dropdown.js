import { button } from './Button.js'
import { convertStringToHTML } from './helper.js'
import { selector } from './Selector.js'
/**
 * Define Dropdown Menu functions.
 * @type { class }
 */
class Dropdown {

    /**
     * @param { object = { container: html element, title: string, dropdownItems: array }} props
		 * @returns { void }
     */
	constructor(props){
		this.props = props;
	}

	/**
	 * render Dorpdown menu and button
	 * @returns { void }
	 */
	render() {
		this.props.container.appendChild(new DropdownMenu(this.props.dropdownItems).render())
		this.dropdownButton = button(this.templateOfDropdownButton(this.props.title)).click(function () {
			var dropdowns = document.getElementsByClassName("dropdown-menu")
			var i
			for (i = 0; i < dropdowns.length; i++) {
				var openDropdown = dropdowns[i]
				if (openDropdown.classList.contains('show') && openDropdown != this.parentElement.firstChild) {
					openDropdown.classList.remove('show')
				}
			}
			selector(this.parentElement.firstChild).toggle('show')
		})
		this.props.container.appendChild(this.dropdownButton)
	}

	/**
	 * Return a html template of Dropdown Button
	 * @param {string} string
	 * @returns {string}
	 */
	templateOfDropdownButton(string) {
		return '<div id=\"\" class=\"btndropdown T-I J-J5-Ji aoO T-I-atl L3 T-I-Zf-aw2 T-I-ax7\" role=\"button\" data-tooltip=\"\" data-tooltip-delay=\"600\" style=\"width: 12ex;-webkit-user-select: none;\">'+string+'</div>'
	}
}

/**
 * Define DropdownMenu functions.
 * @type { class }
 */
class DropdownMenu {

	/**
	 * @param { Array of Dropdow Mmenu Items } props
	 */
	constructor(props) {
		this.props = props
	}

	/**
	 * Render Dropdown Menu Items
	 * @returns { object & html element of Dropdown Menu }
	 */
	//
	render() {
		this.dropdown = convertStringToHTML(this.template())
		for (var value of this.props) {
      var menuButton = button(this.templateOfDropdownMenu(value.title)).click(value.callback)
      this.dropdown.appendChild(menuButton)
		}
		return this.dropdown
	}

	/**
	 * Return a html template of Dropdown Popup Menu
	 * @returns { string }
	 */
	template() {

		//height of Doropdown Popup Menu
		var heightOfPopUp = this.props.length*32+8
		return '<div id="" class="dropdown-menu q8NmZb J-M jQjAxd" style="user-select: none; visibility: visible; top: -'+heightOfPopUp+'px; left:2px" role="menu" aria-haspopup="true"></div>'
	}

	/**
	 * Return a html template of Dropdown Menu Item
	 * @returns { string }
	 */
	templateOfDropdownMenu(string) {
		return '<div class="SK AX dropdown-menu-item" style="user-select: none;"><div class="yr" role="menuitem" id=":an" style="user-select: none;"><div class="J-N-Jz" style="user-select: none;">'+string+'</div></div></div>'
	}
}

export const dropdown = (dropdown) => {
	return new Dropdown(dropdown)
}

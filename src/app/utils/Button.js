import { convertStringToHTML } from './helper.js'
import { selector } from './Selector.js'

/**
 * Define Button functions.
 * @type Class
 */
export class Button {
    /**
     * Get current provided Button.
     * @param {htmlstring} button
     */
    constructor (button) {
        this._element = convertStringToHTML(button)
    }


    /**
    * Add button in StatusBar.
    *
    * @param {Function} callback
    * @returns {button}
    */
    click(callback) {
        selector(this._element).click(callback)
        return this._element
    }

}

export const button = (button) => {
    return new Button(button)
}

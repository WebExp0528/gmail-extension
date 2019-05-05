/**
* Convert string to html object
* @param { html string } string
* @returns { html object }
*/
function convertStringToHTML(string){
    var temp = document.createElement('div')
    temp.innerHTML = string;
    var htmlObject = temp.firstChild
    return htmlObject
}

export { convertStringToHTML }
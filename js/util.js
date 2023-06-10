const select = (element, wrapper = document) => wrapper.querySelector(element, wrapper)
const elcreate = (e) => document.createElement(e)
const date = (time) => {
    const date = new Date(time)
    let month = date.getMonth() + 1
    let day = date.getDate()
    let year = date.getFullYear()

    return month + "." + day + '.' + year
}
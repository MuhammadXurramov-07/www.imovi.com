let list = select(".films__card-wrapper")
let template = select("#template").content
let form = select('.form')
let input = select('.films__input-serach')
let selectint = select('.films__select')
let filmselectaph = select('.films__filter')



function render(arr, lis) {
    list.innerHTML = null
    arr?.forEach(item => {
        let cloneTemplate = template.cloneNode(true)
        let img = select('.films__img', cloneTemplate).src = item.poster
        let title = select('.films__card-title', cloneTemplate).textContent = item.title
        let datee = select('.films__release-date', cloneTemplate).textContent = date(item.release_date)
        let modal = select('.modal')
        let btn = select('.films__btn', cloneTemplate)
        let closebtn = select('.modal__close-btn', modal)
        btn.addEventListener('click', (e) => {
            modal.classList.add('modal-active')
        })
        closebtn.addEventListener('click', (e) => {
            modal.classList.remove('modal-active')
        })
        window.addEventListener('click', (e)=> {
            if(e.target == modal) {
                modal.classList.remove('modal-active')
            }
        })
        
        lis.appendChild(cloneTemplate)
    })
}
render(films, list) 

function unites(arr, lis) {
    let result = []
    arr?.forEach(item => {
        item.genres?.forEach(genres => {
            if(!result.includes(genres)) {
                result.push(genres)
            }
        })
    })
    result?.forEach(i =>{
        let newOp = elcreate('option') 
        newOp.textContent = i
        newOp.value = i
        lis.appendChild(newOp)
    })
}

unites(films, selectint)

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let rejex = new RegExp(input.value.trim(), 'gi')
    let filtered = films.filter(i => i.title.match(rejex))

    // -----------
    // let filterFilm = null

    let filterFilm = []
    if(selectint.value.trim() == 'All'){
        filterFilm = filtered
    }else {
        filterFilm = filtered.filter(item => item.genres.includes(selectint.value.trim()))
    }
    let filteralph = filterFilm.sort((a, b) => {
        if(a.title > b.title) {
            return 1
        } else if(a.title < b.title) {
            return -1
        } else{
            return 0
        }
    })

    let filterdate = filterFilm.sort((a,b) => {
        
        
    })

    if(filmselectaph.value.trim() == "all"){
        filterFilm = filterFilm
    }else if(filmselectaph.value.trim() == "a_z"){
        filterFilm = filteralph
    }else if(filmselectaph.value.trim() == "z_a"){
        filterFilm = filteralph.reverse()   
    }
    else if(filmselectaph.value.trim() == "old_new"){
        filterFilm = filterdate
    }else if(filmselectaph.value.trim() == "new_old"){
        filterFilm = filterdate.reverse()
    }

    render(filterFilm, list)
    input.value = null
})


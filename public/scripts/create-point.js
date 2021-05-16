
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then( res => res.json() ).then( states => {
        for (const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = false
    fetch(url).then( res => res.json() ).then( cities => {
        
        for (const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}


document.querySelector("select[name=uf]").addEventListener("change", getCities)


//Items de Coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

// Atualizar o campo hidden com os dados selecionados
const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // Veririficar se exiestem itens selecionados, se sim, pegar os mesmos
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // Verificação de true/ false
        return itemFound
    })
    //Se já estiver selecionado, desmarcar a seleção | vice-versa
    if(alreadySelected >= 0){
        const filtereditems = selectedItems.filter( item => {
            const itemIsDiferent = item != itemId
            return itemIsDiferent
        })
        console.log(filtereditems)
    } else {
        selectedItems.push(itemId)
    }
    collectedItems.value = selectedItems

}
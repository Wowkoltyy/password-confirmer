document.querySelector("[autocomplete='new-password']").oninput = (event) => {
    const fields = document.querySelectorAll("[autocomplete='new-password']")
    for(let field of fields){
        field.value = event.target.value
    }
}
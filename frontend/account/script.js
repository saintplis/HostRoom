function disableBtn(button){
    const atr = button.getAttribute("data-input-id")
    const inp = document.getElementById(atr)

    if(inp.disabled == true){
        inp.disabled = false
        inp.focus();
        button.innerText = "Salvar"
        button.style.backgroundColor = "#1e6845"
        button.style.color = "#ffffff"
    }else{
        inp.disabled = true
        button.innerText = "Editar"
        button.style.backgroundColor = "#ffffff"
        button.style.color = "#000000"
    }
}

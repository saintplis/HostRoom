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

        const token = localStorage.getItem('token');
        
        $.ajax({
            url: "http://localhost:3000/panel/self",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr){ 
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token')); 
                
            },
            data: JSON.stringify({
                campo: atr,       // nome do campo que está sendo atualizado
                valor: inp.value  // o novo valor inserido
            }),
            success: function(response) {
                console.log("Dados atualizados com sucesso!", response);
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Erro ao atualizar os dados:", textStatus, errorThrown);
                
            }
        });
    }
}

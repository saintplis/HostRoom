// Função para mostrar mensagem de erro em um campo específico
function mostrarErro(campoId, mensagem) {
  $("#" + campoId).text(mensagem).show();
}

// Função para ocultar a mensagem de erro de um campo específico
function ocultarErro(campoId) {
  $("#" + campoId).hide();
}

function chamadaAjax(link, info, successCallback, errorCallback) {
  $.ajax({
    url: link,
    type: "POST",
    contentType: "application/json; charset=utf-8",
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    },
    data: JSON.stringify(info),
    success: successCallback,
    error: errorCallback
  });
}

function disableBtn(button){
  const atr = button.getAttribute("data-input-id")
  const inp = document.getElementById(atr)

  if (atr === "senha") {
    if (inp.disabled === true) {
      inp.disabled = false;
      inp.focus();
      button.innerText = "Salvar";
      button.style.backgroundColor = "#1e6845";
      button.style.color = "#ffffff";

      if (!document.getElementById("nova-senha")) {
        const newPasswordInput = document.createElement("input");
        newPasswordInput.type = "password";
        newPasswordInput.id = "nova-senha";
        newPasswordInput.placeholder = "Nova Senha";
        newPasswordInput.style.marginTop = "0.16vh";
        inp.parentNode.insertBefore(newPasswordInput, inp.nextSibling);
      }
    } else {
      inp.disabled = true;
      button.innerText = "Editar";
      button.style.backgroundColor = "#ffffff";
      button.style.color = "#000000";
      const token = localStorage.getItem('token');
      const oldPassword = inp.value;
      const newPasswordInput = document.getElementById("nova-senha");
      const newPassword = newPasswordInput ? newPasswordInput.value : "";

      if (newPasswordInput) { // Remove a Box da nova senha
        newPasswordInput.parentNode.removeChild(newPasswordInput);
      }

      if(oldPassword !== newPassword){
        chamadaAjax("http://localhost:3000/panel/change_password", {
          senha_antiga: oldPassword,
          senha_nova: newPassword
        }, (response) => {
            console.log("Senha atualizada com sucesso!", response);
            localStorage.removeItem(token);
            window.location.href = "../login/index.html";
        }, (jqXHR, textStatus, errorThrown) => {
            console.error("Erro ao atualizar a senha:", textStatus, errorThrown);
            let response;

            try {
                response = JSON.parse(jqXHR.responseText);
            } catch (e) {
                response = { message: "Erro inesperado ao atualizar a senha." };
            }

            mostrarErro("error-senha", response.message);
        })
      }else{
        console.log("Senha iguais!",response);
      }
    }// Else
  }else if(atr === "email") {
    if (inp.disabled === true) {
      inp.disabled = false;
      inp.focus();
      button.innerText = "Salvar";
      button.style.backgroundColor = "#1e6845";
      button.style.color = "#ffffff";
    } else {
      inp.disabled = true;
      button.innerText = "Editar";
      button.style.backgroundColor = "#ffffff";
      button.style.color = "#000000";

      if(oldEmail !== inp.value){
        $.ajax({
          url: "http://localhost:3000/panel/self",
          type: "POST",
          contentType: "application/json; charset=utf-8",
          beforeSend: function (xhr){ 
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));    
          },
          data: JSON.stringify({ email: inp.value }),
          success: function(response) {
            console.log("Dados atualizados com sucesso!", response);
            window.location.href = "../confirm/index.html";
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.error("Erro ao atualizar os dados:", textStatus, errorThrown); 
            let response;
            try {
                response = JSON.parse(jqXHR.responseText);
            } catch (e) {
                response = { message: "Erro inesperado ao atualizar o e-mail." };
            }
            mostrarErro("error-email", response.message);
            $("#email").val(oldEmail);
          }
        });
      }
    }
  }else if (atr == "tel") {
    if (inp.disabled === true) {
      inp.disabled = false;
      inp.focus();
      button.innerText = "Salvar";
      button.style.backgroundColor = "#1e6845";
      button.style.color = "#ffffff";
    } else {
      inp.disabled = true;
      button.innerText = "Editar";
      button.style.backgroundColor = "#ffffff";
      button.style.color = "#000000";

      if(oldTel !== inp.value){
        $.ajax({
          url: "http://localhost:3000/panel/self",
          type: "POST",
          contentType: "application/json; charset=utf-8",
          beforeSend: function (xhr){ 
              xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));    
          },
          data: JSON.stringify({telefone: inp.value,}),
          success: function(response) {
              onsole.log("Dados atualizados com sucesso!", response);       
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.error("Erro ao atualizar os dados:", textStatus, errorThrown); 
            let response;
            try {
                response = JSON.parse(jqXHR.responseText);
            } catch (e) {
                response = { message: "Erro inesperado ao atualizar o telefone" };
            }
            mostrarErro("error-tel", response.message);
          }
        });
      }
    }
  }else{
    if (inp.disabled === true) {
      inp.disabled = false;
      inp.focus();
      button.innerText = "Salvar";
      button.style.backgroundColor = "#1e6845";
      button.style.color = "#ffffff";
    } else {
      inp.disabled = true;
      button.innerText = "Editar";
      button.style.backgroundColor = "#ffffff";
      button.style.color = "#000000";
      
      if(oldTel !== inp.value) {
        chamada
        $.ajax({
          url: "http://localhost:3000/panel/self",
          type: "POST",
          contentType: "application/json; charset=utf-8",
          beforeSend: function (xhr){ 
              xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));    
          },
          data: JSON.stringify({telefone_emerg: inp.value}),
          success: function(response) {
              onsole.log("Dados atualizados com sucesso!", response);       
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.error("Erro ao atualizar os dados:", textStatus, errorThrown); 
            let response;
            try {
                response = JSON.parse(jqXHR.responseText);
            } catch (e) {
                response = { message: "Erro inesperado ao atualizar o telefone" };
            }
            mostrarErro("error-tel-emergencia", response.message);
          }
        });
      }
    }
  }
}

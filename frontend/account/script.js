let oldFoto = "";
let newfoto = ""; 

// Função para mostrar mensagem de erro em um campo específico
function mostrarErro(campoId, mensagem) {
  $("#" + campoId).text(mensagem).show();
}

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

function abrirModalFoto() {
  oldFoto = $("#foto").attr("src");
  $("#modal-foto").show();
}

function fecharModalFoto() {
  $("#modal-foto").hide();
  $("#foto").attr("src", oldFoto);
  newfoto = "";
}



$(function() {
  $("#buttom_foto").on("change", function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        $("#foto").attr("src", e.target.result);
        newfoto = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
});

function salvarModalFoto() { 
  if (!newfoto) {
    mostrarErro("error-foto", "Selecione uma imagem para upload.");
    return;
  }

  const base64Data = newfoto.split(',')[1];

  chamadaAjax("http://localhost:3000/panel/self", {
    foto: base64Data 
  }, (response) => {
      console.log("Imagem atualizada com sucesso!", response);
      $("#modal-foto").hide();
  }, (jqXHR, textStatus, errorThrown) => {
      console.error("Erro ao atualizar a foto:", textStatus, errorThrown); 
      let response;
      try {
          response = JSON.parse(jqXHR.responseText);
      } catch (e) {
          response = { message: "Erro inesperado ao atualizar a foto." };
      }
      mostrarErro("error-foto", response.message);
  })
}

// Fecha o modal ao clicar fora
$(window).on('click', function(event) {
  if ($(event.target).is("#modal-foto")) {
    fecharModalFoto();
  }
});

function bottomEditar(inp, button) {
  inp.disabled = false;
  inp.focus();
  button.innerText = "Salvar";
  button.style.backgroundColor = "#1e6845";
  button.style.color = "#ffffff";
}

function bottomSalvar(inp, button) {
  inp.disabled = true;
  button.innerText = "Editar";
  button.style.backgroundColor = "#ffffff";
  button.style.color = "#000000";
}

function disableBtn(button){
  const atr = button.getAttribute("data-input-id")
  const inp = document.getElementById(atr)

  if (atr === "senha") {
    if (inp.disabled === true) {
      bottomEditar(inp, button);
      ocultarErro("error-senha");
      // Cria novo bloco de senha
      if (!document.getElementById("nova-senha")) {
        const newPasswordInput = document.createElement("input");
        newPasswordInput.type = "password";
        newPasswordInput.id = "nova-senha";
        newPasswordInput.placeholder = "Nova Senha";
        newPasswordInput.style.marginTop = "0.16vh";
        inp.parentNode.insertBefore(newPasswordInput, inp.nextSibling);
      }
    } else {
      bottomSalvar(inp, button);

      const token = localStorage.getItem('token');
      const newPasswordInput = document.getElementById("nova-senha");
      const newPassword = newPasswordInput ? newPasswordInput.value : "";

      if (newPasswordInput) { // Remove a Box da nova senha
        newPasswordInput.parentNode.removeChild(newPasswordInput);
      }

      if(inp.value !== newPassword){
        chamadaAjax("http://localhost:3000/panel/change_password", {
          senha_antiga: inp.value,
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
    }
  }else if(atr === "email") {
    if (inp.disabled === true) {
      bottomEditar(inp, button);
      ocultarErro("error-email");
    } else {
      bottomSalvar(inp, button);

      if(oldEmail !== inp.value){
        chamadaAjax("http://localhost:3000/panel/self", {
          email: inp.value
        }, (response) => {
            console.log("Dados atualizados com sucesso!", response);
            window.location.href = "../confirm/index.html";
            localStorage.removeItem(token);
        }, (jqXHR, textStatus, errorThrown) => {
            console.error("Erro ao atualizar os dados:", textStatus, errorThrown); 
            let response;
            try {
                response = JSON.parse(jqXHR.responseText);
            } catch (e) {
                response = { message: "Erro inesperado ao atualizar o e-mail." };
            }
            mostrarErro("error-email", response.message);
            $("#email").val(oldEmail);
          })
      }
    }
  }else if (atr == "tel") {
    if (inp.disabled === true) {
      bottomEditar(inp, button);
      ocultarErro("error-tel");
    } else {
      bottomSalvar(inp, button);

      if(oldTel !== inp.value){
        chamadaAjax("http://localhost:3000/panel/self", {
          telefone: inp.value
        }, (response) => {
          console.log("Dados atualizados com sucesso!", response);  
          oldTel = inp.value;
        }, (jqXHR, textStatus, errorThrown) => {
          console.error("Erro ao atualizar os dados:", textStatus, errorThrown); 
          let response;
          try {
              response = JSON.parse(jqXHR.responseText);
          } catch (e) {
              response = { message: "Erro inesperado ao atualizar o telefone" };
          }
          mostrarErro("error-tel", response.message);
          $("#tel").val(oldTel);
        });
      }
    }
  }else{
    if (inp.disabled === true) {
      bottomEditar(inp, button);
      ocultarErro("error-tel-emergencia");
    } else {
      bottomSalvar(inp, button);
      
      if(oldTel !== inp.value) {
        chamadaAjax("http://localhost:3000/panel/self", {
          telefone_emerg: inp.value
        }, (response) => {
          console.log("Dados atualizados com sucesso!", response); 
          oldTelEmerg = inp.value; 
        }, (jqXHR, textStatus, errorThrown) => {
          console.error("Erro ao atualizar os dados:", textStatus, errorThrown); 
          let response;
          try {
              response = JSON.parse(jqXHR.responseText);
          } catch (e) {
              response = { message: "Erro inesperado ao atualizar o telefone" };
          }
          mostrarErro("error-tel-emergencia", response.message);
          $("#tel-emergencia").val(oldTelEmerg);
        });
      }
    }
  }
}

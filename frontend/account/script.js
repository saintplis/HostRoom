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

      if (newPasswordInput) {
        newPasswordInput.parentNode.removeChild(newPasswordInput);
      }

      $.ajax({
        url: "http://localhost:3000/panel/change_password", 
        type: "POST", 
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr){ 
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));    
        },
        data: JSON.stringify({
          senha_antiga: oldPassword,
          senha_nova: newPassword
        }),
        success: function(response) {
          console.log("Senha atualizada com sucesso!", response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error("Erro ao atualizar a senha:", textStatus, errorThrown);
        }
      });
    }
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

      const newEmail = inp.value;

      if(oldEmail !== newEmail){
        $.ajax({
          url: "http://localhost:3000/panel/self",
          type: "POST",
          contentType: "application/json; charset=utf-8",
          beforeSend: function (xhr){ 
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));    
          },
          data: JSON.stringify({ email: newEmail }),
          success: function(response) {
            console.log("Dados atualizados com sucesso!", response);  
            window.location.href = "../confirm/index.html";
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.error("Erro ao atualizar os dados:", textStatus, errorThrown); 
          }
        });
      }
    }
  }else {
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

      $.ajax({
        url: "http://localhost:3000/panel/self",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr){ 
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));    
        },
        data: JSON.stringify({
            telefone: atr,
            telefone_emerg: atr,
            telefone: inp.value,
            telefone_emerg: inp.value
        }),
        success: function(response) {
            onsole.log("Dados atualizados com sucesso!", response);       
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error("Erro ao atualizar os dados:", textStatus, errorThrown); 
        }
      });
    }
  }
}
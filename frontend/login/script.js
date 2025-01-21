document.getElementById("show").addEventListener("click", function(){
    const senhaInput = document.getElementById("senha");
    const showIcon = this;

    if (senhaInput.type === "password") {
        senhaInput.type = "text"
        showIcon.classList.remove("fa-eye")
        showIcon.classList.add("fa-eye-slash")
    } else {
        senhaInput.type = "password"
        showIcon.classList.remove("fa-eye-slash")
        showIcon.classList.add("fa-eye")
    }
})

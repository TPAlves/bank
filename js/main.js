import verificaCPF from "./valida-cpf.js";
import maiorDeIdade from "./valida-idade.js";

const formulario = document.querySelector("[data-formulario]");
const camposDoForm = document.querySelectorAll("[required]");
const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
];
const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, digite um nome válido.",
        tooShort: "Por favor, digite um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        patternMismatch: "Por favor, digite um e-mail válido.",
        tooShort: "Por favor, digite um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, digite um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: "O campo de CPF não pode estar vazio.",
        patternMismatch: "Por favor, digite um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: "O campo de data de nascimento não pode estar vazio.",
        customError: "Você deve ser maior que 18 anos para se cadastrar."
    }
};

//Armazenando dados no localStorage 
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!document.querySelector(".termos__input").checked) {
        alert("Você deve aceitar os nossos termos antes de continuar");
        return false;
    }

    const campos = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value
    }

    localStorage.setItem("cadastro", JSON.stringify(campos));

    window.location.href = "./abrir-conta-form-2.html"
});

// console.log(camposDoForm);
camposDoForm.forEach((campo) => {
    //O campo não está selecionado
    campo.addEventListener("blur", () => {
        verificaCampo(campo);
    });

    campo.addEventListener("invalid", event => event.preventDefault());
});


function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity("");


    if (campo.name == "cpf" && campo.value.length >= 11) {
        verificaCPF(campo);
    }
    if (campo.name == "aniversario" && campo.value != "") {
        maiorDeIdade(campo);
    }

    // console.log(campo.validity);
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
            // console.log(mensagem);
        }
    });

    const mensagemErro = campo.parentNode.querySelector(".mensagem-erro");
    const validadorInput = campo.checkValidity();

    if (!validadorInput) {
        mensagemErro.textContent = mensagem;
        campo.style.border = "3px solid rgb(237, 88, 88)";
    } else {
        mensagemErro.textContent = "";
        campo.style.border = "none";
    }
}




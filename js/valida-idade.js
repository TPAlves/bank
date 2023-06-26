export default function maiorDeIdade(campo) {
    const dataNascimento = new Date(campo.value);

    if (!validaIdade(dataNascimento)) {
        campo.setCustomValidity("O usuário não é maior de idade");
    };  

    // console.log(validaIdade(dataNascimento));
}

function validaIdade(data) {
    const dataAtual = new Date();
    const DataMaior18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    return dataAtual >= DataMaior18;
}
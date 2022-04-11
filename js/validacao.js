export function valida(input){
    const tipoDeInput = input.dataset.tipo

    if (validadores [tipoDeInput]){
        validadores[tipoDeInput](input)
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
    } else{
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input)
    }   
}

const tiposDeErro =[
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo não pode estar vazio.'
    },
    email: {
        valueMissing: 'O campo não pode estar vazio.',
        typeMismatch: 'O email digitado não é valido.'
    },
    senha:{
        valueMissing: 'O campo não pode estar vazio.',
        patternMismatch: 'A senha deve conter entre 6 e 12 caracteres, não utilize simbolos ou espaços.'
    },
    dataNascimento:{
        valueMissing: 'O campo não pode estar vazio.',
        customError: 'Você deve ter mais de 18 anos para se cadastrar.'
    },
    cpf:{
        valueMissing: 'O campo não pode estar vazio.',
        customError: 'O cpf não é válido.'
    }
}


const validadores = {
    
    dataNascimento:input => validaDataNascimento(input),
    cpf:input => validaCPF(input)
}

function mostraMensagemDeErro(tipoDeInput, input){
    let mensagem = ''
    tiposDeErro.forEach(erro => {
        if(input.validity[erro]){
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })

    return mensagem
}

function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value)

    let mensagem = ''
    
    if(!maiorQue18(dataRecebida)){
        mensagem = 'Você deve ter mais que 18 anos para se cadastrar.'
    }
    
    input.setCustomValidity(mensagem)
}

function maiorQue18 (data){

    const dataAtual = new Date()

    const dataMais18 = new Date (data.getUTCFullYear() +18, data.getUTCMonth(), data.getUTCDate() )

    return dataMais18 <= dataAtual

}

function validaCPF(input){
    const cpfFormatado = input.value.replace(/\D/g,'')
    let mensagem = ''

    if(!checaCPFRepetido(cpfFormatado)){
        mensagem = 'O CPF digitado não é válido'
    }

    input.setCustomValidity(mensagem)
}

function checaCPFRepetido(cpf){
    const valoresRepetidos = [
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
        '00000000000'
]

    let cpfValido = true

    valoresRepetidos.forEach(valor =>{
        if (valor == cpf){
            cpfValido = false
        }
    })

    return cpfValido

}
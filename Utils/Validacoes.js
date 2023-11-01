export function verificaEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return !regex.test(email);
}

export function verificaSenhasIguais(senha, confirmSenha) {
    return senha !== confirmSenha;
}

export function verificaDadosLogin(email, password) {
    return email.length == 0 || password.length == 0
}

export function verificaIdade(idade) {
    const regex = /^[0-9]+$/;
    return !regex.test(idade);
}

export function verificaExistencia(campo) {
    return campo.length == 0;
}

export function verificaDiaSemana(diaSemana) {
    return diaSemana.length == 0;
}
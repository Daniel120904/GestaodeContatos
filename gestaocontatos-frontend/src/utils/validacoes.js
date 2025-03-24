// 🟢 Formata o CPF ao digitar
export const formatarCPF = (cpf) => {
    return cpf
        .replace(/\D/g, '') // Remove tudo que não for número
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .slice(0, 14); // Limita a 14 caracteres
};

// 🔴 Remove a formatação do CPF antes de salvar no banco
export const removerMascaraCPF = (cpf) => {
    return cpf.replace(/\D/g, '');
};

// ✅ Valida se o CPF digitado é válido (usando o algoritmo do CPF)
export const validarCPF = (cpf) => {
    cpf = removerMascaraCPF(cpf);
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false; // Evita CPFs com todos os números iguais (ex: 111.111.111-11)

    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
};

// 📅 Valida a Data de Nascimento
export const validarDataNascimento = (dataNascimento) => {
    const dataAtual = new Date();
    const dataNasc = new Date(dataNascimento);
    const dataMinima = new Date();
    dataMinima.setFullYear(dataAtual.getFullYear() - 150); // Máximo de 150 anos atrás

    if (dataNasc > dataAtual) {
        return "A data de nascimento não pode ser maior que a atual.";
    } else if (dataNasc < dataMinima) {
        return "A data de nascimento é muito antiga.";
    }

    return null; // Indica que não há erro
};

// 🧹 Remove espaços extras e caracteres inválidos do Nome e Endereço
export const sanitizarTexto = (texto) => {
    return texto.trim().replace(/\s+/g, ' '); // Remove espaços extras no início, no fim e entre palavras
};

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formCadastro");

  const campos = {
    nome: document.getElementById("nome"),
    email: document.getElementById("email"),
    telefone: document.getElementById("telefone"),
    cpf: document.getElementById("cpf"),
    endereco: document.getElementById("endereco")
  };

  const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  const telRegex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valido = true;
    let mensagens = [];

    for (let key in campos) {
      if (campos[key] === null || campos[key].value.trim() === "") {
        mensagens.push(`O campo ${key} é obrigatório.`);
        valido = false;
      }
    }

    if (!emailRegex.test(campos.email.value)) {
      mensagens.push("E-mail inválido.");
      valido = false;
    }

    if (!cpfRegex.test(campos.cpf.value)) {
      mensagens.push("CPF inválido. Use o formato XXX.XXX.XXX-XX.");
      valido = false;
    }

    if (!telRegex.test(campos.telefone.value)) {
      mensagens.push("Telefone inválido. Use o formato (XX) XXXXX-XXXX.");
      valido = false;
    }

    if (!valido) {
      alert(mensagens.join("\n"));
      return;
    }

    const dados = {
      nome: campos.nome.value,
      email: campos.email.value.toLowerCase(),
      telefone: campos.telefone.value,
      cpf: campos.cpf.value,
      endereco: campos.endereco.value
    };

    localStorage.setItem("cadastroUsuario", JSON.stringify(dados));

    alert("Dados salvos com sucesso!");
    form.reset();
  });
});

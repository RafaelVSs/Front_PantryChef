document.addEventListener('DOMContentLoaded', () => {
  const formCadastro = document.getElementById('formCadastro');
  const arr = [];
  formCadastro.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      senha: document.getElementById('senha').value,
      data_nascimento: document.getElementById('data_nascimento').value,
      telefone: document.getElementById('telefone').value,
      endereco: document.getElementById('endereco').value,
    };
    // Verificar se todos os campos obrigatórios estão preenchidos
    if (!formData.nome || !formData.email || !formData.senha || !formData.data_nascimento || !formData.telefone || !formData.endereco) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const novoUsuario = {
      nome: formData.nome,
      email: formData.email,
      senha: formData.senha,
      data_nascimento: formData.data_nascimento,
      numero: formData.telefone,
      endereco: formData.endereco,
    };
    console.log(novoUsuario);
    // Armazenar os dados do usuário na localStorage
    localStorage.setItem('usuario', JSON.stringify(novoUsuario));

    // Chama a função que envia os dados para a API
    await cadastrarUsuario(novoUsuario);
  });

  const cadastrarUsuario = async (usuario) => {
    try {
      const response = await fetch('http://localhost:3333/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao cadastrar usuário: ${errorMessage}`);
      }
  
      const usuarioCadastrado = await response.json();
      console.log('Usuário cadastrado com sucesso:', usuarioCadastrado);
  
  
      // Salvar os dados na localStorage
      localStorage.setItem('usuarioId', JSON.stringify(usuarioCadastrado));
  
      // Mostrar alerta de sucesso
      alert('Cadastro efetuado com sucesso!');
  
      // Redirecionar para outra página
      window.location.href = '../usuario/index.html';
    } catch (error) {
      console.error('Erro durante a requisição de cadastro:', error.message);
  
      // Mostrar alerta de erro
      alert(`Erro durante o cadastro: ${error.message}`);
    }
  };
});


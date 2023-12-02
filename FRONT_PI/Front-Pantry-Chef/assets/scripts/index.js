document.addEventListener('DOMContentLoaded', () => {
  const formCadastro = document.getElementById('formCadastro');
  const formAtualizarUsuario = document.getElementById('formAtualizarUsuario');
  const btnExcluirUsuario = document.getElementById('btnExcluirUsuario');
  const btnMostrarTodosUsuarios = document.getElementById('btnMostrarTodosUsuarios');

  formCadastro.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const dataNascimento = document.getElementById('data_nascimento').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;

    const novoUsuario = { nome, email, senha, data_nascimento: dataNascimento, numero: telefone, endereco };

    // Chama a função que envia os dados para a API
    await cadastrarUsuario(novoUsuario);
  });

  formAtualizarUsuario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const idUsuario = document.getElementById('idUsuario').value;
    const nomeAtualizado = document.getElementById('nomeAtualizado').value;
    const emailAtualizado = document.getElementById('emailAtualizado').value;
    // ... outros campos atualizados

    const usuarioAtualizado = { nome: nomeAtualizado, email: emailAtualizado, /* ... outros campos */ };

    // Chama a função que envia os dados para a API
    await atualizarUsuario(idUsuario, usuarioAtualizado);
  });

  btnExcluirUsuario.addEventListener('click', async () => {
    const idUsuario = document.getElementById('idUsuarioExcluir').value;

    // Chama a função que envia os dados para a API
    await excluirUsuario(idUsuario);
  });

  btnMostrarTodosUsuarios.addEventListener('click', async () => {
    // Chama a função que obtém todos os usuários da API
    await mostrarTodosUsuarios();
  });
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

    // Mostrar alerta de sucesso
    alert('Cadastro efetuado com sucesso!');

    // Redirecionar para outra página
    window.location.href = './caminho/da/outra/pagina.html';

  } catch (error) {
    console.error('Erro durante a requisição de cadastro:', error.message);

    // Mostrar alerta de erro
    alert(`Erro durante o cadastro: ${error.message}`);
  }
};


const visualizarUsuario = async () => {
  try {
    const response = await fetch('http://localhost:3333/usuarios/:id');

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erro ao obter o usuário: ${errorMessage}`);
    }

    const todosUsuarios = await response.json();
    console.log('Todos os usuários:', todosUsuarios);
  } catch (error) {
    console.error('Erro durante a requisição de visualização de usuários:', error.message);
  }
};




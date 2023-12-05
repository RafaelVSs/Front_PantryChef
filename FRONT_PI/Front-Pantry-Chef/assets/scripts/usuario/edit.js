document.addEventListener('DOMContentLoaded', () => {
  const idData = JSON.parse(localStorage.getItem('usuarioId'));
  const idUser = idData.insertId;
  console.log(idUser);

  const editProfileForm = document.getElementById('editProfileForm');

  editProfileForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    localStorage.removeItem('usuario');  

    const formData = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      senha: document.getElementById('senha').value,
      testeSenha: document.getElementById('testeSenha').value,
      data_nascimento: document.getElementById('data_nascimento').value,
      telefone: document.getElementById('telefone').value,
      endereco: document.getElementById('endereco').value,
    };

    const usuarioAlterado = {
      nome: formData.nome,
      email: formData.email,
      senha: formData.senha,
      data_nascimento: formData.data_nascimento,
      numero: formData.telefone,
      endereco: formData.endereco,
    };

    console.log(usuarioAlterado);

    // Armazenar os dados do usuário na localStorage
    localStorage.setItem('usuario', JSON.stringify(usuarioAlterado));

    console.log('Dados salvos na localStorage:', localStorage.getItem('usuario'));

    // Chama a função que envia os dados para a API
    await editarUsuario(idUser, usuarioAlterado);
  });

  const editarUsuario = async (id, usuario) => { 
    try {
      const response = await fetch(`http://localhost:3333/usuario/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao editar o usuário: ${errorMessage}`);
      }

      // Verifica se a resposta contém algum conteúdo antes de tentar analisar como JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const usuarioEditado = await response.json();
        console.log('Usuário editado com sucesso:', usuarioEditado);
        
        // Mostrar alerta de sucesso
        alert('Usuário editado com sucesso!');
        window.location.href = '../usuario/index.html';
      } else {
        console.log('Usuário editado com sucesso, mas sem conteúdo JSON na resposta.');

        // Mostrar alerta de sucesso sem conteúdo JSON
        alert('Usuário editado com sucesso!');
      }
    } catch (error) {
      console.error('Erro durante a requisição de edição:', error.message);

      // Mostrar alerta de erro
      alert(`Erro durante a edição: ${error.message}`);
    }
  };
});

document.addEventListener('DOMContentLoaded', () => {
  const idData = JSON.parse(localStorage.getItem('usuarioId'));
  const idUser = idData.insertId;
  console.log(idUser);

  const deleteButton = document.getElementById('deleteButton');

  deleteButton.addEventListener('click', async () => {
    const confirmDelete = confirm('Tem certeza que deseja excluir o usuário?');

    if (confirmDelete) {
      try {
        await deletarUsuario(idUser);
        alert('Usuário excluído com sucesso!');
        // Redirecionar ou tomar outras ações necessárias após a exclusão do usuário
      } catch (error) {
        console.error('Erro durante a requisição de exclusão:', error.message);
        alert(`Erro durante a exclusão: ${error.message}`);
      }
    }
  });

  const deletarUsuario = async (id) => {
    try {
      const response = await fetch(`http://localhost:3333/usuario/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao excluir o usuário: ${errorMessage}`);
      }

      // Se chegou aqui, a exclusão foi bem-sucedida
      window.location.href = '../cadastro/index.html';
    } catch (error) {
      throw error;
    }
  };
});
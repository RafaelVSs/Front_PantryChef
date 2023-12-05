document.addEventListener('DOMContentLoaded', () => {
    const idData = JSON.parse(localStorage.getItem('usuarioId'))
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
        senha: document.getElementById('testeSenha').value,
        data_nascimento: document.getElementById('data_nascimento').value,
        telefone: document.getElementById('telefone').value,
        endereco: document.getElementById('endereco').value,
      };
      
      // Verificar se todos os campos obrigatórios estão preenchidos
      if (!formData.nome || !formData.email || !formData.senha || !formData.testesenha || !formData.data_nascimento || !formData.telefone || !formData.endereco) {
        alert('Por favor, preencha todos os campos.');
        return;
      }
      // Verificar se a senha é diferente de testesenha
      if (formData.senha !== formData.testesenha) {
        alert('As senhas não coincidem. Por favor, insira senhas iguais.');
        return;
      }
  
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
      await editarUsuario(id, usuarioAlterado);
    });
  
    const editarUsuario = async (id, usuario) => { 
      try {
        const response = await fetch(`http://localhost:3333/usuarios/${id}`, {
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
    
        const usuarioEditado = await response.json();
        console.log('Usuário editado com sucesso:', usuarioEditado);
      
        // Mostrar alerta de sucesso
        alert('Usuário editado com sucesso!');
    

      } catch (error) {
        console.error('Erro durante a requisição de edição:', error.message);
    
        // Mostrar alerta de erro
        alert(`Erro durante a edição: ${error.message}`);
      }
    };
  });
  
  
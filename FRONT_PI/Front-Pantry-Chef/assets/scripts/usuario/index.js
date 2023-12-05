document.addEventListener('DOMContentLoaded', () => {
  // Recupere os dados do localStorage
  const userData = JSON.parse(localStorage.getItem('usuario')) || {};

  // Exiba os dados na página do usuário
  document.getElementById('infoNome').textContent = userData.nome || 'N/A';
  document.getElementById('infoEmail').textContent = userData.email || 'N/A';
  document.getElementById('infoTelefone').textContent = userData.numero || 'N/A';

  // Formate a data para exibição
  const dataNascimento = userData.data_nascimento ? new Date(userData.data_nascimento).toLocaleDateString() : 'N/A';
  document.getElementById('infoDataNascimento').textContent = dataNascimento;

  document.getElementById('infoEndereco').textContent = userData.endereco || 'N/A';

});

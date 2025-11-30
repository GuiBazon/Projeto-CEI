const form = document.getElementById('formCadastro');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        // Envia para a rota de criação de usuários
        const response = await fetch('http://localhost:3000/api/v2/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                nome_usuario: nome, 
                email: email, 
                senha: senha 
            })
        });

        if (response.ok) {
            alert("Usuário cadastrado com sucesso!");
            
            // Limpa o formulário
            form.reset();
            
            // Redireciona para a home
            window.location.href = 'home.html'; 
            
        } else {
            const data = await response.json();
            alert(data.error || "Erro ao cadastrar usuário.");
        }

    } catch (error) {
        console.error(error);
        alert("Erro de conexão com a API.");
    }
});
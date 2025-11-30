const form = document.getElementById('formCadastro');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const btn = document.querySelector('button');
    const textoOriginal = btn.innerText;

    try {
        btn.innerText = "Salvando...";
        btn.disabled = true;

        // Envia para a rota de criação de usuários
        const response = await fetch('http://localhost:3000/api/v2/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                // Se o seu banco salvou certinho antes, mantenha 'nome_usuario'. 
                // Se der erro de coluna vazia, troque 'nome_usuario' por apenas 'nome'.
                nome_usuario: nome, 
                email: email, 
                senha: senha 
            })
        });

        if (response.ok) {
            alert("Usuário cadastrado com sucesso!");
            
            // Limpa o formulário
            form.reset();
            
            // === AQUI ESTÁ A MUDANÇA: Tirei as duas barras (//) da frente ===
            window.location.href = 'home.html'; 
            
        } else {
            const data = await response.json();
            alert(data.error || "Erro ao cadastrar usuário.");
        }

    } catch (error) {
        console.error(error);
        alert("Erro de conexão com a API.");
    } finally {
        btn.innerText = textoOriginal;
        btn.disabled = false;
    }
});
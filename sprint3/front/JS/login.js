// Pega o formulário
const form = document.getElementById('formLogin');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Não deixa a página recarregar

    // Pega os valores digitados
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        // Manda para a API
        const response = await fetch('http://localhost:3000/api/v2/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            // Se deu certo:
            localStorage.setItem('usuarioLogado', JSON.stringify(data.user || data));
            
            // Redireciona para a Home
            window.location.href = 'home.html';
            
        } else {
            // Se deu errado:
            alert(data.error || data.message || "Login incorreto!");
        }

    } catch (error) {
        console.error("Erro no JS:", error);
        alert("Erro de conexão com o servidor. Verifique se o Back-End está ligado.");
    }
});
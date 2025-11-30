// Pega o formulário
const form = document.getElementById('formLogin');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Não deixa a página recarregar

    // Pega os valores digitados
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const btn = document.querySelector('button');
    
    // Salva o texto original do botão ("Acessar") para restaurar depois
    const textoOriginal = btn.innerText;

    try {
        btn.innerText = "Carregando..."; // Aviso visual
        btn.disabled = true; // Evita cliques duplos

        // Manda para a API
        const response = await fetch('http://localhost:3000/api/v2/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            // Se deu certo:
            // 1. Salva os dados do usuário (opcional, mas recomendado)
            localStorage.setItem('usuarioLogado', JSON.stringify(data.user || data));
            
            // 2. Redireciona para a Home
            window.location.href = 'home.html';
        } else {
            // Se deu errado (Senha incorreta ou usuário não existe):
            // Tenta mostrar data.error, se não tiver, tenta data.message
            alert(data.error || data.message || "Login incorreto!");
        }

    } catch (error) {
        console.error("Erro no JS:", error);
        alert("Erro de conexão com o servidor. Verifique se o Back-End está ligado.");
    } finally {
        // Restaura o botão para o estado original
        btn.innerText = textoOriginal;
        btn.disabled = false;
    }
});
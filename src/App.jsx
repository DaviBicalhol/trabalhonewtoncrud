import { useState } from 'react';
import './App.css'; 

function App() {
  
  const [produtos, setProdutos] = useState([
    { id: 1, nome: 'Fone Gamer NewtonPaiva', preco: '179.99', imagem: 'fonegamernewton.png' },
    { id: 2, nome: 'Kit Gamer', preco: '129.99', imagem: 'tecladoemouse.png' },
    { id: 3, nome: 'Pc Gamer Design Futurístico', preco: '7299.00', imagem: 'pc-gamernewton.png' }
  ]);

  
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  // 2. CREATE e UPDATE: Função para salvar 
  const salvarProduto = (e) => {
    e.preventDefault();

    if (editandoId) {
      // Atualizar produto existente (UPDATE)
      setProdutos(produtos.map(prod => 
        prod.id === editandoId ? { ...prod, nome, preco, imagem } : prod
      ));
      setEditandoId(null);
    } else {
      // Criar novo produto 
      const novoProduto = {
        id: Date.now(), 
        nome,
        preco,
        imagem: imagem || 'https://via.placeholder.com/150' 
      };
      setProdutos([...produtos, novoProduto]);
    }

    // Limpar formulário
    setNome('');
    setPreco('');
    setImagem('');
  };

  // Função "Editar"
  const editarProduto = (produto) => {
    setNome(produto.nome);
    setPreco(produto.preco);
    setImagem(produto.imagem);
    setEditandoId(produto.id);
  };

  // 3. DELETE: Função para excluir
  const excluirProduto = (id) => {
    setProdutos(produtos.filter(prod => prod.id !== id));
  };

  return (
    <div>
    
      <nav className="navbar">
        <div className="nav-logo">
          <img src="logotecnewton.png" alt="logotec" />
        </div>
        <ul className="navlink">
          <li><a href="#">Início</a></li>
          <li><a href="#">Produtos</a></li>
          <li><a href="#" className="btn-FaleConosco">Painel Admin</a></li>
        </ul>
      </nav>

    
      <main className="contato-container" style={{ marginTop: '30px' }}>
        <h2>{editandoId ? 'Editar Produto' : 'Cadastrar Produto'}</h2>
        <form className="form-contato" onSubmit={salvarProduto}>
          <div className="campo">
            <label>Nome do Produto:</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div className="campo">
            <label>Preço (R$):</label>
            <input type="number" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} required />
          </div>
          <div className="campo">
            <label>Nome da Imagem ou URL:</label>
            <input type="text" value={imagem} onChange={(e) => setImagem(e.target.value)} placeholder="ex: ps5newton.png" required />
          </div>
          <button type="submit" className="btn-enviar">
            {editandoId ? 'Salvar Alterações' : 'Cadastrar'}
          </button>
        </form>
      </main>

   
      <section className="produtosgerais">
        <h2>Produtos Cadastrados</h2>
        <div className="container-cards">
          {produtos.map((produto) => (
            <article className="produto-card" key={produto.id}>
              <img src={produto.imagem} alt={produto.nome} />
              <h3>{produto.nome}</h3>
              <p>R$ {Number(produto.preco).toFixed(2).replace('.', ',')}</p>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={() => editarProduto(produto)} className="btn-adicionar" style={{ backgroundColor: '#afd407', border: 'none', cursor: 'pointer' }}>
                  Editar
                </button>
                <button onClick={() => excluirProduto(produto.id)} className="btn-adicionar" style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', cursor: 'pointer' }}>
                  Excluir
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <div className="footer-content">
          <p>Desenvolvido por Davi Bicalho de Lima, Pedro Henrique de Paula Crepaldi</p>
          <p>Projeto React CRUD - TecNewton</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
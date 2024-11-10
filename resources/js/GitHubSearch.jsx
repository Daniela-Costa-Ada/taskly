import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function GitHubSearch() {
  const [username, setUsername] = useState('Daniela-Costa-Ada');
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!username) return;
    setLoading(true);
    try {
      const response = await axios.get(`/github/repos/${username}`);
      setRepos(response.data);
      setError('');
    } catch (err) {
      setError('Usuário não encontrado ou erro ao buscar os dados.');
      setRepos([]);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Search Repos GitHub User</h1>
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Digite o nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="btn btn-primary" onClick={handleSearch}>Buscar</button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading && <p className="text-center">Carregando...</p>}

      <ul className="list-group">
        {repos.length > 0 ? (
          repos.map((repo) => (
            <li key={repo.id} className="list-group-item">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-primary">
                {repo.name}
              </a>
            </li>
          ))
        ) : (
          !loading && <p className="text-center">Sem repositórios para exibir.</p>
        )}
      </ul>
    </div>
  );
}

export default GitHubSearch;

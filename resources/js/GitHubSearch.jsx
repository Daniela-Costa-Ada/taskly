import React, { useState } from 'react';
import axios from 'axios';

function GitHubSearch() {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!username) return;

    try {
      const response = await axios.get(`/github/repos/${username}`);
      setRepos(response.data);
      setError('');
    } catch (err) {
      setError('Usuário não encontrado ou erro ao buscar os dados.');
      setRepos([]);
    }
  };

  return (
    <div>
      <h1>Buscar Repositórios do GitHub</h1>
      <input
        type="text"
        placeholder="Digite o nome de usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      {error && <p>{error}</p>}

      <ul>
        {repos.length > 0 ? (
          repos.map((repo) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </li>
          ))
        ) : (
          <p>Sem repositórios para exibir.</p>
        )}
      </ul>
    </div>
  );
}

export default GitHubSearch;

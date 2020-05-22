import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories')
    .then(response => {setRepositories(response.data)})
  }, []);

  async function handleAddRepository(e) {
    e.preventDefault();
    const repository = {
      title:`new project ${Date.now()}`,
	    url: "https://github.com/ninajacques/reflections",
	    techs:["javascript", "react"]
    }

    await api.post('repositories', repository)
    .then(response => setRepositories([...repositories, response.data]))
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`)
      
      setRepositories(repositories.filter(repository => repository.id !== id))
    } catch(err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>  
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

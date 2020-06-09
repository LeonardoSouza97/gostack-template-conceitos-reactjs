import React from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = React.useState([]);

  React.useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post(`repositories`, {
      title: `Adicionar`,
      url: `http://github.com/LeonardoSouza97`,
      techs: ['NodeJs', 'ReactJs']
    });

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const newRepositories = repositories.filter(r => r.id !== id)
    setRepositories(newRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(r => (
          <li key={r.id}>
            {r.title}
            <button value="Remover" id="Remover" onClick={() => handleRemoveRepository(r.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button value="Adicionar" id="Adicionar" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

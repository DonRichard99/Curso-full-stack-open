import { useState } from 'react';
import Notification from './Notification'; // Asegúrate de que la ruta sea correcta

const App = () => {
  const [persons, setPersons] = useState([ 
    { name: 'Arto Hellas', number: '040-123456', id: 1 }, 
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 }, 
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 }, 
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 } ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const showNotification = (message, type = 'success') => {
    console.log('Notificación:', message, 'Tipo:', type); 
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  

  const addOrUpdatePerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());

    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} ya está en la agenda, ¿deseas actualizar su número?`)) {
        const updatedPersons = persons.map(person => 
          person.id === existingPerson.id ? { ...person, number: newNumber } : person
        );
        setPersons(updatedPersons);
        showNotification(`El número de ${existingPerson.name} se ha actualizado`, 'success');
        setNewName('');
        setNewNumber('');
      } else {
        showNotification(`No se actualizó el número de ${existingPerson.name}`, 'error');
      }
    } else {
      const newPerson = { name: newName, number: newNumber, id: persons.length + 1 };
      setPersons(persons.concat(newPerson));
      showNotification(`Añadido ${newName} a la agenda`, 'success');
      setNewName(''); 
      setNewNumber(''); 
    }
  };

  const removePerson = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
      const removedPerson = persons.find(person => person.id === id);
      setPersons(persons.filter(person => person.id !== id));
      showNotification(`Eliminado ${removedPerson.name} de la agenda`, 'success');
    } else {
      showNotification('No se eliminó el contacto', 'error');
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Agenda Telefonica</h2>
      <Notification message={notification?.message} type={notification?.type} />
      <div>
        Filtro de Busqueda: <input value={searchTerm} onChange={handleSearchChange} />
      </div>

      <h2>Agregar nuevo</h2>
      <form onSubmit={addOrUpdatePerson}>
        <div>
          Nombre: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Numero: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Agregar</button>
        </div>
      </form>

      <h2>Numeros</h2>
      <ul>
        {filteredPersons.map((person, index) => (
          <li key={index}>
            {person.name}: {person.number}
            <button onClick={() => removePerson(person.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

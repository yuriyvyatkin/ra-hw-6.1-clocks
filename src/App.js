import { nanoid } from 'nanoid';
import { useState } from 'react';
import './App.css';
import Clock from './components/Clock/Clock';
import Form from './components/Form/Form';

function App() {
  const [clocks, setClocks] = useState([]);
  const [form, setForm] = useState({ name: '', userTimezone: '' });

  function handleFormChange({ target }) {
    const { name, value } = target;

    setForm(prevForm => ({ ...prevForm, [name]: value }));
  }

  function handleFormSubmit(form) {
    setClocks((prevState) => [...prevState, {
      id: nanoid(),
      name: form.name,
      userTimezone: form.userTimezone,
    }]);

    setForm({ name: '', userTimezone: '' });
  }

  function getClockIndex(target) {
    const id = target.closest('.Clock-box').id;

    const index = clocks.findIndex((clock) => clock.id === id);

    return index;
  }

  function handleDeleteClick({ target }) {
    const index = getClockIndex(target);

    const updatedClocks = [
      ...clocks.slice(0, index),
      ...clocks.slice(index + 1),
    ];

    setClocks(updatedClocks);
  }

  return (
    <div className="App-container">
      <Form
        onSubmit={handleFormSubmit}
        onChange={handleFormChange}
        form={form}
      />
      <div className="App-clocks-container">
        {clocks.map((clock) => {
          return (
            <Clock
              key={clock.id}
              id={clock.id}
              name={clock.name}
              userTimezone={clock.userTimezone}
              onDeleteClick={handleDeleteClick}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;

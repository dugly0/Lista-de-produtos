import { useState } from 'react';


function createInitialTodos() {
    const palavras = ['Bebidas', 'Limpeza', 'Frios', 'Cabelo', 'Favoritos'];
  const initialTodos = [];
  for (let i = 0; i < 5; i++) {
    initialTodos.push({
      id: i,
      text: palavras[i]
    });
  }
  return initialTodos;
}

export default function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos);
  const [text, setText] = useState('');
  const [mostrarInput, setMostrarInput] = useState(false);

  return (
    <>
      <div> 
      <ul style={{
        listStyleType:'none',
        padding:'10px'
      
        }}>
        {todos.map(item => (
          <li key={item.id}>
            {item.text}
          </li>
        ))}
      </ul>
      </div>      
      <div>
      {mostrarInput ? (
       <div>
       <input
        value={text}
        onChange={e => setText(e.target.value)}
        
      />
      <button 
        className='bt'
        onClick={() => {
        setText('');
        setTodos([...todos,{
          id: todos.length,
          text: text
        }, ]);
        setMostrarInput(false);
      }}>Criar</button>
      </div>
       ) : (
       <u style={{cursor: 'pointer'}} onClick={() => setMostrarInput(true)}>+ Criar nova categoria</u>
       )}
       </div>
    </>
  );
}
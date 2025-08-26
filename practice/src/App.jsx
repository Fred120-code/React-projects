import "./App.css";
import { useState } from "react"
// const user = {
//   name: "Hedy Lamarr",
//   imageUrl: "https://i.imgur.com/yXOvdOSs.jpg",
//   imageSize: 120,
// };

// function MyButton() {
//   return <button>I'm a button</button>;
// }

// function App() {
//   return (
//     <>
//       <h1>{user.name}</h1>
//       <img
//         src={user.imageUrl}
//         alt={`Photo of ${user.name}`}
//         className="avatar"
//         style={{ width: user.imageSize, height: user.imageSize }}
//       />
//     </>
//   );
// }

// CONDITIONAL RENDERING

// function AdminPanel() {
//   return <h1>Admin</h1>;
// }
// function LoginForm() {
//   return <h1>Login</h1>;
// }

// function App({ isLoggedIn = true }) {
//   return <div>{isLoggedIn ? <AdminPanel /> : <LoginForm />}</div>;
// }

// RENDERING LISTS

// const products = [
//   { title: "Cabbage", isFruit: false, id: 1 },
//   { title: "Garlic", isFruit: false, id: 2 },
//   { title: "Apple", isFruit: true, id: 3 },
// ];

// const ShopingList = () => {
//   const listItems = products.map(product => (
//     <li key ={product.id}
//     style={{color: product.isFruit ? 'magenta' : 'darkgreen'}}>
//       {product.title}
//     </li>
//   ));
//   return <ul>{listItems}</ul>
// }

// const App = () => {
//   return <ShopingList />
// }

//Event handling

// function handleClick() {
//   alert("You clicked me!");
// }

// const App = () => {
//   return (
//     <button onClick={handleClick}>
//       Click me
//     </button>
//   );
// };


// useState

// function App() {
//   const [count, setCount] = useState(0); 

//   function handleClick() {
//     setCount(count + 1); 
//   }

//   return (
//     <button onClick={handleClick}>
//       Clicked {count} times
//     </button>
//   ); 
// }

//Props

// function MyButton({count, onClick}) {
//   return <button onClick={onClick}>Clicked {count} times</button>
// }

// function App() {
//   const [count, setCount] = useState(0); 

//   function handleClick() {
//     setCount(count + 1); 
//   }

//   return (
//     <div>
//       <h1>Counters that update together</h1>
//       <MyButton count={count} onClick={handleClick}></MyButton>
//       <br />
//       <br />
//       <MyButton count={count} onClick={handleClick}></MyButton>
//     </div>
//   );
// }



function App() {
  const [todos, setTodos] = useState([]); 
  const [input, setInput] = useState(''); 

  function handleSubmit(e) {
    e.preventDefault();
    if (input) {
      setTodos([...todos, {id:Date.now(), text: input}]);
      setInput(''); 
    }
  }

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
        className="field" 
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Add a todo"
         />

         <button type="submit">Add</button>
      </form>

      {todos.length === 0 && <p>No task yet!</p> }

      <ul>
        {todos.map(todo => ( <li key={todo.id}>{todo.text}</li> ) )}
      </ul>
    </div>
  ); 
}

export default App;

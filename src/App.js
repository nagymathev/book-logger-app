import { useState } from 'react'
import './styles/style.css';
import Card from './components/Card';
import videoBg from './img/video.mp4'

function App() {
  const [formData, setFormData] = useState({
    author: "",
    title: ""
  })
  const [books, setBooks] = useState([])
  const [idCounter, setIdCounter] = useState(0)

  class Book {
    constructor(author, title, id){
      this.author = author
      this.title = title
      this.id = id
    }
  }

  function handleChangeData(event){
    const { name, value } = event.target
    setFormData(prevData => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }

  function handleForm(event){
    event.preventDefault()
    setIdCounter(prevId => prevId + 1)
    const book = new Book(formData.author, formData.title, idCounter)
    formData.author = ""
    formData.title = ""
    setBooks(prevBooks => [book, ...prevBooks])
  }

  function deleteCard(id){
    setBooks(prevBooks => prevBooks.filter(b => b.id !== id))
  }

  let boo = books.map(b => <Card key={b.id} title={b.title} author={b.author} id={b.id} deleteCard={deleteCard} />)

  return (
    <div className="App">
      <video src={videoBg} autoPlay loop muted />
      <div className='books-page'>
        <form className='form' onSubmit={handleForm} >
          <input name='author' value={formData.author} onChange={handleChangeData} type="text" placeholder='author' />
          <input name='title' value={formData.title} onChange={handleChangeData} type="text" placeholder='title' />
          <button>Add</button>
        </form>
        <div className="cards">
          {boo}
        </div>
      </div>
    </div>
  );
}

export default App;

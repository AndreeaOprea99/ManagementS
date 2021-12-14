import { useState, useEffect } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { timestamp } from '../../firebase/config'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router'
import Select from 'react-select'

// styles
import './Create.css'
//const filterList = ['Tot', 'Ale mele', 'Dezvoltare', 'Design', 'Marketing', 'Vanzari']

const categories = [
  { value: 'Dezvoltare', label: 'Dezvoltare' },
  { value: 'Design', label: 'Design' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Vanzari', label: 'Vanzari' }
]

export default function Create() {
  const history = useHistory()
  const { addDocument, response } = useFirestore('projects')
  const { user } = useAuthContext()
  const { documents } = useCollection('users')
  const [users, setUsers] = useState([])

  // valori formular
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)

  // valori user  react-select
  useEffect(() => {
    if(documents) {
      setUsers(documents.map(user => {
        return { value: {...user, id: user.id}, label: user.displayName }
      }))
    }
  }, [documents])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    if (!category) {
      setFormError('Alege o categorie.')
      return
    }
    if (assignedUsers.length < 1) {
      setFormError('Atribuie cel putin unei persoane.')
      return
    }

    const assignedUsersList = assignedUsers.map(u => {
      return { 
        displayName: u.value.displayName, 
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })
    const createdBy = { 
      displayName: user.displayName, 
      photoURL: user.photoURL,
      id: user.uid
    }

    const project = {
      name,
      details,
      assignedUsersList, 
      createdBy,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: []
    }

    await addDocument(project)
    if (!response.error) {
      history.push('/')
    }
  }

  return (
    <div className="create-form">
      <h2 className="page-title">Creeaza task nou</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nume Task:</span>
          <input
            required 
            type="text" 
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Detalii:</span>
          <textarea 
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details} 
          ></textarea>
        </label>
        <label>
          <span>Termen limita:</span>
          <input
            required 
            type="date" 
            onChange={(e) => setDueDate(e.target.value)} 
            value={dueDate}
          />
        </label>
        <label>
          <span>Categorie:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Atribuie lui:</span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>

        <button className="btn">Adauga</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}
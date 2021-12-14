import { useState } from 'react'

const filterList = ['Tot', 'Ale mele', 'Dezvoltare', 'Design', 'Marketing', 'Vanzari']

export default function ProjectFilter({ changeFilter }) {
  const [currentFilter, setCurrentFilter] = useState('Tot')

  const handleClick = (newFilter) => {
    setCurrentFilter(newFilter)
    changeFilter(newFilter)
  }

  return (
    <div className="project-filter">
      <nav>
        <p>Filtreaza dupa: </p>
        {filterList.map((f) => (
          <button key={f}
            onClick={() => handleClick(f)}
            className={currentFilter === f ? 'active' : ''}
          >{f}</button>
        ))}
      </nav>
    </div>
  )
}
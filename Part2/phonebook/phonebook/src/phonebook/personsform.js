const PersonForm = ({submitName, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return (
      <form onSubmit={submitName}>
      <div>
        name: <input
            value={newName}
            onChange={handleNameChange}
            required
        />
      </div>
      <div>
        number: <input
            value={newNumber}
            onChange={handleNumberChange}
            required
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
  }


export default PersonForm
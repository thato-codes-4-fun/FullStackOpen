
const SearchBar = ({search, handleSearch})=> {
    return (
      <div>
        find countries 
        <input 
          value={search}
          onChange={handleSearch}
        />
     </div>
    )
  }

export default SearchBar;
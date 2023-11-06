const Filter = ({searchName, setSearchName}) => {
    const handleSearchNameChange = (event) => {
      setSearchName(event.target.value)
    };
  
    return (
      <>
        Filter by name: 
        <input
          value={searchName}
          onChange={handleSearchNameChange}
        />
      </>
    )
};
export default Filter;
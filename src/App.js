import './App.css';
import React, { useEffect, useState } from "react"
import axios from 'axios'

function App() {
  const [data, setData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(3)
  
  useEffect(() => {
    getalldata()
  }, [])
  
  const getalldata = async () => {
    let product = await axios.get("https://fakestoreapi.com/products")
    console.log("product",product.data)
    setData(product.data)
  }
  
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset current page when searching
  };
  
  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <input type="search" value={searchQuery} onChange={handleSearch}></input>

      {currentItems.map((e, index) => (
        <div className='ram' key={index}>
          <div className='syam'>
            <h4>{e?.price}</h4>
            <h2>{e?.title}</h2>
            <img src={e?.image} height="50px" width="50px"></img>
          </div>
        </div>
      ))}

      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>{i + 1}</button>
        ))}
      </div>
    </div>
  );
}

export default App;

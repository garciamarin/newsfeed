import { useState,useEffect,useRef } from 'react';
import './App.css'

import Header from './Header'
import Entry from './Entry'
import useResults from './useResults';

function App() {

const [search, Setsearch] = useState("tags=front_page")
const [page, setPage] = useState(0)
const [sortingOn, setSorting] = useState(false)
const {load, isError,isLoading,feed,maxPages} = useResults()
const inputValue = useRef("")

useEffect(()=> {load(search, sortingOn)} ,[]&&[search, sortingOn])

const searchInput = function (e) {
  Setsearch("query=" + e.target.value)
  setPage(0)
}
const FrontPage = function(){
  Setsearch("tags=front_page")
  inputValue.current.value = ""
  setPage(0)
}
const Next = function (e){
  let newPage = page
  e.target.id==="next" ? ++newPage : --newPage
  setPage(newPage)
  !inputValue.current.value ?  Setsearch('tags=front_page' + '&page=' + newPage )
  :Setsearch("query=" + inputValue.current.value + "&page=" + newPage )
}

const renderResult = () =>{
  let render = null
  if (isError) render = <h1 className='centered'>Sorry, Dogo had trouble finding news. </h1>
  else if (isLoading) render = <div className='typewriter'>Give Dogo a second, man!</div>
  else if (!feed.length) <h2 className='centered'> Ask an andult for assistance: Dogo found no results for your search!</h2>
  else render = feed.map((entry, index) => 
                  {           
                  return <Entry key={index} index={index} entry={feed[index]} page={page} />
                  }) 
  return render
}


  return (
    <div >
      <Header/>
      <div className="searchContainer">
        <div className="inputContainer"> 
          <input type="text" onChange={searchInput} ref={inputValue} /> 
          <button onClick={searchInput}>Search! </button>
          <button onClick={FrontPage}>Back to Front Page</button>
        </div>
        <div className='sorting'>
          <label htmlFor="sortDate">{sortingOn?'By relevance':'Newest First'}
          <input type="checkbox" name="sortDate" id="sortDate" onChange={()=>{setSorting(!sortingOn)}} />
          </label>
        </div>  
      </div>

      {renderResult()}

      <div className='paginationContainer'>
        <div className="pagination">
          <button disabled={page === 0 } id="back" onClick={ (e) => { Next(e)} } > &#60; </button>
          <button  disabled={page === maxPages - 1 } id="next" onClick={(e)=>{Next(e)}}> &#62; </button>
        </div>
        <div className="centered">Page {page + 1} of {maxPages}</div>
      </div>
    </div>
  )
}

export default App;

import { useState,useEffect,useRef } from 'react';
import './App.css'
import Header from './Header'
import Entry from './Entry'

function App() {
  const baseURL = 'https://hn.algolia.com/api/v1/search?'
  
  const [feed, setFeed] = useState([])
  const [isLoading, loadToggler] = useState(true)
  const [search, Setsearch] = useState("tags=front_page")
  const [maxPages, setMax]=useState(1)
  const [page, setPage] = useState(0)
  const [sortingOn, setSorting] = useState(false)
  const [isError, setError] = useState(false)

  const inputValue = useRef("")

  const Load = function (){
  const url = sortingOn? ' http://hn.algolia.com/api/v1/search_by_date?'+ search : baseURL  + search
  setError(false)
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    setFeed(data.hits)
    loadToggler(false)
    setMax(data.nbPages)
    console.log("number pages", data.nbPages)
  })
  .catch(() => {
    console.log("inside catch")
    setError(true)
    loadToggler(false)
  })
}
useEffect(
()=> {Load()} ,[]
)
useEffect(
  ()=>{Load()},[search, sortingOn]
)
// useEffect(
//   ()=>{Load()},[sortingOn]
// )
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
  console.log("Im, in Next")
  if(e.target.id==="next" && page < maxPages - 1){
    ++newPage
    setPage(newPage)
    console.log(newPage)
  }
  else if (e.target.id==="back" && page > 0 ) {
    --newPage
    setPage(newPage)
    console.log(newPage)
  }
  if (inputValue.current.value === "")   Setsearch('tags=front_page' + '&page=' + newPage )
  else {Setsearch("query=" + inputValue.current.value + "&page=" + newPage )}
}

//       http://hn.algolia.com/api/v1/search_by_date?query=...

  return (
    <div >
      <Header/>
      <div className="searchContainer">
        <div className="inputContainer"> 
          <input type="text" onChange={searchInput} ref={inputValue} /> 
          <button onClick={Load}>Search! </button>
          <button onClick={FrontPage}>Back to Front Page</button>
        </div>
        <div className='sorting'>
          <label htmlFor="sortDate">{sortingOn?'By relevance':'Newest First'}
          <input type="checkbox" name="sortDate" id="sortDate" onChange={()=>{setSorting(!sortingOn)}} />
          </label>
        </div>  
      </div>

      { isLoading ? <div className='typewriter'>Give us a second!</div> : 
      ( isError ? <h1 className='centered'>Sorry, Dogo had trouble finding news. </h1>:
      ( feed.length ? 
          feed.map( 
            (entry, index) => {           
              return <Entry key={index} index={index} entry={feed[index]} />
            }) : <h2 className='centered'> Ask an andult for assistance: Dogo found no results for your search!</h2>
      ))}
      <div className="pagination">
        <div>
          <button disabled={page === 0 } id="back" onClick={ (e) => { Next(e)} } > &#60; </button>
          <button  disabled={page === maxPages - 1 } id="next" onClick={(e)=>{Next(e)}}> &#62; </button>
        </div>
        <div> {page + 1} of {maxPages}</div>
      </div>
    </div>
  )
}

export default App;

import { useState,useEffect,useRef } from 'react';
import { useParams } from 'react-router-dom';


import './App.css'
import loading from './media/loading.png'

import Header from './Header'
import Entry from './Entry'
import useResults from './useResults';

function Search() {
const params = useParams();

const prvSearch = params.value ? params.value : "tags=front_page"
const [search, Setsearch] = useState(prvSearch)
const [page, setPage] = useState(0)
const [sortingOn, setSorting] = useState(false)
const {load, isError,isLoading,feed,maxPages} = useResults()
const inputValue = useRef("")

useEffect(()=> {load(search, sortingOn)} ,[search, sortingOn])
useEffect(()=> {
                inputValue.current.value = (params.value  ? params.value.slice(6):"")
                load(prvSearch, sortingOn)
                } ,[])


const searchInput = function () {
    Setsearch("query=" + inputValue.current.value )
    setPage(0)
}

// const searchParam = function () {
//     Setsearch( params.value)
//     inputValue.current.value = params.value.slice(6)
//     setPage(0)
//   }

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
    if (isError) render = <h1 className='centered'>Sorry! Doggo had trouble finding your news. </h1>
    else if (isLoading) render =  <div className='loading_container'>
                                    <div className='typewriter'>Give Doggo a second, man!</div>
                                    <img className='loading' src={loading} alt="Logo" />
                                </div> 
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
          <button className='search_Button' onClick={searchInput}>Search</button>
        </div>
          <div className='AltContainer'>
          <button className='search_Button pad' onClick={FrontPage}>Front Page</button>

          <div className='sorting'>
          <label className='Newest' htmlFor="sortDate" htmlFor="sortDate"> Newest first</label>
          <input type="checkbox" className="checkbox-css" name="sortDate" id="sortDate" onChange={()=>{setSorting(!sortingOn)}} />
          </div>
          

          </div>  

      </div>
    
    {renderResult()}

    {isLoading?
        "":
        <div className='paginationContainer'>
            <div className="pagination">
                <button   disabled={page === 0 } 
                        id="back" 
                        onClick={ (e) => { Next(e)} } > &#60; 
                </button>
                <button   disabled={page === maxPages - 1 } 
                        id="next" 
                        onClick={(e)=>{Next(e)}}> &#62; 
                </button>
            </div>
            <div className="centered">
                Page {page + 1} of {maxPages}
            </div>
        </div>
    }
    </div>
)
}

export default Search;

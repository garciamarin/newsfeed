import { useState} from "react";

function useResults  () {

const baseURL = 'https://hn.algolia.com/api/v1/search?'

const [feed, setFeed] = useState([])
const [isLoading, loadToggler] = useState(true)
const [isError, setError] = useState(false)
const [maxPages, setMax]=useState(1)


function load(search, sortingOn) {
    const url = sortingOn?' http://hn.algolia.com/api/v1/search_by_date?'+ search 
                          : baseURL  + search
    setError(false)
    loadToggler(true)

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setFeed(data.hits)
      loadToggler(false)
      setMax(data.nbPages)
    })
    .catch(() => {
      setError(true)
      loadToggler(false)
    })
  }
    return {load, isError,isLoading,feed,maxPages}
  }

  export default useResults;

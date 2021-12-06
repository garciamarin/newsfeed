
export default function RenderResults() {
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

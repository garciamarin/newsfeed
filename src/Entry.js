import './Entry.css'

export default function Entry({page,index,entry, entry: {title, author, url,created_at, points, story_title, story_url} }) {
    // console.log("feed ",feed)  
    // console.log("feed2 ",feed2)  
  const date = new Date(created_at)
  
  const ellapsedTimeHuman = function (date){
    const ellTime = Math.round((Date.now() - date.getTime()) / 1000)
    if (ellTime < 60) return ellTime + " seconds"
    else if (ellTime < 60 * 60 ) return Math.floor(ellTime / 60) + " minutes"
    else if (ellTime < 30 * 60 * 60 ) return Math.floor(ellTime/ (60*60)) + " hours"
    else if (ellTime < 365*24*60*60) return Math.floor(ellTime / (24*60*60)) + " days"
    return Math.floor(ellTime / (365 * 24*60*60)) + "years "
  }

  return (
            <div className='entryContainer'>
              <div className='entryNumber'> {20* page + index +1} </div>
              <div className="entryContent">
                <div className="entryMain">
                  { title ? 
                    <a href={url} className='entryTitle' target='blank'>{title}</a>
                    :<a href={story_url} className='entryTitle' target='blank'>{story_title}</a>
                  }
                  <p> by: <a href="" className="provider mr7">{`${author}`};</a></p>
                </div>
                <div className="entrySecondary">
                  <p>About { ellapsedTimeHuman(date) } ago {points && `with ${points} Points` } </p>
                </div>
              </div>
            </div>    
    )
}

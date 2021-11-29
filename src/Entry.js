import './Entry.css'

export default function Entry({index,entry, entry: {title, author, url,created_at, points} }) {
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

  // if(index===0){
  // console.log(Date.now() - date.getTime())
  // console.log("created",created_at.toString())
  // console.log("my function:", ellapsedTimeHuman(date))

  // }
  
  return (
            <div className='entryContainer'>
              <div className='entryNumber'> {index +1} </div>
              <div className="entryContent">
                <div className="entryMain">
                  <a href={url} className='entryTitle' target='blank'>{title}</a>  
                  <p>{points} Points </p>
                </div>
                <div className="entrySecondary">
                  <p className='mr3'> by: </p><a href="" className="provider mr7">{author}</a>
                  <p className='mr7'>about { ellapsedTimeHuman(date) }</p> <p className='mr3'> ago</p>
                  <p className='mr7'></p>
                </div>
              </div>
            </div>    
    )
}

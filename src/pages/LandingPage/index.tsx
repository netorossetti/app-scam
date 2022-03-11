import { useState } from "react";
import { Tweet } from "../../components/Tweet";

function LandingPage() {
  const [tweets, setTweets] = useState<string[]>([])

  function createTweet(){
    setTweets([...tweets, "Novo tweet"]);
  }

  return (    
    <div>
      <button onClick={createTweet}>Adicionar tweet</button>
      {
        tweets.map(tweet => {
          return <Tweet text={tweet} />
        })
      }      
    </div>
  )
}

export default LandingPage
import '../css/HomePage.css';
import {useEffect, useState} from "react";
import {baseurl, getLoginUser} from "../config";
import {TwitterItem} from "../components/TwitterItem";
import PropTypes from "prop-types";
import {post} from "../utils";


export function HomePage(props) {
  let {user_id} = props
  if (user_id === undefined || user_id === null) {
    const queryParameters = new URLSearchParams(window.location.search)
    user_id = queryParameters.get("id")
  }

  let [twitterList, setTwitterList] = useState([])
  let [content, setContent] = useState("")
  let [isFollowed, setFollowed] = useState(false)

  function refresh() {
    post(`${baseurl}/list_twitters`, {username: user_id}).then(data => {
      setTwitterList(data)
    })
    post(`${baseurl}/is_followed`, {from: getLoginUser(), to: user_id}).then(data => {
      setFollowed(data.result)
    })
  }

  useEffect(() => {
    refresh()
  }, [])


  let toolbox = (<div className={"reply-box"} style={{marginBottom: "10px"}}>
        <textarea placeholder={"content"} className={"twitter-area"}
                  onChange={(e) => setContent(e.target.value)} value={content}></textarea>
      <button title={"Broadcast New Post"} className={"twitter-postbtn"} onClick={async () => {
        if (content.length < 5) {
          alert("The minimum length of twitter is 5")
          return
        }
        await post(`${baseurl}/post_twitter`, {username: user_id, content: content})
        refresh()
        setContent("")
      }}>Post a twitter
      </button>
    </div>
  )

  return (
    <div>
      <div>
        <h1 className={"home-h1"} >{getLoginUser() === user_id ? "My Home Page" : `@${user_id} 's Home Page`}</h1>
        <span className={"follow-btn-span"}>
          <button title={!isFollowed ? "Follow This User" : "Unfollow This User"} className={isFollowed ? "follow-btn-small1" : "follow-btn-small2"} onClick={async () => {
            if (!isFollowed) {
              await post(`${baseurl}/follow`, {from: getLoginUser(), to: user_id})
            } else {
              await post(`${baseurl}/unfollow`, {from: getLoginUser(), to: user_id})
            }
            refresh()
          }}>{!isFollowed ? "Follow" : "UnFollow"}</button>
        </span>
      </div>
      {getLoginUser() === user_id ? toolbox : <div className={"div-display-none"}></div>}
      <div className={"follow-btn-div"}><button title={"Check Following/Followers Lists"} className={"follower-btn"} onClick={() => {
        window.location = `/following?id=${user_id}`
      }}>Following/Followers
      </button></div>
      {twitterList.map((x, idx) => <TwitterItem key={x._id} twitter_item={x}></TwitterItem>)}
    </div>
  )
}

HomePage.propTypes = {
  user_id: PropTypes.string
};

import './App.css';
import { AllActions } from './AllActions';
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useEffect, useState } from 'react';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Navbar from './components/Navbar/Navbar';

import { initializeFirebase } from './utils/firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  withRouter
} from "react-router-dom";

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Favorites from './Favorites'
function App() {
  let [anime, setAnime] = useState([]);
  let [user, setUser] = useState(null);
  let history = useHistory()

  let [likedIndex, setLikedIndex] = useState(null);
  useEffect(() => {
    let fetchAnime = async () => {
      fetch('https://kitsu.io/api/edge/anime').then((result) => result).then(async result => {
        let res = await result.json()
        setAnime(res.data);
      });
    }
    fetchAnime();
    console.log(anime)
  }, [])




  const allShows = useSelector(state => state.item)
  const dispatch = useDispatch(() => { })
  console.log(allShows);
  const { addItem, removeItem } = bindActionCreators(AllActions, dispatch);

  initializeFirebase()


  // detects when user logged in 

  useEffect(() => {
    let auth = getAuth()
    onAuthStateChanged(auth, (userCredentials) => {
      setUser(user)
    })
  }, [])
  useEffect(() => {
    if (!localStorage.getItem('token')) history.push('/login')
  }, [])

  let username = getAuth().currentUser;
  console.log(username)



  return (

    <Switch>
      <Route exact path="/">

        {/**
         * <div className="App">
         *   {allShows.length != 0 || allShows != null ? (
              allShows.map(show => (
                <>
                  <h1>{show.name}</h1>
                  <img style={{ width: "300px", height: "300px", objectFit: "cover" }} src={show.url} alt="" />
                  <p>{show.type}</p>
                  <FavoriteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => { 
                    addItem(show)
                  console.log(allShows)  }  } />
                  {/* <FavoriteBorderIcon style={{ color: "red" }} />
                  </>
                  
                             
              ))
            ) : ""}
                </div>
                }
            */}
        <Navbar />
        <div className="App">

          <div className="animes">
            <p style={{
              fontFamily: 'Lato,sans-serif', color: 'white',
              fontSize: '2rem'
            }}>Welcome {username ? username.displayName : ''}</p>
            {
              anime.length > 0 ? anime.map((single) => (

                <>

                  <div className="anime__card" key={parseInt(single.id)}>
                    <h3 className="anime__title">{single.attributes.canonicalTitle}</h3>
                    <img className="anime__image" src={single.attributes.posterImage.medium} alt="" />
                    <div className="anime__controls">

                      {likedIndex === parseInt(single.id) ?
                        (
                          <FavoriteIcon style={{ color: "#ff6b6b", cursor: "pointer" }}
                            onClick=
                            {() => {
                              // if index of element clicked matches index from state
                              // set index to index from element clicked
                              // otherwise set it to null 
                              setLikedIndex(null)

                              removeItem(single)

                            }} />) : <FavoriteBorderIcon
                          onClick={() => {
                            setLikedIndex(lindex => lindex === parseInt(single.id) ? null : parseInt(single.id))


                            addItem(single)

                          }}
                          style={{ color: "#ff6b6b", cursor: "pointer" }} />
                      }
                    </div>

                  </div>

                </>

              )) : ''
            }
          </div>
          <p>{user && user.profileName}</p>
        </div>
      </Route>
      <Route exact path="/favorites">
        <Favorites />
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>

  );
}

export default withRouter(App);

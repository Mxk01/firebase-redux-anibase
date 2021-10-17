import './App.css';
import { AllActions } from './AllActions';
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useEffect, useState } from 'react';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import User from './components/User/User';

import Navbar from './components/Navbar/Navbar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// all stuff needed to query db
import { collection, doc, query, where, deleteDoc, setDoc, getDocs } from '@firebase/firestore';
// getting db instance 
import { getDB } from './utils/firebase.js'
import Button from '@mui/material/Button';

import { useCallback } from 'react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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
import Stack from '@mui/material/Stack';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Favorites from './Favorites'
function App() {
  let [anime, setAnime] = useState([]);
  let [user, setUser] = useState(null);
  let [searchTerm, setSearchTerm] = useState('Naruto');
  let history = useHistory()
  let [checkedIndex, setCheckedIndex] = useState(null);
  let [categorySelected, setCategorySelected] = useState('');
  let [likedIndex, setLikedIndex] = useState(null);
  useEffect(() => {
    let fetchAnime = async () => {
      fetch(`https://kitsu.io/api/edge/anime/?filter[text]=${searchTerm}`)
        .then((result) => result).then(async result => {
          let res = await result.json()
          setAnime(res.data);
        });
    }
    fetchAnime();


    if (searchTerm == '') {
      setSearchTerm('Naruto');
    }


  }, [searchTerm])





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

    let token = localStorage.getItem('token');
    // checking if there's a token 
    // if not redirect to login
    if (!token) {
      history.push('/')
    }
  }, [])

  let username = getAuth().currentUser;
  console.log(username)




  let addFavorite = (single) => {
    setLikedIndex(lindex => lindex === parseInt(single.id) ? null : parseInt(single.id))
    // console.log(single)
    // console.log(single.attributes.episodeCount);
    // console.log(single.attributes.popularityRank);
    // console.log(single.attributes.posterImage.medium)

    addItem(single)
    // get db instance
    let db = getDB()
    console.log(single.attributes);
    // get a new document reference
    let newFavorite = doc(collection(db, 'favorites'));
    // update that document 
    setDoc(newFavorite, {
      name: single.attributes.slug,
      photoURL: single.attributes.posterImage.medium,
      liked: true,
      popularityRank: single.attributes.popularityRank,
      episodeCount: single.attributes.episodeCount,
      user: username ? username.uid : ''
    })

  }

  // let mostFavoritesCount = Math.max(...anime.map((single) => single.attributes.favoritesCount))
  // let leastFavoritesCount = Math.min(...anime.map(single => single.attributes.favoritesCount));
  // console.log(mostFavoritesCount)
  // console.log(leastFavoritesCount)
  return (

    <Switch>
      <Route exact path="/">



        <Navbar />
        <div className="App">

          <input type="text"
            placeholder="Type in character" style={{
              marginTop: '11rem',
              width: '50vw',
              border: 0,
              fontSize: '2rem',
              color: 'white',
              fontFamily: 'Lato',
              background: 'transparent',
              outline: 'none',
              borderBottom: '2px solid rgb(255, 29, 86)'
            }}
            spellCheck="false"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Stack spacing={2} direction="row" style={{ marginTop: "1.5rem" }}>
            <Button variant="outlined"
              style={{ color: "rgb(255,29,86)", borderColor: "rgb(255,29,86)" }}
              onClick={() => {
                // setCategorySelected('drama');
              }}>Drama</Button>
            <Button variant="outlined"
              style={{ color: "rgb(255,29,86)", borderColor: "rgb(255,29,86)" }}
            >Action</Button>
            <Button variant="outlined"
              style={{ color: "rgb(255,29,86)", borderColor: "rgb(255,29,86)" }}
            >Comedy</Button>
          </Stack>
          <p style={{
            fontFamily: 'Lato,sans-serif', color: 'white',
            fontSize: '2rem'
          }}>Welcome {username ? username.displayName : ''}</p>
          <div className="animes" style={{ marginTop: '3rem' }}>

            {

              anime.length > 0 ? anime
                // .filter(single => parseInt(single.attributes.endDate.slice(0, 4)) > 2005)
                .map((single) => {

                  return (

                    <>

                      <div className="anime__card" key={parseInt(single.id)}>
                        <h3 className="anime__title">{single.attributes.canonicalTitle}</h3>
                        <img className="anime__image" src={!single.attributes.posterImage.medium ? "https://i.imgur.com/R246Z45.png" : single.attributes.posterImage.medium} alt="" />
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
                              onClick={() => addFavorite(single)}
                              style={{ color: "#ff6b6b", cursor: "pointer" }} />
                          }
                          {
                            checkedIndex === parseInt(single.id) ? (<CheckCircleIcon style={{
                              color: "lightgreen",
                              cursor: "pointer"
                            }}
                              onClick={() => {

                                setCheckedIndex(null);

                              }}
                            />) : (
                              <CheckCircleOutlineIcon style={{
                                color: "lightgreen",
                                cursor: "pointer"
                              }} onClick={() => {
                                setCheckedIndex(lindex => lindex === parseInt(single.id) ? null : parseInt(single.id))

                              }} />)
                          }
                        </div>

                      </div>

                    </>

                  )
                }) : ''
            }
          </div>
          <p>{user && user.profileName}</p>
        </div>
      </Route>
      <Route exact path="/favorites">
        <Favorites />
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/user-edit" component={User} />
      <Route path="/register" component={Register} />
    </Switch>

  );
}

export default withRouter(App);

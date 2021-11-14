import React, { useState, useEffect } from 'react'
import './Favorites.css'
import Navbar from './components/Navbar/Navbar'
import { getAuth } from 'firebase/auth'
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';

import { getDB } from './utils/firebase'
import CircularProgress from '@mui/material/CircularProgress';

import { collection, doc, query, where, deleteDoc, setDoc, getDocs } from 'firebase/firestore';

function Favorites() {
    let auth = getAuth();
    let user = auth.currentUser;
    let [favorite, setFavorite] = useState([])
    let [isLoading, setLoading] = useState(false);
    let [progress, setProgress] = useState(0)
    let [rating, setRating] = useState(0);
    let showFavorites = async () => {
        if (user) {
            let db = getDB();
            // reference to collection
            let favCollection = collection(db, 'favorites')
            // this will help us get only documents where id matches user.uid 
            let condition = where("user", "==", user.uid);

            // query the db
            let q = query(favCollection, condition)

            try {
                // get all the documents from querying the db
                let results = await getDocs(q);
                // console.log(results);

                let finalResults = [];

                // results.forEach(doc => finalResults.push({ ...doc.data(), uid: doc.id }))
                results.forEach(doc => finalResults.push(doc.data()))

                // show results
                setFavorite(finalResults)
                // results.forEach(doc => console.log(`${{ id: doc.id }}`))

                console.log(favorite)

            }
            catch (e) {
                console.log(e)
            }
        }
    }


    useEffect(() => {

        console.log('Favorites')
        setLoading(true);

        showFavorites()
        setLoading(false);
        // }
    }, [])
    return (
        <>
            <Navbar />

            <div className="favorite__container">

                <h1 style={{
                    color: "white",
                    fontSize: '3rem',
                    marginTop: '11rem',
                    textTransform: "uppercase",
                    color: "rgb(255, 29, 86)",
                    fontWeight: 100,
                    fontFamily: "Roboto, sans-serif"

                }}>My favorites</h1>

                <div className="animes" style={{ marginTop: '3rem' }}>
                    {
                        !isLoading ?
                            favorite.map((fav) => (
                                <div className="anime__card"  >
                                    <h2 className="anime__title">{fav.name}</h2>
                                    <img className="anime__image " src={fav.photoURL} alt="" />
                                    {/* <Rating style={{ borderColor: "red !important" }}
                                        name="simple-controlled"
                                        value={rating}
                                        onChange={(e) => {
                                            setRating(e.target.value);
                                        }}
                                    /> */}
                                    <p className="anime__popularity">Popularity rank : {fav.popularityRank}</p>
                                    {fav.episodeCount === 1 ? (
                                        <Button
                                            variant="outlined"
                                            style={{ color: "rgb(255,29,86)", borderColor: "rgb(255,29,86)" }}>
                                            Movie
                                        </Button>)
                                        :
                                        (<p>Episodes : {fav.episodeCount}</p>)
                                    }
                                </div>
                            )) : (<img src="" alt="No image" />)


                    }
                </div>


            </div >
        </>
    )
}

export default Favorites

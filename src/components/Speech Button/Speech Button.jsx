import React, { useState, useEffect } from 'react'
import API from '../../API/helper'

import './SpeechButton.css'

const SpeechButton = () => {
    const [movie, setMovie] = useState('')
    const [movieTitle, setMovieTitle] = useState('')
    const [transcript, setTranscript] = useState('')

    const greetings = [
        'Im good, how are you?',
        'Doing good friend',
        'Hey, grow up'
    ]

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
        console.log('voice is activated, you can speak');
    };

    recognition.onresult = event => {
        const current = event.resultIndex;

        setTranscript(event.results[current][0].transcript)
    }

    const readOutLoud = () => {
        const speech = new SpeechSynthesisUtterance();

        speech.text = ''
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;

        if (transcript.includes('how are you')) {
            speech.text = greetings[Math.floor(Math.random() * greetings.length)]
        }

        if (transcript.includes('find movie')) {
            let title = transcript.split(' ').splice(2).join(' ');
            API.movieInfo(title).then(response => {
                setMovie(response.data)
                setMovieTitle(response.data.Title)
            })
        }

        if (transcript.includes('Merry Christmas')) {
            speech.text = 'Merry Christmas to ALL, but Chase.'
        }

        if (transcript.includes('Chase')) {
            speech.text = 'Yes. That guy is the worst.'
        }

        window.speechSynthesis.speak(speech)
        setTranscript('')
    }

    const readMovie = () => {
        const speech = new SpeechSynthesisUtterance();

        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;

        if(movieTitle){
            console.log(movie)
            speech.text = `Found ${movieTitle}, Rotten tomato rating is ${movie.Ratings[1].Value}`
        }

        window.speechSynthesis.speak(speech)
    }

    useEffect(readOutLoud, [transcript])

    useEffect(readMovie, [movieTitle])

    return (
        <>
            <button className="button" onClick={() => recognition.start()}>
                <i className="fas fa-microphone fa-5x"></i>
            </button>
        </>
    )
}

export default SpeechButton
import { Row, Col } from 'reactstrap';
import './Starter.css';
import React, { useState } from 'react';
import YoutubeEmbed from './YoutubeEmbed';
import ShowPoints from './ShowPoints';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';
import trophy_img from '../assets/medals/trophy.png'
import cone_image from '../assets/medals/cone_left.png'
import Swal from 'sweetalert2'
export default function VideoModule() {
    const questions = [
        {
            questionText: 'In the line "The echo of shared laughter and heartfelt conversations lingered in the air," select the word similar to "Echo."',
            answerOptions: [
                { answerText: 'Resilience', isCorrect: false },
                { answerText: 'Reverberation', isCorrect: true },
                { answerText: 'Reclamation', isCorrect: false },
                { answerText: 'Relinquishment', isCorrect: false },
            ],
            hint: '',
        },
        {
            questionText: 'Select the Correct Spellings',
            answerOptions: [
                { answerText: 'Reunionn', isCorrect: false },
                { answerText: 'Reunion', isCorrect: true },
                { answerText: 'Reunian', isCorrect: false },
                { answerText: 'Reunyon', isCorrect: false },
            ],
            hint: '',
        },
        {
            questionText: 'Select the Correct Spellings',
            answerOptions: [
                { answerText: 'Resiliance', isCorrect: false },
                { answerText: 'Resilience', isCorrect: true },
                { answerText: 'Ressilience', isCorrect: false },
                { answerText: 'Resilliance', isCorrect: false },
            ],
            hint: '',
        },
        {
            questionText: 'Remembering the good times we had—adventures, jokes, and the moments we shared—a feeling of happy __________ surrounded us.',
            answerOptions: [
                { answerText: 'Melodies', isCorrect: false },
                { answerText: 'Feelings', isCorrect: false },
                { answerText: 'Memories ', isCorrect: true },
                { answerText: 'Thoughts', isCorrect: false },
            ],
            hint: '',
        },
        {
            questionText: 'The get-together was more than just a short meeting; it brought back a strong feeling of __________ among us, reminding us that good frienships last forever and can be brought back with shared memories ',
            answerOptions: [
                { answerText: 'Hardships', isCorrect: false },
                { answerText: 'Friendship', isCorrect: true },
                { answerText: 'Companionship', isCorrect: false },
                { answerText: 'Camaraderie', isCorrect: false },
            ],
            hint: '',
        },


    ];







    //quiz
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleAnswerOptionClick = (isCorrect) => {

        setSelectedAnswer(isCorrect);
        if (`Clicked: ${isCorrect ? setScore(score + 100) : setScore(score - 25)}`);
        if (isCorrect) {

            setShowHint(false)
            setShowSuccess(true)
        } else {
            setScore(score - 50);
            setShowHint(true)
        }

    };


    //Next Question
    const handleSubmitAnswer = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedAnswer(null);
            setShowHint(false)
            setShowHint(false)
            setShowSuccess(false)
        } else {
            setShowScore(true)
            setShowHint(false)
            setShowSuccess(false)
            levelSuccess()
        }
    }




    const getColorBasedOnCondition = (isCorrect, index) => {
        // Your logic to determine the color based on the item value
        // For example, conditionally return 'red' or 'blue'

        if (selectedAnswer === null) {
            return ''; // Default color if no answer is selected
        }
        else {
            if (isCorrect) {
                return isCorrect === !selectedAnswer ? index === 'red' : 'green';
            }
            else {
                return isCorrect === selectedAnswer ? index === 'green' : 'red'
            }

        }
    };


    //get points


    //Submit resultss

    const navigate = useNavigate();
    const submitResult = async () => {
        let x = score;
        let y = currentScore;
        let z = x + y;
        const values = {
            name: localStorage.getItem("inputValue"),
            points: z,
        }
        // console.log("Score " + x)
        console.log("current Score" + y)
        // console.log("Total Score" + z)
        await axios.post('http://localhost:3002/submit', values)
            .then(res => {
                if (res.status === 200) {
                    
                    getLatesetPoints()
                    navigate('/listenmodule')
                }




            })
            .catch(err => console.log(err));
    }

    //reset Quiz

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowScore(false);
    }


    //get current Points
    useEffect(() => {

        getLatesetPoints();
    });


    const [values] = useState({
        name: localStorage.getItem("inputValue"),
        CurrentPoints: localStorage.getItem("currentPointsValue")
    })
    const [currentScore, setCurrentScore] = useState(0);
    const getLatesetPoints = async () => {
        await axios.post('http://localhost:3002/points', values)
            .then(res => {
                // setImageData(res.data[0])
                setCurrentScore(res.data[0].points)
                // navigate('/listenmodule')
                console.log(res.data[0].points)
            })
            .catch(err => console.log(err));
    }

     //Show level Success Message

     const levelSuccess = () =>{

        Swal.fire({
          position: "top-end",
          icon: "success",
          title:"CONVERSATION BETWEEN TWO FRIENDS",
          text : "Video Module Completed!!!",
          showConfirmButton: false,
          timer: 5000
        });
      }


    return (
        <>
            <div className="row ">
                <div className="col p-3">

                    <p class="text-uppercase fs-3">Video Module</p>
                </div>
                <div className="col-8">
                    <h1 className='main-title text-uppercase text-center'><strong>Conversation between two friends</strong></h1>



                </div>
                <div className="col-2">
                    {/* // <ShowPoints parentToChild={localStorage.getItem("inputValue")} /> */}
                    <ShowPoints childPoints={currentScore} parentToChild={localStorage.getItem("inputValue")} />
                </div>
                {/* //  <LocalStorage parentToChild={location.state.name} /> */}
            </div>
            <Row className='row justify-content-around  '>

                <Col className='col-7 pt-5'>
                    <div>
                        <YoutubeEmbed embedId="APb_GXbmJ5k" />
                    </div>
                </Col>
                <Col className='col'>
                    <div className='container text-center'>
                        {showScore ? (
                            <>
                                <div className='score-section p-3'>
                                    <h2 class="text-success bg-white rounded-4"><strong>+{score}xp</strong></h2>
                                    <h2 class="text-warning bg-white rounded-4"><strong>MEETUP WITH FRIENDS<br></br> VIDEO MODULE COMPLETED!!!</strong></h2>
                                </div>

                                <div className='col'>
                                    <img src={trophy_img} alt=''></img>

                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <img src={cone_image} alt=''></img>

                                    </div>
                                    <div className='col'>

                                    </div>
                                    <div className='col' style={{ transform: 'scaleX(-1)' }} >
                                        <img src={cone_image} alt=''></img>

                                    </div>
                                </div>

                                <div className='py-3'>
                                    <button type='button' className='btn btn-outline-info w-50' onClick={() => { resetQuiz() }}>
                                        RESET
                                    </button>
                                </div>
                                <div>
                                    <button type='button' className='btn btn-outline-info w-50' onClick={() => { submitResult() }}>
                                        GO TO NEXT
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='question-section'>
                                    <div className='question-count  '>
                                        <span className='text bg-white rounded-2 p-2'>Question {currentQuestion + 1}/{questions.length}</span>
                                    </div>
                                    <div className='question-text  bg-white rounded-3'>{questions[currentQuestion].questionText}</div>
                                </div>
                                <div className='answer-section '>
                                    {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                                        <button key={index} type="button" className={`btn btn-primary rounded-4  w-75 py-3 m-3 ${getColorBasedOnCondition(answerOption.isCorrect, index)} `}
                                            onClick={() => handleAnswerOptionClick(answerOption.isCorrect, index)}>{answerOption.answerText}</button>
                                    ))}
                                </div>
                                <div class="col-md-6 offset-md-3">
                                    <button type='button' className='btn btn-outline-primary rounded-2 w-50 py-2 m-5' onClick={() => handleSubmitAnswer()} >NEXT</button>
                                </div>
                            </>
                        )}



                        {


                            showHint ? (
                                <>
                                    <div className='label-fail rounded-4'>
                                        <div className='question-text text-white rounded-5 p-3'><h5>{questions[currentQuestion].hint}</h5></div>
                                    </div>


                                </>
                            ) : (<></>)}



                        {showSuccess ? (
                            <>

                                <div className='label-success rounded-4'>
                                    <div className='question-text text-white rounded-5 p-3'><strong>Awesome ! That's correct.</strong></div>
                                </div>
                            </>
                        ) : (<></>)
                        }

                    </div>
                </Col>

            </Row >

        </>
    );
}



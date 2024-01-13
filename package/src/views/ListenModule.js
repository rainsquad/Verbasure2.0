import { Row, Col } from 'reactstrap';
import './Starter.css';
import React, { useEffect, useState } from 'react';
import AudioPlayer from 'react-audio-player';
import audio from '../assets/audios/LE_listening_A1_Meeting_people_at_a_dinner.mp3'
import ShowPoints from './ShowPoints';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import trophy_img from '../assets/medals/trophy.png'
import cone_image from '../assets/medals/cone_left.png'
import Swal from 'sweetalert2'
export default function VideoModule() {
    const questions = [
        {
            questionText: 'Julian remembers Alyssa.',
            answerOptions: [
                { answerText: 'True', isCorrect: false },
                { answerText: 'False', isCorrect: true },
            ],
            hint: 'Try Again!',
        },
        {
            questionText: "Ben is Alyssa's brother.",
            answerOptions: [
                { answerText: 'True', isCorrect: true },
                { answerText: 'False', isCorrect: false },
            ],
            hint: 'Try Again!',
        },
        {
            questionText: "They were at Ben's wedding.",
            answerOptions: [
                { answerText: 'True', isCorrect: true },
                { answerText: 'False', isCorrect: false },
            ],
            hint: 'Try Again!',
        },
        {
            questionText: 'The wedding was in February.',
            answerOptions: [
                { answerText: 'True', isCorrect: false },
                { answerText: 'False', isCorrect: true },
            ],
            hint: 'Try Again!',
        },
        {
            questionText: 'Julian says the wrong name.',
            answerOptions: [
                { answerText: 'True', isCorrect: true },
                { answerText: 'False', isCorrect: false },
            ],
            hint: 'Try Again!',
        }, {
            questionText: "Alyssa doesn't want a drink",
            answerOptions: [
                { answerText: 'True', isCorrect: false },
                { answerText: 'False', isCorrect: true },
            ],
            hint: 'Try Again!',
        },


    ];


    //Show Video




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
            handleShow(true)
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

    //submit answers
    const navigate = useNavigate();
    const submitResult = async () => {
        let x = score;
        let y = currentScore;
        let z = x + y;
        const values = {
            name: localStorage.getItem("inputValue"),
            points: z,
        }
        await axios.post('http://localhost:3002/submit', values)
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                    //window.location.reload();
                    getLatesetPoints()
                    navigate('/travelsrilanka')
                }




            })
            .catch(err => console.log(err));
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
               
                console.log(res.data[0].points)
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


    //pop-up form
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);


  //Show level Success Message

  const levelSuccess = () =>{

    Swal.fire({
      position: "top-end",
      icon: "success",
      title:"MEETING PEOPLE AT DINNER",
      text : "Audio Module Completed!!!",
      showConfirmButton: false,
      timer: 5000
    });
  }

    return (
        <>


            <div className="row ">
                <div className="col p-3">
                    <p class=" text-uppercase fs-3">Listening Module </p>
                </div>

                <div className="col-8">
                    <h3 className='main-title text-uppercase text-center'><strong>Meeting people at a dinner</strong></h3>

                </div>
                <div className="col-2">
                    <ShowPoints childPoints={currentScore} parentToChild={localStorage.getItem("inputValue")} />
                </div>
                {/* //  <LocalStorage parentToChild={location.state.name} /> */}
            </div>
            <div className='container p-5'>



                <div className='row justify-content-around m-3 p-5' >
                    <AudioPlayer
                        src={audio}
                        autoPlay
                        controls
                    />
                </div>

            </div>

            <Row className='row justify-content-around '>


                <Col className='col-5'>
                    <div className='container text-center'>
                        {showScore ? (
                            <>

                                <div className='score-section p-3'>
                                    <h2 class="text-success bg-white rounded-4"><strong>+{score}xp</strong></h2>
                                    <h2 class="text-warning bg-white rounded-4"><strong>MEETUP WITH FRIENDS<br></br> LISTENING MODULE COMPLETED!!!</strong></h2>
                                </div>

                                <div className='col'>
                                    <img src={trophy_img}></img>

                                </div>
                                <div className='row'>
                                    <div className='col-3'>
                                        <img src={cone_image}></img>

                                    </div>
                                    <div className='col'>

                                    </div>
                                    <div className='col' style={{ transform: 'scaleX(-1)' }} >
                                        <img src={cone_image}></img>

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
            </Row>

        </>
    );
}



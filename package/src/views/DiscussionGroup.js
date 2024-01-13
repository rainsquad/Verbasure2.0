import { Row, Col } from 'reactstrap';
import './Starter.css';
import React, { useState } from 'react';
import YoutubeEmbed from './YoutubeEmbed';
import ShowPoints from './ShowPoints';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import trophy_img from '../assets/medals/trophy.png'
import cone_image from '../assets/medals/cone_left.png'
import { useEffect } from 'react';
import friends_ucsc from '../assets/images/bg/friends_ucsc.png'
import Swal from 'sweetalert2';
export default function DiscussionGroups() {
    const questions = [
        {
            questionText: "Hi there, ",
            answerOptions: [
                { answerText: 'a)	I don’t know about this', isCorrect: false },
                { answerText: 'b)	Never heard about this', isCorrect: false },
                { answerText: 'c)	I’m happy to help', isCorrect: true },
                { answerText: 'd)	I can help but I won’t', isCorrect: false },
            ],
            hint: "Hint: This is a common phrase used to express willingness to assist.",
        },
        {
            questionText: "Here's a ___________ of the basics.",
            answerOptions: [
                { answerText: 'a)	Audio clip', isCorrect: false },
                { answerText: 'b)	Video footage', isCorrect: false },
                { answerText: 'c)	Breakthrough', isCorrect: false },
                { answerText: 'd)	Breakdown ', isCorrect: true },
            ],
            hint: 'Hint: This word indicates providing a detailed explanation or analysis',
        },
        {
            questionText: (
                <div>
                    <p>
                        "First concept: What is a use case?
                        A use case represents a sequence of actions that a user performs to ____________ a specific goal using the system.
                        "
                    </p>
                </div>),
            answerOptions: [
                { answerText: 'a)	Success', isCorrect: false },
                { answerText: 'b)	Win', isCorrect: false },
                { answerText: 'c)	Achieve', isCorrect: true },
                { answerText: 'd)	Present ', isCorrect: false },
            ],
            hint: 'Hint: Consider a term related to successfully reaching an aim',
        },
        {
            questionText: "It describes the ____________ between the user and the system from the user's point of view.",
            answerOptions: [
                { answerText: 'a)	Interaction', isCorrect: true },
                { answerText: 'b)	Isolation', isCorrect: false },
                { answerText: 'c)	Separation', isCorrect: false },
                { answerText: 'd)	Modification ', isCorrect: false },
            ],
            hint: 'Hint: Think of a term that describes the communication between two parties',
        },
        {
            questionText: (
                <div>
                    <p>
                        Second concept: What are actors?
                        Actors are ____________ entities that interact with the system. They can be users, other systems, or external devices.

                    </p>
                </div>
            ),
            answerOptions: [
                { answerText: 'a)	Beautiful', isCorrect: false },
                { answerText: 'b)	External', isCorrect: false },
                { answerText: 'c)	Invisible', isCorrect: true },
                { answerText: 'd)	Intangible ', isCorrect: false },
            ],
            hint: 'Hint: This adjective describes the entities that are situated outside of the system, as further explained by the given examples.',
        },



    ];







    //quiz
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showVideo, setShowVideo] = useState(true)


    const goToQuiz = () => {
        setShowVideo(false)
    }



    const handleAnswerOptionClick = (isCorrect) => {

        setSelectedAnswer(isCorrect);
        if (`Clicked: ${isCorrect ? setScore(score + 125) : setScore(score - 30)}`);
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
        await axios.post('http://localhost:3002/submit', values)
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                    //window.location.reload();
                    getLatesetPoints()
                    navigate('/extraactivities')

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
                //   navigate('/listenmodule')
                console.log(res.data[0].points)
            })
            .catch(err => console.log(err));
    }

      //Show level Success Message

      const levelSuccess = () => {

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "A DAY AT THE UNIVERSITY",
            text: "Discussion Groups",
            showConfirmButton: false,
            timer: 5000
        });
    }


    return (
        <> <>

            <div>
                <div className="row ">

                    <div className="col p-3">
                        <p class="text-uppercase fs-3">4. DISCUSSION GROPUS</p>
                    </div>
                    <div className="col-8">
                        <h1 className='main-title text-uppercase text-center'><strong>A day at the university</strong></h1>


                    </div>
                    <div className="col-2">
                        {/* // <ShowPoints parentToChild={localStorage.getItem("inputValue")} /> */}
                        <ShowPoints childPoints={currentScore} parentToChild={localStorage.getItem("inputValue")} />
                    </div>
                    {/* //  <LocalStorage parentToChild={location.state.name} /> */}
                </div>
                <Row className='row justify-content-around  '>

                    <Col className='col-7 pt-5'>

                        <div className='container justify-content-center' style={{ width: "100%", height: "100%" }}>
                            <div className='container border border-info rounded border-3 p-5 w-75 h-75' >
                                <h3>
                                    <h4>
                                        Activity: Read and respond to other students' posts in a discussion forum. (imitate a forum environment)
                                        <br></br>

                                        Objective: construct forum post and a reply
                                        <br></br>

                                        <br></br>

                                        Example:


                                        Look at this sample forum post.

                                        
                                        <br/>
                                        <br/>
                                        Hi everyone,
                                        I'm new to use case diagrams and I'm struggling to understand them. Can someone please explain the basic concepts in simple terms?
                                        <br/>
                                        <br/>
                                        <br/>
                                        •	What is a use case?
                                        <br/>
                                        <br/>
                                        •	What are actors?
                                        <br/>
                                        <br/>
                                        Any help would be greatly appreciated!
                                        <br/>
                                        <br/>
                                        Now construct a reply for the forum post.


                                    </h4>
                                </h3>
                                <div >

                                    <img src={friends_ucsc} style={{ width: "100%" }}></img>

                                </div>
                            </div>

                        </div>
                    </Col>
                    <Col className='col'>
                        <div className='container text-center'>
                            {showScore ? (
                                <>
                                    <div className='score-section p-3'>
                                        <h2 class="text-success bg-white rounded-4"><strong>+{score}xp</strong></h2>
                                        <h2 class="text-warning bg-white rounded-4"><strong>A DAY AT THE UNIVERISTY<br></br>ENROLLING IN COURSES!!!</strong></h2>
                                    </div>

                                    <div className='col'>
                                        <img src={trophy_img} alt=''></img>

                                    </div>
                                    <div className='row'>
                                        <div className='col-3'>
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
            </div></>
        </>
    );
}



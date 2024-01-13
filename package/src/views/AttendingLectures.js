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
import Swal from 'sweetalert2';
export default function AttendingLectures() {
    const questions = [
        {
            questionText: "Alan Turing's idea for measuring artificial intelligence became known as:",
            answerOptions: [
                { answerText: 'The Turing Challenge', isCorrect: false },
                { answerText: 'The Turing Test', isCorrect: true },
                { answerText: 'The Turing Experiment', isCorrect: false },
                { answerText: 'The Turing Conundrum', isCorrect: false },
            ],
            hint: "Hint: Look for the specific term used to describe Alan Turing's idea.",
        },
        {
            questionText: 'According to Turing, what would a computer need to do to pass the Turing test?',
            answerOptions: [
                { answerText: 'Solve complex equations', isCorrect: false },
                { answerText: 'Mimic a psychologist', isCorrect: false },
                { answerText: 'Replace a human player without detection', isCorrect: true },
                { answerText: 'Use overwhelming computing power ', isCorrect: false },
            ],
            hint: 'Hint: Consider the condition set by Turing for a computer to be considered intelligent',
        },
        {
            questionText: 'What weakness of the Turing test is highlighted in the video?',
            answerOptions: [
                { answerText: "Judges' bias", isCorrect: false },
                { answerText: 'Lack of intelligence in computers', isCorrect: false },
                { answerText: 'Inability to simulate human conversation', isCorrect: false },
                { answerText: 'Humans attributing intelligence to non-intelligent things', isCorrect: true },
            ],
            hint: "Hint: Focus on what humans tend to do, according to the passage.",
        },
        {
            questionText: 'The program ELIZA was successful in fooling people by mimicking the behavior of a:',
            answerOptions: [
                { answerText: 'Scientist', isCorrect: false },
                { answerText: 'Psychologist', isCorrect: true },
                { answerText: 'Mathematician ', isCorrect: false },
                { answerText: 'Linguist', isCorrect: false },
            ],
            hint: 'Hint: Pay attention to the role that ELIZA played in the Turing test.',
        },
         {
            questionText: 'According to the passage, what aspect of human language proves to be a challenge for chatbots?',
            answerOptions: [
                { answerText: 'Solving equations', isCorrect: false },
                { answerText: 'Performing surgeries', isCorrect: false },
                { answerText: 'Basic small talk ', isCorrect: true },
                { answerText: 'Brand new topics', isCorrect: false },
            ],
            hint: 'Hint: Chatbots can be baffled by simple things like saying “ummm…”',
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
                    getLatesetPoints()
                   navigate('/discussiongroups')
                
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
            text: "Attending Lectures",
            showConfirmButton: false,
            timer: 5000
        });
    }


    return (
        <>

            <div>
                <div className="row ">

                    <div className="col p-3">
                        <p class="text-uppercase fs-3">3. ATTENDING LECTURES </p>
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

                        <div class="d-flex justify-content-center" className='container-fluid justify-content-center' style={{ width: "100%",height:"100%" }}>
                            <YoutubeEmbed embedId="3wLqsRLvV-c" />
                        </div>
                    </Col>
                    <Col className='col'>
                        <div className='container text-center'>
                            {showScore ? (
                                <>
                                    <div className='score-section p-3'>
                                        <h2 class="text-success bg-white rounded-4"><strong>+{score}xp</strong></h2>
                                        <h2 class="text-warning bg-white rounded-4"><strong>A DAY AT THE UNIVERSITY<br></br> ATTENDING LECTURES COMPLETED!!!</strong></h2>
                                    </div>

                                    <div className='col'>
                                        <img src={trophy_img}  alt=''></img>

                                    </div>
                                    <div className='row'>
                                        <div className='col-3'>
                                            <img src={cone_image} alt=''></img>

                                        </div>
                                        <div className='col'>

                                        </div>
                                        <div className='col' style={{ transform: 'scaleX(-1)' }} >
                                            <img src={cone_image}  alt=''></img>

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
            </div>
        </>
    );
}



import { Row, Col } from 'reactstrap';
import './Starter.css';
import React, { useState } from 'react';
import AudioPlayer from 'react-audio-player';
import audio from '../assets/audios/LE_listening_A1_Meeting_people_at_a_dinner.mp3'


export default function VideoModule() {
    const questions = [
        {
            questionText: 'Julian remembers Alyssa.',
            answerOptions: [
                { answerText: 'True', isCorrect: false },
                { answerText: 'False', isCorrect: true },
            ],
            hint: '',
        },
        {
            questionText: "Ben is Alyssa's brother.",
            answerOptions: [
                { answerText: 'True', isCorrect: true },
                { answerText: 'False', isCorrect: false },
            ],
            hint: '',
        },
        {
            questionText: "They were at Ben's wedding.",
            answerOptions: [
                { answerText: 'True', isCorrect: true },
                { answerText: 'False', isCorrect: false },
            ],
            hint: '',
        },
        {
            questionText: 'The wedding was in February.',
            answerOptions: [
                { answerText: 'True', isCorrect: false },
                { answerText: 'False', isCorrect: true },
            ],
            hint: '',
        },
        {
            questionText: 'Julian says the wrong name.',
            answerOptions: [
                { answerText: 'True', isCorrect: true },
                { answerText: 'False', isCorrect: false },
            ],
            hint: '',
        }, {
            questionText: "Alyssa doesn't want a drink",
            answerOptions: [
                { answerText: 'True', isCorrect: false },
                { answerText: 'False', isCorrect: true },
            ],
            hint: '',
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




    //reset Quiz

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowScore(false);
    }


    return (
        <>
            <div >
               
                <p class="text-uppercase fs-3">Listening Module {localStorage.getItem("inputValue")}</p>
                <h1 className='text-uppercase text-center'><strong>Meeting people at a dinner</strong></h1>
                <div className='row justify-content-around m-3 py-5' >
                    <AudioPlayer
                        src={audio}
                        autoPlay
                        controls
                    />
                </div>

            </div>

            <Row className='row justify-content-around m-3 py-5'>


                <Col className='col-5'>
                    <div className='container text-center'>
                        {showScore ? (
                            <>
                                <div className='score-section p-3'>
                                    You scored {score}
                                </div>
                                <div>
                                    <button type='button' className='btn btn-outline-info w-50' onClick={() => { resetQuiz() }}>
                                        RESET
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='question-section py-5'>
                                    <div className='question-count'>
                                        <span>Question {currentQuestion + 1}</span>/{questions.length}
                                    </div>
                                    <div className='question-text'>{questions[currentQuestion].questionText}</div>
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



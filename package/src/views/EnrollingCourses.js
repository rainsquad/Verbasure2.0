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

export default function EnorollingCourses() {
    const questions = [
        {
            questionText: "1. What is the main focus of the Software Engineering course?",
            answerOptions: [
                { answerText: 'Developing hardware systems', isCorrect: false },
                { answerText: 'Designing and developing large-scale software systems', isCorrect: true },
                { answerText: 'Introduction to database management', isCorrect: false },
                { answerText: 'Overview of programming languages', isCorrect: false },
            ],
            hint: "Hint: Look for the key terms that describe the content of the Software Engineering course.",
        },
        {
            questionText: "2. Which language is emphasized in the Database Management Systems course?",
            answerOptions: [
                { answerText: 'Java', isCorrect: false },
                { answerText: 'C++', isCorrect: false },
                { answerText: 'SQL', isCorrect: true },
                { answerText: 'Python', isCorrect: false },
            ],
            hint: 'Hint: Pay attention to the specific language mentioned for accessing and manipulating data in a relational database.',
        },
        {
            questionText: "3. What is the primary focus of the Database Management Systems course?",
            answerOptions: [
                { answerText: 'Developing software systems', isCorrect: false },
                { answerText: 'Relational model and SQL', isCorrect: true },
                { answerText: 'Hardware maintenance', isCorrect: false },
                { answerText: 'Overview of programming principles', isCorrect: false },
            ],
            hint: 'Hint: Identify the core topics mentioned in relation to database management systems.',
        },
        {
            questionText: "4. What does the Software Engineering course cover in terms of software systems?",
            answerOptions: [
                { answerText: 'Small-scale software development', isCorrect: false },
                { answerText: 'Developing only', isCorrect: false },
                { answerText: 'Designing, developing, and maintaining large-scale software systems', isCorrect: true },
                { answerText: 'Designing and maintaining large-scale hardware systems', isCorrect: false },
            ],
            hint: 'Hint: Focus on the range of activities related to software systems in the course description.',
        },
        {
            questionText: "5. Which of the following is NOT mentioned as a focus of the Database Management Systems course?",
            answerOptions: [
                { answerText: 'Relational model', isCorrect: false },
                { answerText: 'SQL', isCorrect: false },
                { answerText: 'Java programming', isCorrect: true },
                { answerText: 'Accessing and manipulating data', isCorrect: false },
            ],
            hint: "Hint: Consider a term that reflects the student's current academic activitHint: Eliminate the option that is not mentioned in the context of the course content.",
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
                    navigate('/attendinglectures')

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
        text: "Enrolling in Courses",
        showConfirmButton: false,
        timer: 5000
    });
}

    return (
        <> <>

            <div>
                <div className="row ">

                    <div className="col p-3">
                        <p class="text-uppercase fs-3">2. ENROLLING IN COURSES</p>
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
                                    <h4><strong>Activity: Select courses from a list based on their descriptions.
                                    <br></br>
                                    
                                        Objective: use academic vocabulary
                                        <br></br>
                                        <br></br>
                                        Example:</strong>
                                    </h4>
                                    <p> Software Engineering - This course introduces the fundamental principles of software engineering, focusing on the practical aspects of designing, developing, and maintaining large-scale software systems.</p>
                                    <br></br>
                                    <p> Database Management Systems - This course provides a comprehensive overview of database management systems, focusing on the relational model and SQL, the standard language for accessing and manipulating data in a relational database.</p>

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



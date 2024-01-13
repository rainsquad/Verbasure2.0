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

export default function DayAtUniversity() {
    const questions = [
        {
            questionText: (<div>
                <p>Student 1: Hi, I'm Sahan. I'm from Galle. What about you?</p>
                <p>Student 2: Hi Sahan, I'm Shivani. ___________________. It's nice to meet you!</p>
            </div>),
            answerOptions: [
                { answerText: 'a)	Glad to meet you', isCorrect: false },
                { answerText: 'b)	Good to know you', isCorrect: false },
                { answerText: 'c)	I’m from Vavuniya', isCorrect: true },
                { answerText: 'd)	I’m not from Colombo', isCorrect: false },
            ],
            hint: "It’s likely for Shivani to introduce herself in the same manner as Sahan.",
        },
        {
            questionText: (<div>
                <p>Student 1: How was your first day at university?</p>
                <p>Student 2: Finding my way around was __________________ as it’s only the first day. But overall, it was exciting. How about you, Sahan?</p>
            </div>),
            answerOptions: [
                { answerText: 'a)	Easy as a piece of cake', isCorrect: false },
                { answerText: 'b)	Very exciting', isCorrect: false },
                { answerText: 'c)	Could not be more easier', isCorrect: false },
                { answerText: 'd)	A bit challenging ', isCorrect: true },
            ],
            hint: 'Hint: Since Shivani is new to the campus, it’s difficult for her to find her way around. Consider a phrase that indicates some difficulty.',
        },
        {
            questionText: "Student 1: Everyone seems _______________, and I'm looking forward to exploring more. What are you planning to study?",
            answerOptions: [
                { answerText: 'a)	Very distant', isCorrect: false },
                { answerText: 'b)	Friendly ', isCorrect: true },
                { answerText: 'c)	Cold and harsh', isCorrect: false },
                { answerText: 'd)	Good looking ', isCorrect: false },
            ],
            hint: 'Hint: Think of a positive word that describes the people you met on your first day',
        },
        {
            questionText: "Student 2: I'm ___________ in Computer Science. ",
            answerOptions: [
                { answerText: 'a)	Majoring', isCorrect: true },
                { answerText: 'b)	Thinking', isCorrect: false },
                { answerText: 'c)	Going ', isCorrect: false },
                { answerText: 'd)	Selecting ', isCorrect: false },
            ],
            hint: 'Hint: Shivani has selected Computer Science as her main field of study. Think of a verb that describes selecting a main course of study.',
        },
        {
            questionText: "Student 1: That's cool! I'm ______________ Business Administration. ",
            answerOptions: [
                { answerText: 'a)	Planning', isCorrect: false },
                { answerText: 'b)	Studying ', isCorrect: true },
                { answerText: 'c)	Taking', isCorrect: false },
                { answerText: 'd)	Giving ', isCorrect: false },
            ],
            hint: "Hint: Consider a term that reflects the student's current academic activity",
        },
        {
            questionText: "Student 2: Nice choice! By the way, do you know of any good places to ____________ a bite around here? A canteen maybe?",
            answerOptions: [
                { answerText: 'a)	Take a photo', isCorrect: false },
                { answerText: 'b)	Wash my hands', isCorrect: false },
                { answerText: 'c)	Grab a bite', isCorrect: true },
                { answerText: 'd)	Buy a book', isCorrect: false },
            ],
            hint: "Hint: Consider a phrase that suggests getting food together as Shivani is asking for a canteen.",
        },
        {
            questionText: "Student 1: I heard there is a _____________. We could check that out together after our next class.",
            answerOptions: [
                { answerText: 'a)	Washroom', isCorrect: false },
                { answerText: 'b)	Bookshop', isCorrect: false },
                { answerText: 'c)	Computer lab', isCorrect: false },
                { answerText: 'd)	Cafeteria', isCorrect: true },
            ],
            hint: "Hint: As Shivani asked for a place to grab a bite, this place should be somewhere that provides food.",
        },
        {
            questionText: "Student 2: (8)Sounds like a plan, Sahan! Let’s go to the cafeteria right now.",
            answerOptions: [
                { answerText: 'a)	That’s too bad', isCorrect: false },
                { answerText: 'b)	I don’t like it', isCorrect: false },
                { answerText: 'c)	Sounds like a plan', isCorrect: true },
                { answerText: 'd)	I have a better idea', isCorrect: false },
            ],
            hint: "Hint: Think of a positive and enthusiastic way to agree with the proposed plan",
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
                    navigate('/enrollingincourses')
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
            text: "Arrival at University",
            showConfirmButton: false,
            timer: 5000
        });
    }



    return (
        <> <>

            <div>
                <div className="row ">

                    <div className="col p-3">
                        <p class="text-uppercase fs-3">1. Arrival at University </p>
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

                        <div class="d-flex justify-content-center" className='container-fluid justify-content-center' style={{ width: "100%", height: "100%" }}>
                            <img src={friends_ucsc} style={{ width: "80%" }}></img>
                        </div>
                    </Col>
                    <Col className='col'>
                        <div className='container text-center'>
                            {showScore ? (
                                <>
                                    <div className='score-section p-3'>
                                        <h2 class="text-success bg-white rounded-4"><strong>+{score}xp</strong></h2>
                                        <h2 class="text-warning bg-white rounded-4"><strong>A DAY AT THE UNIVERISTY<br></br>ARRIVAL AT UNIVERSITY!!!</strong></h2>
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



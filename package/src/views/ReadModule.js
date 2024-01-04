import { Row, Col } from 'reactstrap';
import './Starter.css';
import imageFriends from "../assets/images/bg/friends.png"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShowPoints from './ShowPoints';

export default function ReadModule() {







  const questions = [

    {
      questionText: 'What was the chosen venue for the reunion?',
      answerOptions: [
        { answerText: 'Park', isCorrect: false },
        { answerText: 'Café', isCorrect: true },
        { answerText: 'Beach', isCorrect: false },
        { answerText: 'Library', isCorrect: false },
      ],
      hint: 'The venue has a cozy ambiance with dim lights, creating a laid-back atmosphere—a perfect setting for friends to gather and reconnect.'
    },
    {
      questionText: 'What filled the air as each friend walked through the café door?',
      answerOptions: [
        { answerText: 'Sadness', isCorrect: false },
        { answerText: 'Joy', isCorrect: true },
        { answerText: 'Tension', isCorrect: false },
        { answerText: 'Silence', isCorrect: false },
      ],
      hint: 'As friends entered the café, the atmosphere was vibrant and positive, marked by smiles, laughter, and heartfelt greetings. The emotion that filled the air was the opposite of sadness.',
    },
    {
      questionText: 'What was the theme of the toasts during the reunion?',
      answerOptions: [
        { answerText: 'Success', isCorrect: false },
        { answerText: 'Friendship', isCorrect: true },
        { answerText: 'Challenges', isCorrect: false },
        { answerText: 'Hardships', isCorrect: false },
      ],
      hint: "When raising their glasses in toasts, friends celebrated something enduring and resilient. It wasn't about victories or difficulties but rather focused on the strong bond they shared over time",
    },
    {
      questionText: 'What transitioned seamlessly into a dinner setting during the reunion?',
      answerOptions: [
        { answerText: 'Coffee break', isCorrect: false },
        { answerText: 'Cocktail party', isCorrect: false },
        { answerText: 'Café ambiance', isCorrect: true },
        { answerText: 'Outdoor activities', isCorrect: false },
      ],
      hint: 'The setting where friends enjoyed shared delights smoothly shifted from the initial cozy café ambiance, enhancing the continuity of their reunion experience.',
    },
    {
      questionText: 'What did someone suggest capturing during the reunion?',
      answerOptions: [
        { answerText: 'Old memories', isCorrect: false },
        { answerText: 'The moment', isCorrect: true },
        { answerText: 'Personal growth', isCorrect: false },
        { answerText: 'Shared laughter', isCorrect: false },
      ],
      hint: "Amidst the joy and connection, a suggestion was made to freeze in time the essence of the reunion. It wasn't about capturing memories or specific events but rather about preserving the overall experience",
    },


  ];

  const story = [
    {
      storyText: <strong>'As the sun dipped below the horizon, casting warm hues across the cityscape, I found myself eagerly awaiting a long-overdue reunion with friends. Months had passed since we last gathered, and anticipation filled the air as we planned to reconnect, reminisce, and create new memories.'</strong>,

    },
    {
      storyText: <strong> 'The excitement was palpable as we set a date for our long-awaited reunion. The prospect of seeing familiar faces and catching up on life`s twists and turns brought a joyful anticipation.'</strong>,

    },
    {
      storyText: <strong>'The chosen venue, a cozy café with dim lights and a laid-back ambiance, served as the perfect backdrop for our reunion. Its welcoming atmosphere instantly put us at ease.'</strong>,

    },
    {
      storyText: <strong>'As each friend walked through the café door, there were smiles, laughter, and heartfelt greetings. Hugs and exclamations of joy filled the air, setting the tone for an evening of warmth and camaraderie.'</strong>,

    },
    {
      storyText: <strong>'The sound of shared laughter echoed as we settled into a comfortable corner. Stories flowed effortlessly, seamlessly intertwining tales of the past and present.'</strong>,

    },
    {
      storyText: <strong>'The essence of the reunion lay in catching up on life's nuances—new jobs, travel adventures, personal milestones, and the everyday triumphs and challenges that had shaped our individual journeys.'</strong>,

    },
    {
      storyText: <strong>'Nostalgia washed over us as we reminisced about old escapades, inside jokes, and the bonds that had forged over shared experiences. Time seemed to melt away, leaving only the enduring threads of friendship.'</strong>,

    },
    {
      storyText: <strong>'The conversation took a reflective turn as we shared insights into personal growth and the lessons learned along the way. It was a moment to acknowledge the resilience that had defined our collective journey.'</strong>,

    },
    {
      storyText: <strong>'Amidst the laughter and heartfelt conversations, we began to outline plans for the future—new adventures to embark on, dreams to chase, and the promise of more reunions to come.'</strong>,

    },
    {
      storyText: <strong> 'The café ambiance transitioned seamlessly into a dinner setting as we savored a meal of shared delights. Culinary delights mirrored the richness of our shared memories.'</strong>,

    },
    {
      storyText: <strong>'In the midst of the reunion, someone suggested capturing the moment. Cameras clicked as we posed for photos, freezing in time the joy and connection that defined our friendship.'</strong>,

    },
    {
      storyText: <strong>'Expressions of gratitude flowed freely as we acknowledged the significance of this reunion. Gratefulness for the enduring bonds and the privilege of reconnecting with cherished friends..'</strong>,

    },
    {
      storyText: <strong>'As the night wore on, we bid reluctant goodbyes, promising to stay connected despite the busyness of life. Hugs were exchanged, and promises made to not let such a significant amount of time pass before the next gathering..'</strong>,

    },
    {
      storyText: <strong>'The echo of shared laughter and heartfelt conversations lingered in the air as we dispersed, each friend going their separate way with a heart full of warmth and memories.'</strong>,

    },
    {
      storyText: <strong>'The reunion was not just an evening but a rekindled flame of friendship. It reignited the understanding that no matter the time or distance, true friends can always pick up where they left off..'</strong>,

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

      setShowHint(true)
      setShowSuccess(false)
    }
  };





  //Submit Answer
  const handleSubmitAnswer = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
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


  //story line 

  const [currentStory, setCurrentStory] = useState(0);

  const handlePrevClick = () => {
    if (currentStory > 0) {
      setCurrentStory(currentStory - 1);
    }
  };

  const handleNextClick = () => {
    if (currentStory < story.length - 1) {
      setCurrentStory(currentStory + 1);
    }

  };

  //reset Quiz

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowScore(false);
  }




  //sending data to show points tab




  return (
    <>
      <div className="row ">
        <div className="col p-3">
          <p class="text-uppercase fs-3">Reading Module </p>
        </div>
        <div className="col-8">
          <h1 className='text-uppercase text-center'><strong>Meeting Up with Friends</strong></h1>

        </div>
        <div className="col-2">
          <ShowPoints parentToChild={localStorage.getItem("inputValue")} />
        </div>
        {/* //  <LocalStorage parentToChild={location.state.name} /> */}
      </div>


      <div className="container container-fluid ">




        <div>
          {/* <button primary onClick={() => parentToChild()}>Click Parent</button> */}
          {/* <img src={`http://localhost:3002/images/` + imageData.image} alt="" style={{ width: "150px", height: "150px" }}></img> */}

        </div>
      </div>

      <Row className='row justify-content-cc px-5 '>


        <Col className='col'>

          <div className='container text-center border border-info rounded border-3 h-100' >
            <strong className='h4'>"Reunion of Hearts: Embracing Friendship after a Long Hiatus"</strong>

            <>
              <div className='question-section py-5'>
                <div className='question-count'>

                </div>
                <div className='question-text h5'>{story[currentStory].storyText}</div>
              </div>
              <div>
                <img className='w-50' src={imageFriends} alt=''></img>
              </div>

              <div class="row justify-content-evenly py-3">
                <div class="col-5">

                  <button type='button' className='btn btn-outline-secondary rounded-2 w-100' onClick={handlePrevClick} >PREVIOUS</button>
                </div>
                <div class="col-5">
                  <button type='button' className='btn btn-outline-primary rounded-2 w-100' onClick={handleNextClick} >NEXT</button>
                </div>
              </div>

            </>
          </div>
        </Col>
        <Col className='col'>
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



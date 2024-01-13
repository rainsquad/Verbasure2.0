// src/components/Homepage.js

import React from 'react';
import { Container, Row, Col, Card, Button } from 'reactstrap';
import quiz from '../assets/cards/quiz_image.jpg'
import video from '../assets/cards/video_image.jpg'
import story from '../assets/cards/stories_image.jpg'
import audio from '../assets/cards/audio_image.jpg'
import activities from '../assets/cards/activities_image.jpg'

import './Starter.css';


export default function Homepage() {


    return (

        <Container>
            
           
           
            <Row className="mt-5">
                <Col>

                    <h3 className='main-title text-center text-black rounded-4'>Welcome to Verbasure</h3>
                    <h3>
                    At "Verbasure", we believe in making English learning accessible, engaging,
                     and tailored to individual preferences. Our platform is carefully crafted to cater 
                     to diverse learning styles, ensuring that everyone, regardless of their background, 
                     can embark on a rewarding journey to fluency. Here's an overview of what makes "Verbasure" 
                     a unique and effective English learning destination: </h3>


                </Col>
               
            </Row>
            <Row className='py-3' >
            <h1><strong>Innovative Learning Methods</strong></h1>
                    <Col  className='bg bg-light rounded-4 '>
                   
                        <h2 className='py-3'><strong>Video Learning</strong></h2>
                        <p> 
                        Immerse yourself in our curated collection of educational videos designed to enhance your language skills. From language basics to advanced grammar, our video lessons are both informative and enjoyable.
                        </p>
                    </Col>
                    <br></br>
                    <Col  className='bg bg-light rounded-4'>
                    
                        <h2 className='py-3'><strong>Audio Clips</strong></h2>
                        <p> 
                        Develop your listening skills with a rich assortment of audio clips featuring various accents and real-life conversations. This immersive experience will sharpen your ability to comprehend spoken English in different contexts. </p>
                    </Col>
                   
            </Row>
            <Row className='py-4'>
          
                    <Col className='bg bg-light rounded-4'>
                   
                        <h2 className='py-3'><strong>Quizzes</strong></h2>
                        <p> 
                        Challenge yourself with interactive quizzes that reinforce your understanding of grammar, vocabulary, and comprehension. Earn points for correct answers and track your progress as you move through different levels of difficulty. </p>
                    </Col>
                    <br></br>
                    <Col className='bg bg-light rounded-4'>
                    
                        <h2 className='py-3'><strong> Reading Stories</strong></h2>
                        <p> 
                   Explore our library of captivating stories that not only entertain but also improve your reading comprehension. Each story is carefully chosen to expose learners to diverse language structures and expressions.
                   </p>
                   </Col>
                   
            </Row>
            <Row className="mt-5">
                <Col>
                    <h2>Explore Our Activities</h2>
                </Col>
            </Row>

            <Row className="mt-3 " >
                {/* Quizzes */}
                <Col md={4} className='p-4'>
                    <img src={quiz} className='rounded-4' style={{ width: "80%", height: "50%" }} alt="Quizzes" />
                    <h3>Quizzes</h3>
                    <p>
                        Test your knowledge with our interactive quizzes. Fun and challenging questions await you!
                    </p>
               
                </Col>

                {/* Video Watching */}
                <Col md={4} className='p-4'>
                    <img src={video} className='rounded-4' style={{ width: "80%", height: "50%" }} alt="Video Watching" />
                    <h3>Video Watching</h3>
                    <p>
                        Watch engaging videos designed to improve your English language skills. Learn while you enjoy!
                    </p>
                   
                </Col>

                {/* Stories */}
                <Col md={4} className='p-4'>
                    <img src={story} className='rounded-4' style={{ width: "80%", height: "50%" }} alt="Stories" />
                    <h3>Stories</h3>
                    <p>
                        Immerse yourself in captivating stories that enhance your reading and comprehension abilities.
                    </p>
                    
                </Col>
            </Row>

            <Row className="mt-3">
                {/* Audio Clips */}
                <Col md={4} className='p-4'>
                    <img src={audio} className='rounded-4' style={{ width: "80%", height: "50%" }} alt="Audio Clips" />
                    <h3>Audio Clips</h3>
                    <p>
                        Listen to audio clips with varying accents and topics, perfect for improving your listening skills.
                    </p>
                 
                </Col>

                {/* More Activities */}
                <Col md={4} className='p-4'>
                    <img src={activities} className='rounded-4' style={{ width: "80%", height: "50%" }} alt="More Activities" />
                    <h3>More Activities</h3>
                    <p>
                        Explore additional activities designed to make your English learning journey enjoyable and effective.
                    </p>
                   
                </Col>
            </Row>
        </Container>
    );

};


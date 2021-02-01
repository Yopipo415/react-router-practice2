import React from 'react';
import { Link } from 'react-router-dom';
import QuizModel from '../../models/Quiz';
import Button from "../Button/Button";
import './Quiz.css';

class Quiz extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            quizzes : [],
            currentIndex : 0,
            numberOfCorrects : 0
        };
    }

    async componentDidMount () {
        await this.restart();
    }

    async restart () {
        this.setState({
            quizzes : [],
            currentIndex : 0,
            numberOfCorrects : 0
        });

        const quizzes = await QuizModel.fetchAndCreateQuizzes();

        this.setState({ quizzes });

    }

    selectAnswer (quiz, answer) {
        let { currentIndex, numberOfCorrects } = this.state;
        const isCorrect = quiz.judgeCorrectAnswer(answer);

        if (isCorrect) {
            numberOfCorrects ++;
            alert('Correct answer!!');
        } else {
            alert(`Wrong answer... (The correct answer is "${quiz.correctAnswer}")`);
        }
        currentIndex++;

        this.setState({
            currentIndex,
            numberOfCorrects
        });
    }

    render () {
        const { quizzes, currentIndex } = this.state;

        if (quizzes.length === 0) {
            return this.renderLoading();
        }

        if (quizzes.length > 0 && currentIndex < quizzes.length) {
            return this.renderQuiz();
        }

        if (quizzes.length > 0 && currentIndex >= quizzes.length) {
            return this.renderResult();
        }
    }

    renderLoading () {
        return (
            <div>
                <h1>Please wait...</h1>
                <p>Now loading...</p>
                <hr/>
                <Link to="/">Back to the Top</Link>
            </div>
        );
    }

    renderQuiz () {
        const { quizzes, currentIndex } = this.state;

        const quiz = quizzes[currentIndex];
        const answers = quiz.shuffleAnswers().map((answer,index) => {
            return (
                <li key={index}>
                    <Button
                        onClickHandler={() => { this.selectAnswer(quiz, answer) }}
                    >
                        {answer}
                    </Button>
                </li>
            );
        });

        return (
            <div>
                <h1>Question : { currentIndex + 1 }</h1>
                <div>
                    <p>{quiz.question}</p>
                    <ul className="QuizList">{answers}</ul>
                </div>
                <hr/>
                <Link to="/">Back to the Top</Link>
            </div>
        );
    }

    renderResult () {
        const { quizzes, numberOfCorrects } = this.state;

        return (
            <div>
                <h1>Your result is...</h1>
                <div>
                    <p id="result">{`${numberOfCorrects}/${quizzes.length} corrects.`}</p>
                    <Button
                        onClickHandler={() => {this.restart()}}
                    >
                        Restart?
                    </Button>
                </div>
                <hr/>
                <Link to="/">Back to the Top</Link>
            </div>
        );
    }

}

export default Quiz;
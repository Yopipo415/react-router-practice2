import React from 'react';
import Button from "../Button/Button";

const Home = ({ history }) => {
    return (
        <div>
            <h1>Welcome to the Quiz App!</h1>
            <br/>
            <br/>
            <Button 
                onClickHandler={() => {
                    history.push('/quiz');
                }}
            >
                Let's start!!
            </Button>
        </div>
    );
};

export default Home;
import React, { useState } from 'react';
import './Hero.css';
import { assets } from '../../assets/assets';
import diceRollSound from '../../assets/dice-rolling-sound-effect.mp3';

const Hero = () => {

    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isNumberSelected, setIsNumberSelected] = useState(false);
    const [isErrorMsgNecessary, setIsErrorMsgNecessary] = useState(false);
    const [isRulesActive, setIsRulesActive] = useState(false);
    const [count, setCount] = useState(0);
    const [selectedSource, setSelectedSource] = useState(assets['dice_1']);
    const [numberSelected, setNumberSelected] = useState(1);
    const [isRolling, setIsRolling] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    const diceRollAudio = new Audio(diceRollSound);

    const handleGameStarting = () => {
        setIsGameStarted(true);
    }

    const diceClickHandler = () => {
        if (isNumberSelected) {

            diceRollAudio.play();
            setIsRolling(true);

            setTimeout(() => {
                const randomDiceNumber = (Math.floor(Math.random() * 6) + 1);
                let diceImageSrc = `dice_${randomDiceNumber}`;
                setSelectedSource(assets[diceImageSrc]);
                setIsNumberSelected(false);
                if(randomDiceNumber === Number(numberSelected)) {
                    setCount(prev => prev+randomDiceNumber);
                }
                setIsRolling(false);
                setActiveIndex(null);
            }, 200);
        } else setIsErrorMsgNecessary(true);
    }

    const numberClickHandler = (event) => {
        setIsNumberSelected(true); 
        setIsErrorMsgNecessary(false);
        setNumberSelected(event.target.textContent);
        console.log(event.target);
        setActiveIndex(Number(event.target.innerHTML)-1)
    }

  return !isGameStarted ?
    <div className='home-page'>
        <img className="home-left-section" src={assets.dices_1} alt="" />
        <div className="home-right-section">
            <div className="home-right-section-content">
                <h1>DICE GAME</h1>
                <button onClick={handleGameStarting}>Play Now</button>
            </div>
        </div>
    </div> :
    <div className='game-page'>
        <div className="game-details">
            <div className="counter">
                <h1>{count}</h1>
                <p>Total Score</p>
            </div>
            <div className="number-selector">
                {isErrorMsgNecessary && <p className='error-msg'>You have not selected any number</p>}
                <div className="numbers">
                    {
                        [1,2,3,4,5,6].map((item, index) => (
                            <div
                                key={index}
                                className={activeIndex===index?'number-item-selected':'number-item'}
                                onClick={e => numberClickHandler(e)}>
                            {item}
                            </div>
                        ))
                    }
                    {/* <div onClick={(e)=> numberClickHandler(e)} className='number-item'>1</div>
                    <div onClick={(e)=> numberClickHandler(e)} className='number-item'>2</div>
                    <div onClick={(e)=> numberClickHandler(e)} className='number-item'>3</div>
                    <div onClick={(e)=> numberClickHandler(e)} className='number-item'>4</div>
                    <div onClick={(e)=> numberClickHandler(e)} className='number-item'>5</div>
                    <div onClick={(e)=> numberClickHandler(e)} className='number-item'>6</div> */}
                </div>
                <span>Select Number</span>
            </div>
        </div>
        <div className="game-content">
            <div className="dice">
                <img src={selectedSource} alt="" onClick={diceClickHandler} className={isRolling?'dice-roll':''}/>
                <p>Click on Dice to roll</p>
            </div>
            <div className="game-buttons">
                <button onClick={() => setCount(0)} className="reset-btn">Reset Score</button>
                <button onClick={() => setIsRulesActive(!isRulesActive)} className="rules-btn">{!isRulesActive?'Show Rules':'Hide Rules'}</button>
            </div>
        </div>
        {isRulesActive && 
            <div className='rules-container'>
                <h1>How to play dice game</h1>
                <div className="rules-list">
                    <li className="rules-item">Select any number</li>
                    <li className="rules-item">Click on dice image</li>
                    <li className="rules-item">Ater click on dice, if selected number is equal to dice number you will get some point as dice</li>
                    <li className="rules-item">If you get wrong guess 2 points will be deducted</li>
                </div>
            </div>
        }
    </div>
}

export default Hero;
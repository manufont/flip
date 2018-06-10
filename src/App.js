import React, { Component, Fragment } from 'react';
import './App.css';
import './styles/button.css';
import './styles/input-range.css';

import flipEngine from './flipEngine';
import { Coin } from './components';

import dogecoin_heads from './assets/dogecoin_heads.png';
import dogecoin_tails from './assets/dogecoin_tails.png';

const FLIP_DURATION = 2000;

const pToPercentage = p => (
  Math.round(p*100)
)

class App extends Component {

  state = {
    flipping: false,
    flipped: false,
    flippingHeads: null,
    heads: null,
    amount: null,
    slider: null,
  }

  onAmountChange = e => {
    const amount = parseFloat(e.target.value);
    if(!isNaN(amount)){
      this.setState({
        amount,
        slider: amount/2,
      });
    }else{
      this.setState({
        amount: null,
        slider: null,
      });
    }
  }

  onSliderChange = e => {
    const slider = parseFloat(e.target.value);
    this.setState({
      slider,
    });
  }

  getP = () => {
    const { amount, slider } = this.state;
    let p = 0.5;
    if(amount){
      p = flipEngine(amount, slider)
    }
    return p;
  }

  flip = () => {
    const p = this.getP();
    const heads = Math.random() < p;
    this.setState({
      flippingHeads: heads,
      flipping: true,
      flipped: false,
    })
    setTimeout(this.onFlipEnd, FLIP_DURATION);
  }

  onFlipEnd = () => {
    this.setState({
      flippingHeads: null,
      flipping: false,
      flipped: true,
      heads: this.state.flippingHeads
    })
  }

  resetFlip = () => {
    this.setState({
      flipped: false
    })
  }

  onFormSubmit = e => {
    e.preventDefault()
    this.flip();
    return false;
  }

  render(){

    const { flipping, flipped, flippingHeads, heads, amount, slider } = this.state;

    const p = this.getP();

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">ManuFlip</h1>
          <h2 className="App-subtitle">Flip a coin, share the costs.</h2>
        </header>
        <form className="form" onSubmit={this.onFormSubmit}>
          <div className='form-item'>
            <input
              className="amount amount-input" name='amount' type='number' placeholder='How much ?'
              min={0.02} step={0.01}
              value={amount || ''} onInput={this.onAmountChange}
            />
          </div>
          <div className='form-item'>
            <div className='side-and-image'><img width={48} height={48} src={dogecoin_heads} alt='Heads' />&nbsp;Heads</div>
            <div className='side-and-image'>Tails&nbsp;<img width={48} height={48} src={dogecoin_tails} alt='Tails' /></div>
          </div>
          {amount && (
            <Fragment>
              <div className='form-item'>
                <span className='amount'>{slider.toFixed(2)}</span>
                <span className='amount'>{(amount-slider).toFixed(2)}</span>
              </div>
              <div className='form-item'>
                <input name='slider' className='slider' type='range' min={0.01} max={amount-0.01} step={0.01} value={slider} onChange={this.onSliderChange}/>
              </div>
            </Fragment>
          )}
          <div className='form-item centralized'>
            <span className='percentage'>{pToPercentage(p)}%</span>
            &nbsp;
            <button type='submit'>Flip it !</button>
            &nbsp;
            <span className='percentage'>{pToPercentage(1 - p)}%</span>
          </div>
          
        </form>
        <Coin
          flipping={flipping}
          flipped={flipped}
          heads={heads}
          flippingHeads={flippingHeads}
          onOpen={this.flip}
          onClose={this.resetFlip}
        />
      </div>
    );
  }
}

export default App;

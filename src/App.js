import React, { Component, Fragment } from 'react';
import './App.css';

import flipEngine from './flipEngine';

const FLIP_DURATION = 500;

class App extends Component {

  state = {
    flipping: false,
    flipped: false,
    heads: null,
    amount: null,
    slider: null,
    p: null,
  }

  onAmountChange = e => {
    const amount = parseFloat(e.target.value);
    if(!isNaN(amount)){
      this.setState({
        amount,
        slider: amount/2,
        p: 0.5
      });
    }else{
      this.setState({
        amount: null,
        slider: null,
        p: null
      });
    }
  }

  onSliderChange = e => {
    const slider = parseFloat(e.target.value);
    this.setState({
      slider,
      p: flipEngine(this.state.amount, slider)
    });
  }

  flip = () => {
    const { amount, slider, p } = this.state;
    const heads = Math.random() < (p || 0.5);
    this.setState({
      heads,
      flipping: true,
      flipped: false,
    })
    setTimeout(() => {
      this.setState({
        flipping: false,
        flipped: true
      });
    }, FLIP_DURATION)
  }

  onFormSubmit = e => {
    e.preventDefault()
    this.flip();
    return false;
  }

  render(){

    const { flipping, flipped, heads, amount, slider, p } = this.state;

    console.log(this.state);

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Flip</h1>
          <h2>Flip a coin, share the costs.</h2>
        </header>
        <form className="form" onSubmit={this.onFormSubmit}>
          <input name='amount' type='number' min={0.02} step={0.01} value={amount || ''} onInput={this.onAmountChange} />
          {amount && (
            <div>
              {slider.toFixed(2)}
              <input name='slider' type='range' min={0.01} max={amount} step={0.01} value={slider} onChange={this.onSliderChange}/>
              {(amount-slider).toFixed(2)}
            </div>
          )}
          <input type='submit' />
          { flipping && (
            <span>
              ...flipping
            </span>
          )}
          {flipped && (
            <span>
              {heads ? 'heads' : 'tails'}
            </span>
          )}
        </form>
      </div>
    );
  }
}

export default App;

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

import './index.css';

class Coin extends Component {

  onChange = open => {
    if(open){
      this.props.onOpen();
    }else{
      this.props.onClose();
    }
  }

  render(){

    const { flipping, flipped, flippingHeads, heads } = this.props;

    const currentSide = heads ? 'heads' : 'tails';
    const nextSide = flippingHeads ? 'heads' : 'tails';
    const open = flipping || flipped;
    
    return (
      <div className="Coin">
        <SwipeableBottomSheet
          open={open} onChange={this.onChange}
          overflowHeight={100} topShadow={false}
          bodyStyle={{
            background: 'none',
            overflow: 'visible'
          }}
        >
          <div className='sheet-content'>
            <div className='coin'>
              <div className={flipping ? 'move' : ''}>
                <div className={flipping ? 'zoom' : ''}>
                  <div className={flipping ? 'rotate' : ''}>
                    <div className={flipping ? `flip ${currentSide} to-${nextSide}` : `flip ${currentSide}`}>
                      <div className="side side-heads"></div>
                      <div className="side side-tails"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`winMessage ${flipped ? 'visible' : ''}`}>
              { flipped && (
                <Fragment>
                  <p>
                    <span className='winner'>{heads ? 'Heads' : 'Tails'}</span>, you pay !
                  </p>
                  <button onClick={this.props.onClose}>Another one !</button>
                </Fragment>
              )}
            </div>
          </div>
        </SwipeableBottomSheet>
      </div>
    );
  }
}

Coin.propTypes = {
  flipping: PropTypes.bool.isRequired,
  flipped: PropTypes.bool.isRequired,
  heads: PropTypes.bool,
  flippingHeads: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
}

export default Coin;

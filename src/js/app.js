import '../css/index.styl';

import 'aframe-core';
import 'babel-polyfill';
import {Animation, Entity, Scene} from 'aframe-react';
import key from 'keymaster';
import React from 'react';
import ReactDOM from 'react-dom';
import LazyLoad from 'react-lazyload';

import AssetSphere from './components/AssetSphere';

const Image = props => (
  <li data-type="image" key={props.key}>
    {!props.visible &&
      <p>Loading...</p>
    }
    {props.visible &&
      <img onClick={props.onClick} src={props.src}/>
    }
  </li>
);

class App extends React.Component {
  constructor(props) {
    super(props);

    let assets = ['img/360.jpg'];
    for (var i = 1 ; i <= 226; i++) {
      assets.push(`img/360%20(${i}).jpg`);
    }

    this.state = {
      activeIndex: 0,
      assets: assets
    };

    key('left', this.prev);
    key('right', this.next);
    key('space', this.next);
  }

  prev = () => {
    let index = this.state.activeIndex - 1;
    if (index < 0) {
      index = this.state.assets.length - 1;
    }
    this.setState({
      activeIndex: index
    });
  }

  next = () => {
    let index = this.state.activeIndex + 1;
    if (index === this.state.assets.length) {
      index = 0;
    }
    this.setState({
      activeIndex: index
    });
  }

  setActiveIndex = i => {
    return () => {
      this.setState({
        activeIndex: i
      });
    }
  }

  render() {
    return (
      <div className="app">
        <Scene>
          <AssetSphere src={`url(${this.state.assets[this.state.activeIndex]})`}/>
        </Scene>

        <div className="asset-dashboard">
          <h1>three schwifty</h1>
          <input placeholder="Import image or video from URL..." type="text"/>
          <ul className="assets">
            {this.state.assets.map((asset, i) =>
              <LazyLoad offset={4 * window.innerHeight} scroll={false} wheel={true}>
                <Image key={i} onClick={this.setActiveIndex(i)} src={asset}/>
              </LazyLoad>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('.scene-container'));

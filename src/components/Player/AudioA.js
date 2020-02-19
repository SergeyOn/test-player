import React, { Component } from 'react';
import AudioVisualiser from './AudioV';

class AudioAnalyser extends Component {
  constructor(props) {
    super(props);
    this.state = { audioData: new Uint8Array(0) };
    this.currentBuffer = null;
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.source = this.audioContext.createMediaElementSource(this.props.audio.current);
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
    this.rafId = requestAnimationFrame(this.tick);
  }

tick() {
  this.analyser.getByteTimeDomainData(this.dataArray);
  this.setState({ audioData: this.dataArray });
  this.rafId = requestAnimationFrame(this.tick);
}

componentWillUnmount() {
  cancelAnimationFrame(this.rafId);
  this.analyser.disconnect();
  this.source.disconnect();
}

  render() {
    return <AudioVisualiser audioData={this.state.audioData} />;
  }
}

export default AudioAnalyser;
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'antd';

import styles from './audio.less';

export default class Audio extends PureComponent {
  static defaultProps = {
    tracks: [
      {
        "name": "You’ll Be Mine",
        "artists": [
          {
            "name": "The Pierces",
          }
        ],
        "album": {
          "name": "Flashing Lights (Deluxe Version)",
          "picUrl": "http://p1.music.126.net/_6XIXWG7Qj0U7dQ_8oU1LQ==/2116559883495552.jpg?param=130y130",
        },
        "duration": 250001,
        "mp3Url": "http://m10.music.126.net/20171130163725/d6e2e16518ef85888124c12f5fb42c88/ymusic/6db3/a431/1f0c/fddd134b6031b26633b9327a4d473947.mp3"
      },
      {
        "name": "告白气球",
        "artists": [
          {
            "name": "周杰伦",
          }
        ],
        "album": {
          "name": "周杰伦的床边故事",
          "picUrl": "http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
        },
        "duration": 215001,
        "mp3Url": "http://m10.music.126.net/20171130162432/b36ca44438d2efeeaeccee2f3aa5b77e/ymusic/6e01/a4d4/bbef/2dda07904eb54d44abb278165e1c6ead.mp3"
      },
    ]
  };
  static propTypes = {
    tracks: PropTypes.array
  };
  state = {
    currentTrackLen: this.props.tracks.length, //歌单歌曲数
    currentTrackIndex: 0, //当前播放的歌曲索引，默认加载第一首歌
    currentTime: 0, //当前歌曲播放的时间
    currentTotalTime: 0, //当前歌曲的总时间
    playStatus: false, //true为播放状态，false为暂停状态
  };
  timer = null;
  //DOM加载完
  componentDidMount(){
      this.updatePlayStatus();
      this.timer = setInterval(()=>{
        let audio = document.getElementById('audio');
        this.setState({currentTime:audio.currentTime},()=>{
          if(~~this.state.currentTime >= ~~this.state.currentTotalTime){
            this.next();
          }
        });
      }, 300);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  //更新播放状态
  updatePlayStatus() {
    const { playStatus, currentTrackIndex } = this.state;
    const { tracks } = this.props;
    let audio = document.getElementById('audio');
    if(playStatus){
      audio.play();
    }else{
      audio.pause();
    }
    //更新当前歌曲总时间
    this.setState({currentTotalTime: tracks[currentTrackIndex].duration / 1000});
  }

  //播放事件处理
  play() {
    //这里有setState是异步的，需要在回调中执行
    this.setState({playStatus:!this.state.playStatus}, () => {
      this.updatePlayStatus();
    });
  }

  //上一曲事件处理
  previous() {
    let { currentTrackIndex, currentTrackLen } = this.state;

    if(currentTrackIndex - 1 < 0){
      currentTrackIndex = currentTrackLen - 1;
    }else{
      currentTrackIndex--;
    }
    this.setState({currentTrackIndex},() => {
      this.updatePlayStatus();
    });
  }

  //下一曲事件处理
  next() {
    let { currentTrackIndex, currentTrackLen } = this.state;

    if(currentTrackIndex + 1 >=  currentTrackLen){
      currentTrackIndex = 0;
    }else{
      currentTrackIndex++;
    }
    this.setState({currentTrackIndex},() => {
        this.updatePlayStatus();
    });
  }

  render(){
    const { currentTrackIndex, currentTime, currentTotalTime, playStatus } = this.state;
    const { tracks } = this.props;

    return(
      <div className={styles.player}>
        {/* 播放器名称  */}
        <div className="header">音乐播放器</div>

        {/* 音乐信息  */}
        <TrackInfo track={tracks[currentTrackIndex]} />

        {/* 播放进度条   */}
        <Progress progress={currentTime / currentTotalTime * 100 + '%'} />

        {/* 播放控制  */}
        <Controls isPlay={playStatus} onPlay={() => this.play()} onPrevious={() => this.previous()} onNext={() => this.next()} />

        {/* 播放时间   */}
        <Time currentTime={currentTime} currentTotalTime={currentTotalTime} />

        {/* 音频控件  */}
        <audio id="audio" src={tracks[currentTrackIndex].mp3Url}></audio>
      </div>
    )
  }
}

class TrackInfo extends PureComponent {
  render() {
    return(
      <div>
        <div className="albumPic" style={{'backgroundImage':'url('+ this.props.track.album.picUrl +')'}}></div>
        <div className='trackInfo'>
          <div className="name">{this.props.track.name}</div>
          <div className="artist">{this.props.track.artists[0].name}</div>
          <div className="album">{this.props.track.album.name}</div>
        </div>
      </div>
    )
  }
}

class Progress extends PureComponent {
  render(){
    return (
      <div className="progress" style={{'width':this.props.progress}}></div>
    )
  }
}

class Controls extends PureComponent {
    render(){
      let iconType;
      if(this.props.isPlay == true){
          iconType = 'pause-circle';
      }else{
          iconType = 'play-circle';
      }
      return (
        <div className="controls">
            <div className="play" onClick={this.props.onPlay}>
              <Icon type={iconType} />
            </div>
            <div className="previous" onClick={this.props.onPrevious}>
              <Icon type="left-circle" />
            </div>
            <div className="next" onClick={this.props.onNext}>
              <Icon type="right-circle" />
            </div>
        </div>
      )
    }
}

class Time extends PureComponent {
    timeConvert(timestamp){
        var minutes = Math.floor(timestamp / 60);
        var seconds = Math.floor(timestamp - (minutes * 60));

        if(seconds < 10) {
          seconds = '0' + seconds;
        }

        timestamp = minutes + ':' + seconds;
        return timestamp;
    }
    render() {
      return(
        <div className="time">
            <div className="current">{this.timeConvert(this.props.currentTime)}</div>
            <div className="total">{this.timeConvert(this.props.currentTotalTime)}</div>
        </div>
      )
    }
}

import React from 'react';
import './Clock.css';

class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState(props.userTimezone);
  }

  getUserDate(userTimezone) {
    const parsedUserTimezone = +Number.parseFloat(userTimezone);
    const hoursUserTimezone = Math.trunc(parsedUserTimezone);
    const minutesUserTimezone = (parsedUserTimezone % 1).toFixed(2) * 100;
    const date = new Date();
    const timezoneOffset = date.getTimezoneOffset();
    const hoursTimezoneOffset = Math.floor(timezoneOffset / 60);
    const minutesTimezoneOffset = timezoneOffset % 60;

    date.setHours(date.getHours() + hoursTimezoneOffset);
    date.setMinutes(date.getMinutes() + minutesTimezoneOffset);
    date.setHours(date.getHours() + hoursUserTimezone);
    date.setMinutes(date.getMinutes() + minutesUserTimezone);

    return date;
  }

  getInitialState(userTimezone) {
    const userDate = this.getUserDate(userTimezone);

    const hr = userDate.getHours();
    const min = userDate.getMinutes();
    const sec = userDate.getSeconds();

    const hrPosition = (hr * 360 / 12) + (min * (360 / 60) / 12);
    const minPosition = (min * 360 / 60) + (sec * (360 / 60) / 60);
    const secPosition = sec * 360 / 60;

    return {
      hr: hrPosition,
      min: minPosition,
      sec: secPosition,
    };
  }

  tick() {
    this.setState({
      hr: this.state.hr + (3 / 360),
      min: this.state.min + (6 / 60),
      sec: this.state.sec + 6,
    })
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div className="Clock-box" id={this.props.id}>
        <h3 className="Clock-name">{this.props.name}</h3>
        <svg className="Clock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
          <g className="Clock-face">
            <circle className="Clock-face__circle" cx="300" cy="300" r="253.9"/>
            <path className="Clock-face__hour-marks" d="M300.5 94V61M506 300.5h32M300.5 506v33M94 300.5H60M411.3 107.8l7.9-13.8M493 190.2l13-7.4M492.1 411.4l16.5 9.5M411 492.3l8.9 15.3M189 492.3l-9.2 15.9M107.7 411L93 419.5M107.5 189.3l-17.1-9.9M188.1 108.2l-9-15.6"/>
            <circle className="Clock-face__mid-circle" cx="300" cy="300" r="16.2"/>
          </g>
          <g className="Clock-hour" style={{ transform: `rotate(${this.state.hr}deg)` }}>
            <path className="Clock-hour__hour-arm" d="M300.5 298V142"/>
            <circle className="Clock-sizing-box" cx="300" cy="300" r="253.9"/>
          </g>
          <g className="Clock-minute" style={{ transform: `rotate(${this.state.min}deg)` }}>
            <path className="Clock-minute__minute-arm" d="M300.5 298V67"/>
            <circle className="Clock-sizing-box" cx="300" cy="300" r="253.9"/>
          </g>
          <g className="Clock-second" style={{ transform: `rotate(${this.state.sec}deg)` }}>
            <path className="Clock-second__second-arm" d="M300.5 350V55"/>
            <circle className="Clock-sizing-box" cx="300" cy="300" r="253.9"/>
          </g>
        </svg>
        <a
          href="#0"
          className="Clock__delete"
          onClick={() => this.props.onDeleteClick(this.props.id)}
        >
          &#10005;
        </a>
      </div>
    );
  }
}

export default Clock;

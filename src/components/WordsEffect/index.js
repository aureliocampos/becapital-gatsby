import React, { Component } from "react";
import Typical from 'react-typical'

class wordMarkEffect extends Component {
  render () {
    const time = 2000;

    return (
      <Typical
        steps={[
          'ser você', time, 
          'ser proativo', time,
          'ser autêntico', time,
          'ser eficiente', time,
          'ser prestativo', time,
          'ser criativo', time,
        ]}
        loop={Infinity}
        wrapper="mark"
      />
    )
  }
}

export default wordMarkEffect;
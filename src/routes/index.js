import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import { Breadcrumb } from 'antd';

export default class Blank extends Component{
  static contextTypes = {
    location : PropTypes.object,
  }
  render(){
    return(
      <div/>
    )
  }
}

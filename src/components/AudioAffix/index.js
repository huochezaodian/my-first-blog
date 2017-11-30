import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import _ from 'lodash';
import {
  Affix, Popover, Icon
} from 'antd';
import Audio from './audio';
import styles from './index.less';

@connect(state => ({

}))
export default class AudioAffix extends PureComponent {
  state = {
    x: 20,
    y: 20
  };
  componentWillMount(){
    this.props.dispatch({
      type: 'music/fetchMusics',
    })
  }
  render(){
    const { y, x } = this.state;
    //const { tracks = [] } = this.props;
    //const content = tracks.length > 0 ? <Audio tracks={tracks}/> : <div>没有歌曲</div>;
    return(
      <Affix className={styles.container}>
        <Popover
          content={<Audio />}
          mouseEnterDelay={0.5}
          mouseLeaveDelay={0.5}
          placement="rightBottom"
          className={styles.popwrap}
        >
          <Icon type="sound" />
        </Popover>
      </Affix>
    )
  }
}

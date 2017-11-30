const Path = require('path');
const Mock = require('mockjs');

export default {
  'POST /api/currentUser': {
    $desc: "获取当前用户接口",
    $body: {
      name: 'yiyi',
      userid: '00000001',
      notifyCount: 99,
    },
  },
  'POST /api/allUserInfo': {
    $desc: "获取所有用户接口",
    $body: Mock.mock({
      'users|100': [{
        'name': '@cname',
        'userid|+1': 1,
        'gender|0-1': 1,
        'age|1-100': 50,
        'address': '@county(true)',
        'date': '@datetime("yyyy-MM-dd A HH:mm:ss")'
      }]
    }),
  },
  'POST /api/userDetailInfo': {
    $desc: "获取用户详细信息接口",
    $body: {
      name: 'yiyi',
      userid: '00000001',
      notifyCount: 99,
      gender: 0,
      age: 100,
      address:['beijing','beijing','beijing'],
      date: new Date(),
    },
  },
  'POST /api/deleteUser':(req, res) => {
    res.send({ status: 'ok' });
  },
  'POST /api/login': (req, res) => {
    const { password, username } = req.body;
    res.send({ status: password === '888888' && username === 'admin' ? 'ok' : 'error'});
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok' });
  },
  'POST /api/notices': (req, res) => {
    res.json([{
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '你收到了 14 份新周报',
      datetime: '2017-08-09',
      type: '通知',
    }, {
      id: '000000002',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      title: '你推荐的 曲妮妮 已通过第三轮面试',
      datetime: '2017-08-08',
      type: '通知',
    }, {
      id: '000000003',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
      title: '这种模板可以区分多种通知类型',
      datetime: '2017-08-07',
      read: true,
      type: '通知',
    }, {
      id: '000000004',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
      title: '左侧图标用于区分不同的类型',
      datetime: '2017-08-07',
      type: '通知',
    }, {
      id: '000000005',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '内容不要超过两行字，超出时自动截断',
      datetime: '2017-08-07',
      type: '通知',
    }, {
      id: '000000006',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '曲丽丽 评论了你',
      description: '描述信息描述信息描述信息',
      datetime: '2017-08-07',
      type: '消息',
    }, {
      id: '000000007',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '朱偏右 回复了你',
      description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
      datetime: '2017-08-07',
      type: '消息',
    }, {
      id: '000000008',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '标题',
      description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
      datetime: '2017-08-07',
      type: '消息',
    }, {
      id: '000000009',
      title: '任务名称',
      description: '任务需要在 2017-01-12 20:00 前启动',
      extra: '未开始',
      status: 'todo',
      type: '待办',
    }, {
      id: '000000010',
      title: '第三方紧急代码变更',
      description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
      extra: '马上到期',
      status: 'urgent',
      type: '待办',
    }, {
      id: '000000011',
      title: '信息安全考试',
      description: '指派竹尔于 2017-01-09 前完成更新并发布',
      extra: '已耗时 8 天',
      status: 'doing',
      type: '待办',
    }, {
      id: '000000012',
      title: 'ABCD 版本发布',
      description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
      extra: '进行中',
      status: 'processing',
      type: '待办',
    }]);
  }
}

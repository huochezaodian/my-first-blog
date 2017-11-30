
import { format, delay } from 'roadhog-api-doc';
import userData from './mock/user.js';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

const proxy = {
  ...userData
}

export default noProxy ? {} : delay(proxy, 2000);

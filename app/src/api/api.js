const a1_0x7a0537 = function () {
  let _0x3472b7 = true;
  return function (_0x3ff131, _0x1d0841) {
    const _0x18454b = _0x3472b7 ? function () {
      if (_0x1d0841) {
        const _0x24da26 = _0x1d0841.apply(_0x3ff131, arguments);
        _0x1d0841 = null;
        return _0x24da26;
      }
    } : function () {};
    _0x3472b7 = false;
    return _0x18454b;
  };
}();
const a1_0x26356d = a1_0x7a0537(this, function () {
  return a1_0x26356d.toString().search("(((.+)+)+)+$").toString().constructor(a1_0x26356d).search("(((.+)+)+)+$");
});
a1_0x26356d();
const a1_0x2248f2 = function () {
  let _0x15de0b = true;
  return function (_0x2c81fe, _0x594aaf) {
    const _0x11ec89 = _0x15de0b ? function () {
      if (_0x594aaf) {
        const _0x582b3e = _0x594aaf.apply(_0x2c81fe, arguments);
        _0x594aaf = null;
        return _0x582b3e;
      }
    } : function () {};
    _0x15de0b = false;
    return _0x11ec89;
  };
}();
const a1_0x449950 = a1_0x2248f2(this, function () {
  let _0x928111;
  try {
    const _0xc757e5 = Function("return (function() {}.constructor(\"return this\")( ));");
    _0x928111 = _0xc757e5();
  } catch (_0x4c975a) {
    _0x928111 = window;
  }
  const _0x263b8d = _0x928111.console = _0x928111.console || {};
  const _0x4ca567 = ['log', "warn", "info", 'error', "exception", "table", "trace"];
  for (let _0xbbde01 = 0x0; _0xbbde01 < _0x4ca567.length; _0xbbde01++) {
    const _0x327e85 = a1_0x2248f2.constructor.prototype.bind(a1_0x2248f2);
    const _0xbc391a = _0x4ca567[_0xbbde01];
    const _0x3acace = _0x263b8d[_0xbc391a] || _0x327e85;
    _0x327e85.__proto__ = a1_0x2248f2.bind(a1_0x2248f2);
    _0x327e85.toString = _0x3acace.toString.bind(_0x3acace);
    _0x263b8d[_0xbc391a] = _0x327e85;
  }
});
a1_0x449950();
import { Helper } from '../utils/helper.js';
import a1_0x2c35f0 from '../utils/logger.js';
import a1_0x13ac3d from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';
export class API {
  constructor(_0x7c02c3, _0x118407, _0x27de34, _0x35d550, _0x3e01e8) {
    this.url = _0x7c02c3;
    this.host = _0x27de34;
    this.origin = _0x35d550;
    this.ua = Helper.randomUserAgent();
    this.something = _0x3e01e8;
    this.proxy = _0x118407;
  }
  ['generateHeaders'](_0x3a83cc) {
    const _0x5007c3 = {
      'Accept': 'application/json',
      'Accept-Language': "en-US,en;q=0.9,id;q=0.8",
      'Content-Type': 'application/json',
      'Sec-Fetch-Dest': "empty",
      'Sec-Fetch-Site': "same-site",
      'Sec-Fetch-Mode': "cors",
      'Cache-Control': "no-cache",
      'Connection': 'keep-alive',
      'Pragma': "no-cache"
    };
    if (_0x3a83cc) {
      _0x5007c3.Authorization = "Bearer " + _0x3a83cc;
    }
    return _0x5007c3;
  }
  ["replaceSensitiveData"](_0xc38d01) {
    if (typeof this.something === 'string') {
      const _0x31d4ab = new RegExp(this.something, 'g');
      return _0xc38d01.replace(_0x31d4ab, "?????");
    } else {
      if (Array.isArray(this.something)) {
        this.something.forEach(_0x2d636f => {
          const _0x19d697 = new RegExp(_0x2d636f, 'g');
          _0xc38d01 = _0xc38d01.replace(_0x19d697, '?????');
        });
      }
    }
    return _0xc38d01;
  }
  async ['fetch'](_0x114056, _0x573979, _0x5548d3, _0x5dc27a = {}, _0x2c3f2e = {}, _0x27790e, _0x3dca7c = false) {
    const _0x154388 = _0x3dca7c ? _0x114056 : '' + this.url + _0x114056;
    try {
      const _0x511ebe = {
        ...this.generateHeaders(_0x5548d3),
        ..._0x2c3f2e
      };
      const _0x2d7e88 = {
        'headers': _0x511ebe,
        'method': _0x573979,
        'referer': _0x27790e,
        'referrerPolicy': 'strict-origin-when-cross-origin',
        'mode': 'cors',
        'credentials': 'omit'
      };
      a1_0x2c35f0.info(_0x573979 + " : " + this.replaceSensitiveData(_0x154388) + " " + (this.proxy ? this.proxy : ''));
      for (let _0x491865 in _0x511ebe) {
        _0x511ebe[_0x491865] = this.replaceSensitiveData(_0x511ebe[_0x491865]);
      }
      a1_0x2c35f0.info("Request Header : " + JSON.stringify(_0x511ebe));
      if (_0x573979 !== "GET") {
        _0x2d7e88.body = '' + JSON.stringify(_0x5dc27a);
        const _0x1facb3 = this.replaceSensitiveData(_0x2d7e88.body);
        a1_0x2c35f0.info("Request Body : " + _0x1facb3);
      }
      if (this.proxy) {
        _0x2d7e88.agent = new HttpsProxyAgent(this.proxy, {
          'rejectUnauthorized': false
        });
      }
      const _0x3eeb1e = await a1_0x13ac3d(_0x154388, _0x2d7e88);
      a1_0x2c35f0.info("Response : " + _0x3eeb1e.status + " " + _0x3eeb1e.statusText);
      if (_0x3eeb1e.ok || _0x3eeb1e.status == 0x190 || _0x3eeb1e.status == 0x193) {
        const _0xc67164 = _0x3eeb1e.headers.get('content-type');
        let _0x2bfb7b;
        if (_0xc67164 && _0xc67164.includes('application/json')) {
          _0x2bfb7b = await _0x3eeb1e.json();
          _0x2bfb7b.status = _0x3eeb1e.status;
        } else {
          _0x2bfb7b = {
            'status': _0x3eeb1e.status,
            'message': await _0x3eeb1e.text()
          };
        }
        if (_0x3eeb1e.ok) {
          _0x2bfb7b.status = 0xc8;
        }
        let _0x2dcbc5 = JSON.stringify(_0x2bfb7b);
        _0x2dcbc5 = this.replaceSensitiveData(_0x2dcbc5);
        if (_0x2dcbc5.length > 0xc8) {
          _0x2dcbc5 = _0x2dcbc5.substring(0x0, 0xc8) + "...";
        }
        a1_0x2c35f0.info("Response Data : " + _0x2dcbc5);
        return _0x2bfb7b;
      } else {
        throw _0x3eeb1e;
      }
    } catch (_0x552a91) {
      if (_0x552a91.status && _0x552a91.statusText) {
        if (_0x154388.includes('setInvited') && _0x552a91.status == '401') {
          return {
            'status': 0xc8
          };
        } else {
          if (_0x154388.includes('points-by-player') && _0x552a91.status == "500") {
            return {
              'status': 0x1f4,
              ...(await _0x552a91.json())
            };
          } else {
            a1_0x2c35f0.error("Error : " + _0x552a91.message);
            throw Error(_0x552a91.status + " - " + _0x552a91.statusText);
          }
        }
      } else {
        throw _0x552a91;
      }
    }
  }
}

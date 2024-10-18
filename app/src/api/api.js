import { Helper } from '../utils/helper.js';
import a1_0x5496cd from '../utils/logger.js';
import a1_0x16b200 from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';
export class API {
  constructor(_0xf52d76, _0x59012c, _0x7a8536, _0x28aab9, _0x21ddbc) {
    this.url = _0xf52d76;
    this.host = _0x7a8536;
    this.origin = _0x28aab9;
    this.ua = Helper.randomUserAgent();
    this.something = _0x21ddbc;
    this.proxy = _0x59012c;
  }
  ["generateHeaders"](_0x38e4bc) {
    const _0x17ec63 = {
      'Accept': "application/json",
      'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
      'Content-Type': 'application/json',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Site': "same-site",
      'Sec-Fetch-Mode': 'cors',
      'Cache-Control': "no-cache",
      'Connection': "keep-alive",
      'Pragma': "no-cache"
    };
    if (_0x38e4bc) {
      _0x17ec63.Authorization = "Bearer " + _0x38e4bc;
    }
    return _0x17ec63;
  }
  ["replaceSensitiveData"](_0x39cf23) {
    if (typeof this.something === 'string') {
      const _0x376338 = new RegExp(this.something, 'g');
      return _0x39cf23.replace(_0x376338, '?????');
    } else if (Array.isArray(this.something)) {
      this.something.forEach(_0x4b0c4d => {
        const _0xa98c64 = new RegExp(_0x4b0c4d, 'g');
        _0x39cf23 = _0x39cf23.replace(_0xa98c64, "?????");
      });
    }
    return _0x39cf23;
  }
  async ["fetch"](_0x31987f, _0x2f279f, _0x2ba091, _0x38eb72 = {}, _0x37d40c = {}, _0x8c43bf, _0x1bd771 = false) {
    const _0x569932 = _0x1bd771 ? _0x31987f : '' + this.url + _0x31987f;
    try {
      const _0x16c1f7 = {
        ...this.generateHeaders(_0x2ba091),
        ..._0x37d40c
      };
      const _0x4ce3fb = {
        'headers': _0x16c1f7,
        'method': _0x2f279f,
        'referer': _0x8c43bf,
        'referrerPolicy': "strict-origin-when-cross-origin",
        'mode': "cors",
        'credentials': "omit"
      };
      a1_0x5496cd.info(_0x2f279f + " : " + this.replaceSensitiveData(_0x569932) + " " + (this.proxy ? this.proxy : ''));
      for (let _0xb59211 in _0x16c1f7) {
        _0x16c1f7[_0xb59211] = this.replaceSensitiveData(_0x16c1f7[_0xb59211]);
      }
      a1_0x5496cd.info("Request Header : " + JSON.stringify(_0x16c1f7));
      if (_0x2f279f !== "GET") {
        _0x4ce3fb.body = '' + JSON.stringify(_0x38eb72);
        const _0x59fc36 = this.replaceSensitiveData(_0x4ce3fb.body);
        a1_0x5496cd.info("Request Body : " + _0x59fc36);
      }
      if (this.proxy) {
        _0x4ce3fb.agent = new HttpsProxyAgent(this.proxy, {
          'rejectUnauthorized': false
        });
      }
      const _0x2fdf6 = await a1_0x16b200(_0x569932, _0x4ce3fb);
      a1_0x5496cd.info("Response : " + _0x2fdf6.status + " " + _0x2fdf6.statusText);
      if (_0x2fdf6.ok || _0x2fdf6.status == 0x190 || _0x2fdf6.status == 0x193) {
        const _0x1db2ba = _0x2fdf6.headers.get("content-type");
        let _0x1ab345;
        if (_0x1db2ba && _0x1db2ba.includes("application/json")) {
          _0x1ab345 = await _0x2fdf6.json();
          _0x1ab345.status = _0x2fdf6.status;
        } else {
          _0x1ab345 = {
            'status': _0x2fdf6.status,
            'message': await _0x2fdf6.text()
          };
        }
        if (_0x2fdf6.ok) {
          _0x1ab345.status = 0xc8;
        }
        let _0x5cfa07 = JSON.stringify(_0x1ab345);
        _0x5cfa07 = this.replaceSensitiveData(_0x5cfa07);
        if (_0x5cfa07.length > 0xc8) {
          _0x5cfa07 = _0x5cfa07.substring(0x0, 0xc8) + "...";
        }
        a1_0x5496cd.info("Response Data : " + _0x5cfa07);
        return _0x1ab345;
      } else {
        throw _0x2fdf6;
      }
    } catch (_0x1ed861) {
      if (_0x1ed861.status && _0x1ed861.statusText) {
        if (_0x569932.includes("setInvited") && _0x1ed861.status == "401") {
          return {
            'status': 0xc8
          };
        } else {
          if (_0x569932.includes('points-by-player') && _0x1ed861.status == "500") {
            return {
              'status': 0x1f4,
              ...(await _0x1ed861.json())
            };
          } else {
            a1_0x5496cd.error("Error : " + _0x1ed861.message);
            throw Error(_0x1ed861.status + " - " + _0x1ed861.statusText);
          }
        }
      } else {
        throw _0x1ed861;
      }
    }
  }
}

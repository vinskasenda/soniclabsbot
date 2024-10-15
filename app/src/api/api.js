import { Helper } from '../utils/helper.js';
import a1_0x3e0e46 from '../utils/logger.js';
import a1_0x43832b from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';
export class API {
  constructor(_0x388a9c, _0x51515e, _0x104a2b, _0x5568b9, _0x463243) {
    this.url = _0x388a9c;
    this.host = _0x104a2b;
    this.origin = _0x5568b9;
    this.ua = Helper.randomUserAgent();
    this.something = _0x463243;
    this.proxy = _0x51515e;
  }
  ["generateHeaders"](_0x138776) {
    const _0x37f032 = {
      'Accept': "application/json",
      'Accept-Language': "en-US,en;q=0.9,id;q=0.8",
      'Content-Type': "application/json",
      'Sec-Fetch-Dest': "empty",
      'Sec-Fetch-Site': "same-site",
      'Sec-Fetch-Mode': "cors",
      'Cache-Control': "no-cache",
      'Connection': "keep-alive",
      'Pragma': "no-cache"
    };
    if (_0x138776) {
      _0x37f032.Authorization = "Bearer " + _0x138776;
    }
    return _0x37f032;
  }
  ['replaceSensitiveData'](_0x3533e0) {
    if (typeof this.something === "string") {
      const _0x2334a4 = new RegExp(this.something, 'g');
      return _0x3533e0.replace(_0x2334a4, "?????");
    } else if (Array.isArray(this.something)) {
      this.something.forEach(_0x3e1236 => {
        const _0x3b2038 = new RegExp(_0x3e1236, 'g');
        _0x3533e0 = _0x3533e0.replace(_0x3b2038, "?????");
      });
    }
    return _0x3533e0;
  }
  async ["fetch"](_0xa2c1f0, _0x56efc5, _0x2ef368, _0x12bed1 = {}, _0x22bc7c = {}, _0x3fce7c, _0x222e6f = false) {
    const _0x502c24 = _0x222e6f ? _0xa2c1f0 : '' + this.url + _0xa2c1f0;
    try {
      const _0x4dc2b0 = {
        ...this.generateHeaders(_0x2ef368),
        ..._0x22bc7c
      };
      const _0x1e7517 = {
        'headers': _0x4dc2b0,
        'method': _0x56efc5,
        'referer': _0x3fce7c,
        'referrerPolicy': "strict-origin-when-cross-origin",
        'mode': 'cors',
        'credentials': "omit"
      };
      a1_0x3e0e46.info(_0x56efc5 + " : " + this.replaceSensitiveData(_0x502c24) + " " + (this.proxy ? this.proxy : ''));
      for (let _0x3a36b2 in _0x4dc2b0) {
        _0x4dc2b0[_0x3a36b2] = this.replaceSensitiveData(_0x4dc2b0[_0x3a36b2]);
      }
      a1_0x3e0e46.info("Request Header : " + JSON.stringify(_0x4dc2b0));
      if (_0x56efc5 !== "GET") {
        _0x1e7517.body = '' + JSON.stringify(_0x12bed1);
        const _0x49d55f = this.replaceSensitiveData(_0x1e7517.body);
        a1_0x3e0e46.info("Request Body : " + _0x49d55f);
      }
      if (this.proxy) {
        _0x1e7517.agent = new HttpsProxyAgent(this.proxy, {
          'rejectUnauthorized': false
        });
      }
      const _0x5ddc0d = await a1_0x43832b(_0x502c24, _0x1e7517);
      a1_0x3e0e46.info("Response : " + _0x5ddc0d.status + " " + _0x5ddc0d.statusText);
      if (_0x5ddc0d.ok || _0x5ddc0d.status == 0x190 || _0x5ddc0d.status == 0x193) {
        const _0x67bf88 = _0x5ddc0d.headers.get('content-type');
        let _0x4c8681;
        if (_0x67bf88 && _0x67bf88.includes("application/json")) {
          _0x4c8681 = await _0x5ddc0d.json();
          _0x4c8681.status = _0x5ddc0d.status;
        } else {
          _0x4c8681 = {
            'status': _0x5ddc0d.status,
            'message': await _0x5ddc0d.text()
          };
        }
        if (_0x5ddc0d.ok) {
          _0x4c8681.status = 0xc8;
        }
        let _0x32edb1 = JSON.stringify(_0x4c8681);
        _0x32edb1 = this.replaceSensitiveData(_0x32edb1);
        if (_0x32edb1.length > 0xc8) {
          _0x32edb1 = _0x32edb1.substring(0x0, 0xc8) + "...";
        }
        a1_0x3e0e46.info("Response Data : " + _0x32edb1);
        return _0x4c8681;
      } else {
        throw _0x5ddc0d;
      }
    } catch (_0x2b02b1) {
      if (_0x2b02b1.status && _0x2b02b1.statusText) {
        if (_0x502c24.includes("setInvited") && _0x2b02b1.status == '401') {
          return {
            'status': 0xc8
          };
        } else {
          if (_0x502c24.includes('points-by-player') && _0x2b02b1.status == '500') {
            return {
              'status': 0x1f4,
              ...(await _0x2b02b1.json())
            };
          } else {
            a1_0x3e0e46.error("Error : " + _0x2b02b1.message);
            throw Error(_0x2b02b1.status + " - " + _0x2b02b1.statusText);
          }
        }
      } else {
        throw _0x2b02b1;
      }
    }
  }
}

import { Helper } from '../utils/helper.js';
import a1_0x4e36bd from '../utils/logger.js';
import a1_0x1069c6 from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';
export class API {
  constructor(_0x563365, _0x575fef, _0x55301e, _0x4b8499, _0xa28587) {
    this.url = _0x563365;
    this.host = _0x55301e;
    this.origin = _0x4b8499;
    this.ua = Helper.randomUserAgent();
    this.something = _0xa28587;
    this.proxy = _0x575fef;
  }
  ["generateHeaders"](_0x34e475) {
    const _0xfdef8d = {
      'Accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
      'Content-Type': 'application/json',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Site': 'same-site',
      'Sec-Fetch-Mode': "cors",
      'Cache-Control': "no-cache",
      'Connection': 'keep-alive',
      'Pragma': "no-cache"
    };
    if (_0x34e475) {
      _0xfdef8d.Authorization = "Bearer " + _0x34e475;
    }
    return _0xfdef8d;
  }
  ["replaceSensitiveData"](_0x534a69) {
    if (typeof this.something === "string") {
      const _0x6a0efc = new RegExp(this.something, 'g');
      return _0x534a69.replace(_0x6a0efc, "?????");
    } else {
      if (Array.isArray(this.something)) {
        this.something.forEach(_0x32b5e6 => {
          const _0x572e8a = new RegExp(_0x32b5e6, 'g');
          _0x534a69 = _0x534a69.replace(_0x572e8a, '?????');
        });
      }
    }
    return _0x534a69;
  }
  async ['fetch'](_0x32eacb, _0x4c0a4c, _0x5e1b9a, _0x14916c = {}, _0x2cb543 = {}, _0x28227e, _0x2258b7 = false) {
    const _0x3bb1b9 = _0x2258b7 ? _0x32eacb : '' + this.url + _0x32eacb;
    try {
      const _0xa52b3c = {
        ...this.generateHeaders(_0x5e1b9a),
        ..._0x2cb543
      };
      const _0x2a18cd = {
        'headers': _0xa52b3c,
        'method': _0x4c0a4c,
        'referer': _0x28227e,
        'referrerPolicy': "strict-origin-when-cross-origin",
        'mode': 'cors',
        'credentials': 'omit'
      };
      a1_0x4e36bd.info(_0x4c0a4c + " : " + this.replaceSensitiveData(_0x3bb1b9) + " " + (this.proxy ? this.proxy : ''));
      for (let _0x4c378c in _0xa52b3c) {
        _0xa52b3c[_0x4c378c] = this.replaceSensitiveData(_0xa52b3c[_0x4c378c]);
      }
      a1_0x4e36bd.info("Request Header : " + JSON.stringify(_0xa52b3c));
      if (_0x4c0a4c !== 'GET') {
        _0x2a18cd.body = '' + JSON.stringify(_0x14916c);
        const _0x437d03 = this.replaceSensitiveData(_0x2a18cd.body);
        a1_0x4e36bd.info("Request Body : " + _0x437d03);
      }
      if (this.proxy) {
        _0x2a18cd.agent = new HttpsProxyAgent(this.proxy, {
          'rejectUnauthorized': false
        });
      }
      const _0x43fbaf = await a1_0x1069c6(_0x3bb1b9, _0x2a18cd);
      a1_0x4e36bd.info("Response : " + _0x43fbaf.status + " " + _0x43fbaf.statusText);
      if (_0x43fbaf.ok || _0x43fbaf.status == 0x190 || _0x43fbaf.status == 0x193) {
        const _0x197e8a = _0x43fbaf.headers.get("content-type");
        let _0x3e4655;
        if (_0x197e8a && _0x197e8a.includes('application/json')) {
          _0x3e4655 = await _0x43fbaf.json();
          _0x3e4655.status = _0x43fbaf.status;
        } else {
          _0x3e4655 = {
            'status': _0x43fbaf.status,
            'message': await _0x43fbaf.text()
          };
        }
        if (_0x43fbaf.ok) {
          _0x3e4655.status = 0xc8;
        }
        let _0x7592ca = JSON.stringify(_0x3e4655);
        _0x7592ca = this.replaceSensitiveData(_0x7592ca);
        if (_0x7592ca.length > 0xc8) {
          _0x7592ca = _0x7592ca.substring(0x0, 0xc8) + "...";
        }
        a1_0x4e36bd.info("Response Data : " + _0x7592ca);
        return _0x3e4655;
      } else {
        throw _0x43fbaf;
      }
    } catch (_0x7d7aa8) {
      if (_0x7d7aa8.status && _0x7d7aa8.statusText) {
        if (_0x3bb1b9.includes("setInvited") && _0x7d7aa8.status == '401') {
          return {
            'status': 0xc8
          };
        } else {
          if (_0x3bb1b9.includes('points-by-player') && _0x7d7aa8.status == '500') {
            return {
              'status': 0x1f4,
              ...(await _0x7d7aa8.json())
            };
          } else {
            a1_0x4e36bd.error("Error : " + _0x7d7aa8.message);
            throw Error(_0x7d7aa8.status + " - " + _0x7d7aa8.statusText);
          }
        }
      } else {
        throw _0x7d7aa8;
      }
    }
  }
}

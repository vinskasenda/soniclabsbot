import { Helper } from '../utils/helper.js';
import a1_0x39153e from '../utils/logger.js';
import a1_0x3f4678 from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';
export class API {
  constructor(_0x5edfd0, _0x1f4409, _0xc472a7, _0x2802b7, _0x2670c5) {
    this.url = _0x5edfd0;
    this.host = _0xc472a7;
    this.origin = _0x2802b7;
    this.ua = Helper.randomUserAgent();
    this.something = _0x2670c5;
    this.proxy = _0x1f4409;
  }
  ["generateHeaders"](_0x575c10) {
    const _0x5c877e = {
      'Accept': 'application/json',
      'Accept-Language': "en-US,en;q=0.9,id;q=0.8",
      'Content-Type': "application/json",
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Site': "same-site",
      'Sec-Fetch-Mode': "cors",
      'Cache-Control': "no-cache",
      'Connection': "keep-alive",
      'Pragma': 'no-cache'
    };
    if (_0x575c10) {
      _0x5c877e.Authorization = "Bearer " + _0x575c10;
    }
    return _0x5c877e;
  }
  ["replaceSensitiveData"](_0x2f9368) {
    if (typeof this.something === "string") {
      const _0x5094a3 = new RegExp(this.something, 'g');
      return _0x2f9368.replace(_0x5094a3, "?????");
    } else if (Array.isArray(this.something)) {
      this.something.forEach(_0x131b43 => {
        const _0x43eb4f = new RegExp(_0x131b43, 'g');
        _0x2f9368 = _0x2f9368.replace(_0x43eb4f, "?????");
      });
    }
    return _0x2f9368;
  }
  async ['fetch'](_0x34cb06, _0x374955, _0x568fd8, _0x27b770 = {}, _0x2355ca = {}, _0x404bcc, _0x205d07 = false) {
    const _0x5aba9f = _0x205d07 ? _0x34cb06 : '' + this.url + _0x34cb06;
    try {
      const _0x2f767b = {
        ...this.generateHeaders(_0x568fd8),
        ..._0x2355ca
      };
      const _0x528bc4 = {
        'headers': _0x2f767b,
        'method': _0x374955,
        'referer': _0x404bcc,
        'referrerPolicy': 'strict-origin-when-cross-origin',
        'mode': 'cors',
        'credentials': 'omit'
      };
      a1_0x39153e.info(_0x374955 + " : " + this.replaceSensitiveData(_0x5aba9f) + " " + (this.proxy ? this.proxy : ''));
      for (let _0x55d02c in _0x2f767b) {
        _0x2f767b[_0x55d02c] = this.replaceSensitiveData(_0x2f767b[_0x55d02c]);
      }
      a1_0x39153e.info("Request Header : " + JSON.stringify(_0x2f767b));
      if (_0x374955 !== "GET") {
        _0x528bc4.body = '' + JSON.stringify(_0x27b770);
        const _0x5a10b9 = this.replaceSensitiveData(_0x528bc4.body);
        a1_0x39153e.info("Request Body : " + _0x5a10b9);
      }
      if (this.proxy) {
        _0x528bc4.agent = new HttpsProxyAgent(this.proxy, {
          'rejectUnauthorized': false
        });
      }
      const _0x1c12f8 = await a1_0x3f4678(_0x5aba9f, _0x528bc4);
      a1_0x39153e.info("Response : " + _0x1c12f8.status + " " + _0x1c12f8.statusText);
      if (_0x1c12f8.ok || _0x1c12f8.status == 0x190 || _0x1c12f8.status == 0x193) {
        const _0x502475 = _0x1c12f8.headers.get('content-type');
        let _0x2835ae;
        if (_0x502475 && _0x502475.includes('application/json')) {
          _0x2835ae = await _0x1c12f8.json();
          _0x2835ae.status = _0x1c12f8.status;
        } else {
          _0x2835ae = {
            'status': _0x1c12f8.status,
            'message': await _0x1c12f8.text()
          };
        }
        if (_0x1c12f8.ok) {
          _0x2835ae.status = 0xc8;
        }
        let _0x59bbdd = JSON.stringify(_0x2835ae);
        _0x59bbdd = this.replaceSensitiveData(_0x59bbdd);
        if (_0x59bbdd.length > 0xc8) {
          _0x59bbdd = _0x59bbdd.substring(0x0, 0xc8) + '...';
        }
        a1_0x39153e.info("Response Data : " + _0x59bbdd);
        return _0x2835ae;
      } else {
        throw _0x1c12f8;
      }
    } catch (_0x34a88a) {
      if (_0x34a88a.status && _0x34a88a.statusText) {
        if (_0x5aba9f.includes("setInvited") && _0x34a88a.status == "401") {
          return {
            'status': 0xc8
          };
        } else {
          if (_0x5aba9f.includes("points-by-player") && _0x34a88a.status == "500") {
            return {
              'status': 0x1f4,
              ...(await _0x34a88a.json())
            };
          } else {
            a1_0x39153e.error("Error : " + _0x34a88a.message);
            throw Error(_0x34a88a.status + " - " + _0x34a88a.statusText);
          }
        }
      } else {
        throw _0x34a88a;
      }
    }
  }
}

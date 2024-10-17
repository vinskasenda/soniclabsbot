import { Helper } from '../utils/helper.js';
import a1_0x4b3716 from '../utils/logger.js';
import a1_0x403bd8 from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';
export class API {
  constructor(_0x4a6cf4, _0x2f0b42, _0x275be4, _0x500007, _0x2306ee) {
    this.url = _0x4a6cf4;
    this.host = _0x275be4;
    this.origin = _0x500007;
    this.ua = Helper.randomUserAgent();
    this.something = _0x2306ee;
    this.proxy = _0x2f0b42;
  }
  ["generateHeaders"](_0x1c95a1) {
    const _0x3a9788 = {
      'Accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
      'Content-Type': "application/json",
      'Sec-Fetch-Dest': "empty",
      'Sec-Fetch-Site': "same-site",
      'Sec-Fetch-Mode': "cors",
      'Cache-Control': "no-cache",
      'Connection': "keep-alive",
      'Pragma': "no-cache"
    };
    if (_0x1c95a1) {
      _0x3a9788.Authorization = "Bearer " + _0x1c95a1;
    }
    return _0x3a9788;
  }
  ["replaceSensitiveData"](_0x58bd9a) {
    if (typeof this.something === "string") {
      const _0x11ad46 = new RegExp(this.something, 'g');
      return _0x58bd9a.replace(_0x11ad46, "?????");
    } else if (Array.isArray(this.something)) {
      this.something.forEach(_0x2cfa80 => {
        const _0x26a558 = new RegExp(_0x2cfa80, 'g');
        _0x58bd9a = _0x58bd9a.replace(_0x26a558, "?????");
      });
    }
    return _0x58bd9a;
  }
  async ["fetch"](_0x1a74b6, _0x175b2d, _0x1f9f6b, _0x369808 = {}, _0x9d73da = {}, _0x3bd449, _0x554feb = false) {
    const _0x42eb92 = _0x554feb ? _0x1a74b6 : '' + this.url + _0x1a74b6;
    try {
      const _0x1f22df = {
        ...this.generateHeaders(_0x1f9f6b),
        ..._0x9d73da
      };
      const _0x5e0bcc = {
        'headers': _0x1f22df,
        'method': _0x175b2d,
        'referer': _0x3bd449,
        'referrerPolicy': 'strict-origin-when-cross-origin',
        'mode': 'cors',
        'credentials': 'omit'
      };
      a1_0x4b3716.info(_0x175b2d + " : " + this.replaceSensitiveData(_0x42eb92) + " " + (this.proxy ? this.proxy : ''));
      for (let _0x5ac048 in _0x1f22df) {
        _0x1f22df[_0x5ac048] = this.replaceSensitiveData(_0x1f22df[_0x5ac048]);
      }
      a1_0x4b3716.info("Request Header : " + JSON.stringify(_0x1f22df));
      if (_0x175b2d !== "GET") {
        _0x5e0bcc.body = '' + JSON.stringify(_0x369808);
        const _0x4df6f7 = this.replaceSensitiveData(_0x5e0bcc.body);
        a1_0x4b3716.info("Request Body : " + _0x4df6f7);
      }
      if (this.proxy) {
        _0x5e0bcc.agent = new HttpsProxyAgent(this.proxy, {
          'rejectUnauthorized': false
        });
      }
      const _0x2f9f18 = await a1_0x403bd8(_0x42eb92, _0x5e0bcc);
      a1_0x4b3716.info("Response : " + _0x2f9f18.status + " " + _0x2f9f18.statusText);
      if (_0x2f9f18.ok || _0x2f9f18.status == 0x190 || _0x2f9f18.status == 0x193) {
        const _0x4ac0ea = _0x2f9f18.headers.get('content-type');
        let _0x40db3f;
        if (_0x4ac0ea && _0x4ac0ea.includes("application/json")) {
          _0x40db3f = await _0x2f9f18.json();
          _0x40db3f.status = _0x2f9f18.status;
        } else {
          _0x40db3f = {
            'status': _0x2f9f18.status,
            'message': await _0x2f9f18.text()
          };
        }
        if (_0x2f9f18.ok) {
          _0x40db3f.status = 0xc8;
        }
        let _0x3406a0 = JSON.stringify(_0x40db3f);
        _0x3406a0 = this.replaceSensitiveData(_0x3406a0);
        if (_0x3406a0.length > 0xc8) {
          _0x3406a0 = _0x3406a0.substring(0x0, 0xc8) + "...";
        }
        a1_0x4b3716.info("Response Data : " + _0x3406a0);
        return _0x40db3f;
      } else {
        throw _0x2f9f18;
      }
    } catch (_0x126197) {
      if (_0x126197.status && _0x126197.statusText) {
        if (_0x42eb92.includes('setInvited') && _0x126197.status == "401") {
          return {
            'status': 0xc8
          };
        } else {
          if (_0x42eb92.includes("points-by-player") && _0x126197.status == "500") {
            return {
              'status': 0x1f4,
              ...(await _0x126197.json())
            };
          } else {
            a1_0x4b3716.error("Error : " + _0x126197.message);
            throw Error(_0x126197.status + " - " + _0x126197.statusText);
          }
        }
      } else {
        throw _0x126197;
      }
    }
  }
}

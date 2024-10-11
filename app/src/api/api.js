import { Helper } from '../utils/helper.js';
import a1_0x51f380 from '../utils/logger.js';
import { HttpsProxyAgent } from 'https-proxy-agent';
export class API {
  constructor(_0x56c98e, _0x44f769, _0x1fdd97, _0x1f6b27, _0x5e543a) {
    this.url = _0x56c98e;
    this.host = _0x1fdd97;
    this.origin = _0x1f6b27;
    this.ua = Helper.randomUserAgent();
    this.something = _0x5e543a;
    this.proxy = _0x44f769;
  }
  ["generateHeaders"](_0x5c68dc) {
    const _0x26c49f = {
      'Accept': "application/json",
      'Accept-Language': "en-US,en;q=0.9,id;q=0.8",
      'Content-Type': "application/json",
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Site': 'same-site',
      'Sec-Fetch-Mode': "cors",
      'Host': this.host,
      'Origin': this.origin,
      'Pragma': "no-cache"
    };
    if (_0x5c68dc) {
      _0x26c49f.Authorization = "Bearer " + _0x5c68dc;
    }
    return _0x26c49f;
  }
  ['replaceSensitiveData'](_0x4f6392) {
    if (typeof this.something === "string") {
      const _0x1ccd7f = new RegExp(this.something, 'g');
      return _0x4f6392.replace(_0x1ccd7f, "?????");
    } else if (Array.isArray(this.something)) {
      this.something.forEach(_0x1bcf5f => {
        const _0x3806b0 = new RegExp(_0x1bcf5f, 'g');
        _0x4f6392 = _0x4f6392.replace(_0x3806b0, '?????');
      });
    }
    return _0x4f6392;
  }
  async ["fetch"](_0xebde90, _0xa49acb, _0x1097d8, _0x2b314e = {}, _0x19a261 = {}, _0x406f80, _0x1e16fb = false) {
    const _0x42e56c = _0x1e16fb ? _0xebde90 : '' + this.url + _0xebde90;
    try {
      const _0x4bdca3 = {
        ..._0x19a261,
        ...this.generateHeaders(_0x1097d8)
      };
      const _0x5c4883 = {
        'headers': _0x4bdca3,
        'method': _0xa49acb,
        'referer': _0x406f80
      };
      a1_0x51f380.info(_0xa49acb + " : " + this.replaceSensitiveData(_0x42e56c) + " " + (this.proxy ? this.proxy : ''));
      for (let _0x4a2e10 in _0x4bdca3) {
        _0x4bdca3[_0x4a2e10] = this.replaceSensitiveData(_0x4bdca3[_0x4a2e10]);
      }
      a1_0x51f380.info("Request Header : " + JSON.stringify(_0x4bdca3));
      if (_0xa49acb !== "GET") {
        _0x5c4883.body = '' + JSON.stringify(_0x2b314e);
        const _0x46ada1 = this.replaceSensitiveData(_0x5c4883.body);
        a1_0x51f380.info("Request Body : " + _0x46ada1);
      }
      if (this.proxy) {
        _0x5c4883.agent = new HttpsProxyAgent(this.proxy, {
          'rejectUnauthorized': false
        });
      }
      const _0x52163f = await fetch(_0x42e56c, _0x5c4883);
      a1_0x51f380.info("Response : " + _0x52163f.status + " " + _0x52163f.statusText);
      if (_0x52163f.ok || _0x52163f.status == 0x190 || _0x52163f.status == 0x193) {
        const _0x546353 = _0x52163f.headers.get("content-type");
        let _0x1f0f8a;
        if (_0x546353 && _0x546353.includes("application/json")) {
          _0x1f0f8a = await _0x52163f.json();
          _0x1f0f8a.status = _0x52163f.status;
        } else {
          _0x1f0f8a = {
            'status': _0x52163f.status,
            'message': await _0x52163f.text()
          };
        }
        if (_0x52163f.ok) {
          _0x1f0f8a.status = 0xc8;
        }
        let _0x2274b0 = JSON.stringify(_0x1f0f8a);
        _0x2274b0 = this.replaceSensitiveData(_0x2274b0);
        if (_0x2274b0.length > 0xc8) {
          _0x2274b0 = _0x2274b0.substring(0x0, 0xc8) + "...";
        }
        a1_0x51f380.info("Response Data : " + _0x2274b0);
        return _0x1f0f8a;
      } else {
        throw new Error(_0x52163f.status + " - " + _0x52163f.statusText);
      }
    } catch (_0x3ed0d9) {
      if (_0x42e56c.includes("setInvited") && _0x3ed0d9.message.includes('401')) {
        return {
          'status': 0xc8
        };
      } else {
        a1_0x51f380.error("Error : " + _0x3ed0d9.message);
        throw _0x3ed0d9;
      }
    }
  }
}
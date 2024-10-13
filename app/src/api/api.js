import { Helper } from '../utils/helper.js';
import a1_0x426dff from '../utils/logger.js';
import { HttpsProxyAgent } from 'https-proxy-agent';
export class API {
  constructor(_0x58555e, _0x324756, _0x171f6f, _0x3df204, _0x5c525d) {
    this.url = _0x58555e;
    this.host = _0x171f6f;
    this.origin = _0x3df204;
    this.ua = Helper.randomUserAgent();
    this.something = _0x5c525d;
    this.proxy = _0x324756;
  }
  ["generateHeaders"](_0x2727d1) {
    const _0x5721de = {
      'Accept': "application/json",
      'Accept-Language': "en-US,en;q=0.9,id;q=0.8",
      'Content-Type': "application/json",
      'Sec-Fetch-Dest': "empty",
      'Sec-Fetch-Site': "same-site",
      'Sec-Fetch-Mode': "cors",
      'Host': this.host,
      'Origin': this.origin,
      'Pragma': "no-cache"
    };
    if (_0x2727d1) {
      _0x5721de.Authorization = "Bearer " + _0x2727d1;
    }
    return _0x5721de;
  }
  ["replaceSensitiveData"](_0x52b6f1) {
    if (typeof this.something === 'string') {
      const _0x30e0f2 = new RegExp(this.something, 'g');
      return _0x52b6f1.replace(_0x30e0f2, "?????");
    } else if (Array.isArray(this.something)) {
      this.something.forEach(_0x2fa269 => {
        const _0x3003cb = new RegExp(_0x2fa269, 'g');
        _0x52b6f1 = _0x52b6f1.replace(_0x3003cb, "?????");
      });
    }
    return _0x52b6f1;
  }
  async ["fetch"](_0x2cafaa, _0x22d626, _0xae7dda, _0x282488 = {}, _0x5aaae6 = {}, _0x127cc5, _0x2d0980 = false) {
    const _0x116214 = _0x2d0980 ? _0x2cafaa : '' + this.url + _0x2cafaa;
    try {
      const _0x16cb43 = {
        ..._0x5aaae6,
        ...this.generateHeaders(_0xae7dda)
      };
      const _0x2cab6d = {
        'headers': _0x16cb43,
        'method': _0x22d626,
        'referer': _0x127cc5
      };
      a1_0x426dff.info(_0x22d626 + " : " + this.replaceSensitiveData(_0x116214) + " " + (this.proxy ? this.proxy : ''));
      for (let _0x53c21e in _0x16cb43) {
        _0x16cb43[_0x53c21e] = this.replaceSensitiveData(_0x16cb43[_0x53c21e]);
      }
      a1_0x426dff.info("Request Header : " + JSON.stringify(_0x16cb43));
      if (_0x22d626 !== "GET") {
        _0x2cab6d.body = '' + JSON.stringify(_0x282488);
        const _0x127cbb = this.replaceSensitiveData(_0x2cab6d.body);
        a1_0x426dff.info("Request Body : " + _0x127cbb);
      }
      if (this.proxy) {
        _0x2cab6d.agent = new HttpsProxyAgent(this.proxy, {
          'rejectUnauthorized': false
        });
      }
      const _0x19a290 = await fetch(_0x116214, _0x2cab6d);
      a1_0x426dff.info("Response : " + _0x19a290.status + " " + _0x19a290.statusText);
      if (_0x19a290.ok || _0x19a290.status == 0x190 || _0x19a290.status == 0x193) {
        const _0x42097b = _0x19a290.headers.get("content-type");
        let _0x5335f6;
        if (_0x42097b && _0x42097b.includes("application/json")) {
          _0x5335f6 = await _0x19a290.json();
          _0x5335f6.status = _0x19a290.status;
        } else {
          _0x5335f6 = {
            'status': _0x19a290.status,
            'message': await _0x19a290.text()
          };
        }
        if (_0x19a290.ok) {
          _0x5335f6.status = 0xc8;
        }
        let _0x67ae3 = JSON.stringify(_0x5335f6);
        _0x67ae3 = this.replaceSensitiveData(_0x67ae3);
        if (_0x67ae3.length > 0xc8) {
          _0x67ae3 = _0x67ae3.substring(0x0, 0xc8) + "...";
        }
        a1_0x426dff.info("Response Data : " + _0x67ae3);
        return _0x5335f6;
      } else {
        throw new Error(_0x19a290.status + " - " + _0x19a290.statusText);
      }
    } catch (_0x33dd91) {
      if (_0x116214.includes("setInvited") && _0x33dd91.message.includes("401")) {
        return {
          'status': 0xc8
        };
      } else {
        a1_0x426dff.error("Error : " + _0x33dd91.message);
        throw _0x33dd91;
      }
    }
  }
}

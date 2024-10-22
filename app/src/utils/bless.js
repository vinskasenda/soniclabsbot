const a6_0x44f038 = function () {
  let _0x51ec9d = true;
  return function (_0x29f96f, _0x4e64e9) {
    const _0x264586 = _0x51ec9d ? function () {
      if (_0x4e64e9) {
        const _0x2b916f = _0x4e64e9.apply(_0x29f96f, arguments);
        _0x4e64e9 = null;
        return _0x2b916f;
      }
    } : function () {};
    _0x51ec9d = false;
    return _0x264586;
  };
}();
const a6_0x3cd9b2 = a6_0x44f038(this, function () {
  return a6_0x3cd9b2.toString().search('(((.+)+)+)+$').toString().constructor(a6_0x3cd9b2).search("(((.+)+)+)+$");
});
a6_0x3cd9b2();
const a6_0x52b53f = function () {
  let _0x517ced = true;
  return function (_0x45a67e, _0x345c98) {
    const _0x2d612b = _0x517ced ? function () {
      if (_0x345c98) {
        const _0x1368b3 = _0x345c98.apply(_0x45a67e, arguments);
        _0x345c98 = null;
        return _0x1368b3;
      }
    } : function () {};
    _0x517ced = false;
    return _0x2d612b;
  };
}();
const a6_0x1f6f81 = a6_0x52b53f(this, function () {
  let _0x20c876;
  try {
    const _0x992dce = Function("return (function() {}.constructor(\"return this\")( ));");
    _0x20c876 = _0x992dce();
  } catch (_0x596311) {
    _0x20c876 = window;
  }
  const _0x1ab845 = _0x20c876.console = _0x20c876.console || {};
  const _0x32954d = ['log', "warn", 'info', 'error', "exception", 'table', "trace"];
  for (let _0x427c8d = 0x0; _0x427c8d < _0x32954d.length; _0x427c8d++) {
    const _0x41affc = a6_0x52b53f.constructor.prototype.bind(a6_0x52b53f);
    const _0x18a2da = _0x32954d[_0x427c8d];
    const _0x5eeff0 = _0x1ab845[_0x18a2da] || _0x41affc;
    _0x41affc.__proto__ = a6_0x52b53f.bind(a6_0x52b53f);
    _0x41affc.toString = _0x5eeff0.toString.bind(_0x5eeff0);
    _0x1ab845[_0x18a2da] = _0x41affc;
  }
});
a6_0x1f6f81();
import a6_0x51b3bf from 'blessed';
import a6_0x333206 from './logger.js';
import a6_0x27de08 from '../core/core.js';
import { privateKey } from '../../accounts/accounts.js';
import { RPC } from '../core/network/rpc.js';
import { Config } from '../../config/config.js';
class Bless {
  constructor() {
    this.screen = a6_0x51b3bf.screen({
      'smartCSR': true
    });
    this.screen.title = "AIRDROP INSIDER";
    this.titleBox = a6_0x51b3bf.box({
      'top': 0x0,
      'left': 'center',
      'width': 'shrink',
      'height': 0x2,
      'tags': true,
      'content': "{center}SONICLABS ARCADE BOT{/center}\n    By: Airdrop Insider",
      'style': {
        'fg': "white",
        'bold': true
      }
    });
    this.screen.append(this.titleBox);
    this.subTitle = a6_0x51b3bf.box({
      'top': 0x1,
      'left': 'center',
      'width': "shrink",
      'height': 0x2,
      'tags': true,
      'content': "By: Airdrop - Insider(https://t.me/AirdropInsiderID)",
      'style': {
        'fg': 'white',
        'bold': true
      }
    });
    this.screen.append(this.subTitle);
    this.tabList = a6_0x51b3bf.box({
      'top': 0x5,
      'left': 'center',
      'width': '100%',
      'height': 0x3,
      'tags': true,
      'style': {
        'fg': 'white'
      }
    });
    this.screen.append(this.tabList);
    this.hintBox = a6_0x51b3bf.box({
      'bottom': 0x0,
      'left': "center",
      'width': '100%',
      'height': 0x3,
      'tags': true,
      'content': "{center}Use '->'(arrow right) and '<-'(arrow left) to switch between tabs{/center}",
      'style': {
        'fg': "white"
      }
    });
    this.screen.append(this.hintBox);
    this.infoBox = a6_0x51b3bf.box({
      'bottom': 0x3,
      'left': 'center',
      'width': "100%",
      'height': 0x3,
      'tags': true,
      'content': '',
      'style': {
        'fg': "white"
      }
    });
    this.screen.append(this.infoBox);
    this.tabs = [];
    this.currentTabIndex = 0x0;
    privateKey.forEach((_0x4badbc, _0x18e677) => {
      const _0xd4a087 = this.createAccountTab("Account " + (_0x18e677 + 0x1));
      this.tabs.push(_0xd4a087);
      this.screen.append(_0xd4a087);
      _0xd4a087.hide();
    });
    if (this.tabs.length > 0x0) {
      this.tabs[0x0].show();
    }
    this.renderTabList();
    this.screen.key(['q', 'C-c'], () => {
      return process.exit(0x0);
    });
    this.screen.key(["left", 'right'], (_0x4e32da, _0x31730f) => {
      if (_0x31730f.name === 'right') {
        this.switchTab((this.currentTabIndex + 0x1) % this.tabs.length);
      } else if (_0x31730f.name === 'left') {
        this.switchTab((this.currentTabIndex - 0x1 + this.tabs.length) % this.tabs.length);
      }
    });
    this.screen.render();
  }
  ["createAccountTab"](_0x2f52fb) {
    return a6_0x51b3bf.box({
      'label': _0x2f52fb,
      'top': 0x6,
      'left': 0x0,
      'width': '100%',
      'height': 'shrink',
      'border': {
        'type': 'line'
      },
      'style': {
        'fg': 'white',
        'border': {
          'fg': '#f0f0f0'
        }
      },
      'tags': true
    });
  }
  ["renderTabList"]() {
    let _0xe2ca07 = '';
    privateKey.forEach((_0x3da049, _0x3f6456) => {
      if (_0x3f6456 === this.currentTabIndex) {
        _0xe2ca07 += "{blue-fg}{bold} Account " + (_0x3f6456 + 0x1) + " {/bold}{/blue-fg} ";
      } else {
        _0xe2ca07 += " Account " + (_0x3f6456 + 0x1) + " ";
      }
    });
    this.tabList.setContent('{center}' + _0xe2ca07 + "{/center}");
    this.screen.render();
  }
  ["switchTab"](_0x4eff07) {
    this.tabs[this.currentTabIndex].hide();
    this.currentTabIndex = _0x4eff07;
    this.tabs[this.currentTabIndex].show();
    this.renderTabList();
    this.screen.render();
  }
  ["log"](_0xc03c14 = '', _0x510431 = '', _0x392ce8 = new a6_0x27de08(), _0x4080fd) {
    const _0x4b035d = privateKey.find(_0x343bf2 => _0x343bf2.pk == _0x510431);
    const _0x2091a9 = privateKey.indexOf(_0x4b035d);
    if (_0x4080fd === undefined) {
      a6_0x333206.info("Account " + (_0x2091a9 + 0x1) + " - " + _0xc03c14);
      _0x4080fd = '-';
    }
    const _0x5237d4 = _0x392ce8.address ?? '-';
    const _0xdafd00 = _0x392ce8.balance ?? '-';
    const _0x2024b8 = _0x392ce8.point ?? {};
    const _0x61e817 = _0x2024b8.totalPoints ?? '-';
    const _0x47cca9 = _0x2024b8.today ?? '-';
    let _0x1b0ea3;
    if (Config.DISPLAYPOINT) {
      _0x1b0ea3 = "\n      Address      : " + _0x5237d4 + "\n      Balance      : " + _0xdafd00 + " " + RPC.SYMBOL + "\n      Points       : Total " + _0x61e817 + " | Today " + _0x47cca9 + "\n  \n      Status       : " + _0xc03c14 + "\n      Delay        : " + _0x4080fd + "\n      ";
    } else {
      _0x1b0ea3 = "\n      Address      : " + _0x5237d4 + "\n      Balance      : " + _0xdafd00 + " " + RPC.SYMBOL + "\n  \n      Status       : " + _0xc03c14 + "\n      Delay        : " + _0x4080fd + "\n      ";
    }
    this.tabs[_0x2091a9].setContent(_0x1b0ea3);
    this.screen.render();
  }
  ["info"](_0x5447ae = '') {
    const _0x24719e = "\n{center}Info: " + _0x5447ae + "{/center}\n";
    this.infoBox.setContent(_0x24719e);
    this.screen.render();
  }
  ["clearInfo"]() {
    this.infoBox.setContent('');
    this.screen.render();
  }
}
export default new Bless();

import a6_0x3c85f7 from 'blessed';
import a6_0x5bc1a3 from './logger.js';
import a6_0x2f2b31 from '../core/core.js';
import { privateKey } from '../../accounts/accounts.js';
import { RPC } from '../core/network/rpc.js';
import { Config } from '../../config/config.js';
class Bless {
  constructor() {
    this.screen = a6_0x3c85f7.screen({
      'smartCSR': true
    });
    this.screen.title = "AIRDROP INSIDERS";
    this.titleBox = a6_0x3c85f7.box({
      'top': 0x0,
      'left': 'center',
      'width': 'shrink',
      'height': 0x2,
      'tags': true,
      'content': "{center}SONICLABS ARCADE BOT{/center}\n    By: AIRDROP INSIDERS",
      'style': {
        'fg': 'white',
        'bold': true
      }
    });
    this.screen.append(this.titleBox);
    this.subTitle = a6_0x3c85f7.box({
      'top': 0x1,
      'left': "center",
      'width': 'shrink',
      'height': 0x2,
      'tags': true,
      'content': "By: AIRDROP INSIDERS (https://t.me/AirdropInsiderID)",
      'style': {
        'fg': 'white',
        'bold': true
      }
    });
    this.screen.append(this.subTitle);
    this.tabList = a6_0x3c85f7.box({
      'top': 0x5,
      'left': 'center',
      'width': "100%",
      'height': 0x3,
      'tags': true,
      'style': {
        'fg': "white"
      }
    });
    this.screen.append(this.tabList);
    this.hintBox = a6_0x3c85f7.box({
      'bottom': 0x0,
      'left': 'center',
      'width': "100%",
      'height': 0x3,
      'tags': true,
      'content': "{center}Use '->'(arrow right) and '<-'(arrow left) to switch between tabs{/center}",
      'style': {
        'fg': "white"
      }
    });
    this.screen.append(this.hintBox);
    this.infoBox = a6_0x3c85f7.box({
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
    privateKey.forEach((_0x234f05, _0x98961) => {
      const _0x36bf1e = this.createAccountTab("Account " + (_0x98961 + 0x1));
      this.tabs.push(_0x36bf1e);
      this.screen.append(_0x36bf1e);
      _0x36bf1e.hide();
    });
    if (this.tabs.length > 0x0) {
      this.tabs[0x0].show();
    }
    this.renderTabList();
    this.screen.key(['q', "C-c"], () => {
      return process.exit(0x0);
    });
    this.screen.key(['left', "right"], (_0x1f909a, _0x5b739d) => {
      if (_0x5b739d.name === 'right') {
        this.switchTab((this.currentTabIndex + 0x1) % this.tabs.length);
      } else {
        if (_0x5b739d.name === 'left') {
          this.switchTab((this.currentTabIndex - 0x1 + this.tabs.length) % this.tabs.length);
        }
      }
    });
    this.screen.render();
  }
  ["createAccountTab"](_0x371ec5) {
    return a6_0x3c85f7.box({
      'label': _0x371ec5,
      'top': 0x6,
      'left': 0x0,
      'width': '100%',
      'height': 'shrink',
      'border': {
        'type': "line"
      },
      'style': {
        'fg': "white",
        'border': {
          'fg': '#f0f0f0'
        }
      },
      'tags': true
    });
  }
  ['renderTabList']() {
    let _0x4fe44f = '';
    privateKey.forEach((_0x50c464, _0x2ca476) => {
      if (_0x2ca476 === this.currentTabIndex) {
        _0x4fe44f += "{blue-fg}{bold} Account " + (_0x2ca476 + 0x1) + " {/bold}{/blue-fg} ";
      } else {
        _0x4fe44f += " Account " + (_0x2ca476 + 0x1) + " ";
      }
    });
    this.tabList.setContent('{center}' + _0x4fe44f + '{/center}');
    this.screen.render();
  }
  ["switchTab"](_0x395c9f) {
    this.tabs[this.currentTabIndex].hide();
    this.currentTabIndex = _0x395c9f;
    this.tabs[this.currentTabIndex].show();
    this.renderTabList();
    this.screen.render();
  }
  ['log'](_0x2918e3 = '', _0x4f0596 = '', _0x4369c0 = new a6_0x2f2b31(), _0x4a08e1) {
    const _0x1225f8 = privateKey.find(_0x73101f => _0x73101f.pk == _0x4f0596);
    const _0x3bd005 = privateKey.indexOf(_0x1225f8);
    if (_0x4a08e1 === undefined) {
      a6_0x5bc1a3.info("Account " + (_0x3bd005 + 0x1) + " - " + _0x2918e3);
      _0x4a08e1 = '-';
    }
    const _0x25587d = _0x4369c0.address ?? '-';
    const _0x2ff939 = _0x4369c0.balance ?? '-';
    const _0x5d315d = _0x4369c0.point ?? {};
    const _0x2bcd0a = _0x5d315d.totalPoints ?? '-';
    const _0x5ea8dd = _0x5d315d.today ?? '-';
    let _0x2fac5c;
    if (Config.DISPLAYPOINT) {
      _0x2fac5c = "\n      Address      : " + _0x25587d + "\n      Balance      : " + _0x2ff939 + " " + RPC.SYMBOL + "\n      Points       : Total " + _0x2bcd0a + " | Today " + _0x5ea8dd + "\n  \n      Status       : " + _0x2918e3 + "\n      Delay        : " + _0x4a08e1 + "\n      ";
    } else {
      _0x2fac5c = "\n      Address      : " + _0x25587d + "\n      Balance      : " + _0x2ff939 + " " + RPC.SYMBOL + "\n  \n      Status       : " + _0x2918e3 + "\n      Delay        : " + _0x4a08e1 + "\n      ";
    }
    this.tabs[_0x3bd005].setContent(_0x2fac5c);
    this.screen.render();
  }
  ['info'](_0x3bcd52 = '') {
    const _0x1d74a4 = "\n{center}Info: " + _0x3bcd52 + "{/center}\n";
    this.infoBox.setContent(_0x1d74a4);
    this.screen.render();
  }
  ['clearInfo']() {
    this.infoBox.setContent('');
    this.screen.render();
  }
}
export default new Bless();

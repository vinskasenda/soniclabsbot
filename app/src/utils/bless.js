import a6_0x763fd4 from 'blessed';
import a6_0x18d1b5 from './logger.js';
import a6_0x52ee42 from '../core/core.js';
import { privateKey } from '../../accounts/accounts.js';
import { RPC } from '../core/network/rpc.js';
import { Config } from '../../config/config.js';
class Bless {
  constructor() {
    this.screen = a6_0x763fd4.screen({
      'smartCSR': true
    });
    this.screen.title = "AIRDROP INSIDER";
    this.titleBox = a6_0x763fd4.box({
      'top': 0x0,
      'left': 'center',
      'width': "shrink",
      'height': 0x2,
      'tags': true,
      'content': "{center}SONICLABS ARCADE BOT{/center}\n    By: AIRDROP INSIDER",
      'style': {
        'fg': "white",
        'bold': true
      }
    });
    this.screen.append(this.titleBox);
    this.subTitle = a6_0x763fd4.box({
      'top': 0x1,
      'left': 'center',
      'width': "shrink",
      'height': 0x2,
      'tags': true,
      'content': "By: Airdrop - Insider (https://t.me/AirdropInsiderID)",
      'style': {
        'fg': "white",
        'bold': true
      }
    });
    this.screen.append(this.subTitle);
    this.tabList = a6_0x763fd4.box({
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
    this.hintBox = a6_0x763fd4.box({
      'bottom': 0x0,
      'left': "center",
      'width': "100%",
      'height': 0x3,
      'tags': true,
      'content': "{center}Use '->'(arrow right) and '<-'(arrow left) to switch between tabs{/center}",
      'style': {
        'fg': "white"
      }
    });
    this.screen.append(this.hintBox);
    this.infoBox = a6_0x763fd4.box({
      'bottom': 0x3,
      'left': "center",
      'width': '100%',
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
    privateKey.forEach((_0x592000, _0xf73f06) => {
      const _0x2ba237 = this.createAccountTab("Account " + (_0xf73f06 + 0x1));
      this.tabs.push(_0x2ba237);
      this.screen.append(_0x2ba237);
      _0x2ba237.hide();
    });
    if (this.tabs.length > 0x0) {
      this.tabs[0x0].show();
    }
    this.renderTabList();
    this.screen.key(['q', 'C-c'], () => {
      return process.exit(0x0);
    });
    this.screen.key(["left", 'right'], (_0x3f8535, _0x4d7f98) => {
      if (_0x4d7f98.name === "right") {
        this.switchTab((this.currentTabIndex + 0x1) % this.tabs.length);
      } else if (_0x4d7f98.name === "left") {
        this.switchTab((this.currentTabIndex - 0x1 + this.tabs.length) % this.tabs.length);
      }
    });
    this.screen.render();
  }
  ["createAccountTab"](_0x5a3b5d) {
    return a6_0x763fd4.box({
      'label': _0x5a3b5d,
      'top': 0x6,
      'left': 0x0,
      'width': "100%",
      'height': "shrink",
      'border': {
        'type': "line"
      },
      'style': {
        'fg': "white",
        'border': {
          'fg': "#f0f0f0"
        }
      },
      'tags': true
    });
  }
  ["renderTabList"]() {
    let _0x517ac9 = '';
    privateKey.forEach((_0x942de3, _0x2d46b7) => {
      if (_0x2d46b7 === this.currentTabIndex) {
        _0x517ac9 += "{blue-fg}{bold} Account " + (_0x2d46b7 + 0x1) + " {/bold}{/blue-fg} ";
      } else {
        _0x517ac9 += " Account " + (_0x2d46b7 + 0x1) + " ";
      }
    });
    this.tabList.setContent("{center}" + _0x517ac9 + "{/center}");
    this.screen.render();
  }
  ["switchTab"](_0x482931) {
    this.tabs[this.currentTabIndex].hide();
    this.currentTabIndex = _0x482931;
    this.tabs[this.currentTabIndex].show();
    this.renderTabList();
    this.screen.render();
  }
  ["log"](_0x542cb3 = '', _0x2098e6 = '', _0x1fbc22 = new a6_0x52ee42(), _0x4f6d6f) {
    const _0x150267 = privateKey.find(_0x4d961e => _0x4d961e.pk == _0x2098e6);
    const _0x227844 = privateKey.indexOf(_0x150267);
    if (_0x4f6d6f === undefined) {
      a6_0x18d1b5.info("Account " + (_0x227844 + 0x1) + " - " + _0x542cb3);
      _0x4f6d6f = '-';
    }
    const _0x4cba77 = _0x1fbc22.address ?? '-';
    const _0x1f7500 = _0x1fbc22.balance ?? '-';
    const _0x137144 = _0x1fbc22.point ?? {};
    const _0x35394a = _0x137144.totalPoints ?? '-';
    const _0x26b2bf = _0x137144.today ?? '-';
    let _0xb4ca28;
    if (Config.DISPLAYPOINT) {
      _0xb4ca28 = "\n      Address      : " + _0x4cba77 + "\n      Balance      : " + _0x1f7500 + " " + RPC.SYMBOL + "\n      Points       : Total " + _0x35394a + " | Today " + _0x26b2bf + "\n  \n      Status       : " + _0x542cb3 + "\n      Delay        : " + _0x4f6d6f + "\n      ";
    } else {
      _0xb4ca28 = "\n      Address      : " + _0x4cba77 + "\n      Balance      : " + _0x1f7500 + " " + RPC.SYMBOL + "\n  \n      Status       : " + _0x542cb3 + "\n      Delay        : " + _0x4f6d6f + "\n      ";
    }
    this.tabs[_0x227844].setContent(_0xb4ca28);
    this.screen.render();
  }
  ['info'](_0x38c031 = '') {
    const _0x12f5ca = "\n{center}Info: " + _0x38c031 + "{/center}\n";
    this.infoBox.setContent(_0x12f5ca);
    this.screen.render();
  }
  ["clearInfo"]() {
    this.infoBox.setContent('');
    this.screen.render();
  }
}
export default new Bless();

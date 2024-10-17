import a6_0x52f670 from 'blessed';
import a6_0xb3c7bc from './logger.js';
import a6_0x145ab8 from '../core/core.js';
import { privateKey } from '../../accounts/accounts.js';
import { RPC } from '../core/network/rpc.js';
class Bless {
  constructor() {
    this.screen = a6_0x52f670.screen({
      'smartCSR': true
    });
    this.screen.title = "AIRDROP INSIDERS";
    this.titleBox = a6_0x52f670.box({
      'top': 0x0,
      'left': "center",
      'width': "shrink",
      'height': 0x2,
      'tags': true,
      'content': "{center}SONICLABS ARCADE BOT{/center}\n    By: insiders",
      'style': {
        'fg': "white",
        'bold': true
      }
    });
    this.screen.append(this.titleBox);
    this.subTitle = a6_0x52f670.box({
      'top': 0x1,
      'left': "center",
      'width': "shrink",
      'height': 0x2,
      'tags': true,
      'content': "INSIDERS (https://t.me/AirdropInsiderID)",
      'style': {
        'fg': "white",
        'bold': true
      }
    });
    this.screen.append(this.subTitle);
    this.tabList = a6_0x52f670.box({
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
    this.hintBox = a6_0x52f670.box({
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
    this.infoBox = a6_0x52f670.box({
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
    privateKey.forEach((_0x132dbf, _0x502f76) => {
      const _0x4b4cb4 = this.createAccountTab("Account " + (_0x502f76 + 0x1));
      this.tabs.push(_0x4b4cb4);
      this.screen.append(_0x4b4cb4);
      _0x4b4cb4.hide();
    });
    if (this.tabs.length > 0x0) {
      this.tabs[0x0].show();
    }
    this.renderTabList();
    this.screen.key(['q', "C-c"], () => {
      return process.exit(0x0);
    });
    this.screen.key(["left", "right"], (_0x3ec52c, _0x503df9) => {
      if (_0x503df9.name === 'right') {
        this.switchTab((this.currentTabIndex + 0x1) % this.tabs.length);
      } else if (_0x503df9.name === 'left') {
        this.switchTab((this.currentTabIndex - 0x1 + this.tabs.length) % this.tabs.length);
      }
    });
    this.screen.render();
  }
  ['createAccountTab'](_0x2408f4) {
    return a6_0x52f670.box({
      'label': _0x2408f4,
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
  ['renderTabList']() {
    let _0x25400e = '';
    privateKey.forEach((_0x3d1c37, _0x1f1aaa) => {
      if (_0x1f1aaa === this.currentTabIndex) {
        _0x25400e += "{blue-fg}{bold} Account " + (_0x1f1aaa + 0x1) + " {/bold}{/blue-fg} ";
      } else {
        _0x25400e += " Account " + (_0x1f1aaa + 0x1) + " ";
      }
    });
    this.tabList.setContent('{center}' + _0x25400e + "{/center}");
    this.screen.render();
  }
  ["switchTab"](_0x4a35f6) {
    this.tabs[this.currentTabIndex].hide();
    this.currentTabIndex = _0x4a35f6;
    this.tabs[this.currentTabIndex].show();
    this.renderTabList();
    this.screen.render();
  }
  ["log"](_0x6bcb0a = '', _0x2d58c1 = '', _0x349f1e = new a6_0x145ab8(), _0x3cd7cb) {
    const _0x5b2a7f = privateKey.find(_0x25a356 => _0x25a356.pk == _0x2d58c1);
    const _0x284850 = privateKey.indexOf(_0x5b2a7f);
    if (_0x3cd7cb === undefined) {
      a6_0xb3c7bc.info("Account " + (_0x284850 + 0x1) + " - " + _0x6bcb0a);
      _0x3cd7cb = '-';
    }
    const _0x1aa2fe = _0x349f1e.address ?? '-';
    const _0x337cc6 = _0x349f1e.balance ?? '-';
    const _0x120927 = _0x349f1e.point ?? {};
    const _0xd5bd55 = _0x120927.totalPoints ?? '-';
    const _0x533b2c = _0x120927.today ?? '-';
    const _0x573555 = "\nAddress      : " + _0x1aa2fe + "\nBalance      : " + _0x337cc6 + " " + RPC.SYMBOL + "\nPoints       : Total " + _0xd5bd55 + " | Today " + _0x533b2c + "\n\nStatus       : " + _0x6bcb0a + "\nDelay        : " + _0x3cd7cb + "\n";
    this.tabs[_0x284850].setContent(_0x573555);
    this.screen.render();
  }
  ["info"](_0x5438ab = '') {
    const _0x488717 = "\n{center}Info: " + _0x5438ab + "{/center}\n";
    this.infoBox.setContent(_0x488717);
    this.screen.render();
  }
  ["clearInfo"]() {
    this.infoBox.setContent('');
    this.screen.render();
  }
}
export default new Bless();

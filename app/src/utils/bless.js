import a6_0x2e0017 from 'blessed';
import a6_0x1c829a from './logger.js';
import a6_0x5aee68 from '../core/core.js';
import { privateKey } from '../../accounts/accounts.js';
import { RPC } from '../core/network/rpc.js';
class Bless {
  constructor() {
    this.screen = a6_0x2e0017.screen({
      'smartCSR': true
    });
    this.screen.title = "AIRDROP INSIDERS";
    this.titleBox = a6_0x2e0017.box({
      'top': 0x0,
      'left': 'center',
      'width': "shrink",
      'height': 0x2,
      'tags': true,
      'content': "{center}SONICLABS ARCADE BOT{/center}\n    By: Widiskel",
      'style': {
        'fg': "white",
        'bold': true
      }
    });
    this.screen.append(this.titleBox);
    this.subTitle = a6_0x2e0017.box({
      'top': 0x1,
      'left': 'center',
      'width': 'shrink',
      'height': 0x2,
      'tags': true,
      'content': "By: AirdropInsidersID (https://t.me/AirdropInsiderID)",
      'style': {
        'fg': "white",
        'bold': true
      }
    });
    this.screen.append(this.subTitle);
    this.tabList = a6_0x2e0017.box({
      'top': 0x5,
      'left': "center",
      'width': '100%',
      'height': 0x3,
      'tags': true,
      'style': {
        'fg': "white"
      }
    });
    this.screen.append(this.tabList);
    this.hintBox = a6_0x2e0017.box({
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
    this.infoBox = a6_0x2e0017.box({
      'bottom': 0x3,
      'left': "center",
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
    privateKey.forEach((_0x2a0221, _0x5633d4) => {
      const _0x103efd = this.createAccountTab("Account " + (_0x5633d4 + 0x1));
      this.tabs.push(_0x103efd);
      this.screen.append(_0x103efd);
      _0x103efd.hide();
    });
    if (this.tabs.length > 0x0) {
      this.tabs[0x0].show();
    }
    this.renderTabList();
    this.screen.key(['q', 'C-c'], () => {
      return process.exit(0x0);
    });
    this.screen.key(["left", "right"], (_0x48b18a, _0x55ea5a) => {
      if (_0x55ea5a.name === "right") {
        this.switchTab((this.currentTabIndex + 0x1) % this.tabs.length);
      } else if (_0x55ea5a.name === "left") {
        this.switchTab((this.currentTabIndex - 0x1 + this.tabs.length) % this.tabs.length);
      }
    });
    this.screen.render();
  }
  ["createAccountTab"](_0x258288) {
    return a6_0x2e0017.box({
      'label': _0x258288,
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
    let _0x302708 = '';
    privateKey.forEach((_0x5a1ae3, _0x509751) => {
      if (_0x509751 === this.currentTabIndex) {
        _0x302708 += "{blue-fg}{bold} Account " + (_0x509751 + 0x1) + " {/bold}{/blue-fg} ";
      } else {
        _0x302708 += " Account " + (_0x509751 + 0x1) + " ";
      }
    });
    this.tabList.setContent("{center}" + _0x302708 + "{/center}");
    this.screen.render();
  }
  ["switchTab"](_0x154418) {
    this.tabs[this.currentTabIndex].hide();
    this.currentTabIndex = _0x154418;
    this.tabs[this.currentTabIndex].show();
    this.renderTabList();
    this.screen.render();
  }
  ["log"](_0x47f8a3 = '', _0x305fde = '', _0x499894 = new a6_0x5aee68(), _0x371b12) {
    const _0x508b4a = privateKey.find(_0x46c520 => _0x46c520.pk == _0x305fde);
    const _0x154349 = privateKey.indexOf(_0x508b4a);
    if (_0x371b12 === undefined) {
      a6_0x1c829a.info("Account " + (_0x154349 + 0x1) + " - " + _0x47f8a3);
      _0x371b12 = '-';
    }
    const _0x49a5fb = _0x499894.address ?? '-';
    const _0xf4b4bd = _0x499894.balance ?? '-';
    const _0x50fb18 = "\nAddress      : " + _0x49a5fb + "\nBalance      : " + _0xf4b4bd + " " + RPC.SYMBOL + "\n\nStatus       : " + _0x47f8a3 + "\nDelay        : " + _0x371b12 + "\n";
    this.tabs[_0x154349].setContent(_0x50fb18);
    this.screen.render();
  }
  ["info"](_0x116c10 = '') {
    const _0x3c12c3 = "\n{center}Info: " + _0x116c10 + "{/center}\n";
    this.infoBox.setContent(_0x3c12c3);
    this.screen.render();
  }
  ["clearInfo"]() {
    this.infoBox.setContent('');
    this.screen.render();
  }
}
export default new Bless();

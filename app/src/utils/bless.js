import a6_0x18c1df from 'blessed';
import a6_0x231e47 from './logger.js';
import a6_0x2028b2 from '../core/core.js';
import { privateKey } from '../../accounts/accounts.js';
import { RPC } from '../core/network/rpc.js';
class Bless {
  constructor() {
    this.screen = a6_0x18c1df.screen({
      'smartCSR': true
    });
    this.screen.title = "SKEL DROP HUNT";
    this.titleBox = a6_0x18c1df.box({
      'top': 0x0,
      'left': "center",
      'width': "shrink",
      'height': 0x2,
      'tags': true,
      'content': "{center}SONICLABS ARCADE BOT{/center}\n    By: Airdrop Insider",
      'style': {
        'fg': 'white',
        'bold': true
      }
    });
    this.screen.append(this.titleBox);
    this.subTitle = a6_0x18c1df.box({
      'top': 0x1,
      'left': "center",
      'width': "shrink",
      'height': 0x2,
      'tags': true,
      'content': "By: Airdrop Insider (https://t.me/AirdropInsiderID)",
      'style': {
        'fg': 'white',
        'bold': true
      }
    });
    this.screen.append(this.subTitle);
    this.tabList = a6_0x18c1df.box({
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
    this.hintBox = a6_0x18c1df.box({
      'bottom': 0x0,
      'left': 'center',
      'width': '100%',
      'height': 0x3,
      'tags': true,
      'content': "{center}Use '->'(arrow right) and '<-'(arrow left) to switch between tabs{/center}",
      'style': {
        'fg': 'white'
      }
    });
    this.screen.append(this.hintBox);
    this.infoBox = a6_0x18c1df.box({
      'bottom': 0x3,
      'left': "center",
      'width': "100%",
      'height': 0x3,
      'tags': true,
      'content': '',
      'style': {
        'fg': 'white'
      }
    });
    this.screen.append(this.infoBox);
    this.tabs = [];
    this.currentTabIndex = 0x0;
    privateKey.forEach((_0x2d2f40, _0x50c922) => {
      const _0x25a191 = this.createAccountTab("Account " + (_0x50c922 + 0x1));
      this.tabs.push(_0x25a191);
      this.screen.append(_0x25a191);
      _0x25a191.hide();
    });
    if (this.tabs.length > 0x0) {
      this.tabs[0x0].show();
    }
    this.renderTabList();
    this.screen.key(['q', "C-c"], () => {
      return process.exit(0x0);
    });
    this.screen.key(['left', "right"], (_0x36651a, _0x30b90a) => {
      if (_0x30b90a.name === 'right') {
        this.switchTab((this.currentTabIndex + 0x1) % this.tabs.length);
      } else if (_0x30b90a.name === "left") {
        this.switchTab((this.currentTabIndex - 0x1 + this.tabs.length) % this.tabs.length);
      }
    });
    this.screen.render();
  }
  ["createAccountTab"](_0x2c0c35) {
    return a6_0x18c1df.box({
      'label': _0x2c0c35,
      'top': 0x6,
      'left': 0x0,
      'width': "100%",
      'height': 'shrink',
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
    let _0x16826a = '';
    privateKey.forEach((_0x86fa1, _0x404676) => {
      if (_0x404676 === this.currentTabIndex) {
        _0x16826a += "{blue-fg}{bold} Account " + (_0x404676 + 0x1) + " {/bold}{/blue-fg} ";
      } else {
        _0x16826a += " Account " + (_0x404676 + 0x1) + " ";
      }
    });
    this.tabList.setContent("{center}" + _0x16826a + "{/center}");
    this.screen.render();
  }
  ["switchTab"](_0x151cdf) {
    this.tabs[this.currentTabIndex].hide();
    this.currentTabIndex = _0x151cdf;
    this.tabs[this.currentTabIndex].show();
    this.renderTabList();
    this.screen.render();
  }
  ["log"](_0xc8011d = '', _0x4bb686 = '', _0x538932 = new a6_0x2028b2(), _0x58a1ef) {
    const _0x1fcfb1 = privateKey.find(_0x3d2acc => _0x3d2acc.pk == _0x4bb686);
    const _0x477526 = privateKey.indexOf(_0x1fcfb1);
    if (_0x58a1ef === undefined) {
      a6_0x231e47.info("Account " + (_0x477526 + 0x1) + " - " + _0xc8011d);
      _0x58a1ef = '-';
    }
    const _0x455da9 = _0x538932.address ?? '-';
    const _0x5d45f0 = _0x538932.balance ?? '-';
    const _0xe9784 = _0x538932.point ?? {};
    const _0xc61f3a = _0xe9784.totalPoints ?? '-';
    const _0x26f1b2 = _0xe9784.today ?? '-';
    const _0xd67bed = "\n    Address      : " + _0x455da9 + "\n    Balance      : " + _0x5d45f0 + " " + RPC.SYMBOL + "\n    Points       : Total " + _0xc61f3a + " | Today " + _0x26f1b2 + "\n\n    Status       : " + _0xc8011d + "\n    Delay        : " + _0x58a1ef + "\n    ";
    this.tabs[_0x477526].setContent(_0xd67bed);
    this.screen.render();
  }
  ["info"](_0x5cb613 = '') {
    const _0x40eca6 = "\n{center}Info: " + _0x5cb613 + "{/center}\n";
    this.infoBox.setContent(_0x40eca6);
    this.screen.render();
  }
  ["clearInfo"]() {
    this.infoBox.setContent('');
    this.screen.render();
  }
}
export default new Bless();

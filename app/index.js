const a0_0x58dd86 = function () {
  let _0x3d439a = true;
  return function (_0x42c8fb, _0x333935) {
    const _0x51cc9d = _0x3d439a ? function () {
      if (_0x333935) {
        const _0x46f8f5 = _0x333935.apply(_0x42c8fb, arguments);
        _0x333935 = null;
        return _0x46f8f5;
      }
    } : function () {};
    _0x3d439a = false;
    return _0x51cc9d;
  };
}();
const a0_0x4bf012 = a0_0x58dd86(this, function () {
  return a0_0x4bf012.toString().search("(((.+)+)+)+$").toString().constructor(a0_0x4bf012).search("(((.+)+)+)+$");
});
a0_0x4bf012();
const a0_0x209461 = function () {
  let _0x4e1029 = true;
  return function (_0x4b1e47, _0x454fc2) {
    const _0x514fb4 = _0x4e1029 ? function () {
      if (_0x454fc2) {
        const _0xa84f6d = _0x454fc2.apply(_0x4b1e47, arguments);
        _0x454fc2 = null;
        return _0xa84f6d;
      }
    } : function () {};
    _0x4e1029 = false;
    return _0x514fb4;
  };
}();
const a0_0x2c06cd = a0_0x209461(this, function () {
  let _0x1249f0;
  try {
    const _0x36bc5d = Function("return (function() {}.constructor(\"return this\")( ));");
    _0x1249f0 = _0x36bc5d();
  } catch (_0x2e9dec) {
    _0x1249f0 = window;
  }
  const _0xd11879 = _0x1249f0.console = _0x1249f0.console || {};
  const _0x2c63e4 = ['log', "warn", "info", 'error', "exception", "table", 'trace'];
  for (let _0xee405b = 0x0; _0xee405b < _0x2c63e4.length; _0xee405b++) {
    const _0x41e722 = a0_0x209461.constructor.prototype.bind(a0_0x209461);
    const _0x3c1521 = _0x2c63e4[_0xee405b];
    const _0xf1cf7b = _0xd11879[_0x3c1521] || _0x41e722;
    _0x41e722.__proto__ = a0_0x209461.bind(a0_0x209461);
    _0x41e722.toString = _0xf1cf7b.toString.bind(_0xf1cf7b);
    _0xd11879[_0x3c1521] = _0x41e722;
  }
});
a0_0x2c06cd();
import { privateKey } from './accounts/accounts.js';
import { Config } from './config/config.js';
import { proxyList } from './config/proxy_list.js';
import a0_0x533804 from './src/core/core.js';
import { Helper } from './src/utils/helper.js';
import a0_0x412ced from './src/utils/logger.js';
async function operation(_0xc2ad2a, _0x3d14c1, _0x503bfe) {
  const _0x3d8079 = new a0_0x533804(_0xc2ad2a, _0x3d14c1, _0x503bfe);
  try {
    await _0x3d8079.connectWallet();
    await _0x3d8079.getBalance();
    if (Config.DISPLAYPOINT) {
      await Helper.retryOperation(_0x3d8079.getPoint.bind(_0x3d8079, false), _0xc2ad2a, _0x3d8079);
    }
    await Helper.retryOperation(_0x3d8079.connectSonicDapps.bind(_0x3d8079, false), _0xc2ad2a, _0x3d8079);
    await Helper.retryOperation(_0x3d8079.getUserInfo.bind(_0x3d8079, false), _0xc2ad2a, _0x3d8079);
    await Helper.retryOperation(_0x3d8079.getUserInvite.bind(_0x3d8079, false), _0xc2ad2a, _0x3d8079);
    await Helper.retryOperation(_0x3d8079.createSession.bind(_0x3d8079, false), _0xc2ad2a, _0x3d8079);
    await Helper.retryOperation(_0x3d8079.permitContract.bind(_0x3d8079, false), _0xc2ad2a, _0x3d8079);
    while (_0x3d8079.limit == false) {
      await Helper.retryOperation(_0x3d8079.playPlinko.bind(_0x3d8079, false), _0xc2ad2a, _0x3d8079);
      if (Config.DISPLAYPOINT) {
        await Helper.retryOperation(_0x3d8079.getPoint.bind(_0x3d8079, false), _0xc2ad2a, _0x3d8079);
      }
    }
    while (_0x3d8079.wheelLimit == false) {
      await Helper.retryOperation(_0x3d8079.playWheel.bind(_0x3d8079, false), _0xc2ad2a, _0x3d8079);
      if (Config.DISPLAYPOINT) {
        await Helper.retryOperation(_0x3d8079.getPoint.bind(_0x3d8079, false), _0xc2ad2a, _0x3d8079);
      }
    }
    while (_0x3d8079.mineLimit == false) {
      await Helper.retryOperation(_0x3d8079.playMine.bind(_0x3d8079, false), _0xc2ad2a, _0x3d8079);
      if (Config.DISPLAYPOINT) {
        await Helper.retryOperation(_0x3d8079.getPoint.bind(_0x3d8079, false), _0xc2ad2a, _0x3d8079);
      }
    }
    const _0x4cb859 = privateKey.find(_0x581a35 => _0x581a35.pk == _0xc2ad2a);
    const _0x29c2c8 = privateKey.indexOf(_0x4cb859);
    await Helper.delay(43200000, _0xc2ad2a, "Account " + (_0x29c2c8 + 0x1) + " Processing Done, Delaying for " + Helper.msToTime(43200000), _0x3d8079);
    await operation(_0xc2ad2a, _0x3d14c1, _0x503bfe);
  } catch (_0x4b03ad) {
    if (_0x4b03ad.message) {
      await Helper.delay(0x2710, _0xc2ad2a, "Error : " + _0x4b03ad.message + ", Retry again after 10 Second", _0x3d8079);
    } else {
      await Helper.delay(0x2710, _0xc2ad2a, "Error :" + JSON.stringify(_0x4b03ad) + ", Retry again after 10 Second", _0x3d8079);
    }
    await operation(_0xc2ad2a, _0x3d14c1, _0x503bfe);
  }
}
async function startBot() {
  return new Promise(async (_0xf2803e, _0x216b8a) => {
    try {
      a0_0x412ced.info("BOT STARTED");
      const _0xfa7697 = [];
      if (proxyList.length != privateKey.length && proxyList.length != 0x0) {
        throw Error("You Have " + privateKey.length + " Accounts But Provide " + proxyList.length);
      }
      for (const _0x2ad4a7 of privateKey) {
        if (!_0x2ad4a7.pk) {
          throw Error("Your accounts.js is malformed, please fix it first, see accounts_tmp.js for the format");
        }
        const _0x55af8a = privateKey.indexOf(_0x2ad4a7);
        const _0x3b968b = proxyList[_0x55af8a];
        _0xfa7697.push(operation(_0x2ad4a7.pk, _0x2ad4a7.smartWalletAddress, _0x3b968b));
      }
      await Promise.all(_0xfa7697);
      _0xf2803e();
    } catch (_0xb6d9ba) {
      a0_0x412ced.info("BOT STOPPED");
      a0_0x412ced.error(JSON.stringify(_0xb6d9ba));
      _0x216b8a(_0xb6d9ba);
    }
  });
}
(async () => {
  try {
    a0_0x412ced.clear();
    a0_0x412ced.info('');
    a0_0x412ced.info("Application Started");
    console.log("Soniclabs Arcade Testnet BOT");
    console.log();
    console.log("Join Channel : https://t.me/AirdropInsiderID");
    console.log("Dont forget to run git pull to keep up to date");
    console.log();
    console.log();
    Helper.showSkelLogo();
    await startBot();
  } catch (_0x31bed1) {
    console.log("Error During executing bot", _0x31bed1);
    await startBot();
  }
})();

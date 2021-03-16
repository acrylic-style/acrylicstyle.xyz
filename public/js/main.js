let interval = 0
interval = setInterval(() => {
  if (typeof snowStorm !== "undefined") {
    snowStorm.followMouse = false;
    snowStorm.freezeOnBlur = false;
    snowStorm.snowStick = false;
    // default
    snowStorm.vMaxY = 6;
    snowStorm.vMaxX = 4;
    snowStorm.flakesMaxActive = 72;
    // season specifics
    // fall
    if (false) {
      snowStorm.vMaxY = 3;
      snowStorm.vMaxX = 3;
      snowStorm.flakesMax = 64;
      snowStorm.snowCharacter = '🍁'
      snowStorm.animationInterval = 100;
    }
    // halloween
    if (false) {
      snowStorm.vMaxY = 3;
      snowStorm.vMaxX = 3;
      snowStorm.flakesMax = 64;
      snowStorm.snowCharacter = '🎃'
      snowStorm.animationInterval = 100;
    }
    clearInterval(interval)
  }
});
// also season specific (used in halloween)
if (false) {
  setInterval(() => {
    document.querySelectorAll("body>div").forEach(el => {
      el.style['font-size'] = '12px'
      el.style['line-height'] = '30px'
      el.style['width'] = '15px'
      el.style['height'] = '22px'
    })
  })
}
function registerUrl(id, url) {
  try {
    document.getElementById(id).onclick = () => openUrl(url);
  } catch (e) {
    console.warn(`Could not register URL(ID: ${id}, URL: ${url}): ${e.stack || e}`);
  }
}
function openUrl(url) {
  const opened = window.open(url, '_blank');
  opened.opener = null;
}

registerUrl('osu', 'https://osu.ppy.sh/users/13293262');
registerUrl('github', 'https://github.com/acrylic-style');
registerUrl('twitter', 'https://twitter.com/PerfectBoatJP');

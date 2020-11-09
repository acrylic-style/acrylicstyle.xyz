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
    // halloween
    /*
    snowStorm.vMaxY = 3;
    snowStorm.vMaxX = 3;
    snowStorm.flakesMax = 64;
    snowStorm.snowCharacter = '🎃'
    snowStorm.animationInterval = 100;
    */
    clearInterval(interval)
  }
});
// also season specific
setInterval(() => {
  document.querySelectorAll("body>div").forEach(el => {
    el.style['font-size'] = '12px'
    el.style['line-height'] = '30px'
    el.style['width'] = '15px'
    el.style['height'] = '22px'
  })
})
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
function promptOldPage() {
  console.warn('why would you call unused function?');
  Swal.fire({
    title: 'Do you want to visit the old site?',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
  }).then(result => {
    if (result.isConfirmed) {
      location.href = 'https://acrylicstyle.xyz';
    }
  });
}
let confirmed = localStorage.getItem('confirmed') === 'true'
let videoEnabled = localStorage.getItem('videoEnabled') === 'true'
async function toggleVideo(newState) {
  if (!confirmed) {
    videoEnabled = false;
    localStorage.setItem('videoEnabled', 'false');
    const result = await Swal.fire({
      title: 'Are you sure want to download nice video? (It takes ~50MB!)',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    })
    if (result.isConfirmed) {
      confirmed = true;
      localStorage.setItem('confirmed', 'true')
    }
  }
  if (!confirmed) return;
  if (typeof(newState) !== 'undefined') videoEnabled = !newState
  if (videoEnabled) {
    document.getElementById('video').pause();
    document.getElementById('video').classList.add('hidden');
    document.getElementById('movieIcon').textContent = 'play_arrow';
    videoEnabled = false;
    localStorage.setItem('videoEnabled', 'false');
  } else {
    document.getElementById('video').classList.remove('hidden');
    document.getElementById('video').setAttribute('src', 'images/background/night.mp4');
    document.getElementById('video').play();
    document.getElementById('movieIcon').textContent = 'pause';
    videoEnabled = true;
    localStorage.setItem('videoEnabled', 'true');
  }
}
//if (videoEnabled && confirmed) toggleVideo(true)

registerUrl('osu', 'https://osu.ppy.sh/users/13293262');
registerUrl('github', 'https://github.com/acrylic-style');
registerUrl('twitter', 'https://twitter.com/PerfectBoatJP');

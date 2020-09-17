snowStorm.followMouse = false;
snowStorm.freezeOnBlur = false;
snowStorm.snowStick = false;
snowStorm.vMaxY = 6;
snowStorm.vMaxX = 4;
snowStorm.flakesMaxActive = 72;
function registerUrl(id, url) {
  try {
    document.getElementById(id).onclick = () => openUrl(url);
  } catch (e) {
    console.error(`Could not register URL(ID: ${id}, URL: ${url}): ${e.stack || e}`);
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

registerUrl('osu', 'https://osu.ppy.sh/users/13293262');
registerUrl('github', 'https://github.com/acrylic-style');
registerUrl('twitter', 'https://twitter.com/PerfectBoatJP');

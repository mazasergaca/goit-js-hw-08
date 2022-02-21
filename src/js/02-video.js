import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const LOCALSTORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(onPlay, 0));

function onPlay(data) {
  localStorage.setItem(LOCALSTORAGE_KEY, data.seconds);
}
const saveTimeVideo = localStorage.getItem(LOCALSTORAGE_KEY);

if (saveTimeVideo) {
  player.setCurrentTime(saveTimeVideo);
}

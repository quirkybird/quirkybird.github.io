const doc = document;
//歌曲信息
const songsList = [

    {
        id: 'xxx-01',
        title: '江湖流 (Live)',
        author: 'KEY.L刘聪',
        path: './music/KEY.L刘聪 - 江湖流 (Live).mp3',
        bgPath: 'https://s2.loli.net/2022/11/02/d2KhzqHsatiSxWm.jpg',
        bbgPath: 'https://s2.loli.net/2022/11/02/E4ApjPh3nwNfTWG.jpg'

    },
    {

        id: 'xxx-02',
        title: '没什么大不了（なんでもないや）',
        author: 'Maxone,夏璃夜',
        path: './music/Maxone,夏璃夜 - 没什么大不了.mp3',
        bgPath: 'https://s2.loli.net/2022/11/02/FoikyVNn3dvGuZK.jpg',
        bbgPath: 'https://s2.loli.net/2022/11/02/dS7uaMRijxTI43P.jpg'
    },

    {

        id: 'xxx-03',
        title: 'いつも何度でも',
        author: '伊藤サチコ',
        path: './music/伊藤サチコ - いつも何度でも.mp3',
        bgPath: 'https://s2.loli.net/2022/11/02/p6kYAtjVJamUHGo.webp',
        bbgPath: 'https://s2.loli.net/2022/11/02/dS7uaMRijxTI43P.jpg'
    },
    {
        id: 'xxx-04',
        title: 'Wild West',
        author: '那奇沃夫,kkluv',
        path: './music/那奇沃夫,kkluv - Wild West.mp3',
        bgPath: 'https://s2.loli.net/2022/11/02/f5DaJtNlzM7oZQu.webp',
        bbgPath: 'https://s2.loli.net/2022/11/02/E4ApjPh3nwNfTWG.jpg'
    },
    {
        id: 'xxx-05',
        title: '安河桥',
        author: 'GAI',
        path: './music/安河桥.mp3',
        bgPath: 'https://s2.loli.net/2022/11/02/UBsay9vbnDjAcMg.png',
        bbgPath: 'https://s2.loli.net/2022/11/02/dS7uaMRijxTI43P.jpg'
    }
    

];

//获取DOM元素
const audio = doc.querySelector('#audio');//播放器
const bbg = doc.querySelector('body');//背景
const bgimg = doc.querySelector('.img');//插图
const controls = doc.querySelector('#controls');//按钮区域
const title = doc.querySelector('#title');//歌曲名
const author = doc.querySelector('#author');//作者
const playBtn = doc.querySelector('#play');//播放按钮
const voiceBtn = doc.querySelector('#voice');//声音开关
const start = doc.querySelector('#start');//开始时间
const end = doc.querySelector('#end');//结束时间
const bar = doc.querySelector('#bar');//进度条
const now = doc.querySelector('#now');//进度条实时
const model = doc.querySelector('#mode');//播放模式
// 进度条功能
function conversion(value) {
    let minute = Math.floor(value / 60)
    minute = minute.toString().length === 1 ? ('0' + minute) : minute
    let second = Math.round(value % 60)
    second = second.toString().length === 1 ? ('0' + second) : second
    return `${minute}:${second}`
}

audio.onloadedmetadata = function () {
    end.innerHTML = conversion(audio.duration)
    start.innerHTML = conversion(audio.currentTime)
}

bar.addEventListener('click', function (event) {
    let coordStart = this.getBoundingClientRect().left
    let coordEnd = event.pageX
    let p = (coordEnd - coordStart) / this.offsetWidth
    now.style.width = p.toFixed(3) * 100 + '%'

    audio.currentTime = p * audio.duration
    audio.play()
})

setInterval(() => {
    start.innerHTML = conversion(audio.currentTime)
    now.style.width = audio.currentTime / audio.duration.toFixed(3) * 100 + '%'
}, 1000)

//我的喜欢功能
let songsNumbers = '';
let j = 5;
let love = 'https://cloudmusicapi-v5j5.vercel.app/likelist?uid=1323867134'
let request2 = new XMLHttpRequest();
request2.open('GET', love);
request2.withCredentials = true;
request2.responseType = 'json';
request2.send();
request2.onload = function() {
    let loveList = request2.response;
    console.log(loveList)
    seekMusic(loveList);
    

}

function seekMusic(loveList){
    console.log(loveList['ids'].length)
    for(let i = 0;loveList['ids'].length >= i;i++){
        songsNumbers = loveList['ids'][i];
        console.log(songsNumbers);
        musicurl();
        musicDetials();
        
    } 
        
}

function musicurl (){
let musicurl = 'https://cloudmusicapi-v5j5.vercel.app/song/url?id=' + songsNumbers;
let request = new XMLHttpRequest();
request.open('GET', musicurl);
request.responseType = 'json';
request.send();
request.onload = function() {
    let lovemusic = request.response;
    addlovemusic(lovemusic);

}
}
function musicDetials(){
let musicDetials = 'https://cloudmusicapi-v5j5.vercel.app/song/detail?ids=' + songsNumbers;
let request1 = new XMLHttpRequest();
request1.open('GET',musicDetials);
request1.responseType = 'json';
request1.send();
request1.onload = function(){
    let lovemusic1 = request1.response;
    addlovemusicdetials(lovemusic1);
}
}

let addlovemusicdetials = function(lovemusic1){
    songsList[j]['title'] = lovemusic1["songs"][0]["name"];
    songsList[j]['author'] = lovemusic1["songs"][0]["ar"][0]['name'];
    songsList[j]['bgPath'] = lovemusic1["songs"][0]["al"]["picUrl"];
    j++;
  }


  let addlovemusic = function(lovemusic){
    addObject(j);
    songsList[j]['path'] = lovemusic["data"][0]["url"];
  }
  function addObject(value){
    if(songsList[value] === undefined)
        songsList[value] = {};
  }
//当前播放歌曲
let curSongIndex = 0;
//是否在播放
let isPlay = false;
//初始化
function init() {
    render(songsList[curSongIndex]);
    audio.onended = function playOrder() {
        if (curSongIndex >= 0 && curSongIndex < songsList.length - 1) {
            curSongIndex++;
            render(songsList[curSongIndex]);
            songPlay();
        }
    }

}

//按钮事件
controls.addEventListener('click', e => {
    switch (e.target?.id) {
        case 'list': //歌曲列表
            //TODO
            break;
        case 'voice'://声音开关
            voiceControl();
            break;
        case 'pre'://上一首
            if (model.className.split(" ")[1] == 'icon-ziyuan') { RpreSong(); }
            else { preSong(); }
            break;
        case 'play'://播放、暂停
            togglePlay();
            break;
        case 'next'://下一首
            if (model.className.split(" ")[1] == 'icon-ziyuan') { RnextSong(); }
            else { nextSong(); }
            break;
        case 'mode': //播放模式
            playModel();
            break;
        default:
            break;


    }
});
//渲染歌曲方法
function render(song) {
    title.innerHTML = song.title;
    author.innerHTML = song.author;
    audio.volume = 1;//声音0-1
    audio.src = song.path;//音乐资源地址
    bgimg.style.backgroundImage = "url(" + song.bgPath + ")";//背景图片
    bgimg.style.backgroundSize = "cover";

}

let i = 0;
function playModel() {
    let modelicon = ["icon-shunxubofang", "icon-ziyuanldpi", "icon-danquxunhuan", "icon-ziyuan"];
    switch (i) {
        case 0:
            //循环播放
            model.classList.remove(modelicon[i]);
            model.classList.add(modelicon[++i]);
            audio.onended = function loop() {
                if (curSongIndex >= 0 && curSongIndex < songsList.length - 1) {
                    curSongIndex++;
                    render(songsList[curSongIndex]);
                    songPlay();

                }
                if (curSongIndex == songsList.length - 1) {
                    curSongIndex = 0;
                    render(songsList[curSongIndex]);
                    songPlay();
                }

            }
            break;

        case 1:
            model.classList.remove(modelicon[i]);
            model.classList.add(modelicon[++i]);
            //单曲循环
            audio.onended = function solo() {
                songPlay();
            }
            break;

        case 2:
            //随机播放
            model.classList.remove(modelicon[i]);
            model.classList.add(modelicon[++i]);
            audio.onended = function songRandom() {

                curSongIndex = Math.floor(Math.random() * (songsList.length));

                render(songsList[curSongIndex]);

                songPlay();
            }
            break;

        case 3:
            model.classList.remove(modelicon[i]);
            model.classList.add(modelicon[0]);
            //顺序播放
            audio.onended = function playOrder() {
                if (curSongIndex >= 0 && curSongIndex < songsList.length - 1) {
                    curSongIndex++;
                    render(songsList[curSongIndex]);
                    songPlay();
                }
            }
            i = 0;
            break;

        default:
            break;

    }

}

//播放/暂停 功能
function togglePlay() {
    if (!isPlay) {
        //播放 图标切换
        songPlay();
    } else {
        //暂停 图标切换
        songPause();
    }
}
//播放 
function songPlay() {
    isPlay = true;
    playBtn.classList.add('icon-24gf-pause2');
    playBtn.classList.remove('icon-24gf-play');
    audio.play();
}
//暂停
function songPause() {
    isPlay = false;
    playBtn.classList.remove('icon-24gf-pause2');
    playBtn.classList.add('icon-24gf-play');
    audio.pause();
}

//上一首
function preSong() {
    if (curSongIndex > 0) {
        curSongIndex--;
        render(songsList[curSongIndex]);
        songPlay();
    }
}

//下一首
function nextSong() {
    if (curSongIndex < songsList.length - 1) {
        curSongIndex++;
        render(songsList[curSongIndex]);
        songPlay();
    }
}
//随机播放下的上一首
function RpreSong() {
    if (curSongIndex > 0) {
        curSongIndex = Math.floor(Math.random() * (songsList.length));
        render(songsList[curSongIndex]);
        songPlay();
    }
}

//随机播放下的下一首
function RnextSong() {
    if (curSongIndex < songsList.length - 1) {
        curSongIndex = Math.floor(Math.random() * (songsList.length));
        render(songsList[curSongIndex]);
        songPlay();
    }
}

//声音开关
function voiceControl() {
    if (audio.volume > 0) {
        voiceOff();
    } else {
        voiceOn();
    }
}
//声音开
function voiceOn() {
    audio.volume = 1;
    voiceBtn.classList.remove('icon-shengyinguanbi');
    voiceBtn.classList.add('icon-yinliang');
}
function voiceOff() {
    audio.volume = 0;
    voiceBtn.classList.add('icon-shengyinguanbi');
    voiceBtn.classList.remove('icon-yinliang');

}


init();


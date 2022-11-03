const doc =document;
//歌曲信息
const songsList = [

{
    id : 'xxx-01',
    title: '江湖流 (Live)',
    author: 'KEY.L刘聪',
    path: './music/KEY.L刘聪 - 江湖流 (Live).mp3',
    bgPath:'https://s2.loli.net/2022/11/02/d2KhzqHsatiSxWm.jpg',
    bbgPath:'https://s2.loli.net/2022/11/02/E4ApjPh3nwNfTWG.jpg'
        
},
{

    id : 'xxx-02',
    title: '没什么大不了（なんでもないや）',
    author: 'Maxone,夏璃夜',
    path: './music/Maxone,夏璃夜 - 没什么大不了.mp3',
    bgPath:'https://s2.loli.net/2022/11/02/FoikyVNn3dvGuZK.jpg',
    bbgPath:'https://s2.loli.net/2022/11/02/dS7uaMRijxTI43P.jpg'
},
    
{

    id : 'xxx-03',
    title: 'いつも何度でも',
    author: '伊藤サチコ',
    path: './music/伊藤サチコ - いつも何度でも.mp3',
    bgPath:'https://s2.loli.net/2022/11/02/p6kYAtjVJamUHGo.webp',
    bbgPath:'https://s2.loli.net/2022/11/02/dS7uaMRijxTI43P.jpg'
},
{
    id : 'xxx-04',
    title: 'Wild West',
    author: '那奇沃夫,kkluv',
    path: './music/那奇沃夫,kkluv - Wild West.mp3',
    bgPath:'https://s2.loli.net/2022/11/02/f5DaJtNlzM7oZQu.webp',
    bbgPath:'https://s2.loli.net/2022/11/02/E4ApjPh3nwNfTWG.jpg'
},
{
    id : 'xxx-05',
        title:'安河桥',
        author: 'GAI',
        path: './music/安河桥.mp3',
        bgPath:'https://s2.loli.net/2022/11/02/UBsay9vbnDjAcMg.png',
        bbgPath:'https://s2.loli.net/2022/11/02/dS7uaMRijxTI43P.jpg'
}

];

//获取DOM元素
const audio = doc.querySelector('#audio');//播放器
const bbg = doc.querySelector('body');//背景
const bgimg = doc.querySelector('#bg-img');//插图
const controls = doc.querySelector('#controls');//按钮区域
const title = doc.querySelector('#title');//歌曲名
const author = doc.querySelector('#author');//作者
const playBtn = doc.querySelector('#play');//播放按钮
const voiceBtn = doc.querySelector('#voice');//声音开关
const start = doc.querySelector('#start');//开始时间
const end = doc.querySelector('#end');//结束时间
const bar = doc.querySelector('#bar');//进度条
const now = doc.querySelector('#now');//进度条实时

function conversion (value) {
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

//当前播放歌曲
let curSongIndex = 0;
//是否在播放
let isPlay = false;
//初始化
function init(){
    render(songsList[curSongIndex]);
    playOrder();
}

//按钮事件
controls.addEventListener('click',e =>{
        switch(e.target?.id ) {
            case 'list': //歌曲列表
            //TODO
            break;
            case 'voice'://声音开关
                voiceControl();
            break;
            case 'pre' ://上一首
                preSong();
            break;
            case 'play'://播放、暂停
                togglePlay();
            break;
            case 'next'://下一首
                nextSong();
            break;
            case 'mode': //播放模式
            //TODO
            break;
            default:
                break;


        }
});
//渲染歌曲方法
function render(song){
    title.innerHTML = song.title;
    author.innerHTML = song.author;
    bgimg.src = song.bgPath;
    audio.volume = 1;//声音0-1
    audio.src = song.path;//音乐资源地址
    bbg.style.backgroundImage = "url("+song.bbgPath+")";//背景图片
    bbg.style.backgroundSize = "cover";

}
//顺序播放
audio.onended = function playOrder(){
    if(curSongIndex > 0 || curSongIndex < songsList.length-1)
    {
            curSongIndex++;
            render(songsList[curSongIndex]);
            audio.play();
    }
}

//播放/暂停 功能
function togglePlay(){
    if( !isPlay){
        //播放 图标切换
        songPlay();
    }else{
        //暂停 图标切换
        songPause();
    }
}
//播放 
function songPlay(){
      isPlay=true;
      playBtn.classList.add('icon-24gf-pause2');
      playBtn.classList.remove('icon-24gf-play');
      audio.play();  
}
//暂停
function songPause(){
    isPlay=false;
    playBtn.classList.remove('icon-24gf-pause2');
    playBtn.classList.add('icon-24gf-play');
    audio.pause();
}

//上一首
function preSong(){
    if(curSongIndex > 0){
        curSongIndex--;
        render(songsList[curSongIndex]);
        songPlay();
    }
}
    
//下一首
 function nextSong(){
        if(curSongIndex < songsList.length-1){
            curSongIndex++;
            render(songsList[curSongIndex]);
            songPlay();
        }
    } 


//声音开关
function voiceControl(){
    if(audio.volume > 0){
        voiceOff();
    }else{
        voiceOn();
    }
}
//声音开
function voiceOn(){
        audio.volume = 1;
        voiceBtn.classList.remove('icon-shengyinguanbi');
        voiceBtn.classList.add('icon-yinliang');
    }      
function voiceOff(){
    audio.volume = 0;
    voiceBtn.classList.add('icon-shengyinguanbi');
    voiceBtn.classList.remove('icon-yinliang');
    
}


init(); 


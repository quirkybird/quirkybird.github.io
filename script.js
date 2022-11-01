const doc =document;

//歌曲信息
const songsList = [
{
        id : 'xxx-01',
        title:'安河桥',
        author: 'GAI',
        path: './music/安河桥.mp3',
        bgPath:'./images/2.png'
        
},
{

    id : 'xxx-02',
    title: '没什么大不了（なんでもないや）',
    author: 'Maxone,夏璃夜',
    path: './music/Maxone,夏璃夜 - 没什么大不了.mp3',
    bgPath:'./images/1.jpg'
},
    
{

    id : 'xxx-03',
    title: 'いつも何度でも',
    author: '伊藤サチコ',
    path: './music/伊藤サチコ - いつも何度でも.mp3',
    bgPath:'./images/3.webp'
}
];

//获取DOM元素
const audio = doc.querySelector('#audio');//播放器
const bgimg = doc.querySelector('#bg-img');//插图
const controls = doc.querySelector('#controls');//按钮区域
const title = doc.querySelector('#title');//歌曲名
const author = doc.querySelector('#author');//作者
const playBtn = doc.querySelector('#play');//播放按钮
const voiceBtn = doc.querySelector('#voice');//声音开关

//当前播放歌曲
let curSongIndex = 0;
//是否在播放
let isPlay = false;
//初始化
function init(){
    render(songsList[curSongIndex]);
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
        voiceBtn.classList.remove('icon-yinliang');
        voiceBtn.classList.add('icon-shengyinguanbi');
    }      
function voiceOff(){
    audio.volume = 0;
    voiceBtn.classList.remove('icon-shengyinguanbi');
    voiceBtn.classList.add('icon-yinliang');
}


init(); 


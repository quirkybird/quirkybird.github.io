const doc = document;
//歌曲信息
let songsList = [
  {
    id: "xxx-01",
    title: "安河桥",
    author: "GAI",
    path: "./music/安河桥.mp3",
    bgPath: "https://s2.loli.net/2022/11/02/UBsay9vbnDjAcMg.png",
    bbgPath: "https://s2.loli.net/2022/11/02/dS7uaMRijxTI43P.jpg",
  },
];
//获取DOM元素
const audio = doc.querySelector("#audio"); //播放器
const bbg = doc.querySelector("body"); //背景
const bgimg = doc.querySelector(".img"); //插图
const controls = doc.querySelector("#controls"); //按钮区域
const title = doc.querySelector("#title"); //歌曲名
const author = doc.querySelector("#author"); //作者
const playBtn = doc.querySelector("#play"); //播放按钮
const voiceBtn = doc.querySelector("#voice"); //声音开关
const start = doc.querySelector("#start"); //开始时间
const end = doc.querySelector("#end"); //结束时间
const bar = doc.querySelector("#bar"); //进度条
const now = doc.querySelector("#now"); //进度条实时
const model = doc.querySelector("#mode"); //播放模式
const comment = doc.querySelectorAll(".musicComment"); //评论
//歌曲评论功能
const MusicComment = function (x) {
  const comment21 =
    "https://cloudmusicapi-7vsg672j7-qinye233.vercel.app/comment/music?id=" +
    top50result1[x] +
    "&limit=21";
  const request4 = new XMLHttpRequest();
  request4.open("GET", comment21);
  request4.responseType = "json";
  request4.send();
  request4.onload = function () {
    const commentList = request4.response;
    seekComment(commentList);
  };
};
const seekComment = function (commentList) {
  let com = "";
  for (let m = 0; m <= commentList["hotComments"].length - 1; m++) {
    let com = commentList["hotComments"][m]["content"];
    let userUrl = commentList["hotComments"][m]["user"]["avatarUrl"];
    let userName = commentList["hotComments"][m]["user"]["nickname"];
    let timeStr = commentList["hotComments"][m]["timeStr"];
    comment[m].innerHTML =
      "<img" +
      " " +
      "src=" +
      userUrl +
      ">" +
      '<div class="name">' +
      userName +
      "</div>" +
      '<div class="com">' +
      com +
      "</div>" +
      '<div class="time">' +
      timeStr +
      "</div>";
  }
};

// 进度条功能
function conversion(value) {
  let minute = Math.floor(value / 60);
  minute = minute.toString().length === 1 ? "0" + minute : minute;
  let second = Math.round(value % 60);
  second = second.toString().length === 1 ? "0" + second : second;
  return `${minute}:${second}`;
}

audio.onloadedmetadata = function () {
  end.innerHTML = conversion(audio.duration);
  start.innerHTML = conversion(audio.currentTime);
};

bar.addEventListener("click", function (event) {
  let coordStart = this.getBoundingClientRect().left;
  let coordEnd = event.pageX;
  let p = (coordEnd - coordStart) / this.offsetWidth;
  now.style.width = p.toFixed(3) * 100 + "%";

  audio.currentTime = p * audio.duration;
  audio.play();
});

setInterval(() => {
  start.innerHTML = conversion(audio.currentTime);
  now.style.width = (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
}, 1000);

//我的喜欢功能
let songsNumbers = "";
let k = 0;
let j = 1;
let top50result1 = [];
function hitsong(ids) {
  songsNumbers = "";
  k = 0;
  j = 1;
  top50result1 = [];
  songsList = [
    {
      id: "xxx-01",
      title: "安河桥",
      author: "GAI",
      path: "./music/安河桥.mp3",
      bgPath: "https://s2.loli.net/2022/11/02/UBsay9vbnDjAcMg.png",
      bbgPath: "https://s2.loli.net/2022/11/02/dS7uaMRijxTI43P.jpg",
    },
  ];
  const authorTop50 = "https://cloudmusicapi-7vsg672j7-qinye233.vercel.app/artist/top/song?id=" + ids;
  let request3 = new XMLHttpRequest();
  request3.open("GET", authorTop50);
  request3.responseType = "json";
  request3.send();
  request3.onload = function () {
    top50List = request3.response;
    let top50result = "";
    for (let m = 0; m <= top50List["songs"].length - 1; m++) {
      if (m < top50List["songs"].length - 1)
        top50result += String(top50List["songs"][m]["id"] + ",");
      else top50result += String(top50List["songs"][m]["id"]);

      top50result1[m] = top50List["songs"][m]["id"];

      console.log(top50List["songs"][m]["name"]);
    }
    musicurl(top50result);
  };
}

function _seekMusic(loveList) {
  return function () {
    seekMusic(loveList);
  };
}

function seekMusic(loveList) {
  if (k >= 0 && k < loveList.length) {
    songsNumbers = loveList[k];
    k++;
    musicDetials();
    timeId = setTimeout(_seekMusic(top50result1),2000)
  } else {
    window.clearInterval(timeId);
    console.log(k)
    console.log(loveList.length)
    console.log("····················定时器被释放了····················");
  }
}

function musicurl(top50) {
  let musicurl = "https://cloudmusicapi-7vsg672j7-qinye233.vercel.app/song/url?id=" + top50;
  let request = new XMLHttpRequest();
  request.open("GET", musicurl);
  request.responseType = "json";
  request.send();
  request.onload = function () {
    let lovemusic = request.response;
    addlovemusic(lovemusic);
  };
}
function addlovemusic(lovemusic) {
  for (let m = 1; m <= top50result1.length; m++) {
    for (let s = 0; top50result1.length > s; s++) {
      if (top50result1[m - 1] == lovemusic["data"][s]["id"]) {
        if (songsList[m] === undefined) {
          songsList[m] = {
            title: "",
            author: "",
            bgPath: "",
            path: lovemusic["data"][s]["url"],
          };
        }
        break;
      }
    }
  }
}
let addlovemusicdetials = function (lovemusic1) {
  songsList[j]["title"] = String(lovemusic1["songs"][0]["name"]);
  songsList[j]["author"] = lovemusic1["songs"][0]["ar"][0]["name"];
  songsList[j]["bgPath"] = lovemusic1["songs"][0]["al"]["picUrl"];
  console.log(j);
  console.log(songsNumbers);
  console.log(songsList[j]);
  console.log(
    "---------------------------我是分割线---------------------------"
  );
  j++;
};
function musicDetials() {
  let musicDetials =
    "https://cloudmusicapi-7vsg672j7-qinye233.vercel.app/song/detail?ids=" + songsNumbers;
  let request1 = new XMLHttpRequest();
  request1.open("GET", musicDetials);
  request1.responseType = "json";
  request1.send();
  request1.onload = function () {
    let lovemusic1 = request1.response;
    addlovemusicdetials(lovemusic1);
  };
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
      MusicComment(curSongIndex - 1);
    }
  };
}

//按钮事件
controls.addEventListener("click", (e) => {
  switch (e.target?.id) {
    case "list": //歌曲列表
      //TODO
      break;
    case "voice": //声音开关
      voiceControl();
      break;
    case "pre": //上一首
      if (model.className.split(" ")[1] == "icon-ziyuan") {
        RpreSong();
      } else {
        preSong();
      }
      break;
    case "play": //播放、暂停
      togglePlay();
      break;
    case "next": //下一首
      if (model.className.split(" ")[1] == "icon-ziyuan") {
        RnextSong();
      } else {
        nextSong();
      }
      break;
    case "mode": //播放模式
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
  audio.volume = 1; //声音0-1
  audio.src = song.path; //音乐资源地址
  bgimg.style.backgroundImage = "url(" + song.bgPath + ")"; //背景图片
  bgimg.style.backgroundSize = "cover";
}
//音乐可视化方案 2D
function onLoadAudio() {
    var context = new window.AudioContext();
    var analyser = context.createAnalyser();
    analyser.fftSize = 256;
    var source = context.createMediaElementSource(audio);

    source.connect(analyser);
    analyser.connect(context.destination);

    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth-20;
    canvas.height = window.innerHeight;

    var ctx = canvas.getContext("2d");
    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = WIDTH / bufferLength * 1.5;
    var barHeight;

    function renderFrame() {
        requestAnimationFrame(renderFrame);

        analyser.getByteFrequencyData(dataArray);
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        for (var i = 0, x = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];

            var r = barHeight + 10 * (i / bufferLength);
            var g = 200 * (i / bufferLength);
            var b = 100;

            ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

            x += barWidth + 2;
        }
    }

    renderFrame();
    
}

let i = 0;
function playModel() {
  let modelicon = [
    "icon-shunxubofang",
    "icon-ziyuanldpi",
    "icon-danquxunhuan",
    "icon-ziyuan",
  ];
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
          MusicComment(curSongIndex - 1);
        }
        if (curSongIndex == songsList.length - 1) {
          curSongIndex = 0;
          render(songsList[curSongIndex]);
          songPlay();
          MusicComment(curSongIndex - 1);
        }
      };
      break;

    case 1:
      model.classList.remove(modelicon[i]);
      model.classList.add(modelicon[++i]);
      //单曲循环
      audio.onended = function solo() {
        songPlay();
      };
      break;

    case 2:
      //随机播放
      model.classList.remove(modelicon[i]);
      model.classList.add(modelicon[++i]);
      audio.onended = function songRandom() {
        curSongIndex = Math.floor(Math.random() * songsList.length);

        render(songsList[curSongIndex]);
        MusicComment(curSongIndex - 1);
        songPlay();
      };
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
          MusicComment(curSongIndex - 1);
        }
      };
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
  playBtn.classList.add("icon-24gf-pause2");
  playBtn.classList.remove("icon-24gf-play");
  audio.play();
  onLoadAudio();
}
//暂停
function songPause() {
  isPlay = false;
  playBtn.classList.remove("icon-24gf-pause2");
  playBtn.classList.add("icon-24gf-play");
  audio.pause();
}

//上一首
function preSong() {
  if (curSongIndex > 0) {
    curSongIndex--;
    render(songsList[curSongIndex]);
    songPlay();
    MusicComment(curSongIndex - 1);
  }
}

//下一首
function nextSong() {
  if (curSongIndex < songsList.length - 1) {
    curSongIndex++;
    render(songsList[curSongIndex]);
    songPlay();
    MusicComment(curSongIndex - 1);
  }
}
//随机播放下的上一首
function RpreSong() {
  if (curSongIndex > 0) {
    curSongIndex = Math.floor(Math.random() * songsList.length);
    render(songsList[curSongIndex]);
    songPlay();
    MusicComment(curSongIndex - 1);
  }
}

//随机播放下的下一首
function RnextSong() {
  if (curSongIndex < songsList.length - 1) {
    curSongIndex = Math.floor(Math.random() * songsList.length);
    render(songsList[curSongIndex]);
    songPlay();
    MusicComment(curSongIndex - 1);
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
  voiceBtn.classList.remove("icon-shengyinguanbi");
  voiceBtn.classList.add("icon-yinliang");
}
function voiceOff() {
  audio.volume = 0;
  voiceBtn.classList.add("icon-shengyinguanbi");
  voiceBtn.classList.remove("icon-yinliang");
}

init();
//简易搜索模块
let ids = "7570";
const form = doc.querySelector("#form");
//组织表单默认行为
form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  // 自己发请求
  console.log('即将清除计时器编号为' + timeId)
  window.clearTimeout(timeId);
  curSongIndex = 0;
  render(songsList[curSongIndex]);
  sendSearchRequest();
});
//封装一个返回json数据
Object.defineProperty(HTMLFormElement.prototype, "jsondata", {
  get() {
    const jsondata = {};
    const formdata = new FormData(this);
    formdata.forEach((value, key) => {
      if (!jsondata[key]) {
        jsondata[key] =
          formdata.getAll(key).length > 1
            ? formdata.getAll(key)
            : formdata.get(key);
      }
    });
    return jsondata;
  },
});
// 发请求，搜索功能
function sendSearchRequest() {
  const searchSinger =
    "https://cloudmusicapi-7vsg672j7-qinye233.vercel.app/search?keywords=" + form.jsondata.search;
  const request5 = new XMLHttpRequest();
  request5.open("GET", searchSinger);
  request5.responseType = "json";
  request5.send();
  request5.onload = function () {
    const searchId = request5.response;
    if (searchId["result"]["songs"][0]["artists"].find((currentValue) =>{
      if(form.jsondata.search === currentValue["name"]){
        ids = currentValue["id"];
      }
        return form.jsondata.search === currentValue["name"];
    }))
     {
      hitsong(ids);
      timeId = setTimeout(_seekMusic(top50result1), 5000);
      console.log('计时器编号为' + timeId)
      alert(
        "找到啦！"
      );
    } else {
      alert("找不到" + form.jsondata.search + "，再试试其他歌手");
    }
  };
}
//找到歌手top50
hitsong(ids);
//找歌曲细节
let timeId = setTimeout(_seekMusic(top50result1), 5000);

//重写alert样式
window.alert = function (msg) {
  //创建弹出窗口（用DIV），窗口上的内容包括一个显示文本字符串的容器和一个按钮
  var box = document.createElement("div");
  var msgbox = document.createElement("div");
  box.appendChild(msgbox);
  var heartImg = document.createElement("img");
  box.appendChild(heartImg);
  var btn = document.createElement("button");
  box.appendChild(btn);
  document.body.appendChild(box);

  //设置弹出窗口的显示样式
  box.style.cssText =
    "position:relative;border:1px solid gray;width:300px;height:200px;padding:10px;z-index=100;background:white;box-shadow: 5px 10px 15px rgb(54,79,60,0.4);border-radius:10px;";

  //设置弹出窗口的位置
  box.style.position = "absolute";
  box.style.top = "50px";
  box.style.left = "50%";
  box.style.transform = "translate(-50%)";
  box.style.zIndex = 100;

  //设置弹出窗口上的文本内容及其样式
  msgbox.style.cssText =
    "height:50px;padding:10px;text-align:center;font-size:large;";
  msgbox.innerHTML = msg;

  //插图
  heartImg.src = "./images/heart.png";
  heartImg.style.width = "80px";
  heartImg.style.position = "absolute";
  heartImg.style.left = "36%";

  //设置按钮
  btn.innerHTML = "我知道了";
  btn.style.cssText =
    "position:absolute;bottom:10px;left:110px;background-color:#93b5cf;border: 1px solid #4e7ca1;border-radius:6px;font-size:large;";

  //给按钮绑定单击事件
  btn.onclick = function () {
    document.body.removeChild(box); //点击确定按钮后让alert窗口消失
  };
};

let recordedChunks = [];
let recoder;

window.onload = init;

function init(){

  // binded camera & audio to video tag
  let video = document.getElementById('record')// 適当にvideoタグのオブジェクトを取得
  let constrains = { video: true, audio: true }// 映像・音声を取得するかの設定
  navigator.mediaDevices.getUserMedia(constrains)
  .then(function(stream) {
      video.srcObject = stream // streamはユーザーのカメラとマイクの情報で、これをvideoの入力ソースにする
      video.muted = true
      video.play()
  })
  .catch(function(err) {
      console.log("An error occured! " + err)
  })

  // まずはユーザーのカメラ・マイクへのアクセスを実施
  navigator.mediaDevices.getUserMedia(constrains)
  .then(function (stream) {
    recoder = new MediaRecorder(stream) // 映像の入力ソースをユーザーのデバイスから取得
    recoder.ondataavailable = function (ev) {
      const width = 300;
      const height = 300;
      let saved_video = document.getElementById('saved_video')
      saved_video.setAttribute('controls', '')
      saved_video.setAttribute('width', width)
      saved_video.setAttribute('height', height)
      let outputdata = window.URL.createObjectURL(ev.data) // videoタグが扱えるように、記録データを加工
      saved_video.src = outputdata // テスト用のビデオのソースに記録データを設置
      // chunk for DL
      if (ev.data.size > 0) {
        recordedChunks.push(ev.data);
      }
    }
  })


  //start stop
  let startbutton = document.getElementById("start")
  let stopbutton = document.getElementById("stop")
  let download = document.getElementById("download");
  let status = document.getElementById("status")
  startbutton.addEventListener('click', function(ev){
    recoder.start()
    status.innerText = "録画中"
    startbutton.setAttribute("disabled", "")
    stopbutton.removeAttribute("disabled")
    ev.preventDefault()
    recordedChunks = []
  }, false);

  stopbutton.addEventListener('click', function(ev) {
    recoder.stop()
    stopbutton.setAttribute("disabled", "")
    startbutton.removeAttribute("disabled")
    download.removeAttribute("disabled")
    status.innerText = "停止中"
  });

  //download
  download.addEventListener("click", function(ev){
    console.log(recordedChunks)
    let blob = new Blob(recordedChunks, { type: 'video/webm' })// 録画ファイルをblob形式に出力
    let url = window.URL.createObjectURL(blob) // データにアクセスするためのURLを作成
    let a = document.createElement('a') // download属性を持ったaタグをクリックするとダウンロードができるので、それをシミュレートする
    document.body.appendChild(a)
    a.style = 'display:none'
    a.href = url;
    a.download = 'record.webm'
    a.click()
    window.URL.revokeObjectURL(url)
  })
}

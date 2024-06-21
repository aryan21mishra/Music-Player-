const songDetails = [
          {
                    Name: 'Ram Bhakt Hanuman',
                    song: './Songs/Y2meta.app - Ram Bhakt Hanuman _ Narci _ Hanuman Setu EP _ Hindi Rap (128 kbps).mp3',
          },
          {
                    Name: 'Ram Siya Ke Maruti',
                    song: './Songs/Y2meta.app - Ram Siya Ke Maruti _ Narci _ Hanuman Setu EP _ Hindi Rap (128 kbps).mp3',
          },
          {
                    Name: 'Hanuman Setu',
                    song: './Songs/Y2meta.app - Hanuman Setu _ Narci _ Hanuman Setu EP _ Vijayadashami Special _ Hindi Rap (128 kbps).mp3',
          },
          {
                    Name: 'Bajrangbali Aur Main',
                    song: './Songs/Y2meta.app - Bajrangbali Aur Main _ Narci _ Hanuman Setu EP _ Hindi Rap (128 kbps).mp3',
          },
          {
                    Name: 'Jai Hanumant',
                    song: './Songs/Jai Hanumant - Vickky Agarwal, Narci, & Ashwin Trivedi.mp3',
          },
          {
                    Name: 'Mahadev Aur Main',
                    song: './Songs/Y2meta.app - Mahadev Aur Main _ Narci _ Hindi Rap (128 kbps).mp3',
          },
          {
                    Name: 'Mere Raghunath',
                    song: './Songs/Mere Raghunath _ Narci _ Sidhant Bhatia _ Hindi Rap (Prod. By Narci) (128).mp3',
          },
          {
                    Name: ' Paap Naashak',
                    song: './Songs/Paap Naashak _ Narci _ Hindi Rap (Prod. By Narci) (192).mp3',
          },
          {
                    Name: 'Vrindavan Mein',
                    song: './Songs/Vrindavan Mein _ Narci _ Sonika _ Hindi Rap (Prod. By Narci) (192).mp3'
          },
]
const forward_btn = document.querySelector('#forward-btn')
const play_btn = document.querySelector('#play-btn')
const volume = document.querySelector('#volume')
const music_name = document.querySelector('.music-name')
const backward_btn = document.querySelector('#backward-btn')
const pause_btn = document.querySelector('#pause-btn')
const range = document.querySelector('#range')
const durationTime = document.querySelector('.durationTime')
const Current_Time = document.querySelector('.currentTime')
const Shuffle = document.querySelector('#shuffle')
const Repeat = document.querySelector('#repeat')
const BSkip = document.querySelector('#bskip')
const FSkip = document.querySelector('#fskip')

const audio = new Audio()
let current_song = 0;
let audioStatus = false
let shuffleStatus = false
let repeatStatus = false


function playsong() {
          music_name.innerHTML = songDetails[current_song].Name
          audio.src = songDetails[current_song].song
}

playsong()
function automaticallyplay() {
          if (repeatStatus == false) {
                    audio.addEventListener('ended', function () {
                              current_song++;
                              if (current_song >= songDetails.length) {
                                        current_song = 0
                                        playsong()

                              } else {
                                        playsong()

                              }
                              audio.play()
                    })
                    console.log(`condition chal ri hai fuction ke andar`);
          }
}
automaticallyplay()
audio.onloadeddata = function () {

          let durationM = minutes(Math.floor((audio.duration / 60)))
          let durationS = seconds(Math.floor(audio.duration % 60))

          function seconds(sec) {
                    if (sec < 10) {
                              return "0" + sec.toString().trim()
                    } else {
                              return sec
                    }
          }
          function minutes(min) {
                    if (min < 10) {
                              return "0" + min.toString().trim()
                    } else {
                              return min
                    }
          }

          durationTime.innerHTML = `${durationM}:${durationS}`
          range.max = audio.duration

}

audio.addEventListener('timeupdate', function () {

          let currentM = minutes(Math.floor((audio.currentTime / 60)))
          let currentS = seconds(Math.floor((audio.currentTime % 60)))
          function seconds(sec) {
                    if (sec < 10) {
                              return "0" + sec.toString().trim()
                    } else {
                              return sec
                    }
          }
          function minutes(min) {
                    if (min < 10) {
                              return "0" + min.toString().trim()
                    } else {
                              return min
                    }
          }
          Current_Time.innerHTML = `${currentM}:${currentS}`

          range.value = audio.currentTime

          range.addEventListener('change', function () {
                    audio.currentTime = range.value
          })


})

forward_btn.addEventListener('click', () => {
          if (shuffleStatus == true) {
                    let num = Math.floor(Math.random() * 10)
                    if (num <= songDetails.length - 1) {
                              console.log("chalri hai condition");
                              current_song = num
                    } else {
                              console.log("nahi chal ri haI condion");
                              num = 0
                              current_song = num
                    }
          }
          else if (current_song < songDetails.length - 1) {
                    current_song += 1
                    backward_btn.style.opacity = 1
          }
          else {
                    forward_btn.style.opacity = .5
          }
          playsong()
          audio.play()

})

play_btn.addEventListener('click', function () {
          if (audioStatus == false) {
                    audio.play()
                    play_btn.classList.add('ri-pause-fill')
                    play_btn.classList.remove('ri-play-fill')
                    audioStatus = true
          } else {
                    audio.pause()
                    play_btn.classList.remove('ri-pause-fill')
                    play_btn.classList.add('ri-play-fill')
                    audioStatus = false
          }
})

backward_btn.addEventListener('click', function () {
          if (shuffleStatus == true) {
                    let num = Math.floor(Math.random() * 10)
                    if (num <= songDetails.length - 1) {
                              console.log("chalri hai condition");
                              current_song = num
                    } else {
                              console.log("nahi chal ri haI condion");
                              num = 0
                              current_song = num
                    }
          }
          else if (current_song > 0) {
                    current_song -= 1
                    forward_btn.style.opacity = 1
          }
          else {
                    backward_btn.style.opacity = 0.5
          }
          playsong()
          audio.play()
})

Shuffle.addEventListener('click', function () {
          if (shuffleStatus == false) {
                    Shuffle.style.opacity = 0.7
                    shuffleStatus = true
          } else {
                    Shuffle.style.opacity = 1
                    shuffleStatus = false
          }
})

BSkip.addEventListener('click', function () {
          audio.currentTime -= 10
})

FSkip.addEventListener('click', function () {
          audio.currentTime += 10
})
Repeat.addEventListener('click', function () {
          if (repeatStatus == false) {
                    Repeat.style.opacity = .7
                    repeatStatus = true
          } else {
                    Repeat.style.opacity = 1
                    repeatStatus = false
          }
})

volume.addEventListener('change', (e) => {
          audio.volume = e.target.value / 100
})

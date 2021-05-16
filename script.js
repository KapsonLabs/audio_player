 const musicContainer = document.querySelector('.music-container')
 const playBtn = document.querySelector('#play')
 const stopBtn = document.querySelector('#stop')
 const prevBtn = document.querySelector('#prev')
 const nextBtn = document.querySelector('#next')
 const audio = document.querySelector('#audio')
 const progress = document.querySelector('.progress')
 const progressContainer = document.querySelector('.progress-container')
 const title = document.querySelector('#title')
 const cover = document.querySelector('#cover')

 //these are our song titles
 const songs = ['lifetime', 'Pami', 'Ebisooka']

 let songIndex = 2

 //initially load songs
 loadSong(songs[songIndex])

 function loadSong(song) {
     title.innerText = song
     audio.src = `music/${song}.mp3`
     cover.src = `images/${song}.jpg`
 }

 function playSong(){
     musicContainer.classList.add('play')
     playBtn.querySelector('i.fas').classList.remove('fa-play')
     playBtn.querySelector('i.fas').classList.add('fa-pause')

     audio.play()
 }

 function pauseSong(){
     musicContainer.classList.remove('play')
     playBtn.querySelector('i.fas').classList.add('fa-play')
     playBtn.querySelector('i.fas').classList.remove('fa-pause')

     audio.pause()
 }

 function stopSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
    audio.currentTime=0
 }

 function prevSong(){
    songIndex--

    if (songIndex < 0){
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])

    playSong()
 }

 function nextSong(){
    songIndex++

    if(songIndex > songs.length - 1){
        songIndex = 0
    }

    loadSong(songs[songIndex])

    playSong()
 }

 function updateProgress(e){
     const {duration, currentTime} = e.srcElement
     const progressPercent = (currentTime/duration) * 100
     progress.style.width = `${progressPercent}%`
 }

 function setProgress(e) {
     const width = this.clientWidth
     const clickX = e.offsetX
     const duration = audio.duration

     audio.currentTime = (clickX/ width) * duration
 }

  

 //EVENT LISTENERS
 playBtn.addEventListener('click', () => {
     const isPlaying = musicContainer.classList.contains('play')

     if(isPlaying){
         pauseSong()
     }else{
         playSong()
     }
 })

 stopBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying){
        stopSong()
    }
})

// change songs events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)
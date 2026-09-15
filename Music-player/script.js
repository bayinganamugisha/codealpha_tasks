const audio = document.getElementById('audio-player');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');

const progressBar = document.getElementById("progress-bar");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");

const volumeControl = document.getElementById("volume-control");

const shuffleButton = document.getElementById("shuffle");

const repeatButton = document.getElementById("repeat");

const songs = [
    { 
        title: "Yego", 
        file: "music/DMS - Yego.mp3",
        artist: "DMS",
        cover: "images/Yego.png"
    },
    { 
        title: "Ku rutonde", 
        file: "music/kurutonde by mahoni (2).mp3.mp3", 
        artist: "MC Mahoni Boni",
        cover: "images/kurutonde.jpg"
    },
    { 
        title: "Fanya kazi", 
        file: "music/Fanya kazi.mp3",
        artist: "Young G.", 
        cover: "images/fanyakazi.jpg"
        },
        
];
let currentSongIndex = 0;

let isShuffleOn = false; // Variable to track shuffle state

let isRepeatOn = false; // Variable to track repeat state

function loadSong(index) { // Load the song at the given index
    const song = songs[index];
    audio.src = song.file;
    document.getElementById('song-title').textContent = song.title;
    document.getElementById('song-artist').textContent = song.artist;
    document.getElementById('album-art').src = song.cover;
}

playButton.addEventListener('click', () => { // play button click handler
    if (audio.paused) {
        audio.play();
        playButton.textContent = '⏸';
    } else {
        audio.pause();
        playButton.textContent = "▶";
    }
audio.addEventListener("ended", () => {

    if (isRepeatOn) {

        audio.currentTime = 0;

        audio.play();

        return;
    }

    if (isShuffleOn) {

        let randomIndex;

        do {
            randomIndex = Math.floor(Math.random() * songs.length);
        } while (randomIndex === currentSongIndex);

        currentSongIndex = randomIndex;

    } else {

        currentSongIndex++;

        if (currentSongIndex >= songs.length) {
            currentSongIndex = 0;
        }

    }

    loadSong(currentSongIndex);

    updateActiveSong();

    audio.play();

    playButton.textContent = "⏸";

});
})
function createPlaylist() { // Create the playlist in the HTML

    const playlistContainer =
        document.getElementById("playlist-container");

    songs.forEach((song, index) => { // For each song in the songs array, create a playlist item

        const playlistItem = document.createElement("div"); // Create a div element for the playlist item

        playlistItem.classList.add("playlist-item"); // Add the "playlist-item" class to the div element


        playlistItem.innerHTML = `
            <div class="playlist-info">
                <span class="playlist-title">${song.title}</span>
                <span class="playlist-artist">${song.artist}</span>
            </div>
        `;

        playlistItem.addEventListener("click", () => {

            currentSongIndex = index;

            loadSong(currentSongIndex);

            audio.play();

            playButton.textContent = "⏸";

            updateActiveSong();

        });

        playlistContainer.appendChild(playlistItem);

    });

}
function updateActiveSong() { // Update the active song in the playlist

    const playlistItems =
        document.querySelectorAll(".playlist-item");

    playlistItems.forEach((item, index) => {

        if (index === currentSongIndex) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }

    });

}
nextButton.addEventListener("click", () => {

    if (isShuffleOn) {

        let randomIndex;

        do {
            randomIndex = Math.floor(Math.random() * songs.length);
        } while (randomIndex === currentSongIndex);

        currentSongIndex = randomIndex;

    } else {

        currentSongIndex++;

        if (currentSongIndex >= songs.length) {
            currentSongIndex = 0;
        }

    }

    loadSong(currentSongIndex);

    updateActiveSong();

    audio.play();

    playButton.textContent = "⏸";

});
previousButton.addEventListener('click', () => { // previous button click handler
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex); // Load the previous song
    audio.play();
    playButton.textContent = '⏸';
    updateActiveSong();
})

function formatTime(seconds) { // Format the time in minutes and seconds
 
    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
}

audio.addEventListener("loadedmetadata", () => { // When the audio metadata is loaded, set the progress bar max value and display the duration

    progressBar.max = audio.duration;

    durationDisplay.textContent = formatTime(audio.duration);

});
audio.addEventListener("timeupdate", () => { // When the audio time updates, update the progress bar value and display the current time

    progressBar.value = audio.currentTime;

    currentTimeDisplay.textContent = formatTime(audio.currentTime);

});
progressBar.addEventListener("input", () => { // When the user interacts with the progress bar, update the current time of the audio

    audio.currentTime = progressBar.value;

});

volumeControl.addEventListener("input", () => { // When the user interacts with the volume control, update the audio volume

    audio.volume = volumeControl.value;

});

shuffleButton.addEventListener("click", () => {

    isShuffleOn = !isShuffleOn;

    shuffleButton.classList.toggle("active");

});

repeatButton.addEventListener("click", () => {

    isRepeatOn = !isRepeatOn;

    repeatButton.classList.toggle("active");

});

loadSong(currentSongIndex);
createPlaylist();
updateActiveSong();
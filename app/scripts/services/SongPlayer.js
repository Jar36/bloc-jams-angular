(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};

    /**Private Attribute
    * @desc Copy of album template
    * @type {Object}
    */
    var currentAlbum = Fixtures.getAlbum();

    /**Private Attribute
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;

    /**Private Function 1
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
    };

    /**Private Function 2
    * @function playSong
    * @desc Plays currently clicked song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var playSong = function(song){
      if (currentBuzzObject) {
        currentBuzzObject.play();
        song.playing = true;
      }

    };

    /**Private Function 3
    * @function getSongIndex
    * @desc gets the index of a song in list of songs
    * @param {Object} song
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    /**Public Attribute
    * @desc Active song from list of songs
    * @type {Object}
    */
    SongPlayer.currentSong = null;

    /**Public Method 1
    * @function play
    * @desc Plays currently clicked song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      }

      else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };

    /**Public Method 2
    * @function pause
    * @desc Pauses currently clicked song and stops audio file
    * @param {Object} song
    */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**Public Method 3
    * @function previous
    * @desc uses getSongIndex and object to decrement the song checks if song is less than zero if it is then it will stop the currently playing audio file and sets currently playing song value to the first song.
    * @param {Object} SongPlayer.currentSong
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }

      else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

  return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();

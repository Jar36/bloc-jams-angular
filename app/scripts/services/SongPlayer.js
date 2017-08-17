(function() {
  function SongPlayer($rootScope, Fixtures) {
    var SongPlayer = {};

    /* / PRIVATE ATTRIBUTES / */

    /**
    * @desc Copy of album template
    * @type {Object}
    */
    var currentAlbum = Fixtures.getAlbum();

    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;

    /* / PRIVATE FUNCTIONS / */

    /**
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

      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentTime = currentBuzzObject.getTime();
        });
      });

      SongPlayer.currentSong = song;
    };

    /**
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

    var stopSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }
    };

    /**
    * @function getSongIndex
    * @desc gets the index of a song in list of songs
    * @param {Object} song
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    /* / PUBLIC ATTRIBUTES / */

    /**
    * @desc Active song from list of songs
    * @type {Object}
    */
    SongPlayer.currentSong = null;

    /**
    * @desc Current playback time (in seconds) of currently playing song
    * @type {Number}
    */
    SongPlayer.currentTime = null;

    /* / PUBLIC METHODS / */

    /**
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

    /**
    * @function pause
    * @desc Pauses currently clicked song and stops audio file
    * @param {Object} song
    */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
    * @function previous
    * @desc uses getSongIndex and object to decrement the song checks if song is less than zero if it is then it will stop the currently playing audio file and sets currently playing song value to the first song.
    * @param {Object} SongPlayer.currentSong
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong(SongPlayer.currentSong);
        /*currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;*/
      }

      else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /**
    * @function next
    * @desc uses getSongIndex and object to move to the song checks if song is less than zero if it is then it will stop the currently playing audio file and sets currently playing song value to the first song.
    * @param {Object} SongPlayer.currentSong
    */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex < 0) {
        stopSong(SongPlayer.currentSong);
        /*currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;*/
      }

      else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }

    };

    /**
    * @function setCurrentTime
    * @desc Set current time (in seconds) of currently playing song
    * @param {Number} time
    */
    SongPlayer.setCurrentTime = function(time) {
     if (currentBuzzObject) {
       currentBuzzObject.setTime(time);
     }
    };


  return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();

(function() {
  function SongPlayer() {
    var SongPlayer = {};

    //Private Attribute

    /**
    * @desc Buzz object audio file
    * @type {Object}
    */

    var currentSong = null;

    //Private Attribute

    /**
    * @desc Buzz object audio file
    * @type {Object}
    */

    var currentBuzzObject = null;

    /* Private Function 1 */

    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */

    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentSong = song;
    };

    /* =============== */

    /* Private Function 2 */

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

    /* Public Method 1 */

    SongPlayer.play = function(song) {
      if (currentSong !== song) {
        setSong(song);
        playSong(song);
        /*currentBuzzObject.play();
        song.playing = true;*/
      }

      else if (currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
         /*currentBuzzObject.play();
         song.playing = true;*/
        }
      }
    };

    /* ================ */


    /* Public Method 2 */

    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };

    /* ================ */

  return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
 })();

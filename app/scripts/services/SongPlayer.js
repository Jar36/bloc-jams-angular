(function() {
  function SongPlayer() {
    var SongPlayer = {};
    
    //Private Attribute
    var currentSong = null;

    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    //Private Attribute
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

    /* ================ */

    /* Public Method 1 */

    SongPlayer.play = function(song) {
      if (currentSong !== song) {
        setSong(song);
        currentBuzzObject.play();
        song.playing = true;
      }

      else if (currentSong === song) {
        if (currentBuzzObject.isPaused()) {
         currentBuzzObject.play();
         song.playing = true;
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

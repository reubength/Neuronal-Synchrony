window.record = (function() {

  /**
   * Record key movements! Requires jQuery
   */

  var startTime, endTime, playing = false, index = 0;

  var $window = $(window);

  var record = {

    data: [],

    start: function() {

      if (playing) {
        return;
      }

      startTime = Date.now();

      record.save = function(e) {
        record.data.push(e.which, Date.now() - startTime);
      };

      $(window).bind('keyup', record.save);

      return record;

    },

    export: function() {
      return JSON.stringify(record.data);
    },

    replay: function(data) {

      if (playing) {
        return record;
      }

      playing = true;

      startTime = Date.now();

      record.data = data;

      return record;

    },

    update: function(time) {

      var elapsed = time || (Date.now() - startTime);

      for (var i = index, l = this.data.length; i < l; i+=2) {
        if (record.data[i + 1] < elapsed) {
          $window.trigger('keyup', [record.data[i]]);
          index = i + 1;
        } else {
          break;
        }
      }

      return record;

    },

    end: function() {

      playing = false;

      endTime = Date.now();

      $(window).unbind('keyup', record.save);

      return record;

    }

  };

 return record;

})();
(function() {
  var init, loc;

  loc = window.parent.location || document.location;

  init = function(el) {
    var odometer, tag, update;
    odometer = new Odometer({
      el: el,
      theme: 'minimal',
      value: 0
    });
    odometer.render();
    tag = document.createElement('script');
    document.body.appendChild(tag);
    HubStars.Twitter = {
      set: function(data) {
        return odometer.update(data.count);
      }
    };
    update = function() {
      tag.src = "https://cdn.api.twitter.com/1/urls/count.json?callback=HubStars.Twitter.set?&url=" + (loc.toString().split('?')[0]) + "&_=" + (Math.random());
      return setTimeout(update, 10000);
    };
    return setTimeout(update, 1000);
  };

  HubStars.addSource({
    pattern: /^\/twitter\/(\w+)/,
    init: function(el, theme) {
      var spinner;
      el.className += ' twitter';
      el.innerHTML = "<div class=\"label\">Tweet</div><div class=\"odometer\">0</div>";
      el.addEventListener('click', function(e) {
        var left, top, url;
        e.preventDefault();
        url = "https://twitter.com/intent/tweet" + document.location.search;
        left = screen.width / 2 - 550 / 2;
        top = screen.height / 2 - 420 / 2;
        return window.open(url, 'intent', "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,left=" + (left | 0) + ",top=" + (top | 0));
      });
      spinner = el.querySelector('.odometer');
      return init(spinner);
    }
  });

}).call(this);

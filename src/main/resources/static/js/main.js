var cube = new ERNO.Cube();

$(document).ready(function() {
    $("#btn-play").click(function () {
        console.log("init game");
        $("footer").remove();
        $(".menu").empty();
        $("#wrapper").css("background","none")
                     .append("<div class='countdown'><div class='countdown-text'>Time</div><div class='countdown-digit' id='seconds'>00</div> </div>")
                     .append( cube.domElement );
        var timer = new Countdown(10000);
        timer.start();
        // console.log(timer);
    });
})
function Countdown(duration) {
    var self = this;
    this.duration = duration;
    this.running = false;
    this.els = {
        seconds: document.getElementById("seconds")
    };
}
Countdown.prototype.start = function() {
    var self = this;
    var start = null;
    this.running = true;
    var remainingSeconds =this.els.seconds.textContent = this.duration/1000;

    function draw(now) {
        if (!start) start = now;
        var diff = now - start;
        var newSeconds = Math.ceil((self.duration - diff)/1000);

        if (diff <= self.duration) {
            if (newSeconds != remainingSeconds) {
                self.els.seconds.textContent = newSeconds;
                remainingSeconds = newSeconds;
            }

            self.frameReq = window.requestAnimationFrame(draw);
        } else {
            //self.running = false;
            self.els.seconds.textContent = 0;
        }
    };

    self.frameReq = window.requestAnimationFrame(draw);
}
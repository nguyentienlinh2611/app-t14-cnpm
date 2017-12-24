var cube = new ERNO.Cube();

$(document).ready(function() {
    $("#btn-play").click(function () {
        console.log("init game");
        $("footer").remove();
        $(".menu").empty();
        $("#wrapper").css("background","none")
                     .append("<div class='countdown'><div class='countdown-text'>Time</div><div class='countdown-digit' id='seconds'>00</div> </div>")
                     .append( cube.domElement );
        cube.shuffle(20);
        var timer = new Watch();
        setTimeout(function(){timer.countdown(3000)},11000);
    });
})
function Watch() {
    var self = this;
    this.seconds = document.getElementById("seconds");
}
Watch.prototype.countdown = function(duration) {
    var self = this;
    var start = null;
    this.duration = duration;
    cube.paused = true;
    var remainingSeconds =this.seconds.textContent = this.duration/1000;
    function draw(now) {
        if (!start) start = now;
        var diff = now - start;
        var newSeconds = Math.ceil((self.duration - diff)/1000);

        if (diff < self.duration) {
            if (newSeconds != remainingSeconds) {
                self.seconds.textContent = newSeconds;
                remainingSeconds = newSeconds;
            }

            self.frameReq = window.requestAnimationFrame(draw);
        } else {
            self.seconds.textContent = 0;
            cube.paused = false;
            self.stopwatch();
        }
    };
    self.frameReq = window.requestAnimationFrame(draw);
}
Watch.prototype.stopwatch = function () {
    var self = this;
    var min = 0;
    var sec = 0;
    var millisec = 0;
    var Interval = setInterval(startTimer,10);
    function startTimer() {
        if(cube.isSolved()){
            clearInterval(Interval);
            cube.paused = true;
            SolveSuccess();
        }
        millisec++;
        if(millisec>99){
            sec++;
            millisec=0;
            if(sec>59){
                min++;
                sec=0;
            }
        }
        self.seconds.textContent = min + ":" + sec + "." + millisec;
    }
}
function SolveSuccess() {
    var self = this;
    $("#wrapper").append("<div class='overlay'>" +
        "<div class='modal'><div class='modal-top'>" +
        "<img class='modal-icon u-imgResponsive' src='./media/100daysui_100icon.png'>" +
        "<div class='modal-header'>Congratulations!</div><div class='modal-subheader'>You have successfully solved in "+$('#seconds').text()+"</div>" +
        "</div>" +
        "<div class='modal-bottom'><div class='modal-input'><input></div><div class='modal-button'><a href='' class='submit'>Submit</a><a href='' class='share'>Share</a></div> </div> </div> " +
        "</div>");
}


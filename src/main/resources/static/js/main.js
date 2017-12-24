var cube = new ERNO.Cube();
var timer = new Watch();
$(document).ready(function() {
    $("#btn-play").click(function () {
        console.log("init game");
        $("footer").remove();
        $(".menu").empty();
        $("#wrapper").css("background","none")
                     .append("<div class='countdown'><div class='countdown-text'>Time</div><div class='countdown-digit' id='seconds'>00</div> </div>")
                     .append( cube.domElement );
        cube.shuffle(20);
        setTimeout(function(){timer.countdown(3000)},12000);
    });
})
function Watch() {
    var self = this;
}
Watch.prototype.countdown = function(duration) {
    var self = this;
    this.seconds = document.getElementById("seconds");
    var start = null;
    this.duration = duration;
    cube.paused = true;
    console.log(this.seconds);
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
    this.getDuration = function () {
        return min*60+sec+millisec*0.01;
    }
}
function SolveSuccess() {
    var self = this;
    $("#wrapper").append("<div class='overlay'>" +
        "<div class='modal'><div class='modal-top'>" +
        "<img class='modal-icon u-imgResponsive' src='./media/100daysui_100icon.png'>" +
        "<div class='modal-header'>Congratulations!</div><div class='modal-subheader'>You have successfully solved in "+$('#seconds').text()+"</div>" +
        "</div>" +
        "<div class='modal-bottom'><div class='modal-input'><input id='username'><a onclick='sendRecord()' class='submit'>Submit</a></div> </div> </div> " +
        "</div>");
}
function post(url, data) {
    return $.ajax({
        type: 'POST',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    })
}
function getPreviousMessages() {
    console.log($.get('/record'));
    $.get('/record').done(messages => appendMessage(messages));
}

function appendMessage(messages) {
    messages.forEach(function (message,index) {
        $("mark:eq("+index+")").html(message.userName);
        $("small:eq("+index+")").html(message.duration);
    })
}

function sendRecord() {
    var usernameInput = $('#username').val();
    var record = {userName: usernameInput, duration:timer.getDuration(),time:Date.now()};
    post('/record', record);
    window.location.reload(true);
}

function onNewMessage(result) {
    var message = JSON.parse(result.body);
    console.log(message);
}

function connectWebSocket() {
    var socket = new SockJS('/rubikonlineWS');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, (frame) => {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/records', onNewMessage);
    });
}

getPreviousMessages();
connectWebSocket();


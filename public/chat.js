window.onload = function() {

    var port = 3000;
    var messages = [];
    var socket = io.connect('http://localhost:' + port);
    var name = document.getElementById("name");
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");

    var ls = localStorage;

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += messages[i].person + '> ' + messages[i].message + '<br />';
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });


    function sendChatMessage() {
        var person = name.value;
        var color = ls.color;
        var text = field.value;

        socket.emit('send', { person: person, color: color, message: text});

        field.value = '';
    }

    sendButton.onclick = sendChatMessage;

    field.onkeydown = function (evt) {
        var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;

        if (keyCode == 13) {
            // For Enter.
            sendChatMessage();
        }

        if (keyCode == 27) {
            // For Escape.
            // Your function here.
        }
    };

    name.onchange = function () {
        ls.name = this.value;
    };

    // Set chatter name
    if (! ls.name) {
        ls.name = 'Person ' + ('' + Math.random()) .substr(3, 3);
    }

    name.value = ls.name;

    // Ready to chat
    field.focus();
};
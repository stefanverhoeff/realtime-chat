window.onload = function() {

    var port = 3000;
    var messages = [];
    var socket = io.connect('http://localhost:' + port);
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data.message);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '> ' + messages[i] + '<br />';
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });

    field.onkeydown = function (evt) {
        var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
        if (keyCode == 13) {
            // For Enter.
                var text = field.value;
                socket.emit('send', { message: text });

                field.value = '';
        }

        if (keyCode == 27) {
            // For Escape.
            // Your function here.
        }
    };


    field.focus();

};
/*
if (annyang) {
  var commands = {
    'go to *tag': navigateToPage,
  };

  var navigateToPage = function(tag) {
    var url = 'http://www.' + tag + '.com';
    window.location.href = url;
  }

  annyang.addCommands(commands);

  annyang.start();
}
*/
var speechStarted = false;

window.onload = function(){
    artyom.initialize({
        lang:"en-GB",
        debug:true,
        listen:true
    }).then(function(){
        console.log("Artyom has been correctly initialized");
        console.log("The following array shouldn't be empty" , artyom.getVoices());
    }).catch(function(){
        console.error("An error occurred during the initialization");
    });
};

var settings = {
    continuous:true, // Don't stop never because i have https connection
    onResult:function(text){
        // text = the recognized text
        console.log(text);
        var tempText = text;
        tempText = tempText.replace("what if", "");
        tempText = tempText.replace("what is", "");
        tempText = tempText + "?";
        $("#ask-textbox").val(tempText);
    },
    onStart:function(){
        console.log("Dictation started by the user");
    },
    onEnd:function(){
      console.log("Dictation stopped by the user");
    }
};

var UserDictation = artyom.newDictation(settings);

function startRecognition(){
  UserDictation.start();
}

function stopRecognition(){
  UserDictation.stop();
}

(function($) {
  $.fn.setCursorPosition = function(pos) {
    if ($(this).get(0).setSelectionRange) {
      $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
      var range = $(this).get(0).createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }
}(jQuery));

$("#ask-textbox").keyup(function(){
  if($("#ask-textbox").val().includes("what if")) {
    tempText = $("#ask-textbox").val();
    tempText = tempText.replace("what if", "");
    $("#ask-textbox").val(tempText);
  }
  if ($(this).val().split('').pop() !== '?') {
      $(this).val($(this).val() + "?");
      $(this).val($(this).val().trim());
      $(this).setCursorPosition( $(this).val().length - 1)
  }
  if($("#ask-textbox").val().charAt(0) == "?") {
    tempText = $("#ask-textbox").val();
    tempText = tempText.charAt(0).replace("?", "");
    $("#ask-textbox").val(tempText);
  }
});


$("#ask-voice").click(function() {
  if(!speechStarted) {
    startRecognition();
    speechStarted = true;
  }
  else {
    stopRecognition();
    speechStarted = false;
  }
});

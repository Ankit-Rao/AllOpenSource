const speakBtn = document.getElementById('speak-btn');

speakBtn.onclick = (e) => {
  speakBtn.classList.add('active');
  speak()
}



function speak(){
  if('webkitSpeechRecognition' in window){
    const messageEl = document.getElementById('message');
    let recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.start()

    recognition.onresult = function(e) { 
      messageEl.value = e.results[0][0].transcript;
      recognition.stop()
      speakBtn.classList.remove('active');
    }
    recognition.onerror = function(e) { 
      console.log(e);
      recognition.stop();
      speakBtn.classList.remove('active');
    }  
  }
}
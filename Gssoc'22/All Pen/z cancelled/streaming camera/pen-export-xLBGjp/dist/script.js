$('.toggle').on('click',function(){
    $('.container').toggleClass('animate');
});



$('.theme').on('click',function(e){
 $('.container').removeClass('blood follower bits subscriber donation');
 $('.container').addClass($(this).data('theme'));
  
  $('.webcam-frame').removeClass('blood follower bits subscriber donation');
 $('.webcam-frame').addClass($(this).data('theme'));
});


function donation(amount){
  $('.artist').text('Donated $' + amount);
  
  $('.container').removeClass('blood follower bits subscriber donation');
  $('.container').addClass('donation');
  $('.webcam-frame').removeClass('blood follower bits subscriber donation');
  $('.webcam-frame').addClass('donation');
  $('.container').toggleClass('animate');
  lock();
  setTimeout(function(){
    $('.container').toggleClass('animate');
    setTimeout(function(){
      setTimeout(function(){
        $('.container').removeClass('dontation');
        $('.webcam-frame').removeClass('donation');
      }, 500);
      unlock();
    },500);
  },5000);
}

function cheer(){
  
  
  var num = $('.button-wrap.cheer').find('input').val();
  
  $('.artist').text('Cheered ' + num + ' Bits');
  
  var amount = '10';
  if(num < 99){
      $('.container').addClass('cheer10');
  }
  
  if(num > 99 && num < 999){
      $('.container').addClass('cheer100');
    amount = '100';
  }
  
  if(num > 999 && num < 4999){
      $('.container').addClass('cheer1000');
    amount = '1000';
  }
  
  if(num > 4999 && num < 9999){
      $('.container').addClass('cheer5000');
    amount = '5000';
  }
  
  if(num > 9999 && num < 99999){
      $('.container').addClass('cheer10000');
      amount = '10000';
  }
  
  if(num > 99999){
      $('.container').addClass('cheer100000');
    amount = '100000';
  }

  
  
  
  
  
  $('.container').removeClass('blood follower bits subscriber donation');
  $('.container').addClass('bits');
  $('.webcam-frame').removeClass('blood follower bits subscriber donation');
  $('.webcam-frame').addClass('bits');
  $('.container').toggleClass('animate');
  lock();
  setTimeout(function(){
    $('.container').toggleClass('animate');
    setTimeout(function(){
      setTimeout(function(){
        $('.container').removeClass('bits');
        $('.container').removeClass('cheer'+ amount);
        $('.webcam-frame').removeClass('bits');
      }, 500);
      unlock();
    },500);
  },5000);
}

function subscriber(amount){
  
  $('.artist').text('Subscriber for ' + amount + ' months');
  
  console.log('sub');
  $('.container').removeClass('blood follower bits subscriber donation');
  $('.container').addClass('subscriber');
  $('.webcam-frame').removeClass('blood follower bits subscriber donation');
  $('.webcam-frame').addClass('subscriber');
  $('.container').toggleClass('animate');
  lock();
  setTimeout(function(){
    $('.container').toggleClass('animate');
    setTimeout(function(){
      unlock();
      
      setTimeout(function(){
        $('.container').removeClass('subscriber');
        $('.webcam-frame').removeClass('subscriber');
      }, 500);
    },500);
  },5000);
}


function follower(){
  
  $('.artist').text('Just Followed');
  
  $('.container').removeClass('blood follower bits subscriber donation');
  $('.container').addClass('follower');
  $('.webcam-frame').removeClass('blood follower bits subscriber donation');
  $('.webcam-frame').addClass('follower');
  $('.container').toggleClass('animate');
  lock();
  setTimeout(function(){
    $('.container').toggleClass('animate');
    setTimeout(function(){
      setTimeout(function(){
        $('.container').removeClass('follower');
        $('.webcam-frame').removeClass('follower');
      }, 500);
      unlock();
    },500);
  },5000);
}



$('.donation button').on('click', function(){
   var amount = $(this).closest('.button-wrap').find('input').val();
   donation(amount);
});

$('.subscriber button').on('click', function(){
  console.log('susdfb');
   var amount = $(this).closest('.button-wrap').find('input').val();
   subscriber(amount);
});

$('.cheer button').on('click', function(){
   cheer();
});

$('.follower button').on('click', function(){
   follower();
});


 var interval;
// Create random drips
function startDrips(){
  clearInterval(interval);
  interval = setInterval(function(){
    createDrop();
  }, 600);
}

startDrips();

function stopDrips(){
  clearInterval(interval);
}



function createDrop(){
  var left = num();
  $('.song-box').append('<p style="left:'+ left +'px"></p>');
    
    $('.droplets').append('<p style="left:'+ parseInt(left + 3) +'px"></p>');
  
  setTimeout(function(){
    $('.song-box p').last().addClass('drip');
    $('.droplets p').last().addClass('drip');
    setTimeout(function(){
      $('.song-box p').first().remove();
      $('.droplets p').first().remove();
    },3000);
  },100);
}




function num(){
  return Math.floor(Math.random() *  $('.song-box').width() - 200) + 200;
}



// ----------------------------------
// $(document).ready(function(){
//   if($('.bits').length > 0){
//     var num = $('.container').data('bits');
//     alert(num)
//   }
// });
// ------------------------------------------------



function lock(){
  $('input').attr('disabled', 'disabled');
  $('button').attr('disabled', 'disabled');
}


function unlock(){
  $('input').removeAttr('disabled');
  $('button').removeAttr('disabled');
}










// FOR DEMO VIDEO STREAM

(function() {
  // The width and height of the captured photo. We will set the
  // width to the value defined here, but the height will be
  // calculated based on the aspect ratio of the input stream.

  var width = 400;    // We will scale the photo width to this
  var height = 225;     // This will be computed based on the input stream

  // |streaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  var streaming = false;

  // The various HTML elements we need to configure or control. These
  // will be set by the startup() function.

  var video = null;
  function startup() {
    video = document.querySelector('video');

    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

    navigator.getMedia(
      {
        video: true,
        audio: false,
        mandatory: {
         width: 400,
         height: 225
        }
      },
      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream ;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    );

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
      
        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.
      
        if (isNaN(height)) {
          height = width / (4/3);
        }
      
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        // canvas.setAttribute('width', width);
        // canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    
    clearphoto();
  }

  // Fill the photo with an indication that none has been
  // captured.

  function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }
  
  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.

  function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
    
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    } else {
      clearphoto();
    }
  }

  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener('load', startup, false);
  
  $('.trigger-webcam').on('click', function(){
    $('.trigger-webcam').remove();
    startup();
  }); 
})();

// -------------------------------------------------------------
// document.addEventListener("DOMContentLoaded", () => {
//   var but = document.getElementById("trigger-webcam");
//   var video = document.getElementById("webcam");
//   var mediaDevices = navigator.mediaDevices;
//   webcam.muted = true;
//   trigger-webcam.addEventListener("click", () => {

//     // Accessing the user camera and video.
//     mediaDevices
//       .getUserMedia({
//         video: true,
//         audio: true,
//       })
//       .then((stream) => {

//         // Changing the source of video to current stream.
//         video.srcObject = stream;
//         video.addEventListener("loadedmetadata", () => {
//           video.play();
//         });
//       })
//       .catch(alert);
//   });
// });
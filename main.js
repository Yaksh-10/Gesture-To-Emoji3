Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
});

camera = document.getElementById('camera');
Webcam.attach('#camera')
function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById('result').innerHTML = '<img id="selfie_image" src="'+data_uri+'">'
    });
}

console.log('ml5version', ml5.version)
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/8R3Rg3Ft9/model.json", model_loaded)
function model_loaded(){
    console.log('model loaded')
}

function speak(){
    synth = window.speechSynthesis;
    speak_data1 = 'The first prediction is: ' + prediction1
    utterThis = new SpeechSynthesisUtterance(speak_data1)
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById('selfie_image');
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById('result_emotion').innerHTML = results[0].label;
        prediction1 = results[0].label;
        speak();
         if (results[0].label == 'thumbsup'){
            document.getElementById('update_emoji').innerHTML = '&#128522;';
        }
         if (results[0].label == 'Ok'){
            document.getElementById('update_emoji').innerHTML = '&#128532';
        }
         if (results[0].label == 'Victory'){
            document.getElementById('update_emoji').innerHTML = '&#128548';
        }
    }
}
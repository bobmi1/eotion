prediction_1 = ""
prediction_2 = ""

Webcam.set({
    width: 310,
    height: 300,    
   image_format: "png",
   png_quality: 90 
});
camera = document.getElementById("Camera");

Webcam.attach("#Camera");

function clicpic(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri +' "/>';
});
}
console.log("ml5 version:", ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/59NAkFerT/model.json",modelLoaded);
function modelLoaded(){
    console.log("modelLoaded");
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "SEE FIRST PREDICTION IS " + prediction_1;
    speak_data_2 = "AND SEE SECOND PREDICTION IS " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}
function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}
function gotResult(error, results) {
 if (error) {
    console.error(error);
}
else {
    console.log(results);
    document.getElementById("result_emotion_name_1").innerHTML = results[0].label;
    document.getElementById("result_emotion_name_2").innerHTML = results[1].label;
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    speak();
    if (results[0].label  == "Happie"){
        document.getElementById("update_emoji_1").innerHTML = "😃";
    }
    if (results[0].label  == "Said"){
        document.getElementById("update_emoji_1").innerHTML = "😥";
    }
    if (results[0].label  == "Asngy"){
        document.getElementById("update_emoji_1").innerHTML = "😡";
    }
    if (results[1].label  == "Happie"){
        document.getElementById("update_emoji_2").innerHTML = "😃";
    }
    if (results[1].label  == "Said"){
        document.getElementById("update_emoji_2").innerHTML = "😥";
    }
    if (results[1].label  == "Angy"){
        document.getElementById("update_emoji_2").innerHTML = "😡";
    }
}
}
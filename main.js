Classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/eNpZKL3Bx/model.json", modelloaded);

function modelloaded() {
    console.log("Model is loaded!!");
}

console.log("ml5 version: " + ml5.version);

Camera = document.getElementById("camera");

Webcam.set({
    width: 450,
    height: 400,
    crop_width: 450,
    crop_height: 300,
    img_format: "png",
    png_quality: 100,
    dest_width: 450,
    dest_height: 400,
});

Webcam.attach(Camera);

function Sanpshot_img() {
    Webcam.snap(function (data_uri) {
        document.getElementById("Snapshot").innerHTML = "<img src='" + data_uri + "' id='captured_img'>"
    })
};

function Computer_speak(){
    var voice = window.speechSynthesis;
    speak_data_1= "The prediction is " + prediction1;
    
    utterThis= new SpeechSynthesisUtterance(speak_data_1); 
    voice.speak(utterThis);
}

function Check(){
    image = document.getElementById("captured_img");
    Classifier.classify(image , gotResults);
    
}

function gotResults(error , Results){
    if(error){
        console.error(error);
    }

    else{
        console.log(Results);
        prediction1 = Results[0].label;
        prediction_confidence = Results[0].confidence;
         prediction2 = Results[1].label;
        document.getElementById("emoji_name").innerHTML=prediction1;

        Computer_speak();

        if(prediction1 == "Cool"){
            document.getElementById("Hand_emoji").innerHTML="&#9996;";
            document.getElementById("emoji_confidence").innerHTML= "Accuracy: " + (prediction_confidence * 100).toFixed(2) + "%";
        }
        if(prediction1 == "Perfect"){
            document.getElementById("Hand_emoji").innerHTML="&#128076;";
            document.getElementById("emoji_confidence").innerHTML= "Accuracy: " + (prediction_confidence * 100).toFixed(2) + "%";

        }
        if(prediction1 == "Clap"){
            document.getElementById("Hand_emoji").innerHTML="&#128079;";
            document.getElementById("emoji_confidence").innerHTML= "Accuracy: " + (prediction_confidence * 100).toFixed(2) + "%";

        }
    }
    
}

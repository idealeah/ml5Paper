//Example using ml5.js poseNet with p5.dom and paper.js in javascript (vs. paperScript)

let video;
let poseNet;
let poses = [];
let dots = [];
let points = 17;
let scale = 4;

function setup() {
    // Get a reference to the canvas object
    var canvas = document.getElementById("myCanvas");
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    //make all our paper.js dots
    createDots();

    //create the webcam feed
    video = createCapture(VIDEO);
    video.size(width, height);

    // Create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video, modelReady);
    // This sets up an event that fills the global variable "poses"
    // with an array every time new poses are detected
    poseNet.on("pose", function (results) {
        poses = results;
        //console.log(poses);
    });
    // Hide the video element, and just show the canvas
    video.hide();
}

function draw() {
    if (poses.length != 0) {
        drawSkeleton();
    }
}

// A function to update dot locations
function drawSkeleton() {
    let pose = poses[0].pose.keypoints;
    //loop through all points
    for (let i = 0; i < pose.length; i++) {
        dots[i].position.x = pose[i].position.x * scale;
        dots[i].position.y = pose[i].position.y * scale;
    }
}

function createDots() {
    for (i = 0; i < 17; i++) {
        let center = new paper.Point(400, 400);
        dot = new paper.Path.Circle(center, 10);
        dot.strokeColor = "black";
        dots.push(dot);
    }
}

//message that the ml5.js model has loaded
function modelReady() {
    console.log("model ready");
}
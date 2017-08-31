/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

//Hide New Train Schedule Added Alert Div
$("#notice").hide()



// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyBvFcP_eOtUJjCxWwqmszb_Za37qmlpyvg",
    authDomain: "train-schedule-16e51.firebaseapp.com",
    databaseURL: "https://train-schedule-16e51.firebaseio.com",
    projectId: "train-schedule-16e51",
    storageBucket: "",
    messagingSenderId: "256916211553"
  };


firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains

$("#add-train-btn").click(function(event){
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();
  var trainTime = $("#time-input").val().trim();


  // Creates local "temporary" object for holding train schedule data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    frequency: trainFrequency,
    time: trainTime
  };

  // Uploads train schedule data to the database

  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.time);

  // Alert

  alert("New Train Schedule Successfully Added!");
  // $("#notice").show();

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#time-input").val("");
});

// 3. Create Firebase event for adding train info to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFrequency = childSnapshot.val().frequency;
  var trainTime = childSnapshot.val().time;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFrequency);
  console.log(trainTime);

  // Prettify the train Arrival from Military Time to Local Time
  var trainStartPretty = moment(trainTime,"HHmm").format("LT");
  console.log(trainStartPretty);



  // Calculate how many minutes away the train is
  // var trainMinutes = empMonths * empRate;
  // console.log(empBilled);
  var firstTimeConverted = moment(trainTime, "HHmm").subtract(1,"years");
  // currentTime
  var currentTime = moment();
  //Difference between times
  var diffTime = moment().diff(moment(firstTimeConverted),"minutes");
  console.log(diffTime);
  //Time Apart
  var tRemainder = diffTime % trainFrequency;
  console.log(tRemainder);
  //Minutes Until Next Train
  var minutesUntilTrain = trainFrequency - tRemainder;
  console.log("MINUTES UNTIL NEXT TRAIN: " + minutesUntilTrain);
  //Next Train Arrival
  var nextArrival = moment().add(minutesUntilTrain, "minutes").format("LT");
  console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesUntilTrain + "</td>");
});

/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

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

  alert("WAHT?");

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
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
  // Calculate the months worked using hardcore math
  // To calculate the next arrival time
  // var nextArrival = moment().diff(moment.unix(trainTime, "X"), "months");
  // console.log(empMonths);

  // Calculate how many minutes away the train is
  // var trainMinutes = empMonths * empRate;
  // console.log(empBilled);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + trainStartPretty + "</td><td>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case

//// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCbuMscL4DhabjM-Bv3z8GMRJOZk2uMcAI",
    authDomain: "trainschedule-9c7fc.firebaseapp.com",
    databaseURL: "https://trainschedule-9c7fc.firebaseio.com",
    storageBucket: "trainschedule-9c7fc.appspot.com",
    messagingSenderId: "931627838720"
  };
  firebase.initializeApp(config);


 var trainDatabase = firebase.database();


   	  $("#add-train-btn").on("click", function(event) {
     event.preventDefault();

     var trainName = $("#trainName-input").val().trim();
     var destination = $("#destination-input").val().trim();
     var firstTrain = $("#firstTrain-input").val();
     var frequency =$("#frequency-input").val().trim();

     console.log(trainName);
     console.log(destination);
     console.log(firstTrain);
     console.log(frequency);


   trainDatabase.ref().push({
     trainName: trainName,
     destination: destination,
     firstTrain: firstTrain,
     frequency:frequency,
     dateAdded: firebase.database.ServerValue.TIMESTAMP
     });
   
   });



trainDatabase.ref().on("child_added",function(snapshot){
     console.log(snapshot.val());
     
     var newTrainName = snapshot.val().trainName;
     var newDestination = snapshot.val().destination;
     var newfirstTrain = snapshot.val().firstTrain;
     var newFrequency = snapshot.val().frequency;
     console.log(newTrainName);
     console.log(newDestination);
     console.log(newfirstTrain);
     console.log(newFrequency);



     //======================time calculations===================//

 // Assumptions
    var tFrequency = newFrequency;
    // Time is 3:30 AM
    var firstTime = newfirstTrain;
    // First Time 
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "year");
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain, "HH:mm"));
    var nextArrival = moment(nextTrain).format("HH:mm");

//======================end of train calculation=========///
    
    var newTablerow = $("<tr>");

     newTablerow.append("<td>"+newTrainName+"</td>" + 
     	"<td>"+newDestination+"</td>" +
     	"<td>"+newFrequency +"</td>" + "<td>"+ nextArrival + "</td>" +
     	"<td>"+tMinutesTillTrain+"</td>")

     $("#trainTable").append(newTablerow)
	

	// $("#months").append(empMonth)
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});
 

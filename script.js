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




   	  $("#add-employee-btn").on("click", function(event) {
     event.preventDefault();

     var trainName = $("#trainName-input").val().trim();
     var destination = $("#destination-input").val().trim();
     var firstTrain = moment($("#start-input").val().trim()).format("hh:mm");
     var frequency =$("#frequency-input").val().trim();

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
     var newfirstTrain = moment(snapshot.val().firstTrain).format("hh:mm");
     var newFrequency = snapshot.val().frequency;
     console.log(newfirstTrain);
     console.log(newDestination);
     console.log(newfirstTrain);
     console.log(newFrequency);



     //======================time calculations===================//

 // Assumptions
    var tFrequency = newFrequency;
    // Time is 3:30 AM
    var firstTime = newfirstTrain;
    // First Time 
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "days");
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
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
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

//======================end of train calculation=========///












 //     var empMonth = moment().diff(moment.unix(empStart, "X"), "months");
 //     var empBilled = empRate * empMonth;
     
 //    var newTablerow = $("<tr>");

 //     newTablerow.append("<td>"+empName+"</td>" + 
 //     	"<td>"+empRole+"</td>" +
 //     	"<td>"+empStart+"</td>" + "<td>"+ empMonth + "</td>" +
 //     	"<td>"+empRate+"</td>" + "<td>"+ empBilled + "</td>")

 //     $("#employee-table").append(newTablerow)
	

	// $("#months").append(empMonth)
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});
 

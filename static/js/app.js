//// Firebase stuff

(function () {
    const config = {
        apiKey: "AIzaSyBMmz-y-_b4Q7dUvxbeOM8fbVyk2UPsJTk",
        authDomain: "recipeasy-acb94.firebaseapp.com",
        databaseURL: "https://recipeasy-acb94.firebaseio.com",
        projectId: "recipeasy-acb94",
        storageBucket: "recipeasy-acb94.appspot.com",
        messagingSenderId: "157581667770"
    };
    // Initialize Firebase
    firebase.initializeApp(config);

    // Get elements
    const preObject = document.getElementById('object');
    console.log("preObj ===> "+preObject);

    // Create references
    const dbRefObject = firebase.database().ref().child('object');
    console.log("dbRefObject ===> " + dbRefObject);

    // Sync object changes
    dbRefObject.on('value', snap => {
        console.log(snap.val());
        preObject.innerText = JSON.stringify(snap.val(), null, 3);
    });



}());


//// Firebase stuff
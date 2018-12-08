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
    const ulList = document.getElementById('list');
    const img_object = document.getElementById('images');

    // Create references
    const dbRefObject = firebase.database().ref().child('object');
    const dbRefList = dbRefObject.child('recipes');
    const dbRefImage = dbRefList.child('img_url_0');

    // Sync object changes
    dbRefObject.on('value', snap => {
        console.log(snap.val());
        preObject.innerText = JSON.stringify(snap.val(), null, 3);
    });

    dbRefImage.on('value', snap => {
        console.log("URL ===> " + snap.val());
        // img_object.innerText = snap.val();
        var img_url = snap.val();
        var result = document.getElementById("test2");
        var img_0 = document.createElement('img');
        img_0.src = snap.val();
        img_0.setAttribute('width', '33%');
        img_0.setAttribute('height', '300');
        img_0.alt = 'food';
        result.appendChild(img_0);
    });


    // Sync List changes
    dbRefList.on('child_added', snap => {
        const li = document.createElement('li');
        li.innerText = snap.val();
        li.id = snap.key;
        ulList.appendChild(li);
    });


    dbRefList.on('child_changed', snap => {
        const liChanged = document.getElementById(snap.key);
        liChanged.innerText = snap.val();
    });

    dbRefList.on('child_removed', snap => {
        const liToRemove = document.getElementById(snap.key);
        liToRemove.remove();
    });


}());


function myFunction() {

    document.getElementById("u11").innerHTML = '<img id="u23_img" class="img " src="images/image2_u23.png">';
}


//// Firebase stuff
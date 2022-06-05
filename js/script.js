import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBWVvMmDRrceEoKy3bmLx0DOHergk-Xz6A",
  authDomain: "lnt-fe-final-project-1275b.firebaseapp.com",
  projectId: "lnt-fe-final-project-1275b",
  storageBucket: "lnt-fe-final-project-1275b.appspot.com",
  messagingSenderId: "1081755869403",
  appId: "1:1081755869403:web:400ae95179f482f8fb2cfe",
  measurementId: "G-KFM2WJB6ZF",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);
let firestore = firebase.firestore();

const submitBtn = document.querySelector("#submit");

let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let phoneInput = document.getElementById("phoneInput");
let eventInput = document.getElementById("eventInput");

const db = firestore.collection("guest");

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  let alert1 = document.getElementsByClassName("alert1");
  let alert2 = document.getElementsByClassName("alert2");
  let alert3 = document.getElementsByClassName("alert3");
  
  alert1.innerText = "";
  alert2.innerText = "";
  alert3.innerText = "";

  let nameValue = nameInput.value;
  let emailValue = emailInput.value;
  let phoneValue = phoneInput.value;
  let eventValue = eventInput.options[eventInput.selectedIndex].text;

  if (nameValue.length < 3) {
    alert1.innerText = "Name must have at least 3 characters";
  } else if (!emailValue.includes("@")) {
    alert2.innerText = "Email must included @";
  } else if (
    !phoneValue.startsWith("08") ||
    phoneValue.length == 0 ||
    phoneValue.length > 14
  ) {
    alert3.innerText =
      "The phone number should start with 08 and be less than or equal to 14 characters";
  } else {
    let param = {
      name: nameValue,
      email: emailValue,
      phoneNumber: phoneValue,
      event: eventValue,
    };

    $.ajax({
      url: "https://jsonplaceholder.typicode.com/posts",
      type: "POST",
      data: JSON.stringify(param),
      success: function (data) {
        console.log(data);
      },
    });

    db.doc()
      .set({
        name: nameValue,
        email: emailValue,
        phoneNumber: phoneValue,
        event: eventValue,
      })
      .then(function () {
        console.log("Data submitted!");
      });

    $("#nameInput").val("");
    $("#emailInput").val("");
    $("#phoneInput").val("");
    $(".alert-success").removeClass("d-none");
  }
});

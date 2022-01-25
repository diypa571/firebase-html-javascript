/*
Diypa571@gmail.com
*/


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration...
const firebaseConfig = {
    apiKey: "AIzaSyBEg2Th_fXJNiiq-ykwvZVbOP73OZfNE1M",
    authDomain: "firedb9-b7552.firebaseapp.com",
    databaseURL: "https://firedb9-b7552-default-rtdb.firebaseio.com",
    projectId: "firedb9-b7552",
    storageBucket: "firedb9-b7552.appspot.com",
    messagingSenderId: "889936110566",
    appId: "1:889936110566:web:f8e2f430a75362cb41ec27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
  getDatabase,
  ref,
  set,
  get,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js";

const db = getDatabase();

var nameinput = document.getElementById("Nameinput");
var idinput = document.getElementById("Idinput");
var secinput = document.getElementById("Secinput");
var geninput = document.getElementById("Geninput");

var insBtn = document.getElementById("Insbtn");
var selBtn = document.getElementById("Selbtn");
var updBtn = document.getElementById("Updbtn");
var delBtn = document.getElementById("Delbtn");

function SelectData() {
  const dbref = ref(db);
  get(child(dbref, "TheUser/" + idinput.value))
    .then((snapshot) => {
      if (snapshot.exists()) {
        nameinput.value = snapshot.val().NameOfStd;
        secinput.value = snapshot.val().RollNo;
        geninput.value = snapshot.val().Gender;
      } else {
        //alert("No data found");
        Swal.fire("COULD NOT FOUND RECORD", "SORRY");
      }
    })
    .catch((error) => {
      Swal.fire("NO SUCCES", "ERROR");
    });
}

function InsertData() {
  set(ref(db, "TheUser/" + idinput.value), {
    NameOfStd: nameinput.value,
    RollNo: idinput.value,
    Section: secinput.value,
    Gender: geninput.value,
  })
    .then(() => {
      //alert("Data is saved...");
      Swal.fire("Data insertion", "Done!");
    })
    .catch((error) => {
      alert(error);
    });
}

function UpdateData() {
  update(ref(db, "TheUser/" + idinput.value), {
    NameOfStd: nameinput.value,
    // RollNo: idinput.value,
    Section: secinput.value,
    Gender: geninput.value,
  })
    .then(() => {
      alert("Data updated...");
    })
    .catch((error) => {
      alert(error);
    });
}

function DeleteData() {
  remove(ref(db, "TheUser/" + idinput.value))
    .then(() => {
      Swal.fire("Data deletion", "Done!");
    })
    .catch((error) => {
      //    alert("No success... no deletion..." + error);
      Swal.fire("Data deletion", "Error");
    });
}

insBtn.addEventListener("click", InsertData);
selBtn.addEventListener("click", SelectData);
updBtn.addEventListener("click", UpdateData);
delBtn.addEventListener("click", DeleteData);

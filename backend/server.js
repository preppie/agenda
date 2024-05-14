import express from "express";
import cors from "cors";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore"

const port = 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFIvVwIDNT5gJinEJE7YnYJ585nDOJVFw",
  authDomain: "agenda-a384a.firebaseapp.com",
  projectId: "agenda-a384a",
  storageBucket: "agenda-a384a.appspot.com",
  messagingSenderId: "787470914795",
  appId: "1:787470914795:web:6e1b571b1ca18caab05aae"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const activitatiCollection = collection(db, "activitati");


app.get("/", async (req, res) => {
  const snapshot = await getDocs(activitatiCollection);
  const activitati = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  res.status(200).send(activitati);
});

app.post("/adaug", async (req, res) => {
  const activitate = req.body;
  await addDoc(activitatiCollection, activitate);
  const snapshot = await getDocs(activitatiCollection);
  const activitati = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  res.status(200).send(activitati);
});

app.delete("/sterg/:id", async (req, res) => {
  const id = req.params.id;
  const activitateRef = doc(db, "activitati", id);
  await deleteDoc(activitateRef);
  const snapshot = await getDocs(activitatiCollection);
  const activitati = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  res.status(200).send(activitati);
});

app.patch("/editez", async (req, res) => {
  const id = req.body.id;
  const activitateRef = doc(db, "activitati", id);
  await updateDoc(activitateRef, {
    ora: req.body.ora,
    titlu: req.body.titlu,
    loc: req.body.loc,
    descriere: req.body.descriere,
  });
  const snapshot = await getDocs(activitatiCollection);
  const activitati = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  res.status(200).send(activitati);
});


app.listen(port, () => {
  console.log(`Serverul așteaptă comenzi pe portul ${port}`);
});

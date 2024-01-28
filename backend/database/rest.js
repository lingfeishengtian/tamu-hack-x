const express = require('express');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require("C:\\Users\\micmi\\OneDrive\\Documents\\GitHub\\tamu-hack-x\\database\\src\\tabventure-manager-firebase-adminsdk-x2fv1-7c53cc3e69.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tabventure-manager.firebaseio.com' // Replace with your database URL
});

const app = express();
const port = 3000;

// Define a route to read data from the database
app.get('/api/read', async (req, res) => {
  try {
    // Replace 'Users' with your actual collection name
    const collectionRef = admin.firestore().collection('Users');
    const snapshot = await collectionRef.get();

    const data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.post('/api/write', express.json(), async (req, res) => {
    try {
      const { title, message } = req.body;
  
      if (!title || !message) {
        return res.status(400).json({ success: false, error: 'Title and message are required' });
      }
  
      const collectionRef = admin.firestore().collection('Users'); // Replace with your collection name
      await collectionRef.add({ title, message });
  
      res.json({ success: true, message: 'Data written successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

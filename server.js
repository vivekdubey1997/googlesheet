require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const app = express();
const cors = require('cors')

app.use(express.json());
// const  credentials = require('./credentials.json')
app.use(cors())
const spreadsheetId = "1lcqOJup2B6ApLPaSprskB5TRrbo80Sf9X2NKV_C4iCE";

// --- helper functions ---
// get auth token
function getAuth() {
  const auth = new google.auth.GoogleAuth({
    keyFile: './credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });
  return auth;
}

// proccure googleSheet method
async function getGoogleSheet(auth) {
  const client = await auth.getClient();
  const googleSheet = google.sheets({ version: 'v4', auth: client });
  return googleSheet;
}
// --- helper functions ---

//fetches data from the spreadsheet
app.get('/', async (req, res) => {
  try {
    const auth = getAuth();
    const googleSheet = await getGoogleSheet(auth);

    const getSheetData = await googleSheet.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'Sheet1',
    });

    const sheetValues = getSheetData.data.values;

    // Assuming the first row contains the headers
    const headers = sheetValues[0];

    // Map over the rows starting from the second row (index 1)
    const jsonData = sheetValues.slice(1).map(row => {
      // Create an object with the specified key names
      return {
        'CompanyName': row[headers.indexOf('CompanyName')],
        'Symbol': row[headers.indexOf('Symbol')],
        'LTP': row[headers.indexOf('LTP')],
        'TargetPrice': row[headers.indexOf('TargetPrice')],
        'StopLossPrice': row[headers.indexOf('StopLossPrice')],
        'Type': row[headers.indexOf('Type')],
        'Date': row[headers.indexOf('Date')],
        'Description': row[headers.indexOf('Description')]
      };
    });

    res.json(jsonData);
  } catch (error) {
    
    res.status(500).send('Internal Server Error');
  }
});

// SET headers
app.post('/setHeaders', async (req, res) => {
  const auth = getAuth();
  const googleSheet = await getGoogleSheet(auth);

  const headers = [
    'CompanyName',
    'Symbol',
    'LTP',
    'TargetPrice',
    'StopLossPrice',
    'Type',
    'Date',
    'Description'
  ];

  await googleSheet.spreadsheets.values.update({
    auth,
    spreadsheetId,
    range: 'Sheet1',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [headers],
    },
  });

  res.send('Headers set successfully');
});

//posts data to cell


app.post('/post', async (req, res) => {
  const auth = getAuth();
  const googleSheet = await getGoogleSheet(auth);

  const data = req.body;
  console.log(data)
  await googleSheet.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: 'Sheet1', 
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [
        [
          data.CompanyName,
          data.Symbol,
          data.LTP,
          data.TargetPrice,
          data.StopLossPrice,
          data.Type,
          data.Date,
          data.Description
        ]
      ],
    },
  });

  res.send('Submitted Successfully');
});

// deletes cell data
app.post('/delete', async (req, res) => {
  const auth = getAuth();
  const googleSheet = await getGoogleSheet(auth);

  await googleSheet.spreadsheets.values.clear({
    auth,
    spreadsheetId,
    range: 'Sheet1!A5:B5',
  });

  res.send('Deleted Successfully');
});

// update cell data
app.put('/update', async (req, res) => {
  const auth = getAuth();
  const googleSheet = await getGoogleSheet(auth);

  await googleSheet.spreadsheets.values.update({
    auth,
    spreadsheetId,
    range: 'Sheet1',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [['Elon', 'Make a spaceship']],
    },
  });

  res.send('Updated Successfully');
});

app.listen(3000 || process.env.PORT, () => {
  console.log('Up and running!!');
});
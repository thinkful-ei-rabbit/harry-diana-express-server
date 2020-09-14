/* eslint-disable indent */
'use strict';

const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.listen(8000, () => {
    console.log('Express server is listening on port 8000...')
});

app.get('/sum', (req, res) => {
    const sum = parseInt(req.query.a) + parseInt(req.query.b);
    const returnText = `The sum of ${req.query.a} and ${req.query.b} is ${sum}`;

    res.send(returnText);
});

app.get('/cipher', (req, res) => {
    const { text, shift } = req.query;
  
    // validation: both values are required, shift must be a number
    if(!text) {
      return res
            .status(400)
            .send('text is required');
    }
  
    if(!shift) {
      return res
            .status(400)
            .send('shift is required');
    }
  
    const numShift = parseFloat(shift);
  
    if(Number.isNaN(numShift)) {
      return res
            .status(400)
            .send('shift must be a number');
    }
  
    // all valid, perform the task
    // Make the text uppercase for convenience
    // the question did not say what to do with punctuation marks
    // and numbers so we will ignore them and only convert letters.
    // Also just the 26 letters of the alphabet in typical use in the US
    // and UK today. To support an international audience we will have to
    // do more
    // Create a loop over the characters, for each letter, covert
    // using the shift
  
    const base = 'A'.charCodeAt(0);  // get char code 
  
    const cipher = text
      .toUpperCase()
      .split('') // create an array of characters
      .map(char => { // map each original char to a converted char
        const code = char.charCodeAt(0); //get the char code
  
        // if it is not one of the 26 letters ignore it
        if(code < base || code > (base + 26)) {
          return char;
        }
        
        // otherwise convert it
        // get the distance from A
        let diff = code - base;
        diff = diff + numShift; 
        
        // in case shift takes the value past Z, cycle back to the beginning
        diff = diff % 26;
  
        // convert back to a character
        const shiftedChar = String.fromCharCode(base + diff);
        return shiftedChar;
      })
      .join(''); // construct a String from the array
  
    // Return the response
    res
      .status(200)
      .send(cipher);  
  });

app.get('/lotto', (req, res) => {

    const { arr } = req.query;
    const generatedArr = [];

    arr = arr.map(num => parseInt(num));

    for ( let i = 0; i < 6; i++ ) {
        generatedArr.push(Math.floor(Math.random() * Math.floor(20)));
    }

    res.send(arr);


    // if ( arr.length !== 6  || !arr.filter(num => {
    //     if (!num > 0 && num <= 20) {
    //         return num;
    //     }
    // })) {
    //     return res.status(200).send('error');
    // }



});




// app.get('/burgers', (req, res) => {
//     res.send('We have juicy cheeseburgers!');
// });

// app.get('/harry', (req, res) => {
//     res.send('Nice endpoint!');
// });

// app.get('/pizza/pepperoni', (req, res) => {
//     res.send('Your pizza is on the way!');
// });

// app.get('/echo', (req, res) => {
//     const responseText = `Here are some details of your request: \n
//       Base URL: ${req.baseUrl} \n
//       Host: ${req.hostname} \n
//       Path: ${req.path}
//       Query: ${JSON.stringify(req.query)}
//     `;
//     res.send(responseText);
//   });
# University of Alberta Engineering Competition 2020
Mitch Adam, Kyle Hennig, Nayan Prakash, and Ryan Shukla. Team `); DROP TABLE Team;--`. Designed and written in 6 hours. Won second place.

## Competition requirements
- [x] Create a mobile app that can be used when an emergency happens at home.
- [x] A household may have multiple users.
- [x] Each user should have a profile storing their first name, last name, address, personal health number, health insurance number, and medical conditions.
- [x] The app should be able to identify the user with facial recognition.
- [x] The app must run on at least one of iOS and Android.
- [x] There must be an emergency button that recognizes the person who pressed it using facial recognition, sends an email with a PDF containing their profile information to a specified email address, and calls a specified phone number.
- [x] Team consists of 2-4 engineering students at the University of Alberta.

## Getting started
We chose to create a React Native mobile application. This allowed us to rapidly build a mobile app that can run on iOS and Android without exceeding the time limit. All source code can be found in the `src` folder.  
The app was created using [Expo](https://docs.expo.io/), a set a tools and services that abstracts away the build process and makes rapid iteration a breeze. Run `npm install --global expo-cli` to install the Expo CLI.  
Next, open a terminal in the `src` folder and run the command `npm install` to install all of the required dependencies. Finally, you can run `expo start` to build the app. You will be given the option of running in the browser, running in an emulator, or running on your phone via the Expo mobile app. This project requires using a real phone as facial recognition needs a camera to work.

## Restricted functionality
Some features, such as storing data to Firebase and sending out emails, have been disabled post-competition as they would cost us money.

## Dependencies
- Node.js v12.18.3
- NPM v6.14.6
- React Native v0.63
- Expo v39.0.2
- Firebase v7.9.0
- React Navigation v5.8.0

Newer versions of the above dependencies may work, but have not been tested.

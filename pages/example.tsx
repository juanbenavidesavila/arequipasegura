import React from "react";
import firebase from "firebase/compat/app";
import { getMessaging, getToken } from "firebase/messaging";

const ExamplePage = () => {
  const messaging = firebase.messaging?.isSupported() ? getMessaging() : null;

  if (messaging) {
    getToken(messaging, {
      vapidKey:
        "AAAAEA3PHtA:APA91bHv-D7TVmpQhqvzZJAGvEP0Yiw2GM_RnFN-5MVB-uSr3rOynWQctWi-1zbUPCPv6HMlgR7v-KwStv-2KSNx3fNqjcLu-e2ruEVfu_NnfkEyHZ4haseI1jpW5GzR8KRAHKKBAFIB",
    })
      .then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
        } else {
          // Show permission request UI
          console.log("No registration token available. Request permission to generate one.");
          // ...
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // ...
      });
  }
  return <div>ExamplePage</div>;
};

export default ExamplePage;

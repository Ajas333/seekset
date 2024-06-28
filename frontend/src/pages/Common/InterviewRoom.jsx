// import React, { useEffect, useRef } from 'react';
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// function randomID(len) {
//   let result = '';
//   if (result) return result;
//   const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
//   const maxPos = chars.length;
//   for (let i = 0; i < len; i++) {
//     result += chars.charAt(Math.floor(Math.random() * maxPos));
//   }
//   return result;
// }

// export function getUrlParams(url = window.location.href) {
//   const urlStr = url.split('?')[1];
//   return new URLSearchParams(urlStr);
// }

// export default function App() {
//   const { id } = useParams();
//   console.log("interview id............",id)
//   const baseURL = 'http://127.0.0.1:8000';
//   const roomID = getUrlParams().get('roomID') || randomID(5);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const makeInterview = async () => {
//       const formData = new FormData();
//       formData.append("roomId", roomID);
//       formData.append("interviewId", id);
//       try {
//         const response = await axios.post(baseURL + '/api/interview/interviewCall/', formData);
//         console.log(response);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     makeInterview();
//   }, [id, roomID, baseURL]);

//   useEffect(() => {
//     const myMeeting = async (element) => {
//       // Generate Kit Token
//       const appID = 1643689992;
//       const serverSecret = "19d144e96798ac8735533f0d17033828";
//       const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));

//       // Create instance object from Kit Token.
//       const zp = ZegoUIKitPrebuilt.create(kitToken);
//       // Start the call
//       zp.joinRoom({
//         container: element,
//         sharedLinks: [
//           {
//             name: 'Personal link',
//             url: window.location.protocol + '//' + window.location.host + window.location.pathname + roomID,
//           },
//         ],
//         scenario: {
//           mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.GroupCall].
//         },
//       });
//     };

//     if (containerRef.current) {
//       myMeeting(containerRef.current);
//     }
//   }, [roomID]);

//   return (
//     <div
//       className="myCallContainer"
//       ref={containerRef}
//       style={{ width: '100vw', height: '100vh' }}
//     ></div>
//   );
// }


import React, { useEffect } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function randomID(len) {
  let result = '';
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  var maxPos = chars.length;
  len = len || 5;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function App() {
  const { id } = useParams();
  const baseURL = 'http://127.0.0.1:8000';
  const roomID = getUrlParams().get('roomID') || randomID(5);

  useEffect(() => {
    const makeInterview = async () => {
      const formData = new FormData();
      formData.append("roomId", roomID);
      formData.append("interviewId", id);
      try {
        const response = await axios.post(baseURL + '/api/interview/interviewCall/', formData);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    makeInterview();
  }, [id, roomID, baseURL]);

  const myMeeting = async (element) => {
    const appID = 837737912;
    const serverSecret = "40129d0b66d1c29525eb355a7c7f7740";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={(element) => {
        if (element) myMeeting(element);
      }}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}

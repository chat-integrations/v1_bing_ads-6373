"use client";

import { useEffect, useState } from "react";
import createMomentsSDK, { MomentsSDK } from "@livechat/moments-sdk";

function LiveChatTestMoment() {
  const [moment, setMoment] = useState<MomentsSDK>();

  useEffect(() => {
    createMomentsSDK({ title: "My App" }).then((momentsSDK) => {
      console.log("chatId: ", momentsSDK.chatId);

      setMoment(momentsSDK);

      // your code
    });
  }, []);

  return (
    <div>
      <h1>Test moment</h1>
      <button
        onClick={() => {
          moment?.sendMessage({
            text: "Response from moment",
          });
        }}
      >
        Send message back
      </button>
      <button
        onClick={() => {
          moment?.sendMessage({
            text: "Response from moment",
          });
          moment?.close();
        }}
      >
        Send message back and close
      </button>
    </div>
  );
}

export default LiveChatTestMoment;

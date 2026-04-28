const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.sendMessageNotification = functions.firestore
  .document("messages/{messageId}")
  .onCreate(async (snap) => {
    const message = snap.data();

    if (!message || !message.areaId || !message.userId) {
      return null;
    }

    const areaId = message.areaId;

    const tokensSnapshot = await admin.firestore()
      .collection("fcmTokens")
      .where("areaId", "==", areaId)
      .where("inside", "==", true)
      .get();

    const tokens = [];

    tokensSnapshot.forEach((doc) => {
      const data = doc.data();

      if (data.uid !== message.userId && data.token) {
        tokens.push(data.token);
      }
    });

    if (tokens.length === 0) {
      console.log("Nessun token valido per area:", areaId);
      return null;
    }

    const payload = {
      notification: {
        title: message.areaName || "GeoChat",
        body: `${message.name || "Utente"}: ${message.text || ""}`
      },
      data: {
        areaId: String(message.areaId || ""),
        areaName: String(message.areaName || ""),
        type: "new_message"
      }
    };

    try {
      await admin.messaging().sendToDevice(tokens, payload);
      console.log("Notifiche inviate:", tokens.length);
    } catch (error) {
      console.error("Errore invio notifiche:", error);
    }

    return null;
  });
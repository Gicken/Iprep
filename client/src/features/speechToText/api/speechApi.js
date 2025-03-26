const API_URL = "http://127.0.0.1:5000/speech-to-text/transcribe";

export const uploadSpeech = async (audioBlob, userToken) => {
  const formData = new FormData();
  formData.append("file", audioBlob, "recording.wav");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      body: formData,
    });

    return await response.json();
  } catch (error) {
    console.error("Upload failed:", error);
    return { error: "Upload failed" };
  }
};

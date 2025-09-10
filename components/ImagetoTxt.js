// ------------------- React Native Frontend -------------------
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Linking,
  Alert,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const FLASK_URL = "https://flask-image-to-txt-app.onrender.com/"; // ngrok URL

export default function App() {
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState("eng");
  const [format, setFormat] = useState("docx");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [convertedText, setConvertedText] = useState("");

  // Pick file (image or PDF)
  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
      });

      if (result.type !== "cancel") {
        setFile(result.assets[0]);
        setDownloadUrl(null);
        setConvertedText("");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not pick file.");
    }
  };

  // Capture image from camera
  const pickFromCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Camera access is required.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled) {
        const fileObj = {
          uri: result.assets[0].uri,
          name: `camera_${Date.now()}.jpg`,
          mimeType: "image/jpeg",
        };
        setFile(fileObj);
        setDownloadUrl(null);
        setConvertedText("");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not capture image.");
    }
  };

  // Upload file to Flask backend
  const uploadFile = async () => {
    if (!file) {
      Alert.alert("No file selected", "Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", {
      uri: Platform.OS === "ios" ? file.uri.replace("file://", "") : file.uri,
      type: file.mimeType || "application/octet-stream",
      name: file.name,
    });
    formData.append("language", language);
    formData.append("format", format);

    try {
      const response = await axios.post(`${FLASK_URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Set converted text
      setConvertedText(response.data.text || "");

      // Set download URL if present
      if (response.data.download_url) {
        const filename = response.data.download_url.split("/").pop();
        setDownloadUrl(`${FLASK_URL}/download/${filename}`);
      }

      Alert.alert("Success", "File processed successfully!");
    } catch (err) {
      console.error(err.response?.data || err.message || err);
      Alert.alert("Upload Failed", "Could not upload the file.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Image to Text Converter</Text>

        <View style={styles.buttonWrapper}>
          <Button title="Select File" onPress={pickFile} />
        </View>

        <View style={styles.buttonWrapper}>
          <Button title="Capture from Camera" onPress={pickFromCamera} />
        </View>

        {file && <Text style={styles.fileName}>Selected: {file.name}</Text>}

        <Text style={styles.label}>Select Language:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={language}
            onValueChange={setLanguage}
            mode="dropdown"
            style={styles.picker}
          >
            <Picker.Item label="English" value="eng" />
            <Picker.Item label="French" value="fra" />
            <Picker.Item label="German" value="deu" />
            <Picker.Item label="Arabic" value="ara" />
            <Picker.Item label="Hindi" value="hin" />
          </Picker>
        </View>

        <Text style={styles.label}>Select Output Format:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={format}
            onValueChange={setFormat}
            mode="dropdown"
            style={styles.picker}
          >
            <Picker.Item label="Word (.docx)" value="docx" />
            <Picker.Item label="Text (.txt)" value="txt" />
          </Picker>
        </View>

        <View style={styles.buttonWrapper}>
          <Button title="Upload & Convert" onPress={uploadFile} />
        </View>

        {convertedText ? (
          <View style={styles.downloadContainer}>
            <Text style={styles.downloadText}>Converted Text:</Text>
            <TextInput
              style={styles.textarea}
              value={convertedText}
              multiline
              editable
              scrollEnabled
              textAlignVertical="top"
            />
          </View>
        ) : null}

        {downloadUrl && (
          <View style={styles.downloadContainer}>
            <Text style={styles.downloadText}>Download File:</Text>
            <Text
              style={styles.downloadLink}
              onPress={() => Linking.openURL(downloadUrl)}
            >
              {downloadUrl}
            </Text>
          </View>
        )}

        <Text style={styles.footer}>Developed by Salim</Text>
        <Text
  style={styles.websiteLink}
  onPress={() => Linking.openURL("https://www.salimwireless.com/2025/05/ocr-text-recognition.html")}
>
  Visit our website for more features!
</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonWrapper: {
    marginVertical: 10,
  },
  fileName: {
    marginVertical: 10,
    fontSize: 16,
    fontStyle: "italic",
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "600",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  downloadContainer: {
    marginTop: 25,
    alignItems: "center",
  },
  downloadText: {
    fontSize: 16,
    marginBottom: 5,
  },
  downloadLink: {
    color: "blue",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  textarea: {
    height: 200,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  websiteLink: {
  color: "blue",
  textDecorationLine: "underline",
  textAlign: "center",
  marginTop: 20,
  marginBottom: 10,
  fontSize: 14,
},
  footer: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 14,
    color: "#555",
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [id] = useState(
    `EVT-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
  );

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Camera roll permissions are required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Camera permissions are required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const submitData = async () => {
    if (!image || !type || !description || !tags) {
      Alert.alert("Error", "Please fill all fields and select an image");
      return;
    }

    const formData = new FormData();
    formData.append("id", id);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("photo", {
      uri: image,
      type: "image/jpeg",
      name: "photo.jpg",
    } as any);

    try {
      const response = await fetch('http://10.0.0.117:3000/events/upload', {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Upload successful!");
        // Reset form
        setImage(null);
        setType("");
        setDescription("");
        setTags("");
      } else {
        Alert.alert("Error", result.error || "Upload failed");
      }
    } catch (error) {
      Alert.alert("Error", "Network error");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Event Cap</Text>
        <Text>ID: {id}</Text>

        <Button title="Pick Image from Gallery" onPress={pickImage} />
        <Button title="Take Photo" onPress={takePhoto} />

        {image && <Image source={{ uri: image }} style={styles.image} />}

        <TextInput
          style={styles.input}
          placeholder="Type"
          value={type}
          onChangeText={setType}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Tags (comma-separated)"
          value={tags}
          onChangeText={setTags}
        />

        <Button title="Submit" onPress={submitData} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 150,
    marginVertical: 10,
    alignSelf: "center",
  },
});

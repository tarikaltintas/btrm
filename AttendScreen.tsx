import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useRef, useState } from "react"
import { ViewStyle, View, TextStyle, TouchableOpacity } from "react-native"
import { Button, Icon, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { useAppTheme } from "@/utils/useAppTheme"
import { Camera, useCameraDevice, useCameraPermission } from "react-native-vision-camera"
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface AttendScreenProps extends AppStackScreenProps<"Attend"> {}

export const AttendScreen: FC<AttendScreenProps> = observer(function AttendScreen(props) {
  const { navigation } = props
  const cameraRef = useRef<Camera>(null)
  const [isCameraActive, setIsCameraActive] = useState(true)
  const { hasPermission, requestPermission } = useCameraPermission()
  const device = useCameraDevice('front')

  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
  }, [hasPermission, requestPermission])

  const handleAttendClass = () => {
    // Burada yoklama alma işlemleri yapılacak
    console.log("Attendance recorded")
    navigation.navigate("Home")
  }

  if (!hasPermission) {
    return (
      <Screen style={$screenContainer} safeAreaEdges={["top"]}>
        <View style={$permissionContainer}>
          <Text text="Camera permission is required. Please allow the app to access the camera." style={$permissionText} />
          <Button
            text="İzin İste"
            style={$permissionButton}
            onPress={requestPermission}
          />
        </View>
      </Screen>
    )
  }

  if (!device) {
    return (
      <Screen style={$screenContainer} safeAreaEdges={["top"]}>
        <View style={$permissionContainer}>
          <Text text="Camera device not found" style={$permissionText} />
        </View>
      </Screen>
    )
  }

  return (
    <Screen style={$screenContainer} contentContainerStyle={$contentContainer} safeAreaEdges={["top"]}>
      {/* Header */}
      <View style={$header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon icon="back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Camera Frame */}
      <View style={$cameraContainer}>
        <View style={$cameraFrameContainer}>
          {/* Top Left Corner */}
          <View style={[$cornerBorder, $topLeft]} />
          
          {/* Top Right Corner */}
          <View style={[$cornerBorder, $topRight]} />
          
          {/* Face Icon */}
          <View style={$faceIconContainer}>
            <MaterialCommunityIcons name="emoticon-outline" size={60} color="#FFFFFF" />
          </View>
          
          {/* Bottom Left Corner */}
          <View style={[$cornerBorder, $bottomLeft]} />
          
          {/* Bottom Right Corner */}
          <View style={[$cornerBorder, $bottomRight]} />
        </View>
        
        {hasPermission && device && (
          <Camera
            ref={cameraRef}
            style={$camera}
            device={device}
            isActive={isCameraActive}
          />
        )}
      </View>

      {/* Attend Button */}
      <View style={$buttonContainer}>
        <TouchableOpacity style={$attendButton} onPress={handleAttendClass}>
          <Text text="ATTEND CLASS" style={$attendButtonText} />
        </TouchableOpacity>
      </View>
    </Screen>
  )
})

const $screenContainer: ViewStyle = {
  flex: 1,
  backgroundColor: "#000000",
}

const $contentContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: 16,
}

const $header: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: 16,
}

const $cameraContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $camera: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 0,
}

const $cameraFrameContainer: ViewStyle = {
  width: 220,
  height: 220,
  borderRadius: 20,
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
}

const $cornerBorder: ViewStyle = {
  position: "absolute",
  width: 40,
  height: 40,
  borderColor: "#FFFFFF",
  borderWidth: 3,
}

const $topLeft: ViewStyle = {
  top: 0,
  left: 0,
  borderBottomWidth: 0,
  borderRightWidth: 0,
  borderTopLeftRadius: 20,
}

const $topRight: ViewStyle = {
  top: 0,
  right: 0,
  borderBottomWidth: 0,
  borderLeftWidth: 0,
  borderTopRightRadius: 20,
}

const $bottomLeft: ViewStyle = {
  bottom: 0,
  left: 0,
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomLeftRadius: 20,
}

const $bottomRight: ViewStyle = {
  bottom: 0,
  right: 0,
  borderTopWidth: 0,
  borderLeftWidth: 0,
  borderBottomRightRadius: 20,
}

const $faceIconContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}

const $buttonContainer: ViewStyle = {
  paddingVertical: 20,
  paddingHorizontal: 20,
}

const $attendButton: ViewStyle = {
  backgroundColor: "#7469B6",
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: "center",
}

const $attendButtonText: TextStyle = {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "600",
}

const $permissionContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 20,
}

const $permissionText: TextStyle = {
  color: "#FFFFFF",
  textAlign: "center",
  marginBottom: 20,
}

const $permissionButton: ViewStyle = {
  backgroundColor: "#7469B6",
  paddingVertical: 12,
  width: 200,
} 

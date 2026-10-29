import { useEffect, useRef, useState } from "react";
import MicrophoneIcon from "../icons/MicrophoneIcon";
import VideoFormatIcon from "../icons/VideoFormatIcon";
import WebcamIcon from "../icons/WebcamIcon";

function Settings() {
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [microphoneDevices, setMicrophoneDevices] = useState<MediaDeviceInfo[]>([]);
  const [cameraDevices, setCameraDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedMicrophone, setSelectedMicrophone] = useState<string>("");
  const [selectedCamera, setSelectedCamera] = useState<string>("");

  const microphoneStreamRef = useRef<MediaStream | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);

  const mimeTypes: string[] = [
    "video/webm",
    "video/mp4",
  ];

  const loadDevices = async ({ isMicrophone = false }: { isMicrophone?: boolean; } = {}) => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      setMicrophoneDevices(devices.filter(device => device.kind === "audioinput"));
      setCameraDevices(devices.filter(device => device.kind === "videoinput"));
      if (isMicrophone && selectedMicrophone) {
        selectMicophoneDevice(selectedMicrophone);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(`${err.name}: ${err.message}`);
      }
    }
  };

  const getStream = async ({ isCamera = false, isMicrophone = false }: { isCamera?: boolean, isMicrophone?: boolean; }) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: isMicrophone, video: isCamera });
      if (isCamera) {
        cameraStreamRef.current = stream;
      }
      if (isMicrophone) {
        microphoneStreamRef.current = stream;
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(`${err.name}: ${err.message}`);
      }
    }
  };

  const stopCameraStream = () => {
    console.log(microphoneStreamRef.current?.getAudioTracks());
    cameraStreamRef.current?.getVideoTracks().forEach((track) => track.stop());
    cameraStreamRef.current = null;
  };

  const stopMicrophoneStream = () => {
    microphoneStreamRef.current?.getAudioTracks().forEach((track) => track.stop());
    microphoneStreamRef.current = null;
  };

  const selectMicophoneDevice = async (deviceId: string) => {
    try {
      setSelectedMicrophone(deviceId);
      microphoneStreamRef.current?.getAudioTracks().forEach((track) => track.stop());
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId: { exact: deviceId } } });
      microphoneStreamRef.current = stream;
    } catch (err) {
      if (err instanceof Error) {
        console.error(`${err.name}: ${err.message}`);
      }
    }
  };

  const toggleMicrophone = () => {
    setIsMicrophoneOn(!isMicrophoneOn);
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  useEffect(() => {
    if (!isCameraOn) {
      stopCameraStream();
      return;
    }

    const setupCamera = async () => {
      await getStream({ isCamera: true });
      await loadDevices();
    };

    setupCamera();
  }, [isCameraOn]);

  useEffect(() => {
    if (!isMicrophoneOn) {
      stopMicrophoneStream();
      return;
    }

    const setupMicrophone = async () => {
      await getStream({ isMicrophone: true });
      await loadDevices({ isMicrophone: true });
    };

    setupMicrophone();
  }, [isMicrophoneOn]);

  return (
    <div className="flex flex-col gap-3">
      {/* Microphone */}
      <div className="rounded-lg bg-gray-800 border border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <div className="flex items-center gap-2 text-gray-200">
            <MicrophoneIcon className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-medium">Micrófono</span>
          </div>
          <button
            onClick={toggleMicrophone}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${isMicrophoneOn ? "bg-violet-600" : "bg-gray-600"
              }`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${isMicrophoneOn ? "translate-x-4" : "translate-x-1"
                }`}
            />
          </button>
        </div>
        <div className="px-4 py-3">
          <select
            value={selectedMicrophone}
            onChange={(e) => selectMicophoneDevice(e.target.value)}
            disabled={!isMicrophoneOn}
            className="w-full bg-gray-700 border border-gray-600 text-gray-200 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:border-violet-500 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <option value="">Seleccionar micrófono</option>
            {microphoneDevices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Micrófono ${device.deviceId.slice(0, 8)}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Camera */}
      <div className="rounded-lg bg-gray-800 border border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <div className="flex items-center gap-2 text-gray-200">
            <WebcamIcon className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-medium">Cámara</span>
          </div>
          <button
            onClick={toggleCamera}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${isCameraOn ? "bg-violet-600" : "bg-gray-600"
              }`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${isCameraOn ? "translate-x-4" : "translate-x-1"
                }`}
            />
          </button>
        </div>
        <div className="px-4 py-3">
          <select
            value={selectedCamera}
            onChange={(e) => setSelectedCamera(e.target.value)}
            disabled={!isCameraOn}
            className="w-full bg-gray-700 border border-gray-600 text-gray-200 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:border-violet-500 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <option value="">Seleccionar cámara</option>
            {cameraDevices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Cámara ${device.deviceId.slice(0, 8)}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Format video */}
      <div className="rounded-lg bg-gray-800 border border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <div className="flex items-center gap-2 text-gray-200">
            <VideoFormatIcon className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-medium">Formato de video</span>
          </div>
          <span className="text-[11px] text-gray-500">Solo grabación de pantalla</span>
        </div>
        <div className="px-4 py-3">
          <p className="mb-2 text-xs text-gray-400">Elige el contenedor de salida para la grabación.</p>
          <select
            defaultValue="video/webm"
            className="w-full bg-gray-700 border border-gray-600 text-gray-200 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:border-violet-500 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {mimeTypes.map((type) => (
              <option key={type} value={type}>
                {type === "video/webm" ? "WebM" : "MP4"}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Settings;
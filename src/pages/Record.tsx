import ScreenIcon from "../icons/ScreenIcon";
import WebcamIcon from "../icons/WebcamIcon";
import BothIcon from "../icons/BothIcon";

function Record() {
  const displayMediaOptions = {
    video: { displaySurface: "browser" },
    audio: { suppressLocalAudioPlayback: false },
    preferCurrentTab: false,
    systemAudio: "include",
    surfaceSwitching: "include",
    monitorTypeSurfaces: "include",
  };

  const modes = [
    {
      id: "screen",
      label: "Pantalla",
      description: "Graba tu pantalla o pestaña",
      icon: <ScreenIcon className="w-7 h-7" />,
      onClick: () => startCapture(displayMediaOptions),
    },
    {
      id: "webcam",
      label: "Webcam",
      description: "Graba solo tu cámara",
      icon: <WebcamIcon className="w-7 h-7" />,
      onClick: undefined,
    },
    {
      id: "both",
      label: "Ambas",
      description: "Pantalla y cámara juntas",
      icon: <BothIcon className="w-7 h-7" />,
      onClick: undefined,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-gray-400">Selecciona el modo de grabación</p>

      <div className="grid grid-cols-3 gap-2">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={mode.onClick}
            className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-gray-800 border border-gray-700 hover:border-violet-500 hover:bg-gray-800/80 transition-all group cursor-pointer"
          >
            <span className="text-gray-400 group-hover:text-violet-400 transition-colors">
              {mode.icon}
            </span>
            <span className="text-xs font-semibold text-gray-200">{mode.label}</span>
            <span className="text-[10px] text-gray-500 text-center leading-tight">{mode.description}</span>
          </button>
        ))}
      </div>

      <button className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-400"></span>
        Iniciar grabación
      </button>
    </div>
  );
}

export default Record;

async function startCapture(displayMediaOptions: object) {
  let captureStream;
  try {
    captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
  return captureStream;
}
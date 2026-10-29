import { useState } from "react";
import Record from "./pages/Record";
import Settings from "./pages/Settings";

type PageName = "Record" | "Settings";

function App() {
  const [activePage, setActivePage] = useState<PageName>("Record");

  const pages: Record<PageName, React.ReactElement> = {
    Record: <Record />,
    Settings: <Settings />,
  };

  return (
    <div className="w-[360px] bg-gray-900 text-white flex flex-col" style={{ minHeight: 420 }}>
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="w-2.5 h-2.5 rounded-full bg-violet-500"></div>
        <span className="text-sm font-semibold tracking-wide">Record Display</span>
      </div>

      <div className="flex bg-gray-800 border-b border-gray-700">
        {(["Record", "Settings"] as PageName[]).map((page) => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${activePage === page
                ? "text-violet-400 border-b-2 border-violet-500 bg-gray-900"
                : "text-gray-400 hover:text-gray-200"
              }`}
          >
            {page}
          </button>
        ))}
      </div>

      <div className="flex-1 p-4">
        {pages[activePage]}
      </div>
    </div>
  );
}

export default App;

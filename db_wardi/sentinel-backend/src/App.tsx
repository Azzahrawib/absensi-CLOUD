// Contoh isi App.tsx buat ngetes backend kamu sendiri
import { handleLoginFlow } from "./lib/supabaseService";

function App() {
  const testLogin = async () => {
    try {
      const res = await handleLoginFlow(
        "test@karyawan.com",
        "password123",
        "browser-uuid-mock-123",
      );
      console.log("Login sukses jir:", res);
    } catch (err: any) {
      console.error("Error login:", err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Backend Sandbox (Sentinel Attend)</h1>
      <button onClick={testLogin}>Tes Login & Device Binding</button>
    </div>
  );
}

export default App;

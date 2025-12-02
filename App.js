import { useState } from "react";
import Navigation from "./src/routes/Navigation";
import { AuthContext } from "./src/routes/AuthContext";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Navigation />
    </AuthContext.Provider>
  );
}

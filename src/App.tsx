import { useState } from "react";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div>
      <Layout setSearchQuery={setSearchQuery} handleSearch={handleSearchChange} searchQuery={searchQuery}>
        <Dashboard searchQuery={searchQuery}/>
      </Layout>
    </div>
  );
}

export default App;

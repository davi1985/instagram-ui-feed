import { StatusBar } from "expo-status-bar";

import { Feed } from "./src/pages/Feed";

const App = () => (
  <>
    <StatusBar style="dark" backgroundColor="#f5f5f5" />

    <Feed />
  </>
);

export default App;

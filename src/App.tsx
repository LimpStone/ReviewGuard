/*import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";*/
import "./App.css";
import "./Rcomponents/BackgroundCard";
import { CardDemo } from "./Rcomponents/BackgroundCard";
//import { Button } from "@/components/ui/button";
function App() {
  return (
    <div>
      <CardDemo 
        SwitchVal={false}
        OnChange1={(val) => console.log(val)} 
        OnBtnTheme={() => console.log("OnBtnTheme clicked")} 
        OnBtnSpprt={() => console.log("OnBtnSpprt clicked")} 
      />
    </div>
  );
}

export default App;

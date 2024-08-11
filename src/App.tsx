/*import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";*/
import "./App.css";
import "./Rcomponents/BackgroundCard";
import { CardDemo } from "./Rcomponents/BackgroundCard";
import UseApp_Hook from "./UseApp_Hook"

function App() {
  const{localData,methods}=UseApp_Hook();
  return ( 
    <div>        
       
      <CardDemo 
        StarNumber={localData.randomNumber}
        SwitchVal = {localData.SwitchVal}
        SetSwitchVal={methods.SetSwitchVal}
        isLoading={localData.randomNumber !== null }
      />
      <div>{localData.objectId}</div>  
    
    </div>
  );
}

export default App;

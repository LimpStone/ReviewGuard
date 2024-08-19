import "./App.css";
import { CardDemo } from "./Rcomponents/BackgroundCard";
import UseApp_Hook from "./UseApp_Hook"

function App() {
  const{localData,methods}=UseApp_Hook();
  return ( 
    <div>  
      
      <CardDemo 
        StarNumber={localData.StarValue}
        SwitchVal = {localData.SwitchVal}
        SetSwitchVal={methods.SetSwitchVal}
      /> 
    </div>
    
  );
}

export default App;

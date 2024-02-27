import './App.css';

import MuiCard from './component/card';

export default function App() {
  const data = {
    CompanyName: "State Bank of India",
    Symbol: "SBIN",
    LTP: 758,
    TargetPrice: 900,
    StopLossPrice: 650,
    Type: "midTerm",
    Date: "27-02-2024",
    Description: "The stock is trading above 52 weeks"
  };

  return (
    <div className="App">
     
     <MuiCard data={data}/>
    </div>
  );
}
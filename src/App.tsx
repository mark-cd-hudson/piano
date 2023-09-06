import React from 'react';
import logo from './logo.svg';
import './App.css';
import SettingsSidebar from './Components/SettingsSidebar';
import PianoQuiz from './Components/PianoQuiz';
import StatsSidebar from './Components/StatsSidebar';

function App() {
  const [useTimer, setUseTimer] = React.useState<boolean>(false)
  const [tryAgainOnFail, setTryAgainOnFail] = React.useState<boolean>(true)
  const [testTreble, setTestTreble] = React.useState<boolean>(true);
  const [testBass, setTestBass] = React.useState<boolean>(false);

  return (
    <div className="App">
      <SettingsSidebar
        useTimer={useTimer} setUseTimer={setUseTimer}
        tryAgainOnFail={tryAgainOnFail} setTryAgainOnFail={setTryAgainOnFail}
        testTreble={testTreble} setTestTreble={setTestTreble}
        testBass={testBass} setTestBass={setTestBass}
        />
      <PianoQuiz useTimer={useTimer} tryAgainOnFail={tryAgainOnFail}/>
      <StatsSidebar/>
    </div>
  );
}

export default App;

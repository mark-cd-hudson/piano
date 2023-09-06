import React, { FC } from 'react';
import { GoSidebarExpand, GoSidebarCollapse }  from 'react-icons/go';

import './SettingsSidebar.css';

export type SettingsSidebarProps = {
  useTimer: boolean,
  setUseTimer: (useTimer: boolean) => void,

  tryAgainOnFail: boolean,
  setTryAgainOnFail: (tryAgainOnFail: boolean) => void,

  testTreble: boolean,
  setTestTreble: (testTreble: boolean) => void,

  testBass: boolean,
  setTestBass: (testBass: boolean) => void,
}

export const SettingsSidebar: FC<SettingsSidebarProps> = ({ 
  useTimer, setUseTimer,
  tryAgainOnFail, setTryAgainOnFail,
  testTreble, setTestTreble,
  testBass, setTestBass,
 }) => {
  const [hidden, setHidden] = React.useState(true);

  return (
    <>
      <div className="SettingsSidebar-expand-collapse" onClick={() => setHidden(!hidden)}>
        {hidden ? <GoSidebarCollapse size={24}/> : <GoSidebarExpand size={24}/>}
      </div>
      <div className={`SettingsSidebar ${!hidden ? "show" : ""}`}>
        <h2 className="SettingsTitle">Settings</h2>

        <div className="SettingsList">
          <div className="SettingsListItem">
            <input type="checkbox" id="useTimer" name="useTimer" checked={useTimer} onChange={() => setUseTimer(!useTimer)}/>
            <label htmlFor="useTimer">Flash Mode</label>
          </div>
          
          <div className="SettingsListItem">
            <input type="checkbox" id="tryAgainOnFail" name="tryAgainOnFail" checked={tryAgainOnFail} onChange={() => setTryAgainOnFail(!tryAgainOnFail)}/>
            <label htmlFor="useTimer">Try Again on Fail</label>
          </div>
          
          <div className="SettingsListItem">
            <input type="checkbox" id="testTreble" name="testTreble" checked={testTreble} onChange={() => setTestTreble(!testTreble)}/>
            <label htmlFor="useTimer">Test Treble</label>
          </div>
          
          <div className="SettingsListItem">
            <input type="checkbox" id="testBass" name="testBass" checked={testBass} onChange={() => setTestBass(!testBass)}/>
            <label htmlFor="useTimer">Test Bass</label>
          </div>
        
        </div>
      </div>
    </>
  )
}

export default SettingsSidebar;


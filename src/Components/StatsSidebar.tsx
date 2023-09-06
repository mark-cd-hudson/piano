import React, { FC } from 'react';
import { GoSidebarExpand, GoSidebarCollapse }  from 'react-icons/go';

import './StatsSidebar.css';

type StatsSidebarProps = {}

export const StatsSidebar: FC<StatsSidebarProps> = () => {
  const [hidden, setHidden] = React.useState(true);

  return (
    <>
      <div className="StatsSidebar-expand-collapse" onClick={() => setHidden(!hidden)}>
        {hidden ? <GoSidebarCollapse size={24}/> : <GoSidebarExpand size={24}/>}
      </div>
      <div className={`StatsSidebar ${!hidden ? "show" : ""}`}>
        <h2>Stats</h2>

      </div>
    </>
  )
}

export default StatsSidebar;


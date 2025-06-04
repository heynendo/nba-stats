import React from 'react'
import { NavLink, Outlet, useLocation  } from "react-router-dom"
import { teamColorsID } from '../../data/teamColors'
import '../../styles/team-info.css'

function TeamInfo(){
    const team = (useLocation().state?.team)
    const [teamData, setTeamData] = React.useState(team)

    React.useEffect(() => {
        setTeamData(team)
    },[team])

    if(!teamData){return(<h1>failed to load team data</h1>)}
    return(
        <>
            <div className='teaminfo-header'>
                <img className="teaminfo-logo" src={teamData.nbaComLogo1}/>
                <h1 className='teaminfo-teamname'>
                    {teamData.teamCity} {teamData.teamName}
                </h1>
            </div>

            <nav 
                className='teaminfo-nav' 
                style={{backgroundColor: teamColorsID[teamData.teamID].primary}}
            >
                <NavLink
                    state={{ team: teamData}}
                    to={"."}
                    end
                >
                    Team Stats
                </NavLink>
                <NavLink
                    state={{ team: teamData}}
                    to={"roster"}
                >
                    Roster
                </NavLink>
                <NavLink
                    state={{ team: teamData}}
                    to={"schedule"}
                >
                    Schedule
                </NavLink>
                <NavLink
                    state={{ team: teamData}}
                    to={"team-leaders"}
                >
                    Team Leaders
                </NavLink>
            </nav>
            <Outlet />
        </>
    )
}

export default React.memo(TeamInfo)
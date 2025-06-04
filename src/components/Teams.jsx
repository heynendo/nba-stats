import React from "react"
import { Link } from "react-router-dom"
import teamData from '../data/teamData.json'
import '../styles/teams.css'

export default function Teams(){

    const [eastTeams, setEastTeams] = React.useState([])
    const [westTeams, setWestTeams] = React.useState([])

    React.useEffect(() =>{
        setEastTeams([])
        setWestTeams([])
        teamData.map(team =>{
            if (team.conference === "Eastern Conference"){
                setEastTeams(prevTeams => [...prevTeams,team])
            } else if (team.conference === "Western Conference"){
                setWestTeams(prevTeams => [...prevTeams,team])
            } else {console.log(`${team.teamName}, ${team.teamCity} not added`)}
        })
    },[])

    const eastCards = eastTeams ? (eastTeams
            .sort((a,b) => (+b.wins / (+b.wins + +b.loss)) - (+a.wins / (+a.wins+ +a.loss)) )
            .map((team, index) =>{
                return(
                    <Link
                        to={`/team/${team.teamName.toLowerCase()}`} 
                        state = {{ team: (team) }}
                        key={team.teamAbv}
                    >
                        <div className="card">
                            <div className="card-background"
                            ></div>
                            <h3 className="team-name">
                                {team.teamCity} {team.teamName}
                            </h3>
                            <div className="rank">#{index + 1}</div>
                            <div className="vert-break"></div>
                            <div className="record">
                                {team.wins} - {team.loss} ( {(+team.wins / (+team.wins + +team.loss) * 100).toFixed(2)}% )
                            </div>
                            <div className="points-scored-allowed">
                                <p>{team.ppg} PPG</p>
                                <div className="horiz-break"></div>
                                <p>{team.oppg} Opponent PPG</p>
                            </div>
                            <img className="logo" src={team.espnLogo1}/>
                        </div>
                    </Link>
                )
            })) : null

    const westCards = westTeams ? (westTeams
        .sort((a,b) => (+b.wins / (+b.wins + +b.loss)) - (+a.wins / (+a.wins+ +a.loss)) )
            .map((team, index) =>{
                return(
                    <Link
                        to={`/team/${team.teamName.toLowerCase()}`} 
                        state = {{ team: (team) }}
                        key={team.teamAbv}
                    >
                        <div className="card">
                            <div className="card-background"></div>
                            <h3 className="team-name">
                                {team.teamCity} {team.teamName}
                            </h3>
                            <div className="rank">#{index + 1}</div>
                            <div className="vert-break"></div>
                            <div className="record">
                                {team.wins} - {team.loss} ( {(+team.wins / (+team.wins + +team.loss) * 100).toFixed(1)}% )
                            </div>
                            <div className="points-scored-allowed">
                                <p>{team.ppg} PPG</p>
                            <div className="horiz-break"></div>
                            <p>{team.oppg} Opponent PPG</p>
                            </div>
                            <img className="logo" src={team.espnLogo1}/>
                        </div>
                    </Link>
                )
            })) : null

    return(
        <div className="teams">
            <div className="conference west">
                <h1>Western Conference</h1> 
                <div className="cards">
                    {westCards}
                </div>
            </div>
            <div className="center-break"></div>
            <div className="conference east">
                <h1>Eastern Conference</h1> 
                <div className="cards">
                    {eastCards}
                </div>
            </div>
        </div>
    )
}
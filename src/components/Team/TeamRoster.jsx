import React from "react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import teamData from '../../data/teamData.json'
import playerData from '../../data/playerData.json'
import { teamColorsID } from "../../data/teamColors"

export default function TeamRoster(){

    /*const teamID = useLocation().state?.team.teamID

    const [roster, setRoster] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(false)

    React.useEffect(() => {
        async function loadData() {
            setLoading(true)
            try{
                const teamAbv = teamData
                    .filter(team => teamID === team.teamID)
                        .map(team => team.teamAbv)
                /*playerData
                    .filter(team => teamAbv === team[0])
                        .map(team => )

            } catch(error){
                setError(error)
            } finally{
                setLoading(false)
            }
        }

        loadData()
    }, [])

    if (loading) { return(<h1>Loading data..</h1>)}
    if (error) { return(<h1>Error! {error.message}</h1>)}

    const teamNames = roster.map(player =>{
        return(
            <div 
                className="roster-playercard"
                style={{ background: `linear-gradient(90deg, ${teamColorsID[teamID].primary} 0%, #F0F0F0 40%)` }}   
            >
                <div className="roster-player">
                    <Link
                        to={`/player/${player.longName.toLowerCase().replaceAll(' ', '')}`}
                        state = {{ playerID: player.playerID}}
                        key = {player.playerID}
                    >
                        <div className="roster-namenum">
                            <span className="roster-name">{player.longName}</span>
                            <span className="roster-num"> #{player.jerseyNum}</span>
                        </div>
                    </Link>
                    <div className="roster-playerinfo">
                        <img className="roster-playerimg" src={player.espnHeadshot}/>
                        <div className="roster-info">
                            <div className="roster-posage">
                                POS: {player.pos} | AGE: 21
                            </div>
                            <div className="roster-size">
                                {player.height}, {player.weight} lbs
                            </div>
                        </div>
                    </div>
                </div>
                <div className="roster-playerstats">
                    <div className="season">SEASON:
                        <span>{player.stats.pts} PPG</span>
                        <span>{player.stats.reb} RPG</span>
                        <span>{player.stats.ast} APG</span>
                        <span>{player.stats.fgp} FG%</span>
                        <span>{player.stats.tptfgp} 3PT%</span>
                    </div>
                    <div className="career">CAREER:
                        <span>{player.stats.pts} PPG</span>
                        <span>{player.stats.reb} RPG</span>
                        <span>{player.stats.ast} APG</span>
                        <span>{player.stats.fgp} FG%</span>
                        <span>{player.stats.tptfgp} 3PT%</span>
                    </div>
                </div>
            </div>
        )
    })*/


    return(
        <div className="roster-wrapper">
            <h1>Coming Soon!</h1>
        </div>
    )
}

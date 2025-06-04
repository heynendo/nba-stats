import React from "react"
import { useLocation } from "react-router-dom"
import playerData from '../data/playerData.json'
import teamData from '../data/teamData.json'
import {teamColorsABV} from '../data/teamColors'
import '../styles/player.css'

export default function Player() {

    const playerID = useLocation().state?.playerID
    const [player, setPlayer] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(false)

    React.useEffect(() => {
        async function loadData() {
            setLoading(true)
            try{
                playerData
                .flatMap(team => Object.values(team).flat())
                    .filter(player => playerID === player.playerID)
                        .map(player => {setPlayer(player)})
            } catch(error){
                setError(error)
            } finally{
                setLoading(false)
            }
        }
        loadData()
    }, [playerID])

    if (loading) { return(<h1>Loading data..</h1>)}
    if (error) { return(<h1>Error! {error.message}</h1>)}

    const playerHeader = player ? (<div className="player-header">
        <div className="top">
            <img src={player.data.nbaComHeadshot}/>
            <h1>{player.longName} (#{player.data.jerseyNum})</h1>
        </div>
        <div className="banner" style={{ backgroundColor: teamColorsABV[player.team].primary }}></div>
    </div>) : null

    const playerInjury = !player ? null : player.data?.injury?.designation ? (
        <div className="player-injury">
            <span>Injury Status: {player.data.injury.designation}(colored icon)</span>
            <p>{player.data.injury.description} - Player set to return {player.data.injury.injReturnDate}</p>
        </div>
    ) : null

    function calculateAge(birthdate){
        const bday = new Date(birthdate);
        const ageDifMs = Date.now() - bday.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const teamLogo = player ? teamData.find(team => team.teamAbv === player.team).espnLogo1 : null

    const playerPageStyle = player ? {
        position: 'absolute',
        top: '300px',
        left: 0,
        right: 0,
        bottom: 0,
        minHeight: '750px', 
        backgroundImage: `url("${teamLogo}")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '80vh',
        opacity: '0.05',
        filter: 'drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25))',
    } : null

    let twoPtFgm = 0
    let twoPtFga = 0

     if (player)  {
        twoPtFgm = player.data.stats.fgm  - player.data.stats.tptfgm
        twoPtFga = (player.data.stats.fga  - ((player.data.stats.tptfgm * 100)/player.data.stats.tptfgp)).toFixed(1)
    }

    const playerStats = player ? (
    <>
        <div style={playerPageStyle}></div>
        <div className="player-stats">
            <div className="player-data-container">
                <h1>Player Info</h1>
                <div className="player-data-grid data-table">
                    <div>
                        <span className="light-italic">Position</span>
                        <h3>{player.pos}</h3>
                    </div>
                    <div>
                        <span className="light-italic">Height/Weight</span>
                        <h3>{player.data.height.replace("-", "'") + '"'} - {player.data.weight} lbs</h3>
                    </div>
                    <div>
                        <span className="light-italic">Age</span>
                        <h3>{calculateAge(player.data.bDay)}</h3>
                    </div>
                    <div>
                        <span className="light-italic">Experience</span>
                        {player.data.exp === "R" ? <h3>Rookie</h3> : <h3>{player.data.exp} years</h3>}
                    </div>
                    <div className="college">
                        <span className="light-italic">College</span>
                        <h3>{player.data.college}</h3>
                    </div>
                </div>
            </div>
            <div className="player-stats-container">
                <h1>Stats</h1>
                <div className="player-stats-grid data-table">
                    <div>
                        <span className="light-italic">Points</span>
                        <div>
                            <h3>{player.data.stats.pts}</h3>
                            <span className="light-italic">PTS</span>
                        </div>
                    </div>
                    <div>
                        <span className="light-italic">Rebounds</span>
                        <div>
                            <h3>{player.data.stats.reb}</h3>
                            <span className="light-italic">REB</span>
                        </div>
                    </div>
                    <div>
                        <span className="light-italic">Assists</span>
                        <div>
                            <h3>{player.data.stats.ast}</h3>
                            <span className="light-italic">AST</span>
                        </div>
                    </div>
                    <div>
                        <span className="light-italic">Steals</span>
                        <div>
                            <h3>{player.data.stats.stl}</h3>
                            <span className="light-italic">STL</span>
                        </div>
                    </div>
                    <div>
                        <span className="light-italic">Blocks</span>
                        <div>
                            <h3>{player.data.stats.blk}</h3>
                            <span className="light-italic">BLK</span>
                        </div>
                    </div>
                    <div>
                        <span className="light-italic">Offensive Reb</span>
                        <div>
                            <h3>{player.data.stats.OffReb}</h3>
                            <span className="light-italic">OREB</span>
                        </div>
                    </div>
                    <div>
                        <span className="light-italic">Defensive Reb</span>
                        <div>
                            <h3>{player.data.stats.DefReb}</h3>
                            <span className="light-italic">DREB</span>
                        </div>
                    </div>
                    <div>
                        <span className="light-italic">Turnovers</span>
                        <div>
                            <h3>{player.data.stats.TOV}</h3>
                            <span className="light-italic">TOV</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="player-scoring-container">
                <h1>Scoring</h1>
                <div className="player-scoring-grid data-table">
                    <div>
                        <div>
                            <h3>{player.data.stats.fgp}</h3>
                            <span className="light-italic">FG%</span>
                        </div>
                        <span className="light-italic totals">
                            {player.data.stats.fgm} / {
                            ((player.data.stats.fgm * 100)/player.data.stats.fgp).toFixed(1)} FGM
                        </span>
                    </div>
                    <div>
                        <div>
                            <h3>{player.data.stats.tptfgp}</h3>
                            <span className="light-italic">3PT%</span>
                        </div>
                        <span className="light-italic totals">
                            {player.data.stats.tptfgm} / {
                            ((player.data.stats.tptfgm * 100)/player.data.stats.tptfgp).toFixed(1)} 3PTM
                        </span>
                    </div>
                    <div>
                        <span className="light-italic totals">
                            {player.data.stats.ftm} / {player.data.stats.fta} FTM
                        </span>
                        <div>
                            <h3>{player.data.stats.ftp}</h3>
                            <span className="light-italic">FT%</span>
                        </div>
                    </div>
                    <div>
                        <span className="light-italic totals">
                            {twoPtFgm.toFixed(1)} / {twoPtFga} 2PTM
                        </span>
                        <div>
                            <h3>{((twoPtFgm/twoPtFga)*100).toFixed(1)}</h3>
                            <span className="light-italic">2PT%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>) : null

    return(
        <div className="player">
            {playerHeader}
            {playerInjury}
            {playerStats}
        </div>
    )
}
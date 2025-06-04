import React from "react"
import { useLocation } from "react-router-dom"
import teamData from '../../data/teamData.json'
import playerData from '../../data/playerData.json'
import '../../styles/team-leaders.css'

export default function TeamLeaders(){


    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [team, setTeam] = React.useState(null)
    
    const teamAbv = useLocation().state?.team.teamAbv
    
    React.useEffect(() => {
            async function loadData() {
                setLoading(true)
                try{
                    teamData.filter(team => teamAbv === team.teamAbv)
                        .map(team => setTeam(team))
                } catch(error){
                    setError(error)
                } finally{
                    setLoading(false)
                }
            }
    
            loadData()
    }, [teamAbv])

    if(loading)return(<p>Loading...</p>)
    if(error)return(<p>error loading data.</p>)

    const leaderPTS = team ? (
        playerData
            .flatMap(team => Object.values(team).flat())
            .filter(player => team.topPerformers.pts.playerID == player.playerID)
            .map(player => {
                return(
                    <div className="team-leader-card" key={player.playerID}>
                        <span className="light-italic">Points</span>
                        <div>
                            <h3 className="name">{player.longName}</h3>
                            <img src={player.data?.nbaComHeadshot} />
                            <div className="stat">
                                <h2>{team.topPerformers.pts.total}</h2>
                                <span className="light-italic">PTS</span>
                            </div>
                        </div>
                    </div>
                )
            })
    ) : null

    const leaderAST = team ? (
        playerData
            .flatMap(team => Object.values(team).flat())
            .filter(player => team.topPerformers.ast.playerID == player.playerID)
            .map(player => {
                return(
                    <div className="team-leader-card" key={player.playerID}>
                        <span className="light-italic">Assists</span>
                        <div>
                            <h3 className="name">{player.longName}</h3>
                            <img src={player.data?.nbaComHeadshot} />
                            <div className="stat">
                                <h2>{team.topPerformers.ast.total}</h2>
                                <span className="light-italic">AST</span>
                            </div>
                        </div>
                    </div>
                )
            })
    ) : null

    const leaderREB = team ? (
        playerData
            .flatMap(team => Object.values(team).flat())
            .filter(player => team.topPerformers.reb.playerID == player.playerID)
            .map(player => {
                return(
                    <div className="team-leader-card" key={player.playerID}>
                        <span className="light-italic">Rebounds</span>
                        <div>
                            <h3 className="name">{player.longName}</h3>
                            <img src={player.data?.nbaComHeadshot} />
                            <div className="stat">
                                <h2>{team.topPerformers.reb.total}</h2>
                                <span className="light-italic">REB</span>
                            </div>
                        </div>
                    </div>
                )
            })
    ) : null

    const leaderBLK = team ? (
        playerData
            .flatMap(team => Object.values(team).flat())
            .filter(player => team.topPerformers.blk.playerID == player.playerID)
            .map(player => {
                return(
                    <div className="team-leader-card" key={player.playerID}>
                        <span className="light-italic">Blocks</span>
                        <div>
                            <h3 className="name">{player.longName}</h3>
                            <img src={player.data?.nbaComHeadshot} />
                            <div className="stat">
                                <h2>{team.topPerformers.blk.total}</h2>
                                <span className="light-italic">BLK</span>
                            </div>
                        </div>
                    </div>
                )
            })
    ) : null

    const leaderSTL = team ? (
        playerData
            .flatMap(team => Object.values(team).flat())
            .filter(player => team.topPerformers.stl.playerID == player.playerID)
            .map(player => {
                return(
                    <div className="team-leader-card" key={player.playerID}>
                        <span className="light-italic">Steals</span>
                        <div>
                            <h3 className="name">{player.longName}</h3>
                            <img src={player.data?.nbaComHeadshot} />
                            <div className="stat">
                                <h2>{team.topPerformers.stl.total}</h2>
                                <span className="light-italic">STL</span>
                            </div>
                        </div>
                    </div>
                )
            })
    ) : null

    const leaderTOV = team ? (
        playerData
            .flatMap(team => Object.values(team).flat())
            .filter(player => team.topPerformers.TOV.playerID == player.playerID)
            .map(player => {
                return(
                    <div className="team-leader-card" key={player.playerID}>
                        <span className="light-italic">Turnovers</span>
                        <div>
                            <h3 className="name">{player.longName}</h3>
                            <img src={player.data?.nbaComHeadshot} />
                            <div className="stat">
                                <h2>{team.topPerformers.TOV.total}</h2>
                                <span className="light-italic">TOV</span>
                            </div>
                        </div>
                    </div>
                )
            })
    ) : null

    const teamPageStyle = team ? {
        position: 'absolute',
        top: '300px',
        left: 0,
        right: 0,
        bottom: 0,
        minHeight: '750px', 
        backgroundImage: `url("${team.espnLogo1}")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '80vh',
        opacity: '0.05',
        filter: 'drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25))',
    } : null

    return(
        <div className="team-leaders">
            <div style={teamPageStyle}></div>
            {leaderPTS}
            {leaderAST}
            {leaderREB}
            {leaderBLK}
            {leaderSTL}
            {leaderTOV}
        </div>
    )
}
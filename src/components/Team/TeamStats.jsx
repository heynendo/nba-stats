import React from "react"
import { useLocation } from "react-router-dom"
import teamData from '../../data/teamData.json'
import '../../styles/team-stats.css'

export default function TeamStats(){

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

    const teamInfo = team ? (
        <div className="team-info">
            <h1>Team Info</h1>
            <div className="team-info-grid data-table">
                <div>
                    <span className="light-italic">Conference</span>
                    <h3>{team.conferenceAbv}</h3>
                </div>
                <div>
                    <span className="light-italic">Division</span>
                    <h3>{team.division}</h3>
                </div>
                <div>
                    <span className="light-italic">Record</span>
                    <h3>{team.wins} - {team.loss}</h3>
                </div>
                <div>
                    <span className="light-italic">Streak</span>
                    <h3>{team.currentStreak.length}{team.currentStreak.result}</h3>
                </div>
            </div>
        </div>
    ) : null

    const fullTeamStats = team ? (
        <div className="full-team-stats">
            <div className="full-team-stats-grid data-table">
                <div><span className="light-italic">Stat</span></div>
                <div><span className="light-italic">Points</span></div>
                <div><span className="light-italic">Rebounds</span></div>
                <div><span className="light-italic">Assists</span></div>
                <div><span className="light-italic">Steals</span></div>
                <div><span className="light-italic">Blocks</span></div>
                <div><span className="light-italic">Turnovers</span></div>

                <div><span className="light-italic">Offensive</span></div>
                <div>
                    <h3>{team.ppg}</h3>
                    <span className="light-italic">PTS</span>
                </div>
                <div>
                    <h3>{Number(team.offensiveStats.reb.Total).toFixed(1)}</h3>
                    <span className="light-italic">REB</span>
                </div>
                <div>
                    <h3>{Number(team.offensiveStats.ast.Total).toFixed(1)}</h3>
                    <span className="light-italic">AST</span>
                </div>
                <div>
                    <h3>{Number(team.offensiveStats.stl.Total).toFixed(1)}</h3>
                    <span className="light-italic">STL</span>
                </div>
                <div>
                    <h3>{Number(team.offensiveStats.blk.Total).toFixed(1)}</h3>
                    <span className="light-italic">BLK</span>
                </div>
                <div>
                    <h3>{Number(team.offensiveStats.TOV.Total).toFixed(1)}</h3>
                    <span className="light-italic">TOV</span>
                </div>

                <div><span className="light-italic">Defensive</span></div>
                <div>
                    <h3>{Number(team.defensiveStats.pts.Total).toFixed(1)}</h3>
                    <span className="light-italic">PTS</span>
                </div>
                <div>
                    <h3>{Number(team.defensiveStats.reb.Total).toFixed(1)}</h3>
                    <span className="light-italic">REB</span>
                </div>
                <div>
                    <h3>{Number(team.defensiveStats.ast.Total).toFixed(1)}</h3>
                    <span className="light-italic">AST</span>
                </div>
                <div>
                    <h3>{Number(team.defensiveStats.stl.Total).toFixed(1)}</h3>
                    <span className="light-italic">STL</span>
                </div>
                <div>
                    <h3>{Number(team.defensiveStats.blk.Total).toFixed(1)}</h3>
                    <span className="light-italic">BLK</span>
                </div>
                <div>
                    <h3>{Number(team.defensiveStats.TOV.Total).toFixed(1)}</h3>
                    <span className="light-italic">TOV</span>
                </div>
            </div>
        </div>
    ) : null

    let off2ptFga = 0
    let off2ptFgm = 0
    let def2ptFga = 0
    let def2ptFgm = 0

    if (team){
        off2ptFga = Number(team.offensiveStats.fga.Total) - Number(team.offensiveStats.tptfga.Total)

        off2ptFgm = Number(team.offensiveStats.fgm.Total) - Number(team.offensiveStats.tptfgm.Total)

        def2ptFga = Number(team.defensiveStats.fga.Total) - Number(team.defensiveStats.tptfga.Total)

        def2ptFgm = Number(team.defensiveStats.fgm.Total) - Number(team.defensiveStats.tptfgm.Total)
    }

    const teamShootingStats = team ? (
        <div className="team-shooting">
            <div className="team-shooting-grid data-table">
                <div><span className="light-italic">Stat</span></div>
                <div><span className="light-italic">FG%</span></div>
                <div><span className="light-italic">3PT%</span></div>
                <div><span className="light-italic">FT%</span></div>
                <div><span className="light-italic">2PT%</span></div>

                <div><span className="light-italic">Offensive</span></div>
                <div>
                    <div>
                        <h3>{((Number(team.offensiveStats.fgm.Total) / Number(team.offensiveStats.fga.Total)) * 100).toFixed(1)}</h3>
                        <span className="light-italic">%</span>
                    </div>
                    <span className="light-italic">
                       {Number(team.offensiveStats.fgm.Total).toFixed(1)} / {Number(team.offensiveStats.fga.Total).toFixed(1)} FGM
                    </span>
                </div>
                <div>
                    <div>
                        <h3>{((Number(team.offensiveStats.tptfgm.Total) / Number(team.offensiveStats.tptfga.Total)) * 100).toFixed(1)}</h3>
                        <span className="light-italic">%</span>
                    </div>
                    <span className="light-italic">{Number(team.offensiveStats.tptfgm.Total).toFixed(1)} / {Number(team.offensiveStats.tptfga.Total).toFixed(1)} 3PTM</span>
                </div>
                <div>
                    <div>
                        <h3>{((Number(team.offensiveStats.ftm.Total) / Number(team.offensiveStats.fta.Total)) * 100).toFixed(1)}</h3>
                        <span className="light-italic">%</span>
                    </div>
                    <span className="light-italic">{Number(team.offensiveStats.ftm.Total).toFixed(1)} / {Number(team.offensiveStats.fta.Total).toFixed(1)} FTM</span>
                </div>
                <div>
                    <div>
                        <h3>{((off2ptFgm / off2ptFga) * 100).toFixed(1)}</h3>
                        <span className="light-italic">%</span>
                    </div>
                    <span className="light-italic">{off2ptFgm.toFixed(1)} / {off2ptFga.toFixed(1)} 2PTM</span>
                </div>

                <div><span className="light-italic">Defensive</span></div>
                <div>
                    <div>
                        <h3>{((Number(team.defensiveStats.fgm.Total) / Number(team.defensiveStats.fga.Total)) * 100).toFixed(1)}</h3>
                        <span className="light-italic">%</span>
                    </div>
                    <span className="light-italic">
                       {Number(team.defensiveStats.fgm.Total).toFixed(1)} / {Number(team.defensiveStats.fga.Total).toFixed(1)} FGM
                    </span>
                </div>
                <div>
                    <div>
                        <h3>{((Number(team.defensiveStats.tptfgm.Total) / Number(team.defensiveStats.tptfga.Total)) * 100).toFixed(1)}</h3>
                        <span className="light-italic">%</span>
                    </div>
                    <span className="light-italic">{Number(team.defensiveStats.tptfgm.Total).toFixed(1)} / {Number(team.defensiveStats.tptfga.Total).toFixed(1)} 3PTM</span>
                </div>
                <div>
                    <div>
                        <h3>{((Number(team.defensiveStats.ftm.Total) / Number(team.defensiveStats.fta.Total)) * 100).toFixed(1)}</h3>
                        <span className="light-italic">%</span>
                    </div>
                    <span className="light-italic">{Number(team.defensiveStats.ftm.Total).toFixed(1)} / {Number(team.defensiveStats.fta.Total).toFixed(1)} FTM</span>
                </div>
                <div>
                    <div>
                        <h3>{((def2ptFgm / def2ptFga) * 100).toFixed(1)}</h3>
                        <span className="light-italic">%</span>
                    </div>
                    <span className="light-italic">{def2ptFgm.toFixed(1)} / {def2ptFga.toFixed(1)} 2PTM</span>
                </div>

            </div>
        </div>
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
        <div className="team-stats">
            <div style={teamPageStyle}></div>
            {teamInfo}
            <div>
                <h1>Offensive vs Deffensive Stats</h1>
                {fullTeamStats}
                {teamShootingStats}
            </div>
        </div>
    )
}
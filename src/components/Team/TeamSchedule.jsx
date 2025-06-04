import React from "react"
import { useLocation } from "react-router-dom"
import '../../styles/team-schedule.css'
import { teamColorsID } from '../../data/teamColors'
import '../../styles/team-info.css'

export default function TeamSchedule(){

    /*const teamID = useLocation().state?.team.teamID

    const [schedule, setSchedule] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(false)

    React.useEffect(() => {
        async function loadData() {
            setLoading(true)
            try{
                const data = await getTeamSchedule(teamID)
                console.log(data.body.schedule)
                setSchedule(data.body.schedule)
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

    // add variable to check if there are ANY playoff games on the schedule
    const isPlayoffTeam = schedule.some(
        game => game.seasonType === "Postseason" || game.seasonType === "Play-In"
    )

    // add variable to check if there are ANY upcoming games on the schedule
    const isInSeason = schedule.some(
        game => game.gameStatus === "Scheduled"
    )

    const upcomingGames = schedule
        .filter(game => game.gameStatus === "Scheduled")
            .sort((a, b) => b.gameDate.localeCompare(a.gameDate)) 
                .slice(0, 6)
                    .map(game =>{
                        const date = new Date(
                            `${game.gameDate.slice(0, 4)}-${game.gameDate.slice(4, 6)}-${game.gameDate.slice(6)}`
                        ).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                        return(
                            <div key={game.gameID} className="card">
                                <span className="teams">{game.away} @ {game.home}</span>
                                <div className="break"></div>
                                <span className="date-time">{date} ({game.gameTime.toUpperCase()}M EST)</span>
                                <button style={{backgroundColor: teamColorsID[teamID].primary}}>more info</button>
                            </div>
                        )
                    })


    const playoffGames = schedule
    .filter(game => (game.seasonType === "Postseason" || game.seasonType === "Play-In") && game.gameStatus === "Completed")
        .sort((a, b) => b.gameDate.localeCompare(a.gameDate)) 
            .map(game =>{
                const homeWin = +game.homePts > +game.awayPts
                const date = new Date(
                    `${game.gameDate.slice(0, 4)}-${game.gameDate.slice(4, 6)}-${game.gameDate.slice(6)}`
                ).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                return(
                    <div key={game.gameID} className="score-card">
                        <div>
                            <span 
                                style={homeWin ? null : {opacity: 0.5}} 
                                className="team"
                            >{game.home}</span>
                            <span 
                                style={homeWin ? null : {opacity: 0.5}} 
                                className="pts"
                            >{game.homePts}</span>
                            <div className="break"></div>
                            <span 
                                style={homeWin ? {opacity: 0.5} : null} 
                                className="team"
                            >{game.away}</span>
                            <span 
                                style={homeWin ? {opacity: 0.5} : null} 
                                className="pts"
                            >{game.awayPts}</span>
                        </div>
                        <div>
                            <button style={{backgroundColor: teamColorsID[teamID].primary}}>full stats</button>
                            <div className="date-time">{date}</div>
                        </div>
                    </div>
                )
            })
    const regSeasonGames = schedule
    .filter(game => game.seasonType === "Regular Season")
        .sort((a, b) => b.gameDate.localeCompare(a.gameDate)) 
            .map(game =>{
                const homeWin = +game.homePts > +game.awayPts
                const date = new Date(
                    `${game.gameDate.slice(0, 4)}-${game.gameDate.slice(4, 6)}-${game.gameDate.slice(6)}`
                ).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                return(
                    <div key={game.gameID} className="score-card">
                        <div>
                            <span 
                                style={homeWin ? null : {opacity: 0.5}} 
                                className="team"
                            >{game.home}</span>
                            <span 
                                style={homeWin ? null : {opacity: 0.5}} 
                                className="pts"
                            >{game.homePts}</span>
                            <div className="break"></div>
                            <span 
                                style={homeWin ? {opacity: 0.5} : null} 
                                className="team"
                            >{game.away}</span>
                            <span 
                                style={homeWin ? {opacity: 0.5} : null} 
                                className="pts"
                            >{game.awayPts}</span>
                        </div>
                        <div>
                            <button style={{backgroundColor: teamColorsID[teamID].primary}}>full stats</button>
                            <div className="date-time">{date}</div>
                        </div>
                    </div>
                )
            })*/

    return(
        <div className="team-schedule">
            <h1>Coming Soon!</h1>
            {/*{isInSeason && <div className="upcoming-games">
                <h2>Upcoming Games</h2>
                <div className="break"></div>
                <div className="game-cards">
                    {upcomingGames}
                </div>
            </div>}
            <div className="past-games">
                <h2>Past Games</h2>
                <div className="break"></div>
                <div className="schedule-playoffs">
                    {isPlayoffTeam && <h3 className="past-games-subheader">play-in & playoffs</h3>}
                    <div className="game-cards">
                        {playoffGames}
                    </div>
                </div>
                <div className="schedule-regseason">
                    <h3 className="past-games-subheader">regular season</h3>
                    <div className="game-cards">
                        {regSeasonGames}
                    </div>
                </div>
            </div>*/}
        </div>
    )
}
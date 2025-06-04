import React from "react"
import teamData from '../data/teamData.json'
import '../styles/comparison.css'

export default function TeamComparisons(){

    const [team1, setTeam1] = React.useState(null)
    const [team1Search, setTeam1Search] = React.useState('')
    const [team1Options, setTeam1Options] = React.useState([])

    const [team2, setTeam2] = React.useState(null)
    const [team2Search, setTeam2Search] = React.useState('')
    const [team2Options, setTeam2Options] = React.useState([])

    const bothTeams = (team1 && team2)

    function team1SearchUpdate(e){
        setTeam1Search(e.target.value)
    }

    function team2SearchUpdate(e){
        setTeam2Search(e.target.value) 
    }

    React.useEffect(() => {
        setTeam1Options([])
        if (team1Search.length > 2){
            teamData
            .filter(team => 
                team.teamName.toLowerCase().includes(team1Search.toLowerCase()) ||
                team.teamCity.toLowerCase().includes(team1Search.toLowerCase()) ||
                team.conferenceAbv.toLowerCase().includes(team1Search.toLowerCase()) ||
                team.division.toLowerCase().includes(team1Search.toLowerCase())
            )
            .sort((a,b) => Number(b.wins) - Number(a.wins))
            .slice(0, 6)
            .map(team =>{
                setTeam1Options(prevTeams => [...prevTeams, team])
            })
        }
    },[team1Search])

    React.useEffect(() => {
        setTeam2Options([])
        if (team2Search.length > 2){
            teamData
            .filter(team => 
                team.teamName.toLowerCase().includes(team2Search.toLowerCase()) ||
                team.teamCity.toLowerCase().includes(team2Search.toLowerCase()) ||
                team.conferenceAbv.toLowerCase().includes(team2Search.toLowerCase()) ||
                team.division.toLowerCase().includes(team2Search.toLowerCase())
            )
            .sort((a,b) => Number(b.wins) - Number(a.wins))
            .slice(0, 6)
            .map(team =>{
                setTeam2Options(prevTeams => [...prevTeams, team])
            })
        }
    },[team2Search])

    const team1OptionCards = team1Options.map(team =>{
        return(
            <button className="card" key={team.teamName} onClick={handleClickTeam1}>
                <img className="card-logo" src={team.espnLogo1}/>
                <span className="card-name">{team.teamCity} {team.teamName}</span>
            </button>)
    })

    const team2OptionCards = team2Options.map(team =>{
        return(
            <button className="card" key={team.teamName} onClick={handleClickTeam2}>
                <img className="card-logo" src={team.espnLogo1}/>
                <span className="card-name">{team.teamCity} {team.teamName}</span>
            </button>)
    })

    function handleClickTeam1(e){
        teamData
            .filter(team => `${team.teamCity} ${team.teamName}` === e.target.textContent)
                .map(team => {setTeam1(team)})
    }
    function handleClickTeam2(e){
        teamData
            .filter(team => `${team.teamCity} ${team.teamName}` === e.target.textContent)
                .map(team => {setTeam2(team)})
    }

    function resetTeam1(){
        setTeam1(null)
        setTeam1Search('')
        setTeam1Options([])
    }

    function resetTeam2(){
        setTeam2(null)
        setTeam2Search('')
        setTeam2Options([])
    }

    const styleGreater = {
        fontWeight: 600,
        background: `linear-gradient(90deg, rgba(34, 34, 34, 0) 0%,
                                            rgba(0, 125, 42, 0.125) 25%, 
                                            rgba(0, 125, 42, 0.125) 75%, 
                                            rgba(34, 34, 34, 0) 100%)`
    }

    const styleLesser = {
        opacity: 0.75,
        background: `linear-gradient(90deg, rgba(34, 34, 34, 0) 0%, 
                                            rgba(145, 17, 17, 0.125) 25%, 
                                            rgba(144, 17, 17, 0.125) 75%, 
                                            rgba(34, 34, 34, 0) 100%)`
    }

    let recordTeam1 = null
    let ppgTeam1 = null
    let oppgTeam1 = null
    let currentStreakTeam1 = null

    if(bothTeams){
        recordTeam1 =   (+team1.wins / (+team1.wins + +team1.loss)) >
                        (+team2.wins / (+team2.wins + +team2.loss))

        ppgTeam1 = team1.ppg > team2.ppg

        oppgTeam1 = team1.oppg < team2.oppg

        currentStreakTeam1 =    (team1.currentStreak.result === "W" &&
                                team2.currentStreak.result === "L") ? true : 
                                (team2.currentStreak.result === "W" &&
                                team1.currentStreak.result === "L") ? false :
                                (team1.currentStreak.length > 
                                team2.currentStreak.length) ? true : false
    }

    return(
        <div className="comparison">
        
        <div className="team1-body">
            {team1 ? 
                <div className="picked">
                    <h1>{team1.teamCity} {team1.teamName}</h1>
                    <img src={team1.espnLogo1}/>
                </div> 
                : 
                <div className="search">
                    <h1>Team 1</h1>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="search teams"
                            value={team1Search}
                            onChange={team1SearchUpdate}
                            required
                        ></input>
                    </form>
                    <div className="comparison-option">
                        {team1OptionCards}
                    </div>
                </div> 
            }
        </div>
        <div className="main-comparison">
             {team1 || team2 ? 
             <>
                <div className="switch-button">
                    {team1 ? <button className="" onClick={resetTeam1}>switch team</button> : <div></div>}
                    {team2 ? <button className="switch-right" onClick={resetTeam2}>switch team</button> : <div></div>}
                </div>
                <table className="comparison-table">
                    <tbody>
                        <tr className="record">
                            <td 
                                className="left"
                                style={!bothTeams ? null : recordTeam1 ? styleGreater : styleLesser}
                            >
                                {team1 ? `${team1.wins} - ${team1.loss}` : ''}
                            </td>
                            <td className="center">Record</td>
                            <td 
                                className="right"
                                style={!bothTeams ? null : !recordTeam1 ? styleGreater : styleLesser}
                            >
                                {team2 ? `${team2.wins} - ${team2.loss}` : ''}
                            </td>
                        </tr>
                        <tr>
                            <td 
                                className="left"
                                style={!bothTeams ? null : ppgTeam1 ? styleGreater : styleLesser}
                            >
                                {team1 ? team1.ppg : ''}
                            </td>
                            <td className="center">PPG</td>
                            <td 
                                className="right"
                                style={!bothTeams ? null : !ppgTeam1 ? styleGreater : styleLesser}
                            >
                                {team2 ? team2.ppg : ''}
                            </td>
                        </tr>
                        <tr>
                            <td 
                                className="left"
                                style={!bothTeams ? null : oppgTeam1 ? styleGreater : styleLesser}
                            >
                                {team1 ? team1.oppg : ''}
                            </td>
                            <td className="center">Opponent PPG</td>
                            <td 
                                className="right"
                                style={!bothTeams ? null : !oppgTeam1 ? styleGreater : styleLesser}
                            >
                                {team2 ? team2.oppg : ''}
                            </td>
                        </tr> 
                        <tr>
                            <td 
                                className="left"
                                style={!bothTeams ? null : currentStreakTeam1 ? styleGreater : styleLesser}
                            >
                                {team1 ? `${team1.currentStreak.length}${team1.currentStreak.result}` : ''}
                            </td>
                            <td className="center">Streak</td>
                            <td 
                                className="right"
                                style={!bothTeams ? null : !currentStreakTeam1 ? styleGreater : styleLesser}
                            >
                                {team2 ? `${team2.currentStreak.length}${team2.currentStreak.result}` : ''}
                            </td>
                        </tr>
                    </tbody>
                </table>
                </>
             :  <div className="break-vert"></div>}
        </div>
        <div className="team2-body">
            {team2 ? 
                <div className="picked">
                    <h1>{team2.teamCity} {team2.teamName}</h1>
                    <img src={team2.espnLogo1}/>
                </div> 
                : 
                <div className="search">
                    <h1>Team 2</h1>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="search teams"
                            value={team2Search}
                            onChange={team2SearchUpdate}
                            required
                        ></input>
                    </form>
                    <div className="comparison-option">
                        {team2OptionCards}
                    </div>
                </div> 
            }
        </div>
    </div>
    )
}
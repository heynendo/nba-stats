import React from "react"
import playerData from '../data/playerData.json'
import '../styles/comparison.css'

export default function PlayerComparisons(){

    const [player1, setPlayer1] = React.useState(null)
    const [player1Search, setPlayer1Search] = React.useState('')
    const [player1Options, setPlayer1Options] = React.useState([])

    const [player2, setPlayer2] = React.useState(null)
    const [player2Search, setPlayer2Search] = React.useState('')
    const [player2Options, setPlayer2Options] = React.useState([])

    const bothPlayers = player1 && player2
    
    function player1SearchUpdate(e){
        setPlayer1Search(e.target.value)
    }
    
    function player2SearchUpdate(e){
        setPlayer2Search(e.target.value) 
    }

    React.useEffect(() => {
        setPlayer1Options([])
        if (player1Search.length > 2){
            playerData
            .flatMap(team => Object.values(team).flat())
            .filter(player =>
                player.longName.toLowerCase().includes(player1Search.toLowerCase()) ||
                player.pos.toLowerCase().includes(player1Search.toLowerCase()) ||
                player.team.toLowerCase().includes(player1Search.toLowerCase()) ||
                player.playerID.toLowerCase().includes(player1Search.toLowerCase())
            )
            .sort((a,b) => Number(b.data?.stats?.pts) - Number(a.data?.stats?.pts))
            .slice(0, 6)
            .map(player =>
                setPlayer1Options(prevPlayers => [...prevPlayers, player])
            )
        }
    },[player1Search])

    React.useEffect(() => {
        setPlayer2Options([])
        if (player2Search.length > 2){
            playerData
            .flatMap(team => Object.values(team).flat())
            .filter(player =>
                player.longName.toLowerCase().includes(player2Search.toLowerCase()) ||
                player.pos.toLowerCase().includes(player2Search.toLowerCase()) ||
                player.team.toLowerCase().includes(player2Search.toLowerCase()) ||
                player.playerID.toLowerCase().includes(player2Search.toLowerCase())
            )
            .sort((a,b) => Number(b.data?.stats?.pts) - Number(a.data?.stats?.pts))
            .slice(0, 6)
            .map(player =>
                setPlayer2Options(prevPlayers => [...prevPlayers,player])
            )
        }
    },[player2Search])

    const player1OptionCards = player1Options.map(player =>{
        return(<button className="card" key={player.playerID} onClick={handleClickPlayer1}>
                <img className="card-logo" src={player.data.nbaComHeadshot}/>
                <span className="card-name">{player.longName} ({player.team})</span>
            </button>)
    })

    const player2OptionCards = player2Options.map(player =>{
        return(<button className="card" key={player.playerID} onClick={handleClickPlayer2}>
                <img className="card-logo" src={player.data.nbaComHeadshot}/>
                <span className="card-name">{player.longName} ({player.team})</span>
            </button>)
    })

    function handleClickPlayer1(e){
        playerData
            .flatMap(team => Object.values(team).flat())
                .filter(player => `${player.longName} (${player.team})` === e.target.textContent)
                    .map(player => {setPlayer1(player)})
    }
    function handleClickPlayer2(e){
        playerData
            .flatMap(team => Object.values(team).flat())
                .filter(player => `${player.longName} (${player.team})` === e.target.textContent)
                    .map(player => {
                        setPlayer2(player)})
    }

    function resetPlayer1(){
        setPlayer1(null)
        setPlayer1Search('')
        setPlayer1Options([])
    }

    function resetPlayer2(){
        setPlayer2(null)
        setPlayer2Search('')
        setPlayer2Options([])
    }

    const styleGreater = {
        fontWeight: 600,
        background: 'linear-gradient(90deg, rgba(34, 34, 34, 0) 0%, rgba(0, 125, 42, 0.125) 25%, rgba(0, 125, 42, 0.125) 75%, rgba(34, 34, 34, 0) 100%)'
    }

    const styleLesser = {
        opacity: 0.75,
        background: 'linear-gradient(90deg, rgba(34, 34, 34, 0) 0%, rgba(145, 17, 17, 0.125) 25%, rgba(144, 17, 17, 0.125) 75%, rgba(34, 34, 34, 0) 100%)'
    }

    let pointsPlayer1 = null
    let reboundsPlayer1 = null
    let assistsPlayer1 = null
    let blocksPlayer1 = null
    let stealsPlayer1 = null
    let turnoversPlayer1 = null
    let fgpercentagePlayer1 = null

    if(bothPlayers){
        pointsPlayer1 = (+player1.data.stats.pts) > (+player2.data.stats.pts) 

        reboundsPlayer1 = (+player1.data.stats.reb) > (+player2.data.stats.reb) 

        assistsPlayer1 = (+player1.data.stats.ast) > (+player2.data.stats.ast) 

        blocksPlayer1 = (+player1.data.stats.blk) > (+player2.data.stats.blk) 

        stealsPlayer1 = (+player1.data.stats.stl) > (+player2.data.stats.stl) 

        turnoversPlayer1 = (+player1.data.stats.TOV) < (+player2.data.stats.TOV) 

        fgpercentagePlayer1 = (+player1.data.stats.fgp) > (+player2.data.stats.fgp) 
    }

    return(
        <div className="comparison">
            <div className="player1-body">
                {player1 ? 
                    <div className="picked">
                        <h1>{player1.longName} ({player1.team})</h1>
                        <img src={player1.data.nbaComHeadshot}/>
                    </div> 
                    : 
                    <div className="search">
                        <h1>Player 1</h1>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="text"
                                placeholder="search players"
                                value={player1Search}
                                onChange={player1SearchUpdate}
                                required
                            ></input>
                        </form>
                        <div className="comparison-option">
                            {player1OptionCards}
                        </div>
                    </div> 
                }
            </div>
            <div className="main-comparison">
                {player1 || player2 ? 
                <>
                    <div className="switch-button">
                        {player1 ? <button className="" onClick={resetPlayer1}>switch player</button> : <div></div>}
                        {player2 ? <button className="switch-right" onClick={resetPlayer2}>switch player</button> : <div></div>}
                    </div>
                    <table className="comparison-table">
                        <tbody>
                            <tr className="points">
                                <td
                                    className="left"
                                    style={!bothPlayers ? null : pointsPlayer1 ? styleGreater : styleLesser}
                                >
                                    {player1 ? player1.data.stats.pts : ''}
                                </td>
                                <td className="center">Points</td>
                                <td
                                    className="right"
                                    style={!bothPlayers ? null : !pointsPlayer1 ? styleGreater : styleLesser}
                                >
                                    {player2 ? player2.data.stats.pts : ''}
                                </td>
                            </tr>
                            <tr className="rebounds">
                                <td
                                    className="left"
                                    style={!bothPlayers ? null : reboundsPlayer1 ? styleGreater : styleLesser}
                                >
                                    {player1 ? player1.data.stats.reb : ''}
                                </td>
                                <td className="center">Rebounds</td>
                                <td
                                    className="right"
                                    style={!bothPlayers ? null : !reboundsPlayer1 ? styleGreater : styleLesser}
                                >
                                    {player2 ? player2.data.stats.reb : ''}
                                </td>
                            </tr>
                            <tr className="assists">
                                <td
                                    className="left"
                                    style={!bothPlayers ? null : assistsPlayer1 ? styleGreater : styleLesser}
                                >
                                    {player1 ? player1.data.stats.ast : ''}
                                </td>
                                <td className="center">Assists</td>
                                <td
                                    className="right"
                                    style={!bothPlayers ? null : !assistsPlayer1 ? styleGreater : styleLesser}
                                >
                                    {player2 ? player2.data.stats.ast : ''}
                                </td>
                            </tr>
                            <tr className="blocks">
                                <td
                                    className="left"
                                    style={!bothPlayers ? null : blocksPlayer1 ? styleGreater : styleLesser}
                                >
                                    {player1 ? player1.data.stats.blk : ''}
                                </td>
                                <td className="center">Blocks</td>
                                <td
                                    className="right"
                                    style={!bothPlayers ? null : !blocksPlayer1 ? styleGreater : styleLesser}
                                >
                                    {player2 ? player2.data.stats.blk : ''}
                                </td>
                            </tr>
                            <tr className="steals">
                                <td
                                    className="left"
                                    style={!bothPlayers ? null : stealsPlayer1 ? styleGreater : styleLesser}
                                >
                                    {player1 ? player1.data.stats.stl : ''}
                                </td>
                                <td className="center">Steals</td>
                                <td
                                    className="right"
                                    style={!bothPlayers ? null : !stealsPlayer1 ? styleGreater : styleLesser}
                                >
                                    {player2 ? player2.data.stats.stl : ''}
                                </td>
                            </tr>
                            <tr className="turnovers">
                                <td
                                    className="left"
                                    style={!bothPlayers ? null : turnoversPlayer1 ? styleGreater : styleLesser}
                                >
                                    {player1 ? player1.data.stats.TOV : ''}
                                </td>
                                <td className="center">Turnovers</td>
                                <td
                                    className="right"
                                    style={!bothPlayers ? null : !turnoversPlayer1 ? styleGreater : styleLesser}
                                >
                                    {player2 ? player2.data.stats.TOV : ''}
                                </td>
                            </tr>
                            <tr className="fgpercent">
                                <td
                                    className="left"
                                    style={!bothPlayers ? null : fgpercentagePlayer1 ? styleGreater : styleLesser}
                                >
                                    {player1 ? `${player1.data.stats.fgp}%` : ''}
                                </td>
                                <td className="center">FG%</td>
                                <td
                                    className="right"
                                    style={!bothPlayers ? null : !fgpercentagePlayer1 ? styleGreater : styleLesser}
                                >
                                    {player2 ? `${player2.data.stats.fgp}%` : ''}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </>
                :  <div className="break-vert"></div>}
            </div>
            <div className="player2-body">
                {player2 ? 
                    <div className="picked">
                        <h1>{player2.longName} ({player2.team})</h1>
                        <img src={player2.data.nbaComHeadshot}/>
                    </div> 
                    : 
                    <div className="search">
                        <h1>Player 2</h1>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="text"
                                placeholder="search players"
                                value={player2Search}
                                onChange={player2SearchUpdate}
                                required
                            ></input>
                        </form>
                        <div className="comparison-option">
                            {player2OptionCards}
                        </div>
                    </div> 
                }
            </div>
        </div>
    )
}
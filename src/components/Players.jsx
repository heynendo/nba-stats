import React from "react"
import PlayerLeader from "./Player/PlayerLeader"
import playerData from '../data/playerData.json'
import '../styles/players.css'

function Players(){
    
    const pointsLeaderCards = playerData
        .flatMap(team => Object.values(team).flat())
        .filter(player => player.data?.stats?.pts)
        .sort((a, b) => parseFloat(b.data.stats.pts) - parseFloat(a.data.stats.pts))
        .slice(0, 5)
        .map(player => (
            <PlayerLeader 
                player={player} 
                stat={`${player.data.stats.pts} PTS`} 
                color={'red'}
                key={player.playerID} 
            />
        ))

    const assistsLeaderCards = playerData
        .flatMap(team => Object.values(team).flat())
        .filter(player => player.data?.stats?.ast)
        .sort((a, b) => parseFloat(b.data.stats.ast) - parseFloat(a.data.stats.ast))
        .slice(0, 5)
        .map(player => (
            <PlayerLeader 
                player={player} 
                stat={`${player.data.stats.ast} AST`} 
                key={player.playerID} 
            />
        ))

    const reboundsLeaderCards = playerData
        .flatMap(team => Object.values(team).flat())
        .filter(player => player.data?.stats?.reb)
        .sort((a, b) => parseFloat(b.data.stats.reb) - parseFloat(a.data.stats.reb))
        .slice(0, 5)
        .map(player => (
            <PlayerLeader 
                player={player} 
                stat={`${player.data.stats.reb} REB`} 
                color={'red'}
                key={player.playerID} 
            />
        ))

    const stealsLeaderCards = playerData
        .flatMap(team => Object.values(team).flat())
        .filter(player => player.data?.stats?.stl)
        .sort((a, b) => parseFloat(b.data.stats.stl) - parseFloat(a.data.stats.stl))
        .slice(0, 5)
        .map(player => (
            <PlayerLeader 
                player={player} 
                stat={`${player.data.stats.stl} STL`} 
                key={player.playerID} 
            />
        ))

    const blocksLeaderCards = playerData
        .flatMap(team => Object.values(team).flat())
        .filter(player => player.data?.stats?.blk)
        .sort((a, b) => parseFloat(b.data.stats.blk) - parseFloat(a.data.stats.blk))
        .slice(0, 5)
        .map(player => (
            <PlayerLeader 
                player={player} 
                stat={`${player.data.stats.blk} BLK`} 
                color={'red'}
                key={player.playerID} 
            />
        ))

    const fgLeaderCards = playerData
        .flatMap(team => Object.values(team).flat())
        .filter(player => player.data?.stats?.fgm)
        .sort((a, b) => parseFloat(b.data.stats.fgm) - parseFloat(a.data.stats.fgm))
        .slice(0, 5)
        .map(player => (
            <PlayerLeader 
                player={player} 
                stat={`${player.data.stats.fgm} FGM`} 
                key={player.playerID} 
            />
        ))

    const threePtLeaderCards = playerData
        .flatMap(team => Object.values(team).flat())
        .filter(player => player.data?.stats?.tptfgm)
        .sort((a, b) => parseFloat(b.data.stats.tptfgm) - parseFloat(a.data.stats.tptfgm))
        .slice(0, 5)
        .map(player => (
            <PlayerLeader 
                player={player} 
                stat={`${player.data.stats.tptfgm} FGM`} 
                color={'red'}
                key={player.playerID} 
            />
        ))

    const ftLeaderCards = playerData
        .flatMap(team => Object.values(team).flat())
        .filter(player => player.data?.stats?.ftm)
        .sort((a, b) => parseFloat(b.data.stats.ftm) - parseFloat(a.data.stats.ftm))
        .slice(0, 5)
        .map(player => (
            <PlayerLeader 
                player={player} 
                stat={`${player.data.stats.ftm} FTM`} 
                key={player.playerID} 
            />
        ))

    const TOLeaderCards = playerData
        .flatMap(team => Object.values(team).flat())
        .filter(player => player.data?.stats?.TOV)
        .sort((a, b) => parseFloat(b.data.stats.TOV) - parseFloat(a.data.stats.TOV))
        .slice(0, 5)
        .map(player => (
            <PlayerLeader 
                player={player} 
                stat={`${player.data.stats.TOV} TOV`} 
                color={'red'}
                key={player.playerID} 
            />
        ))

    return(
        <div className="players">
            <h1>Season Leaders</h1>
            <div className="points leaders"><span>Points</span>{pointsLeaderCards}</div>
            <div className="break"></div>
            <div className="assists leaders"><span>Assists</span> {assistsLeaderCards}</div>
            <div className="break"></div>
            <div className="rebounds leaders"><span>Rebounds</span> {reboundsLeaderCards}</div>
            <div className="break"></div>
            <div className="steals leaders"><span>Steals</span> {stealsLeaderCards}</div>
            <div className="break"></div>
            <div className="blocks leaders"><span>Blocks</span> {blocksLeaderCards}</div>
            <div className="break"></div>
            <div className="fg leaders"><span>FG</span> {fgLeaderCards}</div>
            <div className="break"></div>
            <div className="threept leaders"><span>3PT</span> {threePtLeaderCards}</div>
            <div className="break"></div>
            <div className="freethrow leaders"><span>FT</span> {ftLeaderCards}</div>
            <div className="break"></div>
            <div className="to leaders"><span>Turnovers</span> {TOLeaderCards}</div>
        </div>
    )
}

export default React.memo(Players)
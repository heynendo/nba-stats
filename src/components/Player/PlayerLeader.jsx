import React from "react"
import { Link } from "react-router-dom"

export default function PlayerLeader({player, stat, color}){

    const styleBlue = {
    background: 'linear-gradient(180deg, #00001B 25%, #000150 100%)'
    };

    const styleRed = {
    background: 'linear-gradient(180deg, #360000 25%, #780000 100%)'
    };

    return(
        <Link
            to={`/player/${player.longName.toLowerCase().replaceAll(' ', '')}`}
            state = {{ playerID: player.playerID}}
        >
            <div className="card">
                <div 
                    className="card-background" 
                    style={color === 'red' ? styleRed : styleBlue}
                ></div>
                <img className="player-headshot" src={player.data.nbaComHeadshot}/>
                <h3 className="player-name">{player.longName} ({player.team})</h3>
                <h3 className="player-stat">{stat}</h3>
                <p className="games-played">({player.data.stats.gamesPlayed} Games Played)</p>
            </div>
        </Link>
    )
}
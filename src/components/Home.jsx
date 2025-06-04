import React from "react"
import { Link } from "react-router-dom"
import '../images/nbaStreet.png'
import '../images/parkBaskets.png'
import '../images/parkCourt.png'
import '../styles/home.css'

function Home(){

    return(
        <div className='home-element'>
            <div className="top">
                <div className="background"></div>
                <div className="body">
                    <h1>NBA Stats</h1>
                </div>
            </div>
            <div className="right">
                <div className="background"></div>
                <div className="body">
                    <h3>Created by Donovan Heynen</h3>
                    <Link to="/players">
                        <h2>See Players</h2>
                    </Link>
                </div>
            </div>
            <div className="bottom">
                <div className="background"></div>
                <div className="body">
                    <Link to="/player-comparisons">
                        <h2>Compare Players</h2>
                    </Link>
                    <Link to="/team-comparisons">
                        <h2>Compare Teams</h2>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Home)
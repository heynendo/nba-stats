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
                    <h3>Created by <a target="_blank" href="https://www.donovanheynen.com/">Donovan Heynen</a></h3>
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
            <div className="dev-info">
                <div className="background"></div>
                <p>This project is currently not supported for mobile devices. Updates to come in the future include full mobile support, live updating backend, and more.</p>
            </div>
        </div>
    )
}

export default React.memo(Home)
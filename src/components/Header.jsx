import React, { useState } from "react"
import { Link } from "react-router-dom"
import playerData from '../data/playerData.json'
import teamData from '../data/teamData.json'
import '../styles/header.css'
import SearchBar from "./SearchBar"
import SearchResults from "./SearchResults"

export default function Header() {
    const [search, setSearch] = useState('')
    const [playersReturned, setPlayersReturned] = useState([])
    const [teamsReturned, setTeamsReturned] = useState([])
    const [toggleDropdown, setToggleDropdown] = useState(false)

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1000) {
                setToggleDropdown(false)
            }
        }
        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const allPlayers = playerData.flatMap(team => Object.values(team).flat())

    React.useEffect(() =>{
        setTeamsReturned([])
        setPlayersReturned([])

        const teamLookup = {}
        teamData.forEach(team => {
            teamLookup[team.teamAbv] = {
                city: team.teamCity.toLowerCase(),
                name: team.teamName.toLowerCase(),
                abv: team.teamAbv.toLowerCase(),
            }
        })

        if (!search || search.trim().length < 3) return
        const searchWords = search.trim().toLowerCase().split(/\s+/)

        const playerNameMatches = allPlayers    
            .filter(player => 
                searchWords.every(word =>
                    player.longName.toLowerCase().includes(word)
                )
            )
            .sort((a,b) => Number(b?.data?.stats?.pts) - Number(a?.data?.stats?.pts))

        const playerTeamMatches = allPlayers
            .filter(player => {
                const team = teamLookup[player.team]
                if (!team) return false
                return searchWords.every(word =>
                    team.abv.includes(word) ||
                    team.name.includes(word) ||
                    team.city.includes(word)
                )
            })
            .sort((a,b) => Number(b?.data?.stats?.pts) - Number(a?.data?.stats?.pts))
        
        const matchedPlayers = [...playerNameMatches, ...playerTeamMatches].slice(0,6)
        
        matchedPlayers   
            .map(player => (
                setPlayersReturned(prevPlayers => [...prevPlayers,
                    <Link
                        to={`/player/${player.longName.toLowerCase().replaceAll(' ', '')}`}
                        state = {{ playerID: player.playerID}}
                        key = {player.playerID}
                        onClick={() => setSearch('')}
                    >
                        <div className="search-card">
                            <div className="search-card-background"></div>
                            <span className="name">{player.longName} ({player.team})</span>
                            <img className="headshot" src={player.data.nbaComHeadshot} />
                        </div>
                    </Link>
                ])
            ))
        
        const teamNameMatches = teamData
            .filter(team => {
                const teamBlob = `${team.teamAbv} ${team.teamCity} ${team.teamName}`.toLowerCase()
                return searchWords.every(word => teamBlob.includes(word) )
            })
            .sort((a,b) => (+b.wins / (+b.wins + +b.loss)) - (+a.wins / (+a.wins+ +a.loss)))
        const teamConfDivMatches = teamData
            .filter(team => 
                searchWords.every(word =>
                    team.conference.toLowerCase().includes(word) ||
                    team.conferenceAbv.toLowerCase().includes(word) ||
                    team.division.toLowerCase().includes(word) 
                )
            )
            .sort((a,b) => (+b.wins / (+b.wins + +b.loss)) - (+a.wins / (+a.wins+ +a.loss)))

        const playerTeamAbvs = matchedPlayers.map(player => player.team);
        const teamPlayersMatches = teamData.filter(team => playerTeamAbvs.includes(team.teamAbv))

        const allMatchedTeams = [...teamNameMatches, ...teamConfDivMatches, ...teamPlayersMatches]
            .filter((team, index, self) =>
                index === self.findIndex(t => t.teamAbv === team.teamAbv)
            )
            .slice(0, 6)

        allMatchedTeams 
            .map(team =>(
                setTeamsReturned(prevTeams => [...prevTeams, 
                    <Link
                        to={`/team/${team.teamName.toLowerCase().replaceAll(' ', '')}`}
                        state = {{ team: (team) }}
                        key={team.teamAbv}
                        onClick={() => setSearch('')}
                    >
                        <div className="search-card">
                            <div className="search-card-background"></div>
                            <span className="name">{team.teamCity} {team.teamName}</span>
                            <img className="headshot" src={team.nbaComLogo1} />
                        </div>
                    </Link>
                ])
            ))
        
    },[search])


    return(
        <>
            <header>
                <nav>
                    <div className="home">
                        <Link to="/"><h1>NBA</h1></Link>
                    </div>
                    <div className="search">
                        <SearchBar 
                            search={search}
                            setSearch={setSearch}
                        />
                    </div>
                    <div className="links lg">
                        <Link to="/players"><h3>Players</h3></Link>
                        <Link to="/teams"><h3>Teams</h3></Link>
                        <Link to="/team-comparisons"><h3>Team Comparisons</h3></Link>
                        <Link to="/player-comparisons"><h3>Player Comparisons</h3></Link>
                    </div>
                    <div className="links sm">
                        <img 
                            src="src/images/hamburger-menu.png"
                            onClick={() => setToggleDropdown(prevToggle => !prevToggle)}
                        />
                    </div>
                </nav>
                <div className="container">
                    <SearchResults
                        playersReturned={playersReturned}
                        teamsReturned={teamsReturned}
                    />
                    {toggleDropdown  ? 
                    <div className="dropdown">
                        <Link to="/players"><h3>Players</h3></Link>
                        <Link to="/teams"><h3>Teams</h3></Link>
                        <Link to="/team-comparisons"><h3>Team Comparisons</h3></Link>
                        <Link to="/player-comparisons"><h3>Player Comparisons</h3></Link>
                    </div>
                    : ''}
                </div>
            </header>
        </>
    )
}
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter , Routes, Route, Link } from "react-router-dom"
import Home from './components/Home'
import Players from './components/Players'
import TeamInfo from './components/Team/TeamInfo'
import Layout from './components/Layout'
import TeamStats from './components/Team/TeamStats'
import TeamLeaders from './components/Team/TeamLeaders'
import TeamSchedule from './components/Team/TeamSchedule'
import TeamRoster from './components/Team/TeamRoster'
import Player from './components/Player'
import Teams from './components/Teams'
import TeamComparisons from './components/TeamComparisons'
import PlayerComparisons from './components/PlayerComparisons'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path="players" element={<Players />}/>
          <Route path="teams" element={<Teams />}/>
          <Route path="player/:id" element={<Player />}/>
          <Route path="team-comparisons" element={<TeamComparisons/>}/>
          <Route path="player-comparisons" element={<PlayerComparisons/>}/>
          <Route path='/team/:id' element={<TeamInfo />}>
            <Route index element={<TeamStats />}/>
            <Route path="roster" element={<TeamRoster />}/>
            <Route path="schedule" element={<TeamSchedule />}/>
            <Route path="team-leaders" element={<TeamLeaders />}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM
.createRoot(document.getElementById('root'))
.render(<App />);
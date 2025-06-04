export default function SearchResults({playersReturned, teamsReturned}){

    return(
        <>
            {playersReturned.length > 0 ?  
                <div className="search-results">
                    <div className="players-returned">
                        <h3>Players</h3>
                        <div className="returned">
                            {playersReturned}    
                        </div>
                    </div>
                    <div className="teams-returned">
                        <h3>Teams</h3>
                        <div className="returned">
                            {teamsReturned}    
                        </div>
                    </div>
                </div>
            : ''}
        </>
    )
}
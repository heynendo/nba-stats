import '../styles/search.css'

export default function SearchBar({ search, setSearch}){

    function searchUpdate(e){
        setSearch(e.target.value)
    }

    return(
        <form 
            className="player-search"
            onSubmit={(e) => e.preventDefault()}
        >
            <input
                type="text"
                placeholder="search"
                value={search}
                onChange={searchUpdate}
                required
            ></input>
        </form>
    )
}
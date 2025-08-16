
interface SearchProps {
    username: string
    setUsername: (username: string) => void
}

function Search({ username, setUsername }: SearchProps) {

    return (
        <div className="search-container">
            <input type="text" className="username-input" placeholder="Введите имя пользователя GitHub" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
    )
}

export default Search
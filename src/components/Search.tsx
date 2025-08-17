
interface SearchProps {
    username: string
    onChange: (username: string) => void
}

function Search({ username, onChange }: SearchProps) {

    return (
        <div className="search-container">
            <input type="text" className="username-input" placeholder="Введите имя пользователя GitHub" value={username} onChange={(e) => onChange(e.target.value)} />
        </div>
    )
}

export default Search
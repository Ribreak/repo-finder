import './Search.css'

interface SearchProps {
    username: string
    onChange: (username: string) => void
}

function Search({ username, onChange }: SearchProps) {

    return (
        <div className="search">
            <input type="text" className="search__input-username" placeholder="Введите имя пользователя GitHub" value={username} onChange={(e) => onChange(e.target.value)} />
        </div>
    )
}

export default Search
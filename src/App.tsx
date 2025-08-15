import './App.css'
import Repository from './components/Repository'

function App() {

    return (
        <div className="container">
            <header className="header">
                <h1>GitHub Repository Finder</h1>
                <div className="search-container">
                    <input type="text" className="username-input" placeholder="Введите имя пользователя GitHub" />
                    <button className="search-button">Поиск</button>
                </div>
            </header>

            <main className="main-content">
                <div className="repositories-grid">
                    <Repository></Repository>
                </div>
            </main>
        </div>
    )
}

export default App

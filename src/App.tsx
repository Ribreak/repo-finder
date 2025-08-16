import { useState } from 'react';
import './App.css'
import Search from './components/Search'
import useDebounce from './hooks/useDebounce';
import RepoList from './components/RepoList';


function App() {
    const [username, setUsername] = useState("");
    const debouncedUsername = useDebounce(username, 500);

    return (
        <div className="container">
            <header>
                <h1>GitHub Repository Finder</h1>
                <Search username={username} setUsername={setUsername} />
                <p>{debouncedUsername}</p>
            </header>

            <main>
                <RepoList username={debouncedUsername} />
            </main>
        </div>
    )
}

export default App

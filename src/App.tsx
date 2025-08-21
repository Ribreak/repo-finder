import { useState } from 'react';
import './App.css'
import Search from './components/Search'
import useDebounce from './hooks/useDebounce';
import RepoList from './components/RepoList';
import Loader from './components/Loader';


function App() {
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false); 
    const debouncedUsername = useDebounce(username, 500);

    return (
        <div className="container">
            <header>
                <h1>GitHub Repository Finder</h1>
                <Search username={username} onChange={setUsername} />
            </header>

            <main>
                {isLoading && <Loader />}
                <RepoList username={debouncedUsername} isLoading={isLoading} setIsLoading={setIsLoading} />
            </main>
        </div>
    )
}

export default App

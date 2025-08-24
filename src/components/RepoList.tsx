import { useCallback, useEffect, useRef, useState } from "react"
import Repository from "./Repository";
import getPaginatedData from "../utils/getPaginatedData";
import './RepoList.css'

function validateUsername(username: string) {
    const regex = /^[a-zA-Z0-9\-]+$/;
    console.log(username);
    console.log(regex.test(username));
    return regex.test(username);
}

interface RepoListProps {
    username: string,
    isLoading: boolean
    setIsLoading: (isLoading: boolean) => void
}
interface repo {
    name: string
    description: string | null
    html_url: string
    stargazers_count?: number | undefined
    updated_at?: string | null | undefined
}

function RepoList({ username, isLoading, setIsLoading }: RepoListProps) {
    const [repos, setRepos] = useState<repo[]>([]);
    const [currentLink, setCurrentLink] = useState('');
    const [error, setError] = useState('');
    const lastItem = useRef(null);

    const fetchData = useCallback(async (url: string, username: string) => {
        if (validateUsername(username)) {
            setIsLoading(true);
            try {
                const response = await getPaginatedData(url, 20);
                setRepos(repos => [...repos, ...response.repos]);
                setCurrentLink(response.link);
            } catch (e) {
                if (e instanceof Error) setError(e.message);
            }
            setIsLoading(false);
        } else setError("Допускаются только цифры, латинские буквы и знак -");
    }, []);

    useEffect(() => {
        setRepos([]);
        setCurrentLink('');
        setError('');
        setIsLoading(false);

        if (username.length > 0) {
            fetchData(`/use rs/${username}/repos`, username);
        }

    }, [username]);

    useEffect(() => {
        const actionInSight = (entries: IntersectionObserverEntry[]) => {
            if (entries[0].isIntersecting && currentLink.length > 0) {
                fetchData(currentLink, username);
                if (lastItem.current) {
                    observer.unobserve(lastItem.current);
                }
            }
        };

        const observer = new IntersectionObserver(actionInSight);

        if (lastItem.current) {
            observer.observe(lastItem.current);
        }

        return () => {
            if (lastItem.current) {
                observer.unobserve(lastItem.current)
            };
        }

    }, [currentLink, lastItem]);

    let id = 0;

    const repositories = repos.map((item, index) => {
        id++;

        if (index + 1 === repos.length) {
            return <Repository
                key={id}
                id={id}
                name={item.name}
                description={item.description}
                url={item.html_url}
                stars={item.stargazers_count}
                updateDate={item.updated_at}
                ref={lastItem}
            />
        }

        return <Repository
            key={id}
            id={id}
            name={item.name}
            description={item.description}
            url={item.html_url}
            stars={item.stargazers_count}
            updateDate={item.updated_at}
        />
    })

    if (error.length > 0) return <h3 className="error">{error}</h3>
    else if (!isLoading && repositories.length < 1 && username.length > 1)
        return <h3>У пользователя <i>{username}</i> нет публичных репозиториев</h3>
    else return <div>{repositories}</div>
}

export default RepoList
import { useEffect, useRef, useState } from "react"
import Repository from "./Repository";
import getPaginatedData from "../utils/getPaginatedData";

interface RepoListProps {
    username: string
    setIsLoading: (isLoading: boolean) => void
}

interface repo {
    name: string
    description: string | null
    url: string
    stargazers_count?: number | undefined
    updated_at?: string | null | undefined
}

function RepoList({ username, setIsLoading }: RepoListProps) {
    const [repos, setRepos] = useState<repo[]>([]);
    const [currentLink, setCurrentLink] = useState('');
    const lastItem = useRef(null);

    async function fetchData(url: string) {
        setIsLoading(true);
        const response = await getPaginatedData(url, 20);
        setRepos([...repos, ...response.repos]);
        setCurrentLink(response.link);
        setIsLoading(false);
    }

    useEffect(() => {
        setRepos([]);
        setCurrentLink('');
        setIsLoading(false);

        if (username.length > 0) {
            setIsLoading(true);
            fetchData(`/users/${username}/repos`);
        }

    }, [username]);

    useEffect(() => {
        const actionInSight = (entries: IntersectionObserverEntry[]) => {
            if (entries[0].isIntersecting && currentLink.length > 0) {
                fetchData(currentLink);
            }
        };

        const observer = new IntersectionObserver(actionInSight);
        if (lastItem.current) {
            observer.observe(lastItem.current);
        }

        return () => {
            if (lastItem.current) observer.unobserve(lastItem.current);
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
                url={item.url}
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
            url={item.url}
            stars={item.stargazers_count}
            updateDate={item.updated_at}
        />
    })

    return (
        <>
            <div>{repositories}</div>
        </>
    )
}

export default RepoList
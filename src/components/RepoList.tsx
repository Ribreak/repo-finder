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
    const lastItem = useRef(null);

    useEffect(() => {
        setRepos([]);
        setIsLoading(false);

        async function fetchData() {
            const response = await getPaginatedData(`/users/${username}/repos`, 3);
            setRepos(response.repos);
            setIsLoading(false);
        }

        if (username.length > 0) {
            setIsLoading(true);
            fetchData();
        }

    }, [username]);

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
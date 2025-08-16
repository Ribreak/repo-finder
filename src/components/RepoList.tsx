import { Octokit } from "octokit";
import { useEffect, useState } from "react"
import Repository from "./Repository";

interface RepoListProps {
    username: string
}

interface repo {
    name: string
    description: string | null
    url: string
    stargazers_count?: number | undefined
    updated_at?: string | null | undefined
}

function RepoList({ username }: RepoListProps) {
    const [repos, setRepos] = useState<repo[]>([]);
    const octokit = new Octokit({})

    useEffect(() => {
        if (username.length > 0) {
        octokit.request('GET /users/{username}/repos', {
                username: username,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })
                .then(response => setRepos(response.data));
        }
    }, [username]);

    const repositories = repos.map(item => 
        <Repository 
            name={item.name}
            description={item.description}
            url={item.url}
            stars={item.stargazers_count}
            updateDate={item.updated_at} 
             />
    )
    
  return (
    <div>{repositories}</div>
  )
}

export default RepoList
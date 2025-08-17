interface RepositoryProps {
    id: number
    name: string
    description: string | null
    url: string
    stars?: number | undefined
    updateDate?: string | null | undefined
}

function Repository( { id, name, description, url, stars, updateDate }: RepositoryProps ) {
    return (
        <div className='repository-card'>
            <h2>{id}. {name}</h2>
            <p>{description}</p>
            <a href={url} target="_blank">Перейти к репозиторию</a>
            <div className="repository-meta">
                <div className="stars-count">Звёзды: {stars}</div>
                <div>Обновлён: {updateDate && new Date(updateDate).toLocaleDateString()}</div>
            </div>
        </div>
    )
}

export default Repository
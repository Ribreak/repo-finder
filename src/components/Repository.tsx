
function Repository() {
    return (
        <div className='repository-card'>
            <h2></h2>
            <p></p>
            <a href="#" target="_blank">Перейти к репозиторию</a>
            <div className="repository-meta">
                <div className="stars-count"></div>
                <div>Обновлён: {new Date().toLocaleDateString()}</div>
            </div>
        </div>
    )
}

export default Repository
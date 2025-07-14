import { useEffect, useState } from "react"
import { getTopics } from "./api"

export const ViewTopics = () => {
    const [topics, setTopics] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        getTopics()
            .then((topics) => {
                setTopics(topics)
            })
            .catch((err) => {
                setError(err)
                setIsLoading(false)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    if (isLoading) return <div className="loader-container"><h1 className="loader"></h1></div>

    if (isError) return <p className="error">something went wrong</p>

    return(
        <ul className="topics-list">
            {topics.map((topic) => {
                return (
                    <li className="topic-item" key={topic.slug}>
                        <p className="topic-name">{topic.slug}</p>
                        <p className="topic-description">{topic.description}</p>
                        <img className="topic-image" src={topic.img_url} alt={`${topic.slug} icon`} />
                    </li>
                )
            })}
        </ul>
    )
}
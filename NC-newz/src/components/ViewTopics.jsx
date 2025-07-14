import { useEffect, useState } from "react"
import { getTopics } from "./api"
const placeholderImage = "https://superblog.supercdn.cloud/site_cuid_clvc4016q001j13bhaleswmt1/images/12-1717012195121-compressed.jpg"

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

    return (
        <section className="topics-page">
            <ul className="topics-list">
                {topics.map((topic) => (
                    <li className="topic-item" key={topic.slug}>
                        <p className="topic-name">{topic.slug}</p>
                        <p className="topic-description">{topic.description}</p>
                        <img
                            className="topic-image"
                            src={topic.img_url ? topic.img_url : placeholderImage}
                            alt={`${topic.slug} icon`}
                        />
                    </li>
                ))}
            </ul>
        </section>
    )
}
import React, { useEffect, useState } from 'react'
import NewsItems from './NewsItems'
import Spinners from './Spinners';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)



    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    console.log("hello i am a constructor");



    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2a10274ee8fc488ca7fc0c41b6022811&page=1&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }
    useEffect(() => {
     document.title = `${capitalizeFirstLetter(props.category)} - NewsGorilla` ;
        updateNews();
    }, [])




    const handlePrevClick = async () => {


        setPage(page - 1)
        updateNews();
    }
    const handleNextClick = async () => {


        setPage(page + 1)
        updateNews();
    }
    const fetchMoreData = async () => {

        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2a10274ee8fc488ca7fc0c41b6022811&page=1&pageSize=${props.pageSize}`;

        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)

    };

    return (
        <>

            <h1 className="text-center" style={{ margin: '30px 0px', marginTop: '90px' }}>
                Newsgorilla - Top Headlines from  {capitalizeFirstLetter(props.category)}</h1>
            {loading && <Spinners />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinners />}
            >
                <div className='container'>
                    <div className='row'>


                        {articles.map((element) => {


                            return <div className='col-md-4' key={element.url}>
                                <NewsItems title={element.title.slice(0, 45) ? element.title : ""} description={element.description ? element.description.slice(0, 85) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt}
                                    source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                    <button disabled={state.page >= 1} type='button' className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
                    <button type='button' className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div> */}


        </>
    )

}
News.defaultProps = {
    country:'in',
    pageSize: 8,
    category: 'general',
}
News.propTypes = {
    country:PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News

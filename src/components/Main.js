import React, { useEffect, useState } from "react";

export default function Main() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch("https://medium-api-psi.vercel.app/api/news")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setNews(data.result);
        setFilteredNews(data.result);
        getCategories(data.result);
      })
      .catch((err) => console.log(err));
  };

  const getCategories = (incomingData) => {
    const newCategory = [];
    incomingData.map(({ category }) => {
      if (!newCategory.includes(category)) {
        newCategory.push(category);
      }
    });
    setCategories(newCategory);
  };

  const onChangeText = (e) => {
    setSearchTxt(e.target.value);

    console.log(e.target.value);

    filterNews(e.target.value);
  };

  const filterNews = (searchParams) => {
    const filterNewsList = news.filter((newsItem) => {
      if (newsItem.title && newsItem.title.length > 0) {
        return newsItem?.title
          .toLowerCase()
          .includes(searchParams.toLowerCase());
      }
    });

    getCategories(filterNewsList);

    setFilteredNews(filterNewsList);
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            value={searchTxt}
            onChange={onChangeText}
          />
        </div>
      </div>
      <div className="row">
        <h1>New list</h1>
        <div className="col-md-12">
          {categories.map((catItem) => {
            return (
              <>
                <h2>{catItem}</h2>
                <div className="col-md-12 d-flex justify-content-between align-items-center">
                  {filteredNews.map(({ title, body, img }, i) => {
                    if (i < 4) {
                      return (
                        <div className="col-md-3">
                          <h4>{title}</h4>
                          <p>{body}</p>
                        </div>
                      );
                    }
                  })}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import style from "./App.module.css";

const { searchStyle, submit, formBox } = style;

const SERVER_URL = "http://localhost:3000/search-history";
const API_KEY = "pLURtkhVrUXr3KG25Gy5IvzziV5OrZGa";
const GIPHY_URL = "https://api.giphy.com/v1/gifs/search";

const fetchGifs = async (searchTerm, offset) => {
  const url = `${GIPHY_URL}?api_key=${API_KEY}&q=${encodeURIComponent(searchTerm)}&offset=${offset}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};

const postSearch = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ search: data }),
  };
  try {
    const response = await fetch(SERVER_URL, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (error) {
    console.error("Error:", error);
  }
};
const App = () => {
  const [search, setSearch] = useState("");
  const [gifs, setGifs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [previewSearch, setPreviewSearch] = useState([]);

  const handleSearch = async (e) => {
    //validation here
    e.preventDefault();
    const { pagination, data } = (await fetchGifs(search)) || {};
    await postSearch(search);
    setGifs(data);
    setOffset(pagination.count);
  };
  const handleLoadMore = async () => {
    //validation here
    const { data } = (await fetchGifs(search, offset)) || {};
    setGifs((prevState) => [...prevState, ...data]);
  };
  const handleClear = () => {
    setGifs([]);
    setSearch("");
    setPreviewSearch([]);
  };

  useEffect(() => {
    fetch(SERVER_URL)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setPreviewSearch(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        return [];
      });
  }, []);

  return (
    <>
      <div className={formBox}>
        <form onSubmit={handleSearch}>
          {previewSearch.map((tag) => (
            <span
              key={tag.id}
              className={style.tag}
              onClick={(e) => {
                setSearch(tag.searchTerm);
                return handleSearch();
              }}
            >
              {tag.searchTerm}
            </span>
          ))}

          <input
            className={searchStyle}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type={"text"}
          />
          <button type="submit" className={submit}>
            Send
          </button>
          <button onClick={handleClear} className={submit}>
            Clear
          </button>
        </form>
      </div>
      <h2>GIFS:</h2>
      <div className={style["gif-flex"]}>
        {gifs.map(({ slug, images, title, alt_text }) => (
          <div key={slug} className={style["gif-item"]}>
            <h4>{title}</h4>
            <img src={images.preview_gif.url} alt={alt_text} />
          </div>
        ))}
        {!!gifs.length && (
          <button type="submit" onClick={handleLoadMore} className={submit}>
            Load more...
          </button>
        )}
      </div>
    </>
  );
};

export default App;

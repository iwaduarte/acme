import { useEffect, useState } from "react";
import style from "./App.module.css";

const { searchStyle, submit, gif } = style;

const SERVER_URL = "https://localhost:3000";
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
const App = () => {
  const [search, setSearch] = useState("");
  const [gifs, setGifs] = useState([]);
  const [offset, setOffset] = useState(0);

  const handleSearch = async (e) => {
    //validation here
    e.preventDefault();
    const { pagination, data } = (await fetchGifs(search)) || {};
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
  };

  useEffect(() => {
    fetch("SERVER_URL");
  }, []);

  return (
    <div>
      <form onSubmit={handleSearch}>
        {}

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

      <div className={gif}>
        GIFS:
        {gifs.map(({ slug, images, title, alt_text }) => (
          <div key={slug}>
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
    </div>
  );
};

export default App;

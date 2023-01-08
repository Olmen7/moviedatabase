import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/movieBrowserLogo.png";

const Navbar = ({ searchText, setSearchText }) => {
  const navigate = useNavigate();
  const updateSearchText = (e) => {
    navigate("/search");
    setSearchText(e.target.value);
  };
  const clickHandler = (e) => {
    e.preventDefault();
    updateSearchText();
  };
  function deleteText(e) {
    e.target.value = "";
  }

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img className="logo" src={logo} alt="Movie Browser Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
          <form className="search-form" role="search">
            <input
              className="form-control me-2 searchbar"
              type="search"
              placeholder="Search..."
              aria-label="Search"
              value={searchText}
              autoFocus
              onChange={updateSearchText}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  e.preventDefault();
                }
              }}
              onKeyUp={(e) => {
                if (e.keyCode === 13) {
                  deleteText(e);
                }
              }}
            ></input>
            <button
              onClick={clickHandler}
              className=" btn-outline-success search-btn"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

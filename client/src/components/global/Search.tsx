import { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const options = [
    { value: "Tất cả", text: "Tất cả" },
    { value: "Review giảng viên", text: "Review giảng viên" },
    { value: "Review môn học", text: "Review môn học" },
  ];

  return (
    <div className="row m-4 position-relative">
      <div
        className="search-bar col-9 d-flex border border-secondary"
        style={{ borderRadius: "10px" }}
      >
        <button className="btn border-0">
          <i className="bi bi-search"></i>
        </button>
        <input
          type="search"
          className="flex-grow-1 pl-2 border-0"
          style={{ outline: "0" }}
          value={search}
          placeholder="Tìm kiếm theo môn, giảng viên..."
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </div>

      <div className="filter-bar col selectContainer">
        <select
          className="form-control"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>Chọn tag để lọc</option>
          {options.map((o) => (
            <option value={o.value}>{o.text}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Search;

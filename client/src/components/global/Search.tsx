import { useState, KeyboardEvent } from "react";
import toast from 'react-hot-toast';
import { fetchPosts } from '../../api/post';
import { PostType } from '../../utils/enum';
import { PostResp } from '../../utils/TypeScript';

interface IProps {
  updatePosts: (posts: PostResp[], total: number) => void 
}

const Search = (props: IProps) => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const options = [
    { value: PostType.NONE, text: "Tất cả" },
    { value: PostType.SUBJECT, text: "Review môn học" },
    { value: PostType.LECTURER, text: "Review giảng viên" },
  ];

  const filterPosts = async () => {
    try {
      const { data, meta } = await fetchPosts(undefined, undefined, search, type)
      props.updatePosts(data as PostResp[], meta.total_page)
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau')
    }
  }

  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      filterPosts()
    }
  };

  return (
    <div className="row m-4 position-relative">
      <div
        className="search-bar col-9 d-flex border border-secondary"
        style={{ borderRadius: "10px" }}
      >
        <button onClick={filterPosts} className="btn border-0">
          <i className="bi bi-search"></i>
        </button>
        <input
          type="search"
          className="flex-grow-1 pl-2 border-0"
          style={{ outline: "0" }}
          value={search}
          placeholder="Tìm kiếm theo môn, giảng viên..."
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e)}
        ></input>
      </div>

      <div className="filter-bar col selectContainer">
        <select
          className="form-control"
          onChange={(e) => setType(e.target.value)}
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

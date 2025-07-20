import React from "react";

const Search = ({ setPerPage, setSearchValue, searchValue }) => {
  console.log("setPerPage", setPerPage);
  return (
    <div className="flex justify-between items-center">
      <select
        onChange={(e) => setPerPage(parseInt(e.target.value))}
        className="px-4 py-2 focus:border-indigo-500 outline-none bg-blue-mode border border-slate-700 rounded-md text-[#d0d2d6]"
      >
        <option value="5">5</option>
        <option value="15">15</option>
        <option value="25">25</option>
      </select>
      <input
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        className="px-4 py-2 focus:border-indigo-500 outline-none bg-blue-mode border border-slate-700 rounded-md text-[#d0d2d6]"
        type="text"
        placeholder="جستجو"
      />
    </div>
  );
};

export default Search;

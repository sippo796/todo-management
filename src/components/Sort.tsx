import { SortType } from "@/util/types";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useState } from "react";
import "@/styles/sort.css";

interface Props {
  onSort: (type: SortType, sortAscending: boolean) => void;
}

const Sort = ({ onSort }: Props) => {
  const [statusSortAscending, setStatusSortAscending] = useState(true);
  const [titleSortAscending, setTitleSortAscending] = useState(true);
  const [dateSortAscending, setDateSortAscending] = useState(true);

  return (
    <div>
      <div className="w-full flex shadow-sm mt-2 px-2" role="group">
        <button
          type="button"
          className="w-32 sort-button"
          onClick={() => {
            onSort(SortType.status, !statusSortAscending);
            setStatusSortAscending((prev) => !prev);
          }}
        >
          ステータス
          {statusSortAscending ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </button>
        <button
          type="button"
          className="flex-grow sort-button"
          onClick={() => {
            onSort(SortType.title, !titleSortAscending);
            setTitleSortAscending((prev) => !prev);
          }}
        >
          タイトル
          {titleSortAscending ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </button>
        <button
          type="button"
          className="sort-button"
          onClick={() => {
            onSort(SortType.date, !dateSortAscending);
            setDateSortAscending((prev) => !prev);
          }}
        >
          完了予定日
          {dateSortAscending ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </button>
      </div>
    </div>
  );
};

export default Sort;

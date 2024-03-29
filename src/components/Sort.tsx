import { SortType } from "@/util/types";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useState } from "react";

interface Props {
  onSort: (type: SortType, sortAscending: boolean) => void;
}

const Sort = ({ onSort }: Props) => {
  const [statusSortAscending, setStatusSortAscending] = useState(true);
  const [titleSortAscending, setTitleSortAscending] = useState(true);
  const [dateSortAscending, setDateSortAscending] = useState(true);

  const sortButtonStyle =
    "px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700";

  return (
    <div>
      <div className="w-full flex shadow-sm mt-2 px-2" role="group">
        <button
          type="button"
          className={`w-32 ${sortButtonStyle}`}
          data-testid="status-sort"
          onClick={() => {
            onSort(SortType.status, !statusSortAscending);
            setStatusSortAscending((prev) => !prev);
          }}
        >
          ステータス
          {statusSortAscending ? (
            <ArrowDropUpIcon data-testid="status-asc" />
          ) : (
            <ArrowDropDownIcon data-testid="status-dsc" />
          )}
        </button>
        <button
          type="button"
          className={`flex-grow ${sortButtonStyle}`}
          data-testid="title-sort"
          onClick={() => {
            onSort(SortType.title, !titleSortAscending);
            setTitleSortAscending((prev) => !prev);
          }}
        >
          タイトル
          {titleSortAscending ? (
            <ArrowDropUpIcon data-testid="title-asc" />
          ) : (
            <ArrowDropDownIcon data-testid="title-dsc" />
          )}
        </button>
        <button
          type="button"
          className={`${sortButtonStyle}`}
          data-testid="enddate-sort"
          onClick={() => {
            onSort(SortType.date, !dateSortAscending);
            setDateSortAscending((prev) => !prev);
          }}
        >
          完了予定日
          {dateSortAscending ? (
            <ArrowDropUpIcon data-testid="enddate-asc" />
          ) : (
            <ArrowDropDownIcon data-testid="enddate-dsc" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Sort;

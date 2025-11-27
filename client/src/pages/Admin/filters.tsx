import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import type { FilterProps } from "../../types";

export default function Filters({ 
  vacancyFilter, 
  dateFilter, 
  sortBy, 
  uniqueVacancies, 
  onVacancyChange, 
  onDateChange, 
  onSortChange, 
  onClear,
  getVacancyPosition 
}: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const vacancy = searchParams.get("vacancy");
    const date = searchParams.get("date");
    const sort = searchParams.get("sort");

    if (vacancy) onVacancyChange(vacancy);
    if (date) onDateChange(date);
    if (sort) onSortChange(sort);
  }, []);

  const handleVacancyChange = (value: string) => {
    onVacancyChange(value);
    if (value) {
      searchParams.set("vacancy", value);
    } else {
      searchParams.delete("vacancy");
    }
    setSearchParams(searchParams);
  };

  const handleDateChange = (value: string) => {
    onDateChange(value);
    if (value) {
      searchParams.set("date", value);
    } else {
      searchParams.delete("date");
    }
    setSearchParams(searchParams);
  };

  const handleSortChange = (value: string) => {
    onSortChange(value);
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  };

  const handleClear = () => {
    onClear();
    searchParams.delete("vacancy");
    searchParams.delete("date");
    setSearchParams(searchParams);
  };

  return (
    <div className="mb-6 flex flex-wrap gap-4 items-end">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm mb-1 text-gray-300">ვაკანსია</label>
        <select 
          value={vacancyFilter}
          onChange={(e) => handleVacancyChange(e.target.value)}
          className="w-full bg-gstore-midnight border border-soft-silver/30 rounded-lg px-4 py-2 text-white"
        >
          <option value="">ყველა</option>
          {uniqueVacancies.map(v => (
            <option key={v} value={v}>{getVacancyPosition(v)}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm mb-1 text-gray-300">თარიღი</label>
        <input 
          type="date"
          value={dateFilter}
          onChange={(e) => handleDateChange(e.target.value)}
          className="w-full bg-gstore-midnight border h-[39px] border-soft-silver/30 rounded-lg px-4 py-2 text-white"
        />
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm mb-1 text-gray-300">დალაგება</label>
        <select 
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full bg-gstore-midnight border border-soft-silver/30 rounded-lg px-4 py-2 text-white"
        >
          <option value="date-desc">თარიღი (ახალი, ძველი)</option>
          <option value="date-asc">თარიღი (ძველი,ახალი)</option>
          <option value="name-asc">სახელი (ა,ჰ)</option>
          <option value="name-desc">სახელი (ჰ,ა)</option>
        </select>
      </div>

      {(vacancyFilter || dateFilter) && (
        <button
          onClick={handleClear}
          className="bg-red-500/20 hover:bg-red-500/30 px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
        >
          გასუფთავება
        </button>
      )}
    </div>
  );
}

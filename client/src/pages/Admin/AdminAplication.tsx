import { useEffect, useState } from "react";
import axios from "axios";
import type { Application, Vacancy } from "../../types";
import Filters from "./filters";
import ApplicationsTable from "./aplicationTable";
import vacancyData from "../../vacancy.json";

export default function AdminApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [vacancies] = useState<Vacancy[]>(vacancyData);
  const [filteredApps, setFilteredApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [vacancyFilter, setVacancyFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("date-desc");

  useEffect(() => {
    const loadData = async () => {
      try {
        const appRes = await axios.get("http://localhost:3001/api/users");
        setApplications(appRes.data.data);
        setFilteredApps(appRes.data.data);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    let result = [...applications];

    if (vacancyFilter) {
      result = result.filter(app => app.vacancy_id.toString() === vacancyFilter);
    }

    if (dateFilter) {
      result = result.filter(app => app.created_at?.startsWith(dateFilter));
    }

    if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name, 'ka'));
    } else if (sortBy === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name, 'ka'));
    } else if (sortBy === "date-asc") {
      result.sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return dateA - dateB;
      });
    } else if (sortBy === "date-desc") {
      result.sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return dateB - dateA;
      });
    }

    setFilteredApps(result);
  }, [applications, vacancyFilter, dateFilter, sortBy]);

  const uniqueVacancies = [...new Set(applications.map(app => app.vacancy_id))].sort((a, b) => a - b);

  const getVacancyPosition = (vacancyId: number) => {
    const vacancy = vacancies.find(v => v.id === vacancyId);
    return vacancy ? vacancy.position : `#${vacancyId}`;
  };

  const handleClearFilters = () => {
    setVacancyFilter("");
    setDateFilter("");
  };

  if (loading) return <p className="text-white p-10 text-xl">იტვირთება...</p>;

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl mb-6 font-semibold">მოწოდებული განაცხადები</h1>

      <Filters
        vacancyFilter={vacancyFilter}
        dateFilter={dateFilter}
        sortBy={sortBy}
        uniqueVacancies={uniqueVacancies}
        onVacancyChange={setVacancyFilter}
        onDateChange={setDateFilter}
        onSortChange={setSortBy}
        onClear={handleClearFilters}
        getVacancyPosition={getVacancyPosition}
      />

      <ApplicationsTable 
        applications={filteredApps} 
        getVacancyPosition={getVacancyPosition}
      />

      <p className="mt-4 text-gray-400 text-sm">
        სულ: {filteredApps.length} განაცხადი
      </p>
    </div>
  );
}
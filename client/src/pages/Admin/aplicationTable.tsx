import type { Application } from "../../types";
import ApplicationRow from "./aplicationRow";


interface TableProps {
  applications: Application[];
  getVacancyPosition: (id: number) => string;
}

export default function ApplicationsTable({ applications, getVacancyPosition }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-soft-silver/30">
      <table className="w-full border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-soft-silver/30 bg-gstore-midnight">
            <th className="text-left p-3 md:p-4 text-magic-gold font-medium text-sm md:text-base">ID</th>
            <th className="text-left p-3 md:p-4 text-magic-gold font-medium text-sm md:text-base">სახელი</th>
            <th className="text-left p-3 md:p-4 text-magic-gold font-medium text-sm md:text-base">ელ. ფოსტა</th>
            <th className="text-left p-3 md:p-4 text-magic-gold font-medium text-sm md:text-base">ტელეფონი</th>
            <th className="text-left p-3 md:p-4 text-magic-gold font-medium text-sm md:text-base">ვაკანსია</th>
            <th className="text-left p-3 md:p-4 text-magic-gold font-medium text-sm md:text-base">თარიღი</th>
            <th className="text-center p-3 md:p-4 text-magic-gold font-medium text-sm md:text-base">CV</th>
          </tr>
        </thead>
        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center p-8 text-gray-400">
                განაცხადები არ მოიძებნა
              </td>
            </tr>
          ) : (
            applications.map((app) => (
              <ApplicationRow key={app.id} app={app} getVacancyPosition={getVacancyPosition} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
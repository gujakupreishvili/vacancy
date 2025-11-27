import { Download } from "lucide-react";
import type { Application } from "../../types";


interface ApplicationRowProps {
  app: Application;
  getVacancyPosition: (id: number) => string;
}

export default function ApplicationRow({ app, getVacancyPosition }: ApplicationRowProps) {
  const cvUrl = app.cv_path ? `http://localhost:3001/${app.cv_path}` : null;
  const date = app.created_at ? new Date(app.created_at).toLocaleDateString('ka-GE') : '-';

  return (
    <tr className="border-b border-soft-silver/10 hover:bg-white/5 transition-colors">
      <td className="p-3 md:p-4 text-sm md:text-base">{app.id}</td>
      <td className="p-3 md:p-4 font-medium text-sm md:text-base">{app.name}</td>
      <td className="p-3 md:p-4 text-gray-300 text-sm md:text-base break-all">{app.email}</td>
      <td className="p-3 md:p-4 text-gray-300 text-sm md:text-base whitespace-nowrap">{app.phone}</td>
      <td className="p-3 md:p-4">
        <span className="bg-gstore-blue/20 text-gstore-blue px-2 py-1 rounded text-xs md:text-sm whitespace-nowrap inline-block">
          {getVacancyPosition(app.vacancy_id)}
        </span>
      </td>
      <td className="p-3 md:p-4 text-gray-300 text-sm md:text-base whitespace-nowrap">{date}</td>
      <td className="p-3 md:p-4 text-center">
        {cvUrl ? (
          <a
            href={cvUrl}
            download={`CV_${app.name}.pdf`}
            className="inline-flex items-center gap-2 text-gstore-blue hover:text-magic-gold transition-colors"
            title="CV ჩამოტვირთვა"
          >
            <Download size={18} className="md:w-5 md:h-5" />
          </a>
        ) : (
          <span className="text-gray-500">-</span>
        )}
      </td>
    </tr>
  );
}
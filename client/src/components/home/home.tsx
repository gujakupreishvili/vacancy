import { useState } from "react";
import vacancyData from "../../vacancy.json";
import SubmitPopUp from "../submitPopUp/submitPopUp";

export default function Home() {
  const [submit, setSubmit] = useState(false)
  return (
    <div className="flex flex-col px-5.5 lg:px-10 mt-[30px]">
      <h1 className="text-soft-silver text-[20px] lg:text-[30px]">
        აქტიური ვაკანსიები
      </h1>

      <div className="mt-5 flex flex-col gap-4 lg:flex-row">
        {vacancyData.map((vac) => (
          <div
            key={vac.id}
            className="    p-4 border border-soft-silver/20 rounded-lg bg-soft-silver flex flex-col gap-[15px] hover:shadow-[0px_0px_3px_3px_var(--color-soft-silver)] transition-shadow duration-300 cursor-pointer"
          >
            <h2 className="text-gstore-blue text-[18px]">{vac.position}</h2>
            <p className="text-gstore-midnight text-[14px]">
              {vac.description}
            </p>
            <button onClick={()=>setSubmit(true)} className="bg-magic-gold text-gstore-midnight px-5 py-2 rounded-lg cursor-pointer">
              გაგზავნა
            </button>
          </div>
        ))}
      </div>
      {submit && <SubmitPopUp />}
    </div>
  );
}

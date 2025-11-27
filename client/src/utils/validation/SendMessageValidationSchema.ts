import * as Yup from "yup";

export const SendMessageValidationSchema = Yup.object({
  fullName: Yup.string().required("სახელი აუცილებელია"),
  email: Yup.string()
    .required("ელფოსტა აუცილებელია")
    .email("არასწორი ელფოსტის ფორმატი"),
  phone: Yup.string()
    .required("ტელეფონი აუცილებელია")
    .matches(/^[0-9]+$/, "მხოლოდ ციფრები")
    .min(9, "მინიმუმ 9 ციფრი")
    .max(9, "მაქსიმუმ 9 ციფრი"),
  resume: Yup.mixed()
    .nullable()
    .required("რეზიუმე აუცილებელია")
    .test("fileExists", "რეზიუმე აუცილებელია", (value) => {
      return value !== null && value !== undefined;
    })
    .test("fileType", "მხოლოდ PDF ფორმატი დაშვებულია", (value) => {
      if (!value) return true; 
      return value instanceof File && value.type === "application/pdf";
    })
    .test("fileSize", "ფაილის ზომა არ უნდა აღემატებოდეს 5MB-ს", (value) => {
      if (!value) return true;
      return value instanceof File && value.size <= 5 * 1024 * 1024;
    }),
});
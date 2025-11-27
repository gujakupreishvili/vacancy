import { Form, Formik } from "formik";
import { CiCircleRemove } from "react-icons/ci";
import Input from "../input/input";
import type { SendMessageTypes } from "../../types";
import { SendMessageValidationSchema } from "../../utils/validation/SendMessageValidationSchema";
import Button from "../button/button";
import FileInput from "../input/fileInput";
import { useState } from "react";
import axios from "axios";

interface SubmitPopUpProps {
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  getpostId: number | null;
}

const SendMessageValu: SendMessageTypes = {
  name: "",
  email: "",
  phone: "",
  cv: null,
};

export default function SubmitPopUp({
  setSubmit,
  getpostId,
}: SubmitPopUpProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const SendMessage = async (values: SendMessageTypes) => {
    setLoading(true);
    setError(null);
  
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("vacancyId", String(getpostId));
  
    if (values.cv) {
      formData.append("cv", values.cv);
    }
  
    try {
      const response = await axios.post("http://localhost:3001/api/auth/apply", formData);
  
      console.log("Success:", response.data);
      setSuccess(true);

      setTimeout(() => {
        setSubmit(false);
      }, 2000);
    } catch (err: any) {
      console.error("Error:", err);
      if (err.response) {
        setError(err.response.data.error || "განაცხადის გაგზავნა ვერ მოხერხდა");
      } else {
        setError(err.message || "დაფიქსირდა შეცდომა");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen fixed bg-white/5 backdrop-blur-sm flex items-center justify-center top-0 bottom-0 left-0 right-0 z-50">
      <div className="bg-gray-400 p-10 rounded-lg shadow-lg w-[90%] lg:w-[35%] relative max-h-[90vh] overflow-y-auto">
        <CiCircleRemove
          className="absolute text-white text-[28px] right-[13px] top-[10px] cursor-pointer hover:opacity-80"
          onClick={() => setSubmit(false)}
        />
        <h2 className="text-white text-xl font-semibold mb-6">
          განაცხადის გაგზავნა
        </h2>
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
             {error}
          </div>
        )}

        <Formik
          initialValues={SendMessageValu}
          validationSchema={SendMessageValidationSchema}
          onSubmit={SendMessage}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <Input
                lableTxt="სახელი და გვარი"
                placeholder=""
                name="name"
                type="text"
                error={errors.name}
                touched={touched.name}
              />
              <Input
                lableTxt="ელფოსტა"
                placeholder=""
                name="email"
                type="email"
                error={errors.email}
                touched={touched.email}
              />
              <Input
                lableTxt="ტელეფონის ნომერი"
                placeholder=""
                name="phone"
                type="tel"
                error={errors.phone}
                touched={touched.phone}
              />
              <FileInput
                name="cv"
                lableTxt="რეზიუმე (PDF)"
                accept=".pdf"
                error={errors.cv as string}
                touched={touched.cv}
              />
              <Button
                text={loading ? "იგზავნება..." : "გაგზავნა"}
                className="bg-magic-gold text-gstore-midnight px-5 py-2 rounded-2xl cursor-pointer w-full hover:opacity-90 transition-opacity disabled:opacity-50"
              />
            </Form>
          )}
        </Formik>
      </div>
      {success && (
          <div className="bg-green-500 text-white  p-4 rounded-lg mb-4 absolute right-1 top-1">
            განაცხადი წარმატებით გაიგზავნა!
          </div>
        )}
    </div>
  );
}

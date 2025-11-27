import { Form, Formik } from "formik";
import { CiCircleRemove } from "react-icons/ci";
import Input from "../input/input";
import type { SendMessageTypes } from "../../types";
import { SendMessageValidationSchema } from "../../utils/validation/SendMessageValidationSchema";
import Button from "../button/button";
import FileInput from "../input/fileInput";

interface SubmitPopUpProps {
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  getpostId: number | null;
}

const SendMessageValu: SendMessageTypes = {
  fullName: "",
  email: "",
  phone: "",
  resume: null,
};

export default function SubmitPopUp({
  setSubmit,
  getpostId,
}: SubmitPopUpProps) {
  const SendMessage = (values: SendMessageTypes) => {
    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    if (values.resume) {
      formData.append("resume", values.resume);
    }
    formData.append("postId", String(getpostId));
    console.log("Form values:", values);
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
                name="fullName"
                type="text"
                error={errors.fullName}
                touched={touched.fullName}
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
                name="resume"
                lableTxt="რეზიუმე (PDF)"
                accept=".pdf"
                error={errors.resume as string}
                touched={touched.resume}
              />
              <Button
                text="გაგზავნა"
                className="bg-magic-gold text-gstore-midnight px-5 py-2 rounded-2xl cursor-pointer w-full hover:opacity-90 transition-opacity"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
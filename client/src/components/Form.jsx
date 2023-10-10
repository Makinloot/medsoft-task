import { useRef } from "react";
import { useAppContext } from "../context/ContextProvider";
import { Formik, Form as FormikForm } from "formik";
import formValidationSchema from "../validationSchema";
import axios from "axios";

/* eslint-disable react/prop-types */
export default function Form() {
  const { setShowForm } = useAppContext();
  const formRef = useRef(null);

  async function handleSubmit({ name, birthdate, sex, mobile, location }) {
    try {
      const generateId = () => Math.random() * Math.random() * Math.random();
      const request = {
        name: name,
        birthdate: new Date(birthdate)
          .toLocaleDateString("en-GB")
          .replace(/\//g, "."),
        sex: sex,
        mobile: mobile,
        location: location,
        id: String(generateId()).split(".")[1],
      };
      // production route
      // axios.post("/insert", request).then((res) => {
      //   console.log(res);
      //   setShowForm(false);
      // });
      // test route
      axios.post("http://localhost:3000/insert", request).then((res) => {
        console.log(res);
        setShowForm(false);
      });
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  return (
    <div className="Form">
      <div className="container">
        <div className="Form-wrapper flex items-center justify-center fixed h-screen w-full top-0 left-0 bg-[#000000b7]">
          <Formik
            initialValues={{
              name: "",
              birthdate: "",
              sex: "",
              mobile: "",
              location: "",
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
            validationSchema={formValidationSchema}
          >
            {({
              values,
              handleBlur,
              handleChange,
              errors,
              touched,
              isSubmitting,
            }) => (
              <FormikForm ref={formRef} className="relative">
                <InputField
                  handleChange={handleChange("name")}
                  handleBlur={handleBlur("name")}
                  name={"სახელი გვარი"}
                  value={values.name}
                  error={touched.name && errors.name}
                  required
                />
                <InputField
                  handleChange={handleChange("birthdate")}
                  handleBlur={handleBlur("birthdate")}
                  name={"დაბ თარიღი"}
                  value={values.birthdate}
                  error={touched.name && errors.birthdate}
                  type={"date"}
                  required
                />
                <InputField
                  handleChange={handleChange("sex")}
                  handleBlur={handleBlur("sex")}
                  name={"სქესი"}
                  value={values.sex}
                  error={touched.name && errors.sex}
                  required
                />
                <InputField
                  handleChange={handleChange("mobile")}
                  handleBlur={handleBlur("mobile")}
                  name={"მობ ნომერი"}
                  value={values.mobile}
                  error={touched.name && errors.mobile}
                  type={"number"}
                />
                <InputField
                  handleChange={handleChange("location")}
                  handleBlur={handleBlur("location")}
                  name={"მისამართი"}
                  value={values.location}
                  error={touched.name && errors.location}
                  required
                />
                {isSubmitting ? (
                  <div>იგზავნება</div>
                ) : (
                  <div className="flex my-4 justify-between">
                    <button
                      className="font-bold text-black py-1 px-4 cursor-pointer bg-red-400"
                      type="button"
                      onClick={() => setShowForm(false)}
                    >
                      დახურვა
                    </button>
                    <input
                      className="font-bold text-black py-1 px-4 cursor-pointer bg-green-400"
                      type="submit"
                      value="დამატება"
                    />
                  </div>
                )}
              </FormikForm>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

function InputField({
  type,
  name,
  required,
  value,
  handleChange,
  handleBlur,
  error,
}) {
  return (
    <div className="Input-field flex flex-col text-white">
      <label className="my-2" htmlFor={name}>
        {name}
      </label>
      {error && <div>{error}</div>}
      <input
        className="w-[300px] max-w-[100%] h-9 rounded-sm px-2 bg-white text-black outline-none focus:bg-slate-200"
        type={type ? type : "text"}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        name={name}
        id={name}
      />
    </div>
  );
}

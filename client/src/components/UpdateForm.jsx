/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Field, Formik, Form as FormikForm } from "formik";
import { useAppContext } from "../context/ContextProvider";
import { useEffect, useRef, useState } from "react";
import { InputField } from "./Form";
import axios from "axios";

export default function UpdateForm({ id }) {
  const { data, setShowUpdateForm } = useAppContext();
  const formRef = useRef(null);
  const [formValues, setFormValues] = useState({});
  // filter data by given id
  const filterData = () => data.filter((item) => item.id === id);

  function handleSubmit(values) {
    try {
      values.id = id;
      // test route for production use /update
      axios
        .post("http://localhost:3000/update", values)
        .then((res) => {
          console.log(res);
          setShowUpdateForm(false);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(`Error updating patient: ${error}`);
    }
  }

  useEffect(() => {
    setFormValues(filterData()[0]);
  }, [id]);
  return (
    <div className="Update-form">
      <div className="container">
        <div className="Update-form-wrapper flex items-center justify-center fixed h-screen w-full top-0 left-0 bg-[#000000b7]">
          {formValues?.name && (
            <Formik
              initialValues={{
                name: formValues?.name,
                birthdate: new Date(
                  formValues?.birthdate.split(".").reverse().join("-")
                )
                  .toISOString()
                  .split("T")[0],
                sex: formValues?.sex,
                mobile: formValues?.mobile,
                location: formValues?.location,
              }}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
              // validationSchema={formValidationSchema}
            >
              {({
                values,
                handleBlur,
                handleChange,
                errors,
                touched,
                // isSubmitting,
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
                  <div className="radio-group my-4 text-white">
                    {errors.sex && <span>{errors.sex}</span>}
                    <div className="Input-field">
                      <label>
                        <span className="mr-2">მამრობითი</span>
                        <Field type="radio" name="sex" value="მამრობითი" />
                      </label>
                    </div>
                    <div className="Input-field">
                      <label>
                        <span className="mr-2">მდედრობითი</span>
                        <Field type="radio" name="sex" value="მდედრობითი" />
                      </label>
                    </div>
                  </div>
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
                  <div className="flex my-4 justify-between">
                    <button
                      className="font-bold text-black py-1 px-4 cursor-pointer bg-red-400"
                      type="button"
                      onClick={() => setShowUpdateForm(false)}
                    >
                      დახურვა
                    </button>
                    <input
                      className="font-bold text-black py-1 px-4 cursor-pointer bg-green-400"
                      type="submit"
                      value="დამატება"
                    />
                  </div>
                </FormikForm>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
}

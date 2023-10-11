import * as Yup from "yup";

export const formValidationSchema = Yup.object().shape({
  name: Yup.string().required("სავალდებულო ველი").max(200),
  birthdate: Yup.date().required("სავალდებულო ველი"),
  sex: Yup.string().required("სავალდებულო ველი"),
  mobile: Yup.string()
    .required("სავალდებულო ველი")
    .test("startsWithFive", "ველი 5-ით უნდა იწყებოდეს", (value) => {
      if (value === undefined) return true; // Allow undefined values, as long as they're not required
      return value.toString().startsWith("5");
    })
    .max(9, "მაქსიმუმ 9 ციფრი")
    .min(9, "მინიმუმ 9 ციფრი"),
  location: Yup.string().required("სავალდებულო ველი"),
});

export default formValidationSchema;

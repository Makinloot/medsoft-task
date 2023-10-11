import * as Yup from "yup";

export const formValidationSchema = Yup.object().shape({
  name: Yup.string().required("სავალდებულო ველი").max(200),
  birthdate: Yup.date().required("სავალდებულო ველი"),
  sex: Yup.string().required("სავალდებულო ველი"),
  // mobile: Yup.number().required("სავალდებულო ველი"),
  location: Yup.string().required("სავალდებულო ველი"),
});

export default formValidationSchema;

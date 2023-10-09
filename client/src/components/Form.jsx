import { useAppContext } from "../context/ContextProvider";

/* eslint-disable react/prop-types */
export default function Form() {
  const { setShowForm } = useAppContext();
  return (
    <div className="Form">
      <div className="container">
        <div className="Form-wrapper flex items-center justify-center fixed h-screen w-full top-0 left-0 bg-[#000000b7]">
          <form action="#" className=" relative">
            <InputField name={"სახელი გვარი"} required />
            <InputField name={"დაბ თარიღი"} required />
            <InputField name={"სქესი"} required />
            <InputField name={"მობ ნომერი"} type={"number"} />
            <InputField name={"მისამართი"} required />
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
          </form>
        </div>
      </div>
    </div>
  );
}

function InputField({ type, name, required }) {
  return (
    <div className="Input-field flex flex-col text-white">
      <label className="my-2" htmlFor={name}>
        {name}
      </label>
      <input
        className="w-[300px] max-w-[100%] h-9 rounded-sm px-2 bg-white text-black outline-none focus:bg-slate-200"
        type={type ? type : "text"}
        required={required}
      />
    </div>
  );
}

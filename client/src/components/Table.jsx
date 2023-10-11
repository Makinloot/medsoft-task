/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useAppContext } from "../context/ContextProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import TableButtons from "./TableButtons";

export default function Table() {
  const { showForm, showButtons, showDeletePopup } = useAppContext();
  const [data, setData] = useState([]);

  async function fetchPatients() {
    try {
      // production route
      // const { data } = await axios.get("/patients")
      // testing route
      const { data } = await axios.get("http://localhost:3000/patients");
      setData(data);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  useEffect(() => {
    fetchPatients();
  }, [showForm, showButtons, showDeletePopup]);

  return (
    <div className="Table">
      <div className="container">
        <div className="Table-wrapper">
          <TableButtons />
          <div className="border border-black mt-4">
            <div className="overflow-x-auto">
              <table className="table table-xs">
                <thead>
                  <tr className="border-black text-black">
                    <th className="border-r border-black">ID</th>
                    <th className="border-r border-black">
                      პაციენტის გვარი სახელი
                    </th>
                    <th className="border-r border-black">დაბ თარიღი</th>
                    <th className="border-r border-black">სქესი</th>
                    <th className="border-r border-black">მობ ნომერი</th>
                    <th className="border-r">მისამართი</th>
                  </tr>
                </thead>
                <tbody className="text-black">
                  {data?.map((item) => (
                    <TableRow key={item.id} {...item} />
                  ))}
                  <tr className="border-black hover:bg-slate-200 h-[25px]">
                    <th className="border-r border-black"></th>
                    <td className="border-r border-black"></td>
                    <td className="border-r border-black"></td>
                    <td className="border-r border-black"></td>
                    <td className="border-r border-black"></td>
                    <td className=""></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRow({ id, name, birthdate, sex, mobile, location }) {
  const { setShowButtons, setSelectedId, selectedId } = useAppContext();

  useEffect(() => {
    // check if click contains class SELECTED_ITEM
    const handleClick = (e) => {
      if (e.target.classList.contains("SELECTED_ITEM")) return;
      else {
        setSelectedId("");
        setShowButtons(false);
      }
    };
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <tr
      className={`SELECTED_ITEM border-black hover:bg-slate-200 cursor-pointer ${
        selectedId === id ? "bg-slate-400 hover:bg-slate-400" : ""
      }`}
      onClick={() => {
        setSelectedId(id);
        setShowButtons(true);
      }}
    >
      <th
        className="SELECTED_ITEM border-r border-black max-w-[25px] overflow-hidden text-ellipsis"
        title={id}
      >
        {id}
      </th>
      <td className="SELECTED_ITEM border-r border-black">{name}</td>
      <td className="SELECTED_ITEM border-r border-black">{birthdate}</td>
      <td className="SELECTED_ITEM border-r border-black">{sex}</td>
      <td className="SELECTED_ITEM border-r border-black">{mobile}</td>
      <td className="">{location}</td>
    </tr>
  );
}

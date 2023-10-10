/* eslint-disable react/prop-types */
import { IoAddOutline } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import { useAppContext } from "../context/ContextProvider";
import { useEffect, useState } from "react";
import axios from "axios";
const TEST_DATA = [
  {
    id: 0,
    name: "გელაშვილი გიორგი",
    birthdate: "20.12.1980",
    sex: "მამრობითი",
    mobile: "598-130-150",
    location: "ქ. თელავი",
  },
  {
    id: 1,
    name: "ზოიძე ნიკოლოზი",
    birthdate: "01.05.1975",
    sex: "მამრობითი",
    mobile: null,
    location: "ქ. გორი",
  },
  {
    id: 2,
    name: "ასათიანი თათია",
    birthdate: "02.01.1965",
    sex: "მდედრობითი",
    mobile: "595-105-205",
    location: "ქ. ბათუმი",
  },
];

export default function Table() {
  const { showForm } = useAppContext();
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
    // console.log(data);
  }, [showForm]);
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

function TableButtons() {
  const { setShowForm } = useAppContext();
  return (
    <div className="Table-buttons flex gap-4 text-black">
      <button
        className="flex items-center gap-1"
        onClick={() => setShowForm(true)}
      >
        <IoAddOutline size={28} color="green" />
        <span className="text-sm">დამატება</span>
      </button>
      <button className="flex items-center gap-1">
        <BiEdit size={24} color="orange" />
        <span className="text-sm">რედაქტირება</span>
      </button>
      <button className="flex items-center gap-1">
        <TiDeleteOutline size={24} color="red" />
        <span className="text-sm">წაშლა</span>
      </button>
    </div>
  );
}

function TableRow({ id, name, birthdate, sex, mobile, location }) {
  return (
    <tr className="border-black hover:bg-slate-200">
      <th
        className="border-r border-black max-w-[25px] overflow-hidden text-ellipsis"
        title={id}
      >
        {id}
      </th>
      <td className="border-r border-black">{name}</td>
      <td className="border-r border-black">{birthdate}</td>
      <td className="border-r border-black">{sex}</td>
      <td className="border-r border-black">{mobile}</td>
      <td className="">{location}</td>
    </tr>
  );
}

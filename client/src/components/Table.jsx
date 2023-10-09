/* eslint-disable react/prop-types */
import { IoAddOutline } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";

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
                  {TEST_DATA.map((item) => (
                    <TableRow key={item.id} {...item} />
                  ))}
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
  return (
    <div className="Table-buttons flex gap-4 text-black">
      <div className="flex items-center gap-1">
        <IoAddOutline size={28} color="green" />
        <span className="text-sm">დამატება</span>
      </div>
      <div className="flex items-center gap-1">
        <BiEdit size={24} color="orange" />
        <span className="text-sm">რედაქტირება</span>
      </div>
      <div className="flex items-center gap-1">
        <TiDeleteOutline size={24} color="red" />
        <span className="text-sm">წაშლა</span>
      </div>
    </div>
  );
}

function TableRow({ id, name, birthdate, sex, mobile, location }) {
  return (
    <tr className="border-black hover:bg-slate-200">
      <th className="border-r border-black">{id}</th>
      <td className="border-r border-black">{name}</td>
      <td className="border-r border-black">{birthdate}</td>
      <td className="border-r border-black">{sex}</td>
      <td className="border-r border-black">{mobile}</td>
      <td className="">{location}</td>
    </tr>
  );
}

/* eslint-disable react/prop-types */
import { IoAddOutline } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import { useAppContext } from "../context/ContextProvider";
import { useEffect, useState } from "react";
import axios from "axios";

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
function TableButtons() {
  const {
    setShowForm,
    showButtons,
    selectedId,
    setShowDeletePopup,
    showDeletePopup,
  } = useAppContext();
  // function handleDelete(id) {
  //   try {
  //     // test route
  //     axios
  //       .post("http://localhost:3000/delete", { id: id })
  //       .then((res) => console.log(res));
  //   } catch (error) {
  //     console.log(`Error deleting patient: ${error}`);
  //   }
  // }

  return (
    <div className="Table-buttons flex gap-4 text-black">
      {showDeletePopup && <DeletePopUp />}
      <button
        className="flex items-center gap-1"
        onClick={() => setShowForm(true)}
      >
        <IoAddOutline size={28} color="green" />
        <span className="text-sm">დამატება</span>
      </button>
      <button
        className={`ROW_ITEM flex items-center gap-1 ${
          showButtons
            ? "opacity-100 pointer-events-auto"
            : "opacity-50 pointer-events-none"
        }`}
      >
        <div className="ROW_ITEM">
          <BiEdit className="ROW_ITEM" size={24} color="orange" />
        </div>
        <span className="text-sm ROW_ITEM">რედაქტირება</span>
      </button>
      <button
        className={`ROW_ITEM flex items-center gap-1 ${
          showButtons
            ? "opacity-100 pointer-events-auto"
            : "opacity-50 pointer-events-none"
        }`}
        onClick={() => setShowDeletePopup(true)}
      >
        <div className="ROW_ITEM">
          <TiDeleteOutline className="ROW_ITEM" size={24} color="red" />
        </div>
        <span className="text-sm ROW_ITEM">წაშლა</span>
      </button>
    </div>
  );
}

function DeletePopUp() {
  const { setShowForm, showButtons, selectedId, setShowDeletePopup } =
    useAppContext();
  function handleDelete(id) {
    try {
      // test route
      axios
        .post("http://localhost:3000/delete", { id: id })
        .then((res) => console.log(res));
    } catch (error) {
      console.log(`Error deleting patient: ${error}`);
    }
  }
  return (
    <div className="fixed z-[1000] top-0 left-0 h-screen w-screen flex items-center justify-center bg-black/60">
      <div className="border border-black rounded-sm py-2 px-6 bg-white">
        <p>გსურთ პაციენტის წაშლა ?</p>
        <div className="flex justify-between my-4">
          <button
            className="bg-green-400 py-1 px-4"
            onClick={() => {
              handleDelete(selectedId);
              setShowDeletePopup(false);
            }}
          >
            დიახ
          </button>
          <button
            className="ROW_ITEM bg-red-400 py-1 px-4"
            onClick={() => {
              setShowDeletePopup(false);
            }}
          >
            არა
          </button>
        </div>
      </div>
    </div>
  );
}

function TableRow({ id, name, birthdate, sex, mobile, location }) {
  const { setShowButtons, setSelectedId, selectedId } = useAppContext();

  useEffect(() => {
    // check if click contains class ROW_ITEM
    const handleClick = (e) => {
      if (e.target.classList.contains("ROW_ITEM")) return;
      else {
        setSelectedId("");
        setShowButtons(false);
      }
    };
    window.addEventListener("click", handleClick);

    // remove event listener
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <tr
      className={`ROW_ITEM border-black hover:bg-slate-200 cursor-pointer ${
        selectedId === id ? "bg-slate-400 hover:bg-slate-400" : ""
      }`}
      onClick={() => {
        setSelectedId(id);
        setShowButtons(true);
      }}
    >
      <th
        className="ROW_ITEM border-r border-black max-w-[25px] overflow-hidden text-ellipsis"
        title={id}
      >
        {id}
      </th>
      <td className="ROW_ITEM border-r border-black">{name}</td>
      <td className="ROW_ITEM border-r border-black">{birthdate}</td>
      <td className="ROW_ITEM border-r border-black">{sex}</td>
      <td className="ROW_ITEM border-r border-black">{mobile}</td>
      <td className="">{location}</td>
    </tr>
  );
}

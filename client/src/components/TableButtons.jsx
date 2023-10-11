/* eslint-disable no-unused-vars */
import { IoAddOutline } from "react-icons/io5";
import { useAppContext } from "../context/ContextProvider";
import { BiEdit } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import axios from "axios";

export default function TableButtons() {
  const { setShowForm, showButtons, setShowDeletePopup, showDeletePopup } =
    useAppContext();

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
        className={`SELECTED_ITEM flex items-center gap-1 ${
          showButtons
            ? "opacity-100 pointer-events-auto"
            : "opacity-50 pointer-events-none"
        }`}
      >
        <div className="SELECTED_ITEM">
          <BiEdit className="SELECTED_ITEM" size={24} color="orange" />
        </div>
        <span className="text-sm SELECTED_ITEM">რედაქტირება</span>
      </button>
      <button
        className={`SELECTED_ITEM flex items-center gap-1 ${
          showButtons
            ? "opacity-100 pointer-events-auto"
            : "opacity-50 pointer-events-none"
        }`}
        onClick={() => setShowDeletePopup(true)}
      >
        <div className="SELECTED_ITEM">
          <TiDeleteOutline className="SELECTED_ITEM" size={24} color="red" />
        </div>
        <span className="text-sm SELECTED_ITEM">წაშლა</span>
      </button>
    </div>
  );
}

function DeletePopUp() {
  const { selectedId, setShowDeletePopup } = useAppContext();

  // delete patient from database by id
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
    <div className="SELECTED_ITEM fixed z-[1000] top-0 left-0 h-screen w-screen flex items-center justify-center bg-black/60">
      <div className="SELECTED_ITEM border border-black rounded-sm py-2 px-6 bg-white">
        <p className="SELECTED_ITEM">გსურთ პაციენტის წაშლა ?</p>
        <div className="SELECTED_ITEM flex justify-between my-4">
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
            className="SELECTED_ITEM bg-red-400 py-1 px-4"
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

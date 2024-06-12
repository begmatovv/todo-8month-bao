import React, { useState } from "react";
import { useCollection } from "../hooks/useCollection";
import { useSelector } from "react-redux";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../firebase/firebaseConfig";
const Home = () => {
  const { user } = useSelector((state) => state.userState);
  const { data } = useCollection("tasks", ["uid", "==", user.uid]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { title, description, uid: user.uid};
    addDoc(collection(db, "tasks"), newTask)
      .then(() => {
        toast.success("new task added successfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const handleDelete = (taskId) => {
    const taskRef = doc(db, "tasks", taskId);
    deleteDoc(taskRef)
      .then(() => {
        toast.success("task deleted succesfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <div className="max-w-[1100px] mx-auto px-5 ">
      <h1 className="text-center text-5xl mb-10">TaskList:</h1>
      <form className="flex justify-center items-end gap-10 mb-40">
        <label className="">
          <span className="">Title:</span>
          <br />
          <input
            className="p-2 border rounded-md"
            required
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
        </label>
        <label>
          <span>Description:</span>
          <br />
          <input
            className="p-2 border rounded-md"
            required
            onChange={(e) => setDescription(e.target.value)}
            type="text"
          />
        </label>
        <button onClick={handleSubmit} className="btn btn-primary ">
          Add the task
        </button>
      </form>
      <ul className="bg-base-200 w-[800px] mx-auto p-4 flex flex-col gap-4 min-h-80">
        {data &&
        
          data.map((task) => {
            return (
              <li
                className="border-b p-2 shadow-md text-xl flex justify-between pr-5 cursor-pointer"
                key={task.id}
              >
                <span>{task.title}</span>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="btn btn-sm btn-error"
                >
                  x
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Home;

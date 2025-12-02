import React, { useState, useEffect } from "react";
import MapScreen from "../assets/map.png";
//import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import Axios from "axios";
import Loading from "../components/Loading";

const TodoList = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [formData, setFormData] = useState({
        todoName: "",
        attachClient: "",
        endDate: "",
        noEndDate: false,
        setPirority: "",
        setReminder: false,
        note: ""
    });

    useEffect(() => {
       // console.log(formData);
    }, [formData]);

    //const [selectedClient, setSelectedClient] = useState("");
    //const  [sucess, setSucess] = useState(null);
    //const [error, setError] =  useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(null);

    const handleToggle = () => {
        setIsChecked(!isChecked);
        setFormData(prevState => ({
            ...prevState,
            noEndDate: !prevState.noEndDate
        }));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
        console.log(formData);
        // This line is for debugging and should be removed in production
        //console.log(`Selected client: ${e.target.value}`);
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(""); 

    

        Axios.post("http://localhost:5000/api/todo/createTodoList", formData)
            .then((res) => {
                console.log(res.data);
                setMessage("Todo created successfully.");
                // Optionally, clear the form or show a success message
                setFormData({
                    todoName: "",
                    attachClient: "",
                    endDate: "",
                    noEndDate: false,
                    setPirority: "",
                    setReminder: false,
                    note: ""
                });
                setIsSuccess(true); // Set success state to true

             
            })

            
            .catch((err) => {
                console.error(err);
                setMessage("An error occurred while creating the todo.");
                setIsSuccess(false);

            })
            .finally(() => {
                setIsLoading(false);            
            });

            
            
    };

    return (
        <div className="flex h-screen">
            <div className="">
                <img
                    src={MapScreen}
                    alt="map screen image"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-">
                <div className="justify-items-start p-4">
                    <div className="flex justify-between w-full">
                        <div className="flex gap-x-10 items-center w-full">
                            <div>
                            <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold font-inter">To-do List</h1>
                            </div>
                        </div>
                        <div>
                            <div className="mr-3">
                                <MdOutlineCancel className="w-8 h-8 text" />
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="px-10 mt-16">

                    {isLoading && <p>Loading...</p>}
                        {message &&   <p className={`${isSuccess ? 'bg-green-500' : 'bg-red-500'} text-center text-white py-3 w-full mt-5`}>
                    {message}
                </p>}
                        <div className="flex flex-col gap-y-1 mt-14 md:mt-4">
                            <label className="font-inter text-[14px]" htmlFor="todo">
                                Todo<span className="text-[#ed0202]">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder=""
                                name="todoName"
                                value={formData.todoName}
                                onChange={handleChange}
                                className="border-2 rounded-2xl placeholder-text-[#d7d7d7] px-3 py-2 border-[#dfdfdf] outline-none w-[461px] h-[54px]"
                            />
                        </div>
                        <div className="flex flex-col gap-y-1 mt-14 md:mt-10">
                            <label className="font-inter text-[14px]" htmlFor="client">
                                Attach Client<span className="text-[#ed0202]">*</span>
                            </label>
<select
    name="attachClient" // Ensure this matches the key in your formData state
    value={formData.attachClient}
    onChange={handleChange}
    className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
>
    <option value="">Select Client</option>
    <option value="Israel@accountsgoal.com">Israel@accountsgoal.com</option>
    <option value="Israel@gloriation.com">Israel@gloriation.com</option>
    <option value="Davidson@gloriation.com">Davidson@gloriation.com</option>
</select>
</div>
                        
  <div className="flex flex-col gap-y-1 mt-14 md:mt-10">
                            <label className="font-inter text-[14px]" htmlFor="endDate">
                                End Date<span className="text-[#ed0202]">*</span>
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="border-2 rounded-2xl placeholder-text-[#d7d7d7] px-3 py-2 border-[#dfdfdf] outline-none w-[461px] h-[54px]"
                            />
                        </div>

                        <div className="flex flex-col gap-y-1 mt-14 md:mt-10">
    <div className="flex items-center justify-between">
        <label className="font-inter text-[14px]" htmlFor="noEndDate">
            No end date for task<span className="text-[#ed0202]">*</span>
        </label>
        <div
            className={`w-12 h-7 bg-gray-400 rounded-full relative cursor-pointer transition-colors duration-300 ${formData.noEndDate ? 'bg-gray-500' : ''}`}
            onClick={() => setFormData(prevState => ({ ...prevState, noEndDate: !prevState.noEndDate }))}
        >
            <div
                className={`w-6 h-6 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-1 transition-transform duration-300 ${formData.noEndDate ? 'translate-x-5' : ''}`}
            />
        </div>
    </div>
</div>
<br/>
<div>
    
</div>

<div className=" justify-center space-x-4">
<label>Set Priority</label>
<br/>

    <button
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full px-4 py-2 ${formData.setPirority === "High" ? "bg-blue-700" : ""}`}
        type="button"
        onClick={() => setFormData(prevState => ({ ...prevState, setPirority: prevState.setPirority === "High" ? "" : "High" }))}
    >
        High Priority
    </button>
    
    <button
        className={`bg-blue-400 hover:bg-blue-700 text-white font-bold rounded-full px-4 py-2 ${formData.setPirority === "Medium" ? "bg-blue-700" : ""}`}
        type="button"
onClick={() => setFormData(prevState => ({ ...prevState, setPirority: prevState.setPirority === "Medium" ? "" : "Medium" }))}
    >
        Medium Priority
    </button>
    <button
        className={`bg-blue-300 hover:bg-blue-700 text-white font-bold rounded-full px-4 py-2 ${formData.setPirority === "Low" ? "bg-blue-700" : ""}`}
        type="button"
        onClick={() => setFormData(prevState => ({ ...prevState, setPirority: prevState.setPirority === "Low" ? "" : "Low" }))}
    >
        Low Priority
    </button>
</div>


                        <div className="flex flex-col gap-y-1 mt-14 md:mt-10">
    <div className="flex items-center justify-between">
        <label className="font-inter text-[14px]" htmlFor="reminder">
            Set Reminder<span className="text-[#ed0202]">*</span>
        </label>
        <div
            className={`w-12 h-7 bg-blue-500 rounded-full relative cursor-pointer transition-colors duration-300 ${formData.setReminder ? 'bg-blue-500' : ''}`}
            onClick={() => setFormData(prevState => ({ ...prevState, setReminder: !prevState.setReminder }))}
        >
            <div
                className={`w-6 h-6 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-1 transition-transform duration-300 ${formData.setReminder? 'translate-x-5' : ''}`}
            />
        </div>
    </div>
</div>
                        <div className="flex flex-col gap-y-1 mt-14 md:mt-4">
                            <label className="font-inter text-[14px]" htmlFor="note">
                                Type note<span className="text-[#ed0202]">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder=""
                                name="note"
                                value={formData.note}
                                onChange={handleChange}
                                className="border-2 rounded-2xl placeholder-text-[#d7d7d7] px-3 py-2 border-[#dfdfdf] outline-none w-[461px] h-[54px]"
                            />
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-40 rounded-full focus:outline-none focus:shadow-outline mt-20 mx-auto block"
                            type="submit"
                        >
                            + Create Todo
                        </button>
                    </form>
                    <div className="mt-4">
                        <p className="text-center text-gray-500">Set Immediate appointment</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoList;

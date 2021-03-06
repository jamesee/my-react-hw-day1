import * as React from "react";
import { useState, useReducer } from "react";

import { CareerItem } from "../components/career-item";
import { CareerForm } from "../components/career-form";
import { jobs } from "../data/jobs-data"

function formReducer(state, action) {
  switch (action.type) {
    case "setData":
      return { ...action.payloads }
    case "formEvent":
      return {
        ...state,
        [action.payloads.name]: action.payloads.value
      }
    default:
      return state
  }

}

// const createJob = (data) => {
//   const API_URL = "https://ecomm-service.herokuapp.com/job"

//   return fetch(API_URL, {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(data)
//   })
// }

export const Career = () => {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [jobsItems, setJobsItems] = useState(jobs);
  const [editMode, setEditMode] = useState(false);

  //   useEffect((index) => {
  //     alert(`
  //     [DEBUG] *** editJob function *** \n
  //     title : ${formData.title} \n
  //     level : ${formData.level} \n
  //     dept  : ${formData.department} \n
  //     summary: ${formData.summary} \n
  //     headcount : ${formData.headcount}
  // `)
  //   }, [formData])

  const addJob = (newJobsItem) => {
    // id to get from server when submit to API
    newJobsItem._id = parseInt(Math.random() * 100000000);
    console.log(`[DEBUG] addJob function ...`)
    const newJobs = [...jobsItems, newJobsItem];
    setJobsItems(newJobs);
    setFormData({
      type: "setData",
      payloads: {}
    });
  };

  const editJob = (index) => {
    console.log(`[DEBUG] editJob function ...`)
    setEditMode(true);
    setFormData({
      type: "setData",
      payloads: jobsItems[index]
    })

  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  }

  const updateJob = (updatedJob) => {
    console.log(`[INFO] updateJob function ...`)
    alert(`[INFO] updateJob function ...`)

    // alert(`
    //   [DEBUG] *** updateJob function *** \n
    //   id : ${updatedJob._id} \n
    //   title : ${updatedJob.title} \n
    //   level : ${updatedJob.level} \n
    //   dept  : ${updatedJob.department} \n
    //   summary: ${updatedJob.summary} \n
    //   headcount : ${updatedJob.headcount}
    // `)

    toggleEditMode();
    let newJobsItems = jobsItems.filter(job => job._id !== updatedJob._id)
    newJobsItems = [...newJobsItems, updatedJob];
    setJobsItems(newJobsItems)
    setFormData({
      type: "setData",
      payloads: {}
    });
  }

  const onCancel = () => {
    console.log(`[DEBUG] onCancel function ...`)
    // alert(`[DEBUG] *** onCancel function *** \n`)
    toggleEditMode();
    setFormData({
      type: "setData",
      payloads: {}
    });
  }

  const deleteJob = (index) => {
    console.log(`[DEBUG] deleteJob function ...`)
    // alert(`deleteJobs index : ${index}`)
    const newJobs = [...jobsItems];
    newJobs.splice(index, 1);
    setJobsItems(newJobs);
  };


  return (
    <main class="bg-gray-50">
      <div class="max-w-6xl mx-auto px-3 py-12 space-y-6">
        <div class="mb-8">
          <div>
            <h1 class="text-6xl mb-4 font-extrabold">Careers</h1>
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-3">
          <div class="md:w-1/2">

            <CareerForm
              addJob={addJob}
              updateJob={updateJob}
              formData={formData}
              setFormData={setFormData}
              editMode={editMode}
              onCancel={onCancel}
            />

          </div>
          <ul class="md:flex-1 space-y-3" id="career-list">


            {jobsItems.map((job, index) => (
              <li class="js-career-item">
                <CareerItem
                  index={index}
                  job={job}
                  onEdit={editJob}
                  onDelete={deleteJob}
                  key={job._id}
                />
              </li>
            ))}

          </ul>
        </div>
      </div>
    </main>

  );
};

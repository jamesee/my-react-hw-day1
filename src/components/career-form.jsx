
import * as React from "react";
import { useState, useEffect, useRef } from "react";

export const CareerForm = (props) => {

    const { addJob, updateJob, formData, setFormData, editMode, onCancel } = props;
    // const [formData, setFormData] = useReducer(formReducer, {});
    // const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState(1);
  
    const submitBtnRef = useRef();
  
    useEffect(() => {
      submitBtnRef.current.innerText = (editMode ? "Update" : "Add");
    }, [editMode]);
  
    const handleSubmit = event => {
      event.preventDefault();
      // setSubmitting(true);
      // setTimeout(() => {
      //   setSubmitting(false);
      // }, 3000)
  
      if (!formData) return;
      editMode ? updateJob(formData) : addJob(formData);
      // createJob(formData);
    }
  
    const handleChange = event => {
      setFormData({
        type: "formEvent",
        payloads: {
          name: event.target.name,
          value: event.target.value
        }
      })
    }
  
    return (
  
      <form onSubmit={handleSubmit}>
        <div className="
                bg-white
                overflow-hidden
                shadow
                rounded-lg
                divide-y divide-gray-200
              ">
          <div className="px-4 py-5 sm:px-6 text-lg">{editMode ? "Edit Job Posting" : "Add Job Posting"}</div>
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-5">
              <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
                <label htmlFor="job-title" className="
                        block
                        text-sm
                        font-medium
                        text-gray-700
                        sm:mt-px sm:pt-2
                      ">
                  Job Title
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input type="text" name="title" id="job-title" className="
                          block
                          w-full
                          shadow-sm
                          sm:text-sm
                          focus:ring-pink-500 focus:border-pink-500
                          border-gray-300
                          rounded-md
                        "
                    value={formData.title || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
  
              <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
                <label htmlFor="job-level" className="
                        block
                        text-sm
                        font-medium
                        text-gray-700
                        sm:mt-px sm:pt-2
                      ">
                  Level
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select id="job-level" name="level" className="
                          block
                          w-full
                          pl-3
                          pr-10
                          py-2
                          text-base
                          border-gray-300
                          focus:outline-none
                          focus:ring-pink-500
                          focus:border-pink-500
                          sm:text-sm
                          rounded-md
                        "
                    value={formData.level || 'internship'}
                    onChange={handleChange}
                  >
                    <option value="internship">Internship</option>
                    <option value="entry">Entry</option>
                    <option value="experienced">Experienced</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
              </div>
  
              <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
                <label htmlFor="job-department" className="
                        block
                        text-sm
                        font-medium
                        text-gray-700
                        sm:mt-px sm:pt-2
                      ">
                  Department
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input type="text" name="department" id="job-department" placeholder="e.g. Engineering" className="
                          block
                          w-full
                          shadow-sm
                          sm:text-sm
                          focus:ring-pink-500 focus:border-pink-500
                          border-gray-300
                          rounded-md
                        "
                    value={formData.department || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
  
              <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
                <label htmlFor="job-summary" className="
                        block
                        text-sm
                        font-medium
                        text-gray-700
                        sm:mt-px sm:pt-2
                      ">
                  Summary
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea id="job-summary" name="summary" rows="4" className="
                          block
                          w-full
                          shadow-sm
                          sm:text-sm
                          focus:ring-pink-500 focus:border-pink-500
                          border border-gray-300
                          rounded-md
                        "
                    value={formData.summary || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
  
              <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start">
                <label htmlFor="headcount" className="
                        block
                        text-sm
                        font-medium
                        text-gray-700
                        sm:mt-px sm:pt-2
                      ">
                  Headcount
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="relative w-32">
                    <button type="button" className="
                            absolute
                            left-0
                            inset-y-0
                            px-1.5
                            text-gray-400
                          " id="headcount-minus-btn"
                      onClick={() => {
                        if (value > 1) {
                          setValue(value - 1)
                          setFormData({
                            type: "formEvent",
                            payloads: {
                              name: "headcount",
                              value: value - 1
                            }
                          })
                        }
                      }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                      </svg>
                    </button>
                    <input type="text" name="headcount" id="headcount" className="
                            block
                            w-full
                            px-9
                            text-center
                            shadow-sm
                            sm:text-sm
                            focus:ring-pink-500 focus:border-pink-500
                            border-gray-300
                            rounded-md
                          "
                      value={formData.headcount || 1}
                      onChange={handleChange}
                      readOnly="" />
                    <button type="button" className="
                            absolute
                            right-0
                            inset-y-0
                            px-1.5
                            text-gray-400
                          " id="headcount-plus-btn"
                      name="headcount"
                      onClick={() => {
                        setValue(value + 1)
                        setFormData({
                          type: "formEvent",
                          payloads: {
                            name: "headcount",
                            value: value + 1
                          }
                        })
                      }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </button>
                  </div>
                  <div id="headcount-error" className="text-red-500 text-xs pt-1 hidden"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-4 space-x-4 sm:px-6 text-right">
            {editMode &&
              <button className="
                    inline-flex
                    justify-center
                    py-2
                    px-4
                    border border-transparent
                    shadow-sm
                    text-sm
                    font-medium
                    rounded-md
                    text-white
                    md:bg-gray-500
                    hover:bg-pink-700
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-pink-500
                  "
                id="cancel-btn"
                onClick={onCancel}
              >
                Cancel
              </button>
            }
            <button className="
                    inline-flex
                    justify-center
                    py-2
                    px-4
                    border border-transparent
                    shadow-sm
                    text-sm
                    font-medium
                    rounded-md
                    text-white
                    bg-pink-600
                    hover:bg-pink-700
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-pink-500
                  "
              id="submit-btn"
              ref={submitBtnRef}
            >
              ADD
            </button>
          </div>
        </div>
      </form>
  
  
    )
  };
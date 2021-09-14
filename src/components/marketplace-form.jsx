
import * as React from "react";
import { useEffect, useRef } from "react";

export const MarketPlaceForm = (props) => {

  const { addItem, updateItem, formData, setFormData, editMode, onCancel } = props;

  const submitBtnRef = useRef();
  const titleInputRef = useRef();

  useEffect(() => {
    submitBtnRef.current.innerText = (editMode ? "Update" : "Add");
  }, [editMode]);

  const handleSubmit = event => {
    event.preventDefault();

    if (!formData) return;
    editMode ? updateItem(formData) : addItem(formData);

    if (titleInputRef.current) {
        titleInputRef.current.focus();
    }
  }

  const handleChange = event => {
    const numberFields = ['price', 'numOfStock']
      // console.log(`[DEBUG] handleChange name: ${event.target.name}`)
      // console.log(`[DEBUG] handleChange value: ${event.target.value}`)

    if (numberFields.includes(event.target.name)) {
      setFormData({
        type: "formEvent",
        payloads: {
          name: event.target.name,
          value: Number(event.target.value)
        }
      })
    } else {
      setFormData({
        type: "formEvent",
        payloads: {
          name: event.target.name,
          value: event.target.value
        }
      })
    }

  }

  return (
    <div className="
      flex-initial
      bg-white
      w-full
      lg:max-w-md
      border-b border-gray-100
    ">
      <form className="flex flex-col h-full" onSubmit={handleSubmit}>
        <div className="py-6 px-4 bg-pink-700 sm:px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">New Listing</h2>
          </div>
          <div className="mt-1">
            <p className="text-sm text-pink-300">
              Get started by filling in the information below to create your
              new listing.
            </p>
          </div>
        </div>
        <div className="px-4 sm:px-6 pb-12">
          <div className="space-y-6 pt-6 pb-5">
            <div>
              <label htmlFor="listing-title" className="block text-sm font-medium text-gray-900">
                Title
              </label>
              <div className="mt-1">
                <input type="text" name="title" id="listing-title" required className="
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
                ref={titleInputRef}
                />
              </div>
            </div>
            <div>
              <label htmlFor="listing-price" className="block text-sm font-medium text-gray-900">
                Price
              </label>
              <div className="mt-1">
                <input type="number" name="price" id="listing-price" required className="
                            block
                            w-full
                            shadow-sm
                            sm:text-sm
                            focus:ring-pink-500 focus:border-pink-500
                            border-gray-300
                            rounded-md
                          "
                  value={formData.price || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                Description
              </label>
              <div className="mt-1">
                <textarea id="description" name="description" rows="4" required className="
                            block
                            w-full
                            shadow-sm
                            sm:text-sm
                            focus:ring-pink-500 focus:border-pink-500
                            border border-gray-300
                            rounded-md
                          "
                  value={formData.description || ""}
                  onChange={handleChange}
                >
                </textarea>
              </div>
            </div>
            <div>
            <label htmlFor="listing-condition" className="block text-sm font-medium text-gray-900">
                Condition
              </label>

              <div className="mt-1">
              <select id="listing-condition" name="condition" required className="
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
                  value={formData.condition || "new"}
                  onChange={handleChange}
                >
                  <option value="new">New</option>
                  <option value="used_like-new">Used (like new)</option>
                  <option value="used_good">Used (good)</option>
                  <option value="used_fair">Used (fair)</option>
                </select>

              </div>


            </div>
            <div>
            <label htmlFor="listing-availability" className="block text-sm font-medium text-gray-900">
                Availability
              </label>
              <div className="mt-1">
              <select id="listing-availability" name="availability" required className="
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
                  value={formData.availability || "in-stock"}
                  onChange={handleChange}
                >
                  <option value="in-stock">In Stock</option>
                  <option value="single-item">Single Item</option>
                </select>
              </div>
 
            </div>

            <div>
              <label htmlFor="num-of-stock" className="block text-sm font-medium text-gray-900">
                Number of Available Stock
              </label>
              <div className="mt-1">
                <input type="number" name="numOfStock" id="num-of-stock" required className="
                          block
                          w-full
                          shadow-sm
                          sm:text-sm
                          focus:ring-pink-500 focus:border-pink-500
                          border-gray-300
                          rounded-md
                        "
                  value={formData.numOfStock || '1'}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="
            flex-shrink-0
            px-4
            py-4
            flex
            justify-end
            border-t border-gray-200
          ">
          {editMode &&
            <button className="
                  inline-flex 
                  justify-center 
                  items-center 
                  py-2 px-4 border 
                  border-pink-500 
                  shadow-sm 
                  text-sm 
                  font-medium 
                  rounded-md 
                  text-pink-500 
                  bg-white 
                  hover:text-pink-700 
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
          <button type="submit" className="
                ml-4
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
      </form>
    </div>

  )
};
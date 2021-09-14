import * as React from "react";
import { useState, useReducer, useEffect } from "react";
import { ListingItem } from "../components/listing-item";
import { MarketPlaceForm } from "../components/marketplace-form";
// import { ItemsData } from "../data/listings-data";

const API_URL = "https://ecomm-service.herokuapp.com/marketplace"

const getListings = (page, signal) => 
  fetch(`${API_URL}?limit=6&page=${page? page: 1}`, {
    signal,
  }).then((res) => res.json());

const createListing = (data) =>
  fetch(API_URL , {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

const updateListing = (data) =>
  fetch(`${API_URL}/${data._id}` , {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

const deleteListing = (id) =>
  fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());



function formReducer(state, action) {
  switch (action.type) {
    case "setData":
      return { ...action.payloads }
    case "formEvent":
      // console.log(`[DEBUG] formReducer name: ${action.payloads.name}`)
      // console.log(`[DEBUG] formReducer value: ${action.payloads.value}`)
      return {
        ...state,
        [action.payloads.name]: action.payloads.value
      }
    default:
      return state
  }
}

export const Marketplace = () => {
  // todo: api
  const initFormData = {
    "title": "",
    "description": "",
    "price": 0,
    "condition": "new",
    "imageUrl": "",
    "availability": "in-stock",
    "numOfStock": 1,
  }
  const [formData, setFormData] = useReducer(formReducer, initFormData);
  const [editMode, setEditMode] = useState(false);
  // const [listings, setListings] = useState(ItemsData);
  const [listings, setListings] = useState(undefined);

  const [page, setPage] = useState(1);

  const loadListings = (pageNum, signal) =>
    getListings(pageNum, signal)
      .then((data) => setListings(data))
      .catch((err) => {
        if (err.name !== "AbortError") {
          throw err;
        }
      });

  useEffect(() => {
    const ab = new AbortController();
    loadListings(page, ab.signal);
    return () => {
      ab.abort();
    };
  }, [page]);

  useEffect(() => {
    console.log(`
      [DEBUG] *** useEffect@MarketPlace component *** \n
      id : ${formData._id} \n
      title : ${formData.title} \n
      price : ${formData.price} \n
      numOfStock: ${formData.numOfStock} \n
      description  : ${formData.description} \n
      condition  : ${formData.condition} \n
      availibility  : ${formData.availability} \n
    `)

  }, [formData])

  const addItem = (newItem) => {
    console.log(`[INFO] addItem function ...`)

    createListing(newItem)
      .then(() => {
        loadListings();
        setFormData({
          type: "setData",
          payloads: initFormData
        });
      });
    // // todo:id to get from server when submit to API
    // newItem._id = parseInt(Math.random() * 100000000);
    // const newListings = [...listings, newItem];
    // setListings(newListings);
    // setFormData({
    //   type: "setData",
    //   payloads: {}
    // });
  };

  const editItem = (index) => {
    console.log(`[INFO] editItem function ...`)
    // alert(`
    // [INFO] editItem \n
    // index : ${index}\n
    // _id : ${listings[index]._id}
    // `)
    setEditMode(true);
    setFormData({
      type: "setData",
      payloads: listings[index]
    })
  }

  const updateItem = (updatedItem) => {
    console.log(`[INFO] updateItem function ...`)

  //   console.log(`
  //   [DEBUG] *** updateItem function  *** \n
  //   id : ${formData._id} \n
  //   title : ${formData.title} \n
  //   price : ${formData.price} \n
  //   numOfStock: ${formData.numOfStock} \n
  //   description  : ${formData.description} \n
  //   condition  : ${formData.condition} \n
  //   availibility  : ${formData.availability} \n
  // `)

    toggleEditMode();
    updateListing(updatedItem)
      .then(() => {
        loadListings();
        setFormData({
          type: "setData",
          payloads: initFormData
        });
      });


    // toggleEditMode();
    // let newListings = listings.filter(job => job._id !== updatedItem._id)
    // newListings = [...newListings, updatedItem];
    // setListings(newListings)
    // setFormData({
    //   type: "setData",
    //   payloads: {}
    // });
  }

  const deleteItem = (index) => {
    console.log(`[INFO] deleteItem function ...`)
    // alert(`
    // [INFO] deleteItem \n
    // index : ${index}\n
    // _id : ${listings[index]._id}
    // `)

    const id = listings[index]._id;
    deleteListing(id)
      .then(() => {
        loadListings();
        setFormData({
          type: "setData",
          payloads: initFormData
        });
      });
      

    // const newListings = [...listings];
    // newListings.splice(index, 1);
    // setListings(newListings);

  }

  const toggleEditMode = () => {
    setEditMode(!editMode);
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

  return (
    <main className="bg-gray-50 lg:flex">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center mb-12">
            <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">
              Marketplace
            </h1>
          </div>
          {/* <!-- =============== Prev & Next buttons ============ --> */}
          <div className="flex justify-between">
            <button 
            // className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              className="
                bg-transparent 
                hover:bg-pink-600 
                text-pink-700 
                font-semibold 
                hover:text-white 
                py-2 px-10 
                border 
                border-pink-600 
                hover:border-transparent 
                rounded-2xl
                focus:ring-pink-900
                m-2
              "
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              >
              Prev
            </button>
            <button 
            // className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            className="
                bg-transparent 
                hover:bg-pink-600 
                text-pink-700 
                font-semibold 
                hover:text-white 
                py-2 px-10 
                border 
                border-pink-600 
                hover:border-transparent 
                rounded-2xl
                focus:ring-pink-900
                m-2
              "
            onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
          {/* <div className="flex justify-between">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
             Prev
            </button>
            <button type="button" onClick={() => setPage(page + 1)}>
              Next
            </button>
          </div> */}
          {/* <!-- =============== product ul start ============ --> */}
          <div className="
              grid
              md:grid-cols-2
              gap-x-4 gap-y-8
              xl:grid-cols-3 xl:gap-x-6
            ">
            {/* <!-- =============== product li start ============ --> */}

            {listings &&
              listings.map((item, index) => (
                <ListingItem
                  key={item._id}
                  item={item}
                  index={index}
                  onEdit={editItem}
                  onDelete={deleteItem}
                />
              ))}
            {/* <!-- =============== product li end ============ --> */}
          </div>
          {/* <!-- =============== product ul end ============ --> */}

        </div>
      </div>


      {/* <!-- =============== form start ============ --> */}
      <MarketPlaceForm
        addItem={addItem}
        updateItem={updateItem}
        formData={formData}
        setFormData={setFormData}
        onCancel={onCancel}
        editMode={editMode}
      />
      {/* <!-- =============== form end ============ --> */}

    </main>
  )
}
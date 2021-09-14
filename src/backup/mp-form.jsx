
      <form
      onSubmit={(ev) => {
        ev.preventDefault();
        createListing({
          title,
          price: Number(price),
          description,
          condition,
          availability,
          numOfStock: Number(numOfStock),
        }).then(() => {
          loadListings();
          setTitle("");
          setPrice("");
          setDescription("");
          setCondition("new");
          setAvailability("in-stock");
          setNumOfStock("");

          if (titleInputRef.current) {
            titleInputRef.current.focus();
          }
        });
      }}
    >
      <div className="p-3">New Listing</div>
      <div className="space-y-5 p-3">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            required
            ref={titleInputRef}
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="condition" className="block text-sm font-medium">
            Condition
          </label>
          <select
            id="condition"
            value={condition}
            onChange={(ev) => setCondition(ev.target.value)}
            required
          >
            <option value="new">New</option>
            <option value="used_like-new">Used (like new)</option>
            <option value="used_good">Used (good)</option>
            <option value="used_fair">Used (fair)</option>
          </select>
        </div>
        <div>
          <label htmlFor="availability" className="block text-sm font-medium">
            Availability
          </label>
          <select
            id="availability"
            value={availability}
            onChange={(ev) => setAvailability(ev.target.value)}
            required
          >
            <option value="in-stock">In Stock</option>
            <option value="single-item">Single Item</option>
          </select>
        </div>
        <div>
          <label htmlFor="numOfStock" className="block text-sm font-medium">
            Number of Available Stock
          </label>
          <input
            type="number"
            id="numOfStock"
            value={numOfStock}
            onChange={(ev) => setNumOfStock(ev.target.value)}
            required
          />
        </div>
        <div>
          <button>ADD</button>
        </div>
      </div>
    </form>
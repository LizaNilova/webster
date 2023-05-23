import React from "react";

export const ChangeImage = () => {
    return <div className="rounded-3xl bg-dark-purple w-3/4 h-fit">
              <div className="p-4 pb-2 items-start justify-start">
                <button
                  onClick={onClickCancelImage}
                  className="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4">
                  Cancel
                </button>
              </div>

              <div className="flex flex-col p-4 justify-center items-center">
                <label
                  className="text-gray-300 w-full py-2 px-6 bg-gray-600 text-xs flex items-center justify-center border-2 border-dotted cursor-pointer">
                  Add image
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => { setNewImage(e.target.files[0]) }}
                  />
                </label>
                <div className="flex object-cover py-2">
                  {!newImage &&
                    <img className='w-40' src={`http://localhost:3002/${user.avatar}`} alt={user.avatar} />
                  }
                  {newImage &&
                    <img className='w-40' src={URL.createObjectURL(newImage)} alt={newImage.name} />
                  }
                </div>
                <button
                  onClick={onClickBut}
                  className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
                  Save
                </button>
              </div>

            </div>
}
export default function CrimeReportPost() {
  return (
    <>
     
      <dialog id="post_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="flex flex-col gap-5">
            <h1 className="text-center text-2xl">Create post</h1>
            <div className="flex flex-col gap-3">
            <input type="text" placeholder="Title" className="input input-bordered w-full" />
              <textarea
                className="textarea w-full text-xl h-full textarea-bordered "
                placeholder="Whats on your mind?"
              ></textarea>
            </div>
            <hr />
            <div className=" flex justify-center items-center">
              <div>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </div>
              <div></div>
            </div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
              Post
            </button>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      {/* </form> */}
    </>
  );
}

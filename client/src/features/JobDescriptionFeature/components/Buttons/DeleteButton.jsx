const DeleteButton = ({ onClick }) => (
  <button onClick={onClick} className='bg-red-600 hover:bg-red-700 cursor-pointer focus:outline-2 px-4 py-2 rounded'>
    Delete
  </button>
)

export default DeleteButton

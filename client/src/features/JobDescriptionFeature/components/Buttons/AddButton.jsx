import { PrimaryButton } from "../../../../shared/components/Buttons"

const AddButton = ({ onClick }) => (
  <PrimaryButton onClick={onClick} className='m-2 px-4 py-2 rounded'>
    Add New Job Description
  </PrimaryButton>
)

export default AddButton

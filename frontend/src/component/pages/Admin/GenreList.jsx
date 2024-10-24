import { useState } from "react";
import Modal from "../../Modal";
import {
  useCreateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
  useUpdateGenreMutation,
} from "../../../redux/api/genre";
import GenreForm from "../../GenreForm";
import { toast } from "react-toastify";
const GenreList = () => {
  const { data: allGenres, refetch } = useFetchGenresQuery();
  const [name, setName] = useState("");
  const [selectedGenre, setSelectGenere] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modelVisible, setModalVisible] = useState(false);
  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Genre name is required");
      return;
    }
    try {
      const result = await createGenre({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name}is created`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating genre failed,try again.");
    }
  };
  const handleUpdateGenre = async (e) => {
    e.preventDefault();
  
    // Validate that updatingName is not empty
    if (!updatingName.trim()) {
      toast.error("Genre name is required");
      return;
    }
  
    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        updateGenre: {
          name: updatingName.trim(), // Trim to avoid whitespace issues
        },
      }).unwrap();
  
      // Check if result contains an error
      if (result && result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} has been updated`);
        refetch(); // Refresh the genre list
        setSelectGenere(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Error updating genre:", error);
      toast.error("Failed to update genre. Please try again.");
    }
  };
  
  
  const handleDeleteGenre = async () => {
    try {
      const result = await deleteGenre(selectedGenre._id).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        refetch();
        selectedGenre(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Genre deleted failed.try again");
    }
  };
  return (
    <>
      <div className="ml-[10rem] flex flex-col md:flex-row">
        <div className="md:w-3/4 p-3 ">
          <h1 className="h-12">Mangae Genre</h1>
          <GenreForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateGenre}
          />
          <br />
          <div className="flex flex-wrap">
            {allGenres?.map((genre) => (
              <div key={genre._id}>
                <button
                  className="bg-white border border-teal-500 text-teal-500 py-2 px-4 rounded-lg hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                  onClick={() => {
                    {
                      setModalVisible(true);

                      setSelectGenere(genre);
                      setUpdatingName(genre.name);
                    }
                  }}
                >
                  {genre.name}
                </button>
              </div>
            ))}
          </div>
          <Modal isOpen={modelVisible} onClose={() => setModalVisible(false)}>
            <GenreForm
              value={updatingName}
              setValue={(value) => setUpdatingName(value)}
              handleSubmit={handleUpdateGenre}
              buttonText="Update"
              handleDelete={handleDeleteGenre}
            />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default GenreList;

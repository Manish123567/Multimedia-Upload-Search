import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { setFiles } from "../features/fileSlice";
import FileCard from "../components/FileCard.jsx";

export default function Dashboard() {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const files = useSelector((state) => state.files.files);

  const dispatch = useDispatch();

  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const ALLOWED_TYPES = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "video/mp4",
    "audio/mpeg",
    "application/pdf"
  ];

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [query, setQuery] = useState("");

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState(null);


  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);


  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;


    if (!ALLOWED_TYPES.includes(f.type)) {
      showToast("Invalid file type ❌", "error");
      return;
    }


    if (f.size > MAX_FILE_SIZE) {
      showToast("File too large! Max 5MB ❌", "error");
      return;
    }

    setFile(f);
    setPreview(URL.createObjectURL(f));
  };


  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      showToast("Please select a file ❌", "error");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("tags", tags);

      const res = await axios.post(
        "http://localhost:5000/api/files/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      showToast(res.data.message, "success");


      setFile(null);
      setPreview(null);
      setTitle("");
      setTags("");

      if (query) handleSearch();

    } catch (err) {
      showToast(
        err.response?.data?.error || "Upload failed ❌",
        "error"
      );
    } finally {
      setUploading(false);
    }
  };



  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/files/search?q=${query}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      dispatch(setFiles(res.data));
    } catch (err) {
      showToast("Failed to fetch files ❌", "error");
    } finally {
      setLoading(false);
    }
  };



  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="dashboard">


      <div className="navbar">
        <h2>Technical Assessment 🚀</h2>

        <div className="nav-right">
          <span>👋 {user?.name}</span>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
      </div>

      <div className="content">


        {toast && (
          <div className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        )}


        <div className="upload-section">
          <h3>Upload File</h3>

          <form onSubmit={handleUpload}>
            <input type="file" onChange={handleFile} />

            {preview && <img src={preview} alt="preview" />}

            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />

            <button type="submit">
              {uploading ? "Uploading..." : "Upload 🚀"}
            </button>
          </form>
        </div>


        <div className="search-section">
          <h3>Search Files</h3>

          <div className="search-bar">
            <input
              placeholder="Search by title or tags..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <button onClick={handleSearch}>
              {loading ? "Searching..." : "Search 🔍"}
            </button>
          </div>

          <div className="grid">
            {files.length === 0 && !loading && (
              <p>No files found 😔</p>
            )}

            {files.map((file) => (
              <FileCard key={file._id} file={file} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
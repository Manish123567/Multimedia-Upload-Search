import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateFileViews } from "../features/fileSlice";

export default function FileDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((s) => s.auth.token);
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const res = await axios.patch(
          `http://localhost:5000/api/files/${id}/view`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setFile(res.data);
        dispatch(updateFileViews(res.data));
      } catch (err) {
        setError("Failed to load file");
      }
    };

    fetchFile();
  }, [id, token, dispatch]);


  const formatSize = (bytes) => {
    if (!bytes) return "0 KB";
    return bytes > 1024 * 1024
      ? (bytes / (1024 * 1024)).toFixed(2) + " MB"
      : (bytes / 1024).toFixed(2) + " KB";
  };

  if (error) return <p className="error-msg">{error}</p>;
  if (!file) return <p className="loading">Loading...</p>;

  return (
    <div className="file-detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="file-card">


        <div className="file-preview">
          {file.type === "image" && (
            <img src={file.url} alt={file.title} />
          )}

          {file.type === "video" && (
            <video src={file.url} controls autoPlay />
          )}

          {file.type === "audio" && (
            <audio src={file.url} controls />
          )}

          {file.type === "raw" && (
            <a href={file.url} target="_blank" rel="noreferrer">
              📄 Open File
            </a>
          )}
        </div>


        <div className="file-info">
          <h1>{file.title}</h1>

          <div className="file-meta">
            <span>Views: <strong>{file.views}</strong></span>
            <span>
              Uploaded: {new Date(file.createdAt).toLocaleString()}
            </span>
            <span>Type: {file.type}</span>
            <span>Size: {formatSize(file.size)}</span>
          </div>


          {file.tags?.length > 0 && (
            <div className="tags">
              {file.tags.map((tag, i) => (
                <span key={i}>#{tag}</span>
              ))}
            </div>
          )}

          <button
            className="back-page-btn"
            onClick={() => navigate(-1)}
          >
            Back to Search
          </button>
        </div>
      </div>
    </div>
  );
}
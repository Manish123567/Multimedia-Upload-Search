import { useNavigate } from "react-router-dom";

export default function FileCard({ file }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/files/${file._id}`);
  };

  return (
    <div className="card" onClick={handleClick} style={{ cursor: "pointer" }}>
      {file.type === "image" && <img src={file.url} alt={file.title} />}
      {file.type === "video" && <video src={file.url} controls />}
      {file.type === "audio" && <audio src={file.url} controls />}
      {file.type === "raw" && <p>📄 {file.title}</p>}

      <div className="info">
        <p>{file.title}</p>
        <span>{file.views} views</span>
      </div>
    </div>
  );
}
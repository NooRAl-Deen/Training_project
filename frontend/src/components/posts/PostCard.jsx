import { Link } from "react-router-dom";

const PostCard = ({ post, deletePost }) => {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.description}</p>
        <div className="d-flex justify-content-between mt-3">
          <Link to={`/post-update/${post.id}`} className="btn btn-warning">
            Update
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => deletePost(post.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

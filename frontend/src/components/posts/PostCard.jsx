const PostCard = ({ post }) => {
    return (
        <div className="card h-100">
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.description}</p>
            </div>
        </div>
    );
};

export default PostCard;

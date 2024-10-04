import { useEffect, useState } from 'react';
import { axiosInstance } from '../../api/Axios';
import PostCard from '../../components/posts/PostCard';
import NavComponent from '../../components/Navbar';
import useCurrentToken from '../../hooks/useCurrentToken';
import { Link } from 'react-router-dom';
import useFetchData from '../../hooks/queries/useFetchData';
import PostListSkeletonLoader from '../../skeleton-loaders/posts/PostListSkeletonLoader';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { token } = useCurrentToken()

    const { data, isLoading } = useFetchData('/posts/')

    if(isLoading) {
        return <PostListSkeletonLoader />
    }

    return (
        <div>
            <NavComponent />
            <div className="container mt-5">
                <Link to='/post-create' className="btn btn-primary">Create Post</Link>
                <h2 className="text-center">Posts</h2>
                {error && <p className="text-danger">{error}</p>}
                <div className="row">
                    {data.posts.map((post, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostList;

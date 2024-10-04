import NavSkeletonLoader from "../nav/NavSkeletonLoader";
import "./PostsSkeleton.css";

const PostListSkeletonLoader = () => {
    return (
        <>
        <NavSkeletonLoader />
        <div className="container mt-5">
                {/* <Link to='/post-create' className="btn btn-primary">Create Post</Link> */}
                <h2 className="text-center">
                    <span className="placeholder col-4 "></span>
                </h2>
                <div className="row mt-4">
                    {[...Array(3)].map((_, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="placeholder col-6 "></h5>
                                    <p className="placeholder col-8 "></p>
                                    <p className="placeholder col-6 "></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PostListSkeletonLoader;

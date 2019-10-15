import React from 'react';
import { AuthContext } from '../context/AuthContext';
import PostListItem from './PostListItem';

const PostList = () => {

    const { currentCredentials } = useContext(AuthContext)

    const [postList, setPostList] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await client.Post.findAllByUserId({ userId: currentCredentials.id });
            const data = JSON.parse(posts.responseData);
            setPostList(data);
        }
        fetchPosts();
        
    }, []);

    return (
        <div className="profile__list-container">
            <h2>My posts</h2>
            <ul className="profile__list">
                <li>
                {
                    postList.map((post) => {
                        return (
                            <PostListItem key={post.id} {...post} />
                        )
                    })
                }
                </li>
            </ul>
        </div>
    );
};

export default PostList;
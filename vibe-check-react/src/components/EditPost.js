import { getUsers } from '../data/repository';


function EditPost(){

    const [posts, setPosts] = useState(getPosts());
    const [ editPostField, setEditPostField ] = useState({ text: ""});
    const [errorMessage, setErrorMessage] = useState("");
    //set index for posts in localStorage
   const [index, setIndex] = useState("");
    //control display edit inputbox 
   const [show, setShow] = useState(false);

    const handleInputChange = (event) => {

        setEditPostField(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const postEdited = editPostField;
        const postTrimmed = editPostField.trim();

        // check if edited field  is  empty
        if (postTrimmed === "") {
            setErrorMessage("Post cannot be empty");
            return;
        }

        editPost(postEdited, index);
        setPosts(getPosts());
        setShow(true);
    }

    //post mapper to list all  posts made by a user
    // const postMapper = posts.map((post, index) => {
    //     if (post.email === getUser().email) {
    //         return (
    //             <div className="border my-3 p-3" style={{ whiteSpace: "pre-wrap" }}>
    //                 <div className="d-flex">

    //                     <div className="p-2">{post.post}</div>
    //                     <div className="p-2 ml-auto">

    //                         <img src={edit} className="edit-img" alt="edit-img" onClick={() => { setShow(false); setPostField(post.post); setIndex(index); }}></img>
    //                     </div>
    //                     <div className="p-2"><DeletePost post={post} setPosts={setPosts} /></div>
    //                 </div>

    //             </div>
    //         )
    //     } else {
    //         return null;
    //     }
    // }

    return(
        <>  
        {
        show === true &&
        <div className="row">
            <div className="my-3 p-3">
                <form onSubmit={handleSubmit}>
                    <h2>Edit Post</h2>
                    <fieldset>
                        <div className="form-group">
                            <textarea id="post" className="form-control" rows="3"
                                value={postField} onChange={handleInputChange} />
                        </div>
                        {errorMessage !== null &&
                            <div className="form-group">
                                <span className="text-danger">{errorMessage}</span>
                            </div>
                        }
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary" value="Save Changes" />
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>

        }

        <div>

        </div>
        </>
    );
}
import { useState } from "react";
import { getUser } from '../data/repository';
import { createReply } from '../data/posts';
import '../style/Forum.css';

export default function Reply({ postid, handlePostComment, showForm }) {

    const [replyFields, setReplyFields] = useState({ message: "", image_path: "", reply_author: getUser().username, post_id: postid });

    const [errorMessage, setErrorMessage] = useState("");

    const [image, setImage] = useState("");

    const [loading, setLoading] = useState(false);


    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        const temp = { ...replyFields };
        temp[name] = value;
        setReplyFields(temp);
    };

    const handleReplySubmit = async (event) => {
        event.preventDefault();

        const postTrimmed = replyFields.message.trim();

        //  if textbox field is empty return error
        if (postTrimmed === "") {
            setErrorMessage("Post cannot be empty");
            return;
        }

        // insert new comment in database
        await createReply({ ...replyFields, message: postTrimmed });

        // //make  post field empty
        setReplyFields({ ...replyFields, message: "", image_path: "" });
        // //clear error message
        setErrorMessage("");

        handlePostComment();

        return;

    }

    const handleFileUpload = async (event) => {
        const files = event.target.files;
        if (files[0]) {
            const data = new FormData();
            data.append("image", files[0]);
            setLoading(true);
            // free image hosting api
            const result = await fetch(
                "https://api.imgbb.com/1/upload?&key=46f55d39151e14d1eefd8420530fb11b",
                {
                    method: "POST",
                    body: data,
                }
            );
            const file = await result.json();
            const url = file.data.url;
            setImage(url);
            setLoading(false);

            //sets the image url to the reply fields
            setReplyFields({
                ...replyFields,
                image_path: url,
            });
        } else {
            return;
        }
    };

    return (

        <>

            {showForm == true &&

                <div className="col-auto p-2">
                    <form onSubmit={handleReplySubmit}>
                        <fieldset>
                            <div className="form-group">
                                <textarea name="message" id="message" className="form-control" rows="3"
                                    value={replyFields.message} onChange={handleInputChange} />
                            </div>
                            {errorMessage !== null &&
                                <div className="form-group">
                                    <span className="text-danger">{errorMessage}</span>
                                </div>
                            }
                            <div className="form-group">
                                <input type="file" name="file" onChange={handleFileUpload}></input>
                                <input type="submit" className="btn btn-primary" value="Post" />
                            </div>
                            {loading ? (
                                <p>Image uploading...</p>
                            ) : (
                                <div className="image-preview text-center my-3">
                                    <img src={image} className="post-img rounded img-fluid" alt={image}></img>
                                </div>
                            )}
                        </fieldset>
                    </form>
                </div>

            }


        </>
    );

}
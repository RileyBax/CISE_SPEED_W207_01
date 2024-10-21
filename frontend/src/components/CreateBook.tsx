import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Book, DefaultEmptyBook } from "./Books";

const researchTypes = ["Case Study", "Experiment", "Survey", "Literature Review", "Other"];
const images = [
  "https://th-thumbnailer.cdn-si-edu.com/sWf0xF1il7OWYO8j-PGqwBvxTAE=/1000x750/filters:no_upscale():focal(2550x1724:2551x1725)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/9a/d7/9ad71c28-a69d-4bc0-b03d-37160317bb32/gettyimages-577674005.jpg",
  "https://bdc2020.o0bc.com/wp-content/uploads/2021/12/AdobeStock_242762094-61b2260261960-768x432.jpeg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpotWxtMG9mld21UAR4v5z-8A8vZodVzEZsw&s",
  "https://live-production.wcms.abc-cdn.net.au/398836216839841241467590824c5cf1?impolicy=wcms_crop_resize&cropH=2813&cropW=5000&xPos=0&yPos=0&width=862&height=485",
];

const getRandomImage = () => {
  return images[Math.floor(Math.random() * images.length)];
};

const CreateBookComponent = () => {
  const navigate = useRouter();
  const [book, setBook] = useState<Book>(DefaultEmptyBook);
  const [showPopup, setShowPopup] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newBook = { ...book, imageCover: getRandomImage() }; // Assign a random image
    console.log(newBook);
    fetch(process.env.NEXT_PUBLIC_URL + "api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    })
      .then((res) => {
        console.log(res);
        setShowPopup(true);
      })
      .catch((err) => {
        console.log("Error from CreateBook: " + err);
      });
  };

  const resetForm = () => {
    setBook(DefaultEmptyBook);
    setShowPopup(false);
  };

  const goToHomePage = () => {
    navigate.push("/");
  };

  return (
    <div className="CreateBook">
      <div className="container">
        {/* Header */}
        <div className="header">
          <h1 className="header-title">SPEED - Submission Form</h1>
          <div className="buttonGroup">
            <Link href="/" className="linkButton">
              Home
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
          </div>
          <div className="col-md-10 m-auto">
            {showPopup ? (
              <div className="popup-overlay">
                <div className="popup-box">
                  <h2>Thank you for adding an article!</h2>
                  <div>
                    <button className="btn btn-outline-primary" onClick={goToHomePage}>
                      Back to Home Page
                    </button>
                    <button className="btn btn-outline-success" onClick={resetForm}>
                      Add Another Article
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit}>
                <p style={{ textAlign: "center", fontSize: "16px", marginBottom: "20px" }}>
                SPEED is excited to share your submission with the community! Kindly fill out the form below to get started.                </p>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Title of the Article"
                    name="title"
                    className="form-control"
                    value={book.title}
                    onChange={onChange}
                    required
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Authors"
                    name="authors"
                    className="form-control"
                    value={book.authors}
                    onChange={onChange}
                    required
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Journal Name"
                    name="journalName"
                    className="form-control"
                    value={book.journalName}
                    onChange={onChange}
                    required
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="number"
                    placeholder="Publication Year"
                    name="publicationYear"
                    className="form-control"
                    value={book.publicationYear}
                    onChange={onChange}
                    required
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Volume (Optional)"
                    name="volume"
                    className="form-control"
                    value={book.volume}
                    onChange={onChange}
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Issue Number (Optional)"
                    name="issueNumber"
                    className="form-control"
                    value={book.issueNumber}
                    onChange={onChange}
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Pages (Optional)"
                    name="pages"
                    className="form-control"
                    value={book.pages}
                    onChange={onChange}
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="DOI"
                    name="doi"
                    className="form-control"
                    value={book.doi}
                    onChange={onChange}
                    required
                  />
                </div>
                <br />
                <div className="form-group">
                  <textarea
                    placeholder="Keywords (Optional)"
                    name="keywords"
                    className="form-control"
                    value={book.keywords}
                    onChange={onChange}
                  />
                </div>
                <br />
                <div className="form-group">
                  <select
                    name="typeOfResearch"
                    className="form-control"
                    value={book.typeOfResearch}
                    onChange={onChange}
                  >
                    <option value="">Select Type of Research (Optional)</option>
                    {researchTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <br />
                <div className="form-group">
                  <textarea
                    placeholder="Abstract (Optional)"
                    name="abstract"
                    className="form-control"
                    value={book.abstract}
                    onChange={onChange}
                    rows={3}
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Institution/Organization (Optional)"
                    name="institution"
                    className="form-control"
                    value={book.institution}
                    onChange={onChange}
                  />
                </div>
                <br />
                <button
                  type="submit"
                  className="linkButton"
                  style={{ display: "block", margin: "20px auto" }}
                >
                  Submit Article
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBookComponent;
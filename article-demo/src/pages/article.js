import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { node_api } from "../config";
import queryString from "query-string";
import Moment from "moment";

function Article() {
  const { search } = useLocation();
  const parsed = queryString.parse(search);
  const edit = parsed.edit ? parsed.edit : false;
  const [heading, setheading] = useState("");
  const [Content, setContent] = useState("");
  const [creat_date, setcreat_date] = useState("");
  const [updated_date, setupdated_date] = useState("");
  let { id } = useParams();
  const navigate = useNavigate();

  const fetch_article = () => {
    axios
      .get(`${node_api}/articles/${id}`)
      .then(function (response) {
        setheading(response.data.data.heading);
        setContent(response.data.data.content);
        setcreat_date(response.data.data.created_at);
        setupdated_date(response.data.data.updated_at);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if(id){
      fetch_article();
    }
    else{
      setheading('')
      setContent('')
    }
  }, [id]);

 

  const handleSubmit = () => {
    var data = JSON.stringify({
      heading: heading,
      content: Content,
    });

    var config = {
      method: "post",
      url: `${node_api}/articles`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`${node_api}/articles/${id}`)
      .then(function (response) {
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleEdit = () => {
    var data = JSON.stringify({
      heading: heading,
      content: Content,
    });
    var config = {
      method: "put",
      url: `${node_api}/articles/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        navigate(`/article/${id}`);
        fetch_article();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="main-container">
      <div className="inner-container">
        {!edit && (
          <>
            <Form.Label htmlFor="inputText">Create Date</Form.Label>
            <Form.Control
              type="text"
              id="inputText"
              readOnly
              value={Moment(creat_date).format("lll")}
            />
            {creat_date != updated_date ? (
              <>
                <Form.Label htmlFor="inputText">Updated Date</Form.Label>
                <Form.Control
                  type="text"
                  id="inputText"
                  readOnly
                  value={Moment(updated_date).format("lll")}
                />
              </>
            ) : (
              <></>
            )}
          </>
        )}
        <Form.Label htmlFor="inputText">Title</Form.Label>
        <Form.Control
          type="text"
          id="inputText"
          value={heading}
          readOnly={edit ? false : true}
          onChange={(e) => setheading(e.target.value)}
        />
        <Form.Label htmlFor="inputArea">Content</Form.Label>
        <Form.Control
          as="textarea"
          readOnly={edit ? false : true}
          rows={3}
          value={Content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="text-end my-3">
          {id ? (
            <>
              {edit ? (
                <>
                <Link to="/">
                  <button className="btn btn-secondary me-2">
                    Return To List
                  </button>
                </Link>
                  <button className="btn btn-primary" onClick={handleEdit}>
                   Apply Changes
                  </button>
                </>
              ) : (
                <>
                  <Link to={`/article/${id}?edit=true`}>
                    <button className="btn btn-secondary me-2">Edit</button>
                  </Link>
                  <button className="btn btn-danger" onClick={handleDelete}>
                    Delete
                  </button>
                </>
              )}
            </>
          ) : (
            <button className="btn btn-primary" onClick={handleSubmit}>
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Article;

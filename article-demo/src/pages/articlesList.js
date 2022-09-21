import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { node_api } from "../config";
import Moment from 'moment';

function ArticlesList({ orderascending }) {

  const [article_list, setartiicle_list] = useState([]);

  const fetch_article = () => {
    axios
      .get(`${node_api}/articles`)
      .then(function (response) {
        setartiicle_list(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch_article();
  }, [orderascending]);

  if (!orderascending) {
    article_list.sort((a, b) => a.id - b.id).reverse();
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {article_list &&
          article_list.length > 0 &&
          article_list.map((data, i) => {
            return (
              <div key={i} className="col-lg-3 col-md-4  col-sm-12 col-xs-12">
                <Card className="my-2" style={{ height: "180px" }}>
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex align-items-center justify-content-between">
                       <Link style={{textDecoration:"none"}} to={`/article/${data.id}`}><Card.Title>{data.heading}</Card.Title></Link> 
                        <p>{Moment(data.created_at).format("lll")}</p>
                      </div>
                      <Card.Text className="cardd">{data.content}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ArticlesList;

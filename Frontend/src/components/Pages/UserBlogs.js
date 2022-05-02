//Author : Pallavi Cherukupalli (B00887062)
import React, {useEffect} from 'react';
import { getAllBlogs} from "../../utils/axiosCall";
import { toast } from "react-toastify";
import { Card } from "react-bootstrap"; 
import { Navigation } from './Navigation';


function UserBlogs() {
    const [allBlogs, setAllBlogs] = React.useState([]);
    useEffect(() => {
        updateList();
      }, []);

    const updateList = (e) => {
        getAllBlogs().then((res) => {
          var reversedArray = []
          reversedArray = res.data.blogs;
          setAllBlogs(reversedArray.reverse());
        })
        .catch((err) => {
          toast.error(err);
        }, [])
    }
    return (
        <div className='blgs'>
            <Navigation/>
            <div className='blogCon'>
              {allBlogs && allBlogs.map(item => (
                <div className="blogtotalCard">
                      <Card.Body className='blogeachCard'>
                      <strong>Blog</strong>
                      <Card.Text>{item.BlogContent}</Card.Text>
                        <hr/>
                        <strong>Blog posted at {item.TimePosted}</strong>
                      </Card.Body>
                </div>
                ))}
            </div>
        </div>
    );
  }
  
  export default UserBlogs;

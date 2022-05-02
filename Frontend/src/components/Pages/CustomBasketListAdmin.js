//Author Shiv Gaurang Desai(B00862445)
import React, { useEffect, useState } from "react";
import "../Css/CustomBasket.css";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { AdminNavigation } from "./AdminNavigation";
import {
  fetchCustomBasketsAdmin,
  deleteCustomBasket,
} from "../../utils/axiosCall";
import { toast } from "react-toastify";

const CustomBasketListAdmin = () => {
  const [basketList, setBasketList] = useState([]);

  useEffect(() => {
    getCustomBasketListData();
  }, []);

  const getCustomBasketListData = () => {
    fetchCustomBasketsAdmin()
      .then((res) => {
        if (res.status === 200) {
          setBasketList(res.data);
        }
      })
      .catch((err) => {
        if (!err?.response) {
          toast.error("No Server Response");
        } else if (err.response?.status !== 201) {
          toast.error(err.response?.data["Message"]);
        } else {
          toast.error("Wishlist fetching Failed.");
        }
      });
  };

  const deleteCustomBasketApi = (e, id) => {
    e.preventDefault();
    deleteCustomBasket(id)
      .then((res) => {
        if (res.status === 200) {
          getCustomBasketListData();
        }
      })
      .catch((err) => {
        if (!err?.response) {
          toast.error("No Server Response");
        } else if (err.response?.status !== 201) {
          toast.error(err.response?.data["Message"]);
        } else {
          toast.error("Wishlist fetching Failed.");
        }
      });
  };

  const navigate = useNavigate();

  const navigateToListing = (e) => {
    e.preventDefault();
    navigate("/CustomBasketForm");
  };

  return (
    <>
      <AdminNavigation />
      <div className=".top-file-list">
        <div className="text-center fs-1">Custom Basket List</div>
        <Button
          onClick={(e) => navigateToListing(e)}
          className="add-custom-basket"
        >
          Add Basket
        </Button>
        <br />
        <br />
        <div className="table-responsive">
          <Table striped bordered hover className="table">
            <thead>
              <tr>
                <th>Basket Name</th>
                <th>Description</th>
                <th>Age Group</th>
                <th>Confidence Level</th>
                <th>MarketSymbol</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {basketList.map((item, i) => (
                <tr key={i}>
                  <td>{item.basket_name}</td>
                  <td>{item.description}</td>
                  <td>{item.age_group}</td>
                  <td>{item.confidence_level}</td>
                  <td>{item.market_symbol.toString().replaceAll(",", ", ")}</td>
                  <td>
                    <div className="col-md-4 col-lg-2">
                      <Button
                        type="button"
                        className="btn btn-danger"
                        onClick={(e) => deleteCustomBasketApi(e, item._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default CustomBasketListAdmin;

/*Author : Parthkumar Patel (B00899800)*/
import React, { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import { useNavigate } from 'react-router-dom';
import '../Css/Wishlist.css';
import {
  addWishlist,
  getUserWishlist,
  getWishlistById,
  updateWishlistById,
  deleteWishlistById,
} from '../../utils/axiosCall';
import {
  Button,
  Row,
  FloatingLabel,
  ListGroup,
  Form,
  Container,
  Col,
  Modal,
} from 'react-bootstrap';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from '@mui/material';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, tableCellClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { grey } from "@mui/material/colors";
import CONSTANTS from '../../utils/constants';
import { isAuthenticated } from '../../utils/apiCalls';
import { toast } from 'react-toastify';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: grey[400],
    color: theme.palette.common.black,
    fontSize: 18,
    padding: 3
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    padding:5
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

function Wishlist() {
    const [state, setState] = useState('start');
    const [stateView, setStateView] = useState('startView');
    const [wishlistData,setWishlistData] = useState({ WId:'',Name:'',Investments:'',InvestArray:[],SearchArray:[],ViewDetailsArray:[],UserId:'' });
    const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
    const navigate =useNavigate();
    const regexName = /^[A-Za-z0-9? _-]+$/;
    const [warnFN,setWarnFN]= React.useState(false);
    const [msgFN, setMsgFN] = React.useState("");
    // Getting User Wishlist
    const [userWishlists, setUserWishlists] = useState([]);
    const [show, setShow] = useState(false);
    const [searchRegion,setSearchRegion]=useState(null);
    const [searchSymbol,setSearchSymbol]=useState(null);
    const [searchKeyword,setSearchKeyword]=useState(null);
    const [disableKeyword, setDisableKeyword] = useState(false);
    const [disableSymbol, setDisableSymbol] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);
    const handleDeleteNo = () => setDeleteShow(false);
    const handleDeleteShow = () => setDeleteShow(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        getUserWishlists();    
    }, []);
    
    const getUserWishlists = (e) =>  {
        const Authentication =isAuthenticated();
        if(Authentication !== false)
        {
            getUserWishlist(Authentication.id).then((res) => {
                if (res.status === 201) {
                    if (res.data !== null && res.data.Data !== null) {
                        setUserWishlists(res.data.Data);
                    
                    } 
                }
            }).catch((err) => {
                if (!err?.response) {
                    toast.error('No Server Response');
                } else if (err.response?.status !== 201) {
                    toast.error(err.response?.data["Message"]);
                } else {
                    toast.error('Wishlist fetching Failed.');
                }
            }); 
        }
        else
        {
            toast.error("User Not Authenticated.");
        }
    }

  //-------------------------------
  var btnAdd = (e) => {
    const Authentication = isAuthenticated();
    if (Authentication !== false) {
      e.preventDefault();
      setWishlistData({
        ...wishlistData,
        ViewDetailsArray: [],
        Name: '',
        WId: '',
        InvestArray: [],
        Investments: '',
        SearchArray: [],
        UserId: Authentication.id,
      });
      setState('btnAdd');
    } else {
      toast.error('User Not Authenticated.');
    }
  };
  var btnNewState = (e, reqid) => {
    e.preventDefault();
    const Authentication = isAuthenticated();
    if (Authentication !== false) {
      let wNameFunction = null,wIdFunction = null,wViewDetailArrayFunction = [],wInvestArrayFunction = [],wInvestmentsFunction = [];
      getWishlistById(reqid)
        .then((res) => {
          if (res.status === 201) {
            if (res.data !== null && res.data.Data !== null) {
              wNameFunction = res.data.Data[0].Name;

              wIdFunction = res.data.Data[0]._id;
              wInvestmentsFunction = res.data.Data[0].Investments;
              if (wInvestmentsFunction === '' || wInvestmentsFunction === null) {
                setWishlistData({
                  ...wishlistData,
                  ViewDetailsArray: wViewDetailArrayFunction,
                  Name: wNameFunction,
                  WId: wIdFunction,
                  InvestArray: wInvestArrayFunction,
                  Investments: wInvestmentsFunction,
                  UserId: Authentication.id,
                });
              } else {
                var arr = res.data.Data[0].Investments.split(',');
                for (var i = 0; i < arr.length; i++) {
                  var demo = {
                    Symbol: arr[i].split('-')[0],
                    Name: arr[i].split('-')[1],
                    Type: '',
                    Region: '',
                  };

                  wInvestArrayFunction.push(demo);
                  const url = CONSTANTS.GLOBAL_QUOTE(arr[i].split('-')[0]);
                  let Sym = arr[i].split('-')[0],
                    Name = arr[i].split('-')[1];
                  fetch(url)
                    .then(function (res) {
                      return res.json();
                    })
                    .then(function (res) {
                      if (res['Global Quote']) {
                        var apiSymbol = Sym,
                          apiName = Name,
                          apiOpen = res['Global Quote']['02. open'],
                          apiHigh = res['Global Quote']['03. high'],
                          apiLow = res['Global Quote']['04. low'],
                          apiPrice = res['Global Quote']['05. price'],
                          apiPreviousClose =
                            res['Global Quote']['08. previous close'],
                          apiChng = res['Global Quote']['09. change'],
                          apiPChng = res['Global Quote']['10. change percent'];
                        const demo = {
                          Symbol: apiSymbol,
                          Name: apiName,
                          Open: apiOpen,
                          High: apiHigh,
                          Low: apiLow,
                          Price: apiPrice,
                          PreviousClose: apiPreviousClose,
                          Change: apiChng,
                          PChng: apiPChng,
                        };
                        wViewDetailArrayFunction.push(demo);
                        setWishlistData({
                          ...wishlistData,
                          ViewDetailsArray: wViewDetailArrayFunction,
                          Name: wNameFunction,
                          WId: wIdFunction,
                          InvestArray: wInvestArrayFunction,
                          Investments: wInvestmentsFunction,
                          UserId: Authentication.id,
                        });
                      }
                    });
                }
              }
              setState('none');
              setStateView('PageViewState');
            }
          }
        })
        .catch((err) => {
          if (!err?.response) {
            toast.error('No Server Response');
          } else if (err.response?.status !== 201) {
            toast.error(err.response?.data['Message']);
          } else {
            toast.error('Wishlist fetching Failed.');
          }
        });
      } 
      else {
      toast.error('User Not Authenticated.');
    }
  };

  var btnEdit = (e) => {
    e.preventDefault();
    setState('btnEdit');
    setStateView('startView');
  };
  var btnDelete = (e, reqId) => {
    e.preventDefault();
    handleDeleteShow(reqId);
  };
  var btnDashboard = (reqId) => {
    navigate(`/instrument-dashboard/${reqId}`);
  };
  var btnSave = (e) => {
    e.preventDefault();
    const Authentication = isAuthenticated();
    if (Authentication !== false) {
      if (wishlistData.Name === '') {
        setWarnFN(true);
        setMsgFN('Please Enter a valid First Name.');
        return;
      }
      else if(wishlistData.InvestArray === null || wishlistData.InvestArray.toString() === null || wishlistData.InvestArray.toString()==="" || wishlistData.InvestArray === undefined){
        toast.error("Please add atleast one Investment into the Wislist.");
      }
      else if (!warnFN) {
        var SymbolsName = '';
        wishlistData.InvestArray.forEach(
          (data) => (SymbolsName += data.Symbol + '-' + data.Name + ',')
        );
        const newWishlist = {
          UserId: Authentication.id,
          Name: wishlistData.Name,
          Investments: SymbolsName.slice(0, -1),
        };
        addWishlist(newWishlist)
          .then((res) => {
            if (res.status === 201) {
              if (res.data['Status']) {
                toast.success(res.data['Message']);
                getUserWishlists();
                setWishlistData({
                  ...wishlistData,
                  ViewDetailsArray: [],
                  Name: '',
                  WId: '',
                  InvestArray: [],
                  Investments: '',
                  SearchArray: [],
                  UserId: Authentication.id,
                });
                setState('start');
              }
            }
          })
          .catch((err) => {
            if (!err?.response) {
              toast.error('No Server Response');
            } else if (err.response?.status !== 201) {
              toast.error(err.response?.data['Message']);
            } else {
              toast.error('Wishlist saving Failed.');
            }
          });
        }
        } 
      else {
      toast.error('User Not Authenticated.');
    }
  };
  var btnUpdate = (e, reqId) => {
    e.preventDefault();
    const Authentication = isAuthenticated();
    if (Authentication !== false) {
      if (wishlistData.Name === '') {
        setWarnFN(true);
        setMsgFN('Please Enter a valid First Name.');
        return;
      } 
      else if(wishlistData.InvestArray === null || wishlistData.InvestArray.toString() === null || wishlistData.InvestArray.toString()==="" || wishlistData.InvestArray === undefined){
        toast.error("Please add atleast one Investment into the Wislist.");
      }
      else if (!warnFN) {
        var SymbolsName = '';
        wishlistData.InvestArray.forEach(
          (data) => (SymbolsName += data.Symbol + '-' + data.Name + ',')
        );
        const newWishlist = {
          UserId: Authentication.id,
          Name: wishlistData.Name,
          Investments: SymbolsName.slice(0, -1),
        };
        updateWishlistById(reqId, newWishlist)
          .then((res) => {
            if (res.status === 201) {
              if (res.data !== null && res.data.Data !== null) {
                toast.success(res.data['Message']);
                getUserWishlists();
                setWishlistData({
                  ...wishlistData,
                  ViewDetailsArray: [],
                  Name: '',
                  WId: wishlistData.WId,
                  InvestArray: [],
                  Investments: '',
                  SearchArray: [],
                  UserId: Authentication.id,
                });
                setState('start');
              }
            }
          })
          .catch((err) => {
            if (!err?.response) {
              toast.error('No Server Response');
            } else if (err.response?.status !== 201) {
              toast.error(err.response?.data['Message']);
            } else {
              toast.error('Wishlist updating Failed.');
            }
          });
      }
    } 
      else {
      toast.error('User Not Authenticated.');
    }
  };

  const changeName = (e) => {
    e.preventDefault();
    const name = e.target.name;
    if (name === 'WishlistName') {
      if (!regexName.test(e.target.value) && e.target.value) {
        setWarnFN(true);
        setMsgFN('Invalid First Name! Only alphabets allowed!');
      } else {
        setWarnFN(false);
        setWishlistData({ ...wishlistData, Name: e.target.value });
      }
    }
    setWishlistData({ ...wishlistData, Name: e.target.value });
  };

  function plusClicked(props) {
    const demo = [
      {
        Symbol: props.Symbol,
        Name: props.Name,
        Type: props.Type,
        Region: props.Region,
      },
    ];
    const Authentication = isAuthenticated();
    if (Authentication !== false) {
      if (Authentication.isPremium === true) {
        const foundInvest = wishlistData.InvestArray.filter(
          (item) => item.Symbol === demo[0]['Symbol']
        );
        if (foundInvest.length > 0) {
          toast.error('Investment has already been added');
        } else {
          let investList = wishlistData.InvestArray.concat(demo);
          setWishlistData({ ...wishlistData, InvestArray: investList });
        }
      } else {
        const investcount = wishlistData.InvestArray.length;
        if (investcount < 5) {
          const foundInvest = wishlistData.InvestArray.filter(
            (item) => item.Symbol === demo[0]['Symbol']
          );
          if (foundInvest.length > 0) {
            toast.error('Investment has already been added');
          } else {
            let investList = wishlistData.InvestArray.concat(demo);
            setWishlistData({ ...wishlistData, InvestArray: investList });
          }
        } else {
          handleShow();
        }
      }
    } else {
      toast.error('User Not Authenticated.');
    }
  }
  function minusClicked(props) {
    let investList = wishlistData.InvestArray.filter(
      (item) => item.Symbol !== props.Symbol
    );
    setWishlistData({ ...wishlistData, InvestArray: investList });
  }

  const handleDeleteYes = (e) => {
    const Authentication = isAuthenticated();
    if (Authentication !== false) {
      deleteWishlistById(wishlistData.WId)
      .then((res) => {
        if (res.status === 201) {
          if (res.data !== null && res.data.Data !== null) {
            toast.success(res.data['Message']);
            setState('start');
            setStateView('startView');
            getUserWishlists();
            setWishlistData({
              ...wishlistData,
              ViewDetailsArray: [],
              Name: '',
              WId: '',
              InvestArray: [],
              Investments: '',
              SearchArray: [],
              UserId: Authentication.id,
            });
            setDeleteShow(false);
          }
        }
      })
      .catch((err) => {
        if (!err?.response) {
          toast.error('No Server Response');
        } else if (err.response?.status !== 201) {
          toast.error(err.response?.data['Message']);
        } else {
          toast.error('Wishlist fetching Failed.');
        }
      });
    } 
      else {
      toast.error('User Not Authenticated.');
    }
  };
  const handlePayment = (e) => {
    navigate(`/payment`);
  };
  const btnSearch = (e) => {
    let API_SEARCH = null;
    if (searchKeyword == null && searchSymbol == null) {
      toast.error(
        'Please enter Search Symbol or Keyword for finding Investment.'
      );
    } else {
      if (searchSymbol) {
        API_SEARCH = searchSymbol;
        if (searchRegion) {
          if (searchRegion !== '-' && searchRegion !== '0') {
            API_SEARCH += '.' + searchRegion;
          }
        }
      }
      if (searchKeyword) {
        API_SEARCH = searchKeyword;
      }

      const url = CONSTANTS.SYMBOL_SEARCH(API_SEARCH);

      fetch(url)
        .then(function (res) {
          return res.json();
        })
        .then(function (res) {
          if (res['bestMatches'].length) {
            let searchList = [];
            res['bestMatches'].forEach((obj) => {
              var apiSymbol = null,
                apiName = null,
                apiType = null,
                apiRegion = null;
              Object.entries(obj).forEach(([key, value]) => {
                if (key.toString() === '1. symbol') {
                  apiSymbol = value;
                }
                if (key.toString() === '2. name') {
                  apiName = value;
                }
                if (key.toString() === '3. type') {
                  apiType = value;
                }
                if (key.toString() === '4. region') {
                  apiRegion = value;
                }
              });
              const demo = {
                Symbol: apiSymbol,
                Name: apiName,
                Type: apiType,
                Region: apiRegion,
              };
              searchList.push(demo);
            });
            setWishlistData({ ...wishlistData, SearchArray: searchList });
          }
        });
    }
  };
  const columns = [
  { id: 'Symbol', label: 'Symbol', maxWidth: '70px' ,minWidth: '40px'},
  { id: 'Name', label: 'Name', maxWidth: '900px' ,minWidth: '200px'},
  { id: 'Open', label: 'Open', maxWidth: '60px',minWidth: '45px'},
  { id: 'High', label: 'High', maxWidth: '60px',minWidth: '45px' },
  { id: 'Low', label: 'Low', maxWidth: '60px' ,minWidth: '45px'},
  { id: 'Price', label: 'Price ($)', maxWidth: '60px',minWidth: '45px' },
  { id: 'PreviousClose', label: 'Previous Close', maxWidth: '65px',minWidth: '55px' },
  { id: 'Change', label: 'Change', maxWidth: '60px',minWidth: '45px' },
  { id: 'PChange', label: 'Change (%)', maxWidth: '65px',minWidth: '50px' }
];
 
  return (
    <>
      <Navigation />
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            To add more than five Investments, Please get Premium Subscription
            or delete at least one Investments !!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handlePayment}>
              Get Premium
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={deleteShow}
          onHide={handleDeleteNo}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure, to delete this Wishlist?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteNo}>
              No
            </Button>
            <Button variant="primary" onClick={handleDeleteYes}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="d-flex justify-content-left">
          <Container className="p-1 w-bg-container w-container">
            {state === 'start' && (
              <div>
                <Row className="p-3">
                  <Col>
                    <h3>Wishlist</h3>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    {state === 'start' && stateView === 'startView' && (
                      <Button
                        style={{ fontSize: 18 }}
                        variant="outline-dark"
                        onClick={btnAdd}
                      >
                        <i className="fas fa-plus-circle"></i> Add New
                      </Button>
                    )}
                  </Col>
                </Row>
                <div>
                  <Box className="ucontainer" sx={{ flexGrow: 1 }}>
                    <Grid
                      container
                      style={{ marginLeft: '2px' }}
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      {userWishlists.map((wishlist) => {
                        var arr = wishlist.Investments.split(',');
                        return (
                          <>
                            <Card className="udtitle">
                              <CardHeader
                                title={
                                  <div
                                    onClick={(e) => {
                                      btnNewState(e, wishlist._id);
                                    }}
                                    style={{ textAlign: 'center' }}
                                  >
                                    <a href="">{wishlist.Name}</a>
                                  </div>
                                }
                              />
                              <Divider />
                              <CardContent>
                                <ListGroup
                                  style={{
                                    overflow: 'auto',
                                    maxHeight: '280px',
                                  }}
                                >
                                  {arr.map((item) => (
                                    <ListGroup.Item key={item.split('-')[0]}>
                                      <span>
                                        {' '}
                                        {item.split('-')[0]} -{' '}
                                        {item.split('-')[1]}
                                      </span>
                                    </ListGroup.Item>
                                  ))}
                                </ListGroup>
                              </CardContent>
                            </Card>
                          </>
                        );
                      })}
                    </Grid>
                  </Box>
                </div>
              </div>
            )}
            {stateView === 'PageViewState' && (
              <div className="p-3">
                <Row>
                  <Col>
                    <h3> View Wishlist</h3>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <Button
                      style={{ fontSize: 18, marginRight: 10 }}
                      variant="outline-dark"
                      onClick={() => {
                        btnDashboard(wishlistData.WId);
                      }}
                    >
                      <i className="fas fa-chart-line"></i> Chart
                    </Button>
                    <Button
                      style={{ fontSize: 18, marginRight: 10 }}
                      variant="outline-dark"
                      onClick={btnEdit}
                    >
                      <i className="fas fa-pencil-alt"></i> Edit
                    </Button>
                    <Button
                      style={{ fontSize: 18 }}
                      variant="outline-danger"
                      onClick={(e) => {
                        btnDelete(e, wishlistData.WId);
                      }}
                    >
                      <i className="fas fa-trash-alt"></i> Delete
                    </Button>
                  </Col>
                </Row>
                <div>
                  <h5>Wishlist Name : {wishlistData.Name}</h5>
                  <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {columns.map((column) => (
                              <StyledTableCell
                                key={column.id}
                                style={{ minWidth: column.minWidth,maxWidth: column.maxWidth }}
                              >
                                {column.label}
                              </StyledTableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {wishlistData.ViewDetailsArray.length === 0 ? (
                              <>
                                  <StyledTableRow hover role="checkbox" tabIndex={-1} colSpan='9'>
                                      <StyledTableCell >
                                          No Record Found.
                                      </StyledTableCell>
                                  </StyledTableRow>
                              </>
                          ) : (
                              <>
                                  {wishlistData.ViewDetailsArray?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => {
                                      return (
                                          <StyledTableRow hover role="checkbox" tabIndex={-1}>
                                              {Object.keys(item).map((key) => (
                                                  <StyledTableCell >
                                                      {item[key]}
                                                  </StyledTableCell>
                                              ))}
                                          </StyledTableRow>
                                      );
                                  })}
                              </>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 15]}
                      component="div"
                      count={wishlistData.ViewDetailsArray.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                </div>
              </div>
            )}

            {(state === 'btnAdd' || state === 'btnEdit') && (
              <div>
                <Row className="p-3">
                  <Col>
                    {state === 'btnAdd' && <h3>Add Wishlist</h3>}
                    {state === 'btnEdit' && <h3>Edit Wishlist</h3>}
                  </Col>
                  {state === 'btnEdit' && (
                    <Col className="d-flex justify-content-end">
                      <Button
                        style={{ fontSize: 18 }}
                        variant="outline-dark"
                        onClick={(e) => {
                          btnDelete(e, wishlistData.WId);
                        }}
                      >
                        <i className="fas fa-trash-alt"></i> Delete
                      </Button>
                    </Col>
                  )}
                </Row>
                <Container className="p-1 bg-container container">
                  <div className="inner">
                    <div className="input_text">
                      <FloatingLabel controlId="floatingName" label="Name">
                        <Form.Control
                          type="text"
                          className={` ${warnFN ? 'warning' : ''}`}
                          name="WishlistName"
                          value={wishlistData.Name}
                          onChange={changeName}
                          placeholder="Enter Name"
                        />
                      </FloatingLabel>
                      {warnFN ? (
                        <p style={{ color: 'red' }}>
                          <i className="fa fa-warning"></i>
                          {msgFN}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <Row className="p-3">
                    <Col className="p-3">
                      <Card>
                        <CardHeader title="Investments" />
                        <Divider />
                        <CardContent>
                          <ListGroup
                            style={{ overflow: 'auto', maxHeight: '500px' }}
                          >
                            {wishlistData.InvestArray.map((item) => (
                              <>
                                <ListGroup.Item
                                  action
                                  key={item.Symbol}
                                  onClick={() => minusClicked(item)}
                                >
                                  <i className="fas fa-minus-circle"></i>

                                  <span>
                                    {' '}
                                    {item.Symbol} - {item.Name}
                                  </span>
                                </ListGroup.Item>
                              </>
                            ))}
                          </ListGroup>
                        </CardContent>
                      </Card>
                    </Col>
                    <Col className="p-3">
                      <Card>
                        <CardHeader
                          subheader={
                            <div>
                              <Form style={{ flexDirection: 'row' }}>
                                <Col style={{ marginRight: '1%' }} sm={9}>
                                  <Row className="g-2 mb-2">
                                    <Col md>
                                      <FloatingLabel
                                        controlId="txtSymbol"
                                        label="Symbol"
                                      >
                                        {disableSymbol ? (
                                          <Form.Control
                                            type="text"
                                            placeholder="Example: IBM"
                                            disabled
                                            onChange={(e) => {
                                              setSearchSymbol(e.target.value);
                                              e.target.value
                                                ? setDisableKeyword(true)
                                                : setDisableKeyword(false);
                                            }}
                                          />
                                        ) : (
                                          <Form.Control
                                            type="text"
                                            placeholder="Example: IBM"
                                            onChange={(e) => {
                                              setSearchSymbol(e.target.value);
                                              e.target.value
                                                ? setDisableKeyword(true)
                                                : setDisableKeyword(false);
                                            }}
                                          />
                                        )}
                                      </FloatingLabel>
                                    </Col>
                                    <Col md>
                                      <FloatingLabel
                                        controlId="txtRegion"
                                        label="Region"
                                      >
                                        {disableSymbol ? (
                                          <Form.Select
                                            aria-label="Floating label select example"
                                            disabled
                                            onChange={(e) => {
                                              setSearchRegion(e.target.value);
                                              e.target.value !== '0'
                                                ? setDisableKeyword(true)
                                                : setDisableKeyword(false);
                                            }}
                                          >
                                            <option value="0">
                                              Open this select menu
                                            </option>
                                            <option value="-">
                                              United States
                                            </option>
                                            <option value="LON">
                                              UK - London Stock Exchange
                                            </option>
                                            <option value="FRK">
                                              Frankfurt
                                            </option>
                                            <option value="SAO">
                                              Brazil/Sao Paolo
                                            </option>
                                            <option value="BSE">
                                              India - BSE
                                            </option>
                                            <option value="TRT">
                                              Canada - Toronto Stock Exchange
                                            </option>
                                            <option value="TRV">
                                              Canada - Toronto Venture Exchange
                                            </option>
                                            <option value="DEX">
                                              Germany - XETRA
                                            </option>
                                            <option value="SHH">
                                              China - Shanghai Stock Exchange
                                            </option>
                                            <option value="SHZ">
                                              China - Shenzhen Stock Exchange
                                            </option>
                                          </Form.Select>
                                        ) : (
                                          <Form.Select
                                            aria-label="Floating label select example"
                                            onChange={(e) => {
                                              setSearchRegion(e.target.value);
                                              e.target.value !== '0'
                                                ? setDisableKeyword(true)
                                                : setDisableKeyword(false);
                                            }}
                                          >
                                            <option value="0">
                                              Open this select menu
                                            </option>
                                            <option value="-">
                                              United States
                                            </option>
                                            <option value="LON">
                                              UK - London Stock Exchange
                                            </option>
                                            <option value="FRK">
                                              Frankfurt
                                            </option>
                                            <option value="SAO">
                                              Brazil/Sao Paolo
                                            </option>
                                            <option value="BSE">
                                              India - BSE
                                            </option>
                                            <option value="TRT">
                                              Canada - Toronto Stock Exchange
                                            </option>
                                            <option value="TRV">
                                              Canada - Toronto Venture Exchange
                                            </option>
                                            <option value="DEX">
                                              Germany - XETRA
                                            </option>
                                            <option value="SHH">
                                              China - Shanghai Stock Exchange
                                            </option>
                                            <option value="SHZ">
                                              China - Shenzhen Stock Exchange
                                            </option>
                                          </Form.Select>
                                        )}
                                      </FloatingLabel>
                                    </Col>
                                  </Row>
                                  <Row className="g-2">
                                    <FloatingLabel
                                      controlId="txtKeyword"
                                      label="Keyword"
                                    >
                                      {disableKeyword ? (
                                        <Form.Control
                                          type="text"
                                          disabled
                                          placeholder="Example: microsoft"
                                          onChange={(e) => {
                                            setSearchKeyword(e.target.value);
                                            e.target.value
                                              ? setDisableSymbol(true)
                                              : setDisableSymbol(false);
                                          }}
                                        />
                                      ) : (
                                        <Form.Control
                                          type="text"
                                          placeholder="Example: microsoft"
                                          onChange={(e) => {
                                            setSearchKeyword(e.target.value);
                                            e.target.value
                                              ? setDisableSymbol(true)
                                              : setDisableSymbol(false);
                                          }}
                                        />
                                      )}
                                    </FloatingLabel>
                                  </Row>
                                </Col>
                                <Col
                                  sm={3}
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}
                                >
                                  <Button
                                    style={{ fontSize: 18 }}
                                    variant="outline-dark"
                                    onClick={btnSearch}
                                  >
                                    <i className="fas fa-search"></i> Search
                                  </Button>
                                </Col>
                              </Form>
                              {/* <input type="text" style={{"width" : "100%"}} placeholder="Search ..." onChange={e => {setSearchTerm(e.target.value)}}/>  */}
                            </div>
                          }
                        />
                        <Divider />
                        <CardContent>
                          <ListGroup
                            style={{ overflow: 'auto', maxHeight: '400px' }}
                          >
                            {wishlistData.SearchArray.map((val, key) => {
                              return (
                                <div>
                                  <ListGroup.Item
                                    action
                                    key={val.Symbol}
                                    onClick={() => plusClicked(val)}
                                  >
                                    <i className="fas fa-plus-circle"></i>
                                    <span>
                                      {' '}
                                      {val.Symbol} - {val.Name}
                                    </span>
                                  </ListGroup.Item>
                                </div>
                              );
                            })}
                          </ListGroup>
                        </CardContent>
                      </Card>
                    </Col>
                  </Row>
                  <Row className="">
                    <Col className="d-flex justify-content-end">
                      {state === 'btnAdd' && (
                        <Button
                          style={{ fontSize: 18 }}
                          variant="outline-dark"
                          onClick={btnSave}
                        >
                          <i className="fas fa-save"></i> Save
                        </Button>
                      )}
                      {state === 'btnEdit' && (
                        <Button
                          style={{ fontSize: 18 }}
                          variant="outline-dark"
                          onClick={(e) => {
                            btnUpdate(e, wishlistData.WId);
                          }}
                        >
                          <i className="fas fa-save"></i> Update
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Container>
              </div>
            )}
          </Container>
        </div>
      </div>
    </>
  )
}

export default Wishlist;

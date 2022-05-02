//Author Shiv Gaurang Desai(B00862445)
import "../Css/CustomBasket.css";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Checkbox,
  Chip,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { validateInstrumentSymbol } from "../../utils/apiCalls";
import { toast } from "react-toastify";
import { AdminNavigation } from "./AdminNavigation";
import { addCustomBasket } from "../../utils/axiosCall";

const CustomBasketForm = () => {
  const navigate = useNavigate();

  const [basketName, setBasketName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [ageGroup, setAgeGroup] = React.useState("");
  const [confidenceLevel, setConfidenceLevel] = React.useState("");
  const [marketSymbol, setMarketSymbol] = React.useState([]);
  const [singleShare, setSingleShare] = React.useState("");
  const [isVisibility, setIsVisibility] = React.useState(true);
  const errors = {
    basketName: "Please enter a valid basket name",
    description: "Please enter a valid description",
    ageGroup: "Please enter a valid ageGroup",
    confidenceLevel: "Please select confidence level",
    marketSymbol: "Please select some shares",
  };
  const [basketNameError, setBasketNameError] = React.useState(false);
  const [descriptionError, setDescriptionError] = React.useState(false);
  const [ageGroupError, setAgeGroupError] = React.useState(false);
  const [confidenceLevelError, setconfidenceLevelError] = React.useState(false);
  const [marketSymbolError, setMarketSymbolError] = React.useState(false);

  const addCustomBasketApi = (e) => {
    e.preventDefault();
    const data = {
      basket_name: basketName,
      description: description,
      age_group: ageGroup,
      confidence_level: confidenceLevel,
      market_symbol: marketSymbol,
      visibility: isVisibility,
    };
    addCustomBasket(data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Successfully added the record");
          navigate("/customBasketListAdmin");
        }
      })
      .catch((err) => {
        toast.error(err);
      }, []);
  };

  const verifyData = (event) => {
    event.preventDefault();
    var isValid = true;
    if (basketName.trim().length > 0) {
      setBasketNameError(false);
    } else {
      isValid = false;
      setBasketNameError(true);
    }
    if (description.trim().length > 0) {
      setDescriptionError(false);
    } else {
      isValid = false;
      setDescriptionError(true);
    }
    if (ageGroup.trim().length > 0) {
      setAgeGroupError(false);
    } else {
      isValid = false;
      setAgeGroupError(true);
    }
    if (confidenceLevel.length > 0) {
      setconfidenceLevelError(false);
    } else {
      isValid = false;
      setconfidenceLevelError(true);
    }
    if (marketSymbol.length > 0) {
      setMarketSymbolError(false);
    } else {
      isValid = false;
      setMarketSymbolError(true);
    }
    if (isValid === true) {
      addCustomBasketApi(event);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setConfidenceLevel(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleBasketName = (e) => {
    setBasketName(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleAgeGroup = (e) => {
    setAgeGroup(e.target.value);
  };

  const handleSingleShare = (e) => {
    setSingleShare(e.target.value);
  };

  const checkForSymbol = async (e) => {
    e.preventDefault();
    if (marketSymbol.includes(singleShare)) {
      toast.error("Share is alreay selected");
    } else {
      var nw = await validateInstrumentSymbol(singleShare);
      if (nw.status) {
        var tempList = marketSymbol;
        tempList.push(singleShare);
        setSingleShare("");
        setMarketSymbol(tempList);
      } else {
        toast.error("Please select a valid share");
      }
    }
  };

  const handleDelete = (h) => () => {
    setMarketSymbol((marketSymbol) =>
      marketSymbol.filter((hashtag) => hashtag !== h)
    );
  };

  const navigateToListing = (e) => {
    navigate("/customBasketListAdmin");
  };

  return (
    <>
      <AdminNavigation />

      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        direction="column"
        className="grid-custom"
      >
        <Grid item>
          <Typography variant="h5" color={"#485461"}>
            CUSTOM BASKET FORM
          </Typography>
        </Grid>

        <Grid item>
          <Card className="card-custom">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "calc(100% - 5px)" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  id="outlined-search"
                  type="search"
                  label="Custom Basket"
                  value={basketName}
                  onChange={handleBasketName}
                />
                <div className="error-margin">
                  {basketNameError ? errors.basketName : null}
                </div>
              </div>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={handleDescription}
              />
              <div className="error-margin">
                {descriptionError ? errors.description : null}
              </div>
              <TextField
                sx={{ m: 1, width: "calc(100% - 5px)" }}
                id="outlined-search"
                type="Target Age Group"
                label="Target Age Group"
                value={ageGroup}
                onChange={handleAgeGroup}
              />
              <div className="error-margin">
                {ageGroupError ? errors.ageGroup : null}
              </div>
              <FormControl sx={{ m: 1, width: "calc(100% - 5px)" }}>
                <InputLabel id="demo-controlled-open-select-label">
                  Confidence Level
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={confidenceLevel}
                  label="Confidence Level"
                  onChange={handleChange}
                >
                  <MenuItem value={"High"}>High</MenuItem>
                  <MenuItem value={"Medium"}>Medium</MenuItem>
                  <MenuItem value={"Low"}>Low</MenuItem>
                </Select>
              </FormControl>
              <div className="error-margin">
                {confidenceLevelError ? errors.confidenceLevel : null}
              </div>
              <Stack spacing={2} direction="row">
                <TextField
                  id="outlined-search"
                  type="search"
                  label="Market Symbol"
                  value={singleShare}
                  placeholder={"WIPRO.BSE"}
                  onChange={(e) => handleSingleShare(e)}
                />
                <Button
                  onClick={(e) => checkForSymbol(e)}
                  className="check-for-symbol-button"
                >
                  +
                </Button>
              </Stack>
              <Stack direction="row">
                {marketSymbol.map((item) => (
                  <Chip label={item} onDelete={handleDelete(item)} />
                ))}
              </Stack>
              <div className="error-margin">
                {marketSymbolError ? errors.marketSymbol : null}
              </div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isVisibility}
                    onChange={(e) => setIsVisibility(e.target.checked)}
                    label="Visible"
                  />
                }
                label="Visible to Users"
              />
            </Box>
            <Stack direction="row" spacing={15}>
              <Button
                onClick={(e) => verifyData(e)}
                className="form-submit"
                variant="contained"
              >
                Submit
              </Button>
              <Button
                onClick={(e) => navigateToListing(e)}
                className="form-submit"
              >
                Listing
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default CustomBasketForm;

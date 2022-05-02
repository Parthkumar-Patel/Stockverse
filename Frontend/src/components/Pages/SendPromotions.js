import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
    Card,
    Grid,
    TextField,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button
} from "@mui/material";
import { AdminNavigation } from "./AdminNavigation";
import '../Css/SendPromotions.css'
import {
    sendPromotionsEmail
} from '../../utils/apiCalls';

const SendPromotions = () => {

    const [emailDetails, setEmailDetails] = useState({
        subscription: "",
        subject: "",
        content: ""
    });
    const [errors, setErrors] = useState({});

    const validate = (name, checkAll) => {
        let tempErrors = { ...errors };
        if ((name === "subscription" || checkAll)) {
            tempErrors.subscription = !emailDetails?.subscription.length > 0 ? "Please select the subscription for picking users " : undefined;
        }
        if ((name === "subject" || checkAll)) {
            tempErrors.subject = !emailDetails?.subject.length > 0 ? "Please enter the email subject " : undefined;
        }
        if ((name === "content" || checkAll)) {
            tempErrors.content = !emailDetails?.content.length > 0 ? "Please enter the email content " : undefined;
        }
        let tempHasErrors = tempErrors?.subject && tempErrors?.subscription && tempErrors?.content;
        setErrors(tempErrors);
        return tempHasErrors;
    }

    const handleSubmit = async () => {
        let error = validate("", true);
        if (!error) {
            let response = await sendPromotionsEmail(emailDetails);
            if (response?.success) {
                toast.success("Email Sent");
                setEmailDetails({
                    subscription: "",
                    subject: "",
                    content: ""
                });
            }
            else toast.error("Email sent failed, please try again");
        }
    }

    return (
        <>
            <AdminNavigation />

            <Grid
                container
                alignItems={"center"}
                justifyContent={"center"}
                direction="column"
                className="promo-grid-custom"
            >
                <Grid item>
                    <Typography variant="h5" color={"#485461"}>
                        SEND PROMOTIONS
                    </Typography>
                </Grid>
                <Card className="promo-custom">
                    <FormControl  sx={{ m: 1, width: "calc(100% - 5px)" }}>
                        <InputLabel id="demo-controlled-open-select-label">
                            User Subscription
                        </InputLabel>
                        <Select
                            sx={{ m: 1, width: "calc(100% - 5px)" }}
                            value={emailDetails?.subscription}
                            label="User Subscription"
                            name="subscription"
                            onChange={(e) => { setEmailDetails({ ...emailDetails, subscription: e.target.value }) }}
                            onBlur={(e) => validate(e.target.name)}
                        >
                            <MenuItem value="premium">Premium</MenuItem>
                            <MenuItem value="nonPremium">Non-Premium</MenuItem>

                        </Select>
                        <div className="error-margin">
                            {errors?.subscription ? errors.subscription : null}
                        </div>
                    </FormControl>
                    <div>
                        <TextField
                            sx={{ m: 1, width: "calc(100% - 5px)" }}
                            id="outlined-subject"
                            type=""
                            label="Subject"
                            name="subject"
                            value={emailDetails?.subject}
                            onChange={(e) => { setEmailDetails({ ...emailDetails, subject: e.target.value }) }}
                            onBlur={(e) => validate(e.target.name)}
                        />
                        <div className="error-margin">
                            {errors?.subject ? errors.subject : null}
                        </div>
                    </div>
                    <TextField
                        sx={{ m: 1, width: "calc(100% - 5px)" }}
                        id="outlined-multiline-content"
                        label="Content"
                        name="content"
                        multiline
                        rows={4}
                        value={emailDetails?.content}
                        onChange={(e) => { setEmailDetails({ ...emailDetails, content: e.target.value }) }}
                        onBlur={(e) => validate(e.target.name)}
                    />
                    <div className="error-margin">
                        {errors?.content ? errors.content : null}
                    </div>
                    <Button
                        onClick={() => handleSubmit()}
                        className="promo-submit"
                        variant="contained"
                    >
                        Send Emails
                    </Button>
                </Card>
            </Grid>
        </>
    )
}
export default SendPromotions;
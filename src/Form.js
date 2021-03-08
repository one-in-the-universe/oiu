import './Form.css';
import oiuLogo from './oiu.jpeg';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { v4 as uuidv4 } from 'uuid';
import SelectVariant from './SelectVariant';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

const theme = createMuiTheme();

const lookup = {
    "None": [{
        id: '0', text: 'None'
    }],

    "Bedsheets": [
        { id: '0', text: 'Please select a size' },
        { id: '1', text: 'King Size (108X108in)' },
        { id: '2', text: 'King Size (90X100in)' },
        { id: '3', text: 'Queen Size (81X96in)' },
        { id: '4', text: 'Kids/Twin (60X90in)' }
    ],
    "Curtains": [
        { id: '0', text: 'Please select a size' },
        { id: '5', text: 'Curtains (Window-5ft)' },
        { id: '6', text: 'Curtains (Window-7ft)' },
        { id: '7', text: 'Curtains (Door-9ft)' },
        { id: '8', text: 'Curtains (Door-8ft)' }
    ],
    "Shirts": [
        { id: '0', text: 'Please select a size' },
        { id: '9', text: '38' },
        { id: '10', text: '40' },
        { id: '11', text: '42' },
        { id: '12', text: '44' }
    ],
    "Sarees": [
        { id: '13', text: '6.5m' }
    ],
    "Kaftans": [
        { id: '0', text: 'Please select a size' },
        { id: '14', text: 'XS' },
        { id: '15', text: 'S' },
        { id: '16', text: 'M' },
        { id: '17', text: 'L' },
        { id: '18', text: 'XL' },
    ]
}


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        flexFlow: 1,
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        height: "100%",
        width: "100%"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
});

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            mail: "",
            phone: "",

            items: [
                {
                    id: uuidv4(),
                    variant: "None",
                    variantType: "None",
                    quantity: "",
                    for: "",
                    occasion: ""
                }
            ],

            address: "",
            suggestions: "",
        };

        this.check = false;

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleSuggestionsChange = this.handleSuggestionsChange.bind(this);
        this.handleVariantChange = this.handleVariantChange.bind(this);
        this.handleVariantTypeChange = this.handleVariantTypeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    }

    handleEmailChange = (event) => {
        this.setState({
            mail: event.target.value
        });
    }

    handlePhoneChange = (event) => {
        this.setState({
            phone: event.target.value
        });
    }

    handleAddressChange = (event) => {
        this.setState({
            address: event.target.value
        });
    }

    handleSuggestionsChange = (event) => {
        this.setState({
            suggestions: event.target.value
        });
    }

    handleAddFields = () => {
        const prevItems = this.state.items;
        prevItems.push({
            id: uuidv4(),
            variant: "None",
            variantType: "None",
            quantity: "",
            for: "",
            occasion: ""
        })

        this.setState({
            items: prevItems,
        })
    }

    handleRemoveFields = id => {
        const values = this.state.items;
        values.splice(values.findIndex(value => value.id === id), 1);
        this.setState({
            items: values,
        });
    }

    handleQuantityChange = id => (event) => {
        const values = this.state.items;

        for (var i = 0; i < values.length; i++) {
            if (values[i].id === id) {
                values[i].quantity = event.target.value;
            }
        }
    }

    handleForChange = id => (event) => {
        const values = this.state.items;

        for (var i = 0; i < values.length; i++) {
            if (values[i].id === id) {
                values[i].for = event.target.value;
            }
        }
    }

    handleOccasionChange = id => (event) => {
        const values = this.state.items;

        for (var i = 0; i < values.length; i++) {
            if (values[i].id === id) {
                values[i].occasion = event.target.value;
            }
        }
    }

    handleVariantChange = id => (event) => {
        const values = this.state.items;

        for (var i = 0; i < values.length; i++) {
            if (values[i].id === id) {
                values[i].variant = event.target.value;
                values[i].variantType = lookup[event.target.value][0].text;
            }
        }

        this.setState({
            items: values,
        });

    }

    handleVariantTypeChange = id => (event) => {
        const values = this.state.items;

        for (var i = 0; i < values.length; i++) {
            if (values[i].id === id) {
                values[i].variantType = event.target.value;
            }
        }

        this.setState({
            items: values,
        });

    }

    checkForm() {
        const values = this.state.items;

        for (var i = 0; i < values.length; i++) {
            if (values[i].variant === "None") {
                alert(`Please select a product type for Product ${i + 1}`);
            }
            else if (values[i].variantType === "Please select a size") {
                alert(`Please select a product size for Product ${i + 1}`,);
            }
            else if (values[i].quantity === "") {
                alert(`Please mention quantity for Product ${i + 1}`);
            }
            else if (values[i].for === "") {
                alert(`Please mention the person for whom you want this item, Product ${i + 1}`);
            }
            else {
                this.check = true;
            }
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.checkForm();

        if (this.check) {
            alert('Your form was submitted');
            console.log(this.state);

            const { name, mail, phone, items, address, suggestions } = this.state;

            const customer = {
                name,
                mail,
                phone,
                address,
                suggestions
            }

            const order = {
                ...items
            };

            axios
                .post(process.env.REACT_APP_FORM_API || "http://localhost:8000/", { customer: customer, order: order })
                .then(() => console.log('CRF Submitted'))
                .catch(err => {
                    console.error(err);
                });
        }
    }

    getVariant = id => {
        const values = this.state.items;

        for (var i = 0; i < values.length; i++) {
            if (values[i].id === id) {
                return values[i].variant
            }
        }
    }

    getVariantType = id => {
        const values = this.state.items;

        for (var i = 0; i < values.length; i++) {
            if (values[i].id === id) {
                return values[i].variantType
            }
        }
    }


    render() {
        const { classes } = this.props;

        return (<React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
                <div class="page-structure">
                    <img src={oiuLogo} width="100%" height="10%" alt="OIU Logo"></img>
                    <Paper className={classes.paper}>
                        <form className={classes.root} onSubmit={this.handleSubmit}>
                            <h1>Customer Requisition Form</h1>
                            <h4>We will reach out to you soon.</h4>
                            <div class="space"></div>
                            <div><div><input type="text" name="name" placeholder="Your Name" onChange={this.handleNameChange} required /></div></div>
                            <div><div><input type="email" name="mail" placeholder="Your Email Address" onChange={this.handleEmailChange} required /></div></div>
                            <div><div><input type="tel" name="phone" placeholder="Your Phone Number" required onChange={this.handlePhoneChange} /></div></div>

                            <h3>Add Items</h3>
                            <FormHelperText>Please note: Minimum quantity for Shirts and Kaftans is 3.</FormHelperText>
                            <Link to="/sizeChart">Size Chart</Link>
                            {this.state.items.map(item => (
                                <div key={item.id}>
                                    <SelectVariant itemId={item.id} variant={this.getVariant(item.id)} variantType={this.getVariantType(item.id)} onChangeVariantValue={this.handleVariantChange} onChangeVariantTypeValue={this.handleVariantTypeChange} />

                                    <input type="number" name="quantity" min={(this.getVariant(item.id) === "Kaftans" || this.getVariant(item.id) === "Shirts") ? 3 : 1} placeholder="Quantity" onChange={this.handleQuantityChange(item.id)} />
                                    <input type="text" name="for" placeholder="For Whom" onChange={this.handleForChange(item.id)} />
                                    <input type="text" name="occasion" placeholder="Occasion" onChange={this.handleOccasionChange(item.id)} />

                                    <IconButton disabled={this.state.items.length === 1} onClick={() => this.handleRemoveFields(item.id)}>
                                        <RemoveIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={this.handleAddFields}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </div>
                            ))}
                            <TextareaAutosize rowsMin={4} placeholder="Your Delivery Address..." name="address" required onChange={this.handleAddressChange} />
                            <TextareaAutosize rowsMin={4} placeholder="Your suggestions..." name="suggestions" onChange={this.handleSuggestionsChange} />
                            <input type="submit" value="Submit" />
                        </form>
                    </Paper>

                </div>
            </div>
        </React.Fragment>);
    }
}

Form.protoTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles(theme))(Form);



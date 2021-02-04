import React, { Component } from 'react'
import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.module.css'

export default class ContactData extends Component {
    state={
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        }
    }
    
    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                <form>
                    <input type='text' name='name' placeholder='Your Name'/>
                    <input type='text' name='email' placeholder='Your Email'/>
                    <input type='text' name='street' placeholder='Your Street'/>
                    <input type='text' name='postalCode' placeholder='Your Postal Code'/>
                    <Button buttonType='Success'> ORDER </Button>
                </form>
            </div>
        )
    }
}

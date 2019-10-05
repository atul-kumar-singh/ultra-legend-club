/* eslint no-unused-vars: 0 */

import { navigate } from "gatsby";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Input from "antd/lib/input";

import PropTypes from "prop-types";
import React from "react";

import "antd/lib/form/style/index.css";
import "antd/lib/input/style/index.css";
import "antd/lib/button/style/index.css";
import { ThemeContext } from "../../layouts";

const FormItem = Form.Item;

class Calculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rentSavingArr : [],
      renderTable: false,
      totalRent: 0
    }
    this.calculateSavings = this.calculateSavings.bind(this);
  }

  renderTableData() {
    const { rentSavingArr } = this.state ;

    var tableTDStyle = {
      padding: '1%'
    };

    return rentSavingArr.map((item, index) => {
       const { year, rentPerMonth, rentPerYear } = item ;
       return (
          <tr key={index}>
             <td style={tableTDStyle}>{year}</td>
             <td style={tableTDStyle}>{rentPerMonth.toLocaleString()}</td>
             <td style={tableTDStyle}>{rentPerYear.toLocaleString()}</td>
          </tr>
       )
    })
 }

  calculateSavings(e) {
    e.preventDefault();
    let myForm = document.getElementById("rentSavingsCalculatorForm");
    let formdata = new FormData(myForm);
    const rentPerMonth = formdata.get("rent-per-month");
    const numberOfYears = formdata.get("number-of-years");
    const interestIncreasePerYear = formdata.get("interest-per-years");
    console.log("i am here " , rentPerMonth , "yearts is " , numberOfYears , "increate rate" , interestIncreasePerYear);
    let rentSavingArr = [] ;
    let updatedRentperMonth = rentPerMonth ;
    rentSavingArr.push({year : 1 , rentPerMonth: rentPerMonth , rentPerYear: (rentPerMonth*12)}) ;
    let totalAmount = parseInt(rentPerMonth*12) ;
    for(let i=2 ; i<=numberOfYears ; i++){
      updatedRentperMonth = parseInt((interestIncreasePerYear*updatedRentperMonth)/100) + parseInt(updatedRentperMonth) ;
      let updatedRentPerYear = parseInt(updatedRentperMonth*12) ;
      console.log("updatedRentPerYear is " , updatedRentPerYear);
      totalAmount = totalAmount + updatedRentPerYear
      rentSavingArr.push({year : i , rentPerMonth: updatedRentperMonth, rentPerYear: updatedRentPerYear})
    }

    this.setState({
      rentSavingArr : rentSavingArr,
      renderTable: true,
      totalRent: totalAmount
    })

    console.log("total amount is " , totalAmount);
  }

  render() {
    const { renderTable, totalRent } = this.state;
    const { getFieldDecorator } = this.props.form;

    var tableSectionStyle = {
      marginTop: '5%',
      padding: '5%'
    };

    var totalRentStyle = {
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center'
    };

    var titleStyle = {
      marginDown: '3%',
    };

    return (
      <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <div className="form">
            <Form
              name="rentSavingsCalculatorForm" id="rentSavingsCalculatorForm"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >

              <FormItem label="Rent Per Month">
                {getFieldDecorator("rent-per-month", {
                  rules: [
                    {
                      required: true,
                      message: "Please enter the rent per month",
                      whitespace: false
                    }
                  ]
                })(<Input name="rent-per-month" />)}
              </FormItem>
              <FormItem label="Number of Years">
                {getFieldDecorator("number-of-years", {
                  rules: [
                    {
                      required: true,
                      message: "Please enter number of years",
                      whitespace: false
                    }
                  ]
                })(<Input name="number-of-years" />)}
              </FormItem>
              <FormItem label="Increase in Rate of Interest Per Year">
                {getFieldDecorator("interest-per-years", {
                  rules: [
                    {
                      required: true,
                      message: "Please enter interest increase per year!",
                      whitespace: false
                    }
                  ]
                })(<Input name="interest-per-years" />)}
              </FormItem>
              <FormItem>
                <Button onClick={this.calculateSavings} type="primary" htmlType="submit">
                Calculate Total Rent
                </Button>
              </FormItem>
            </Form>

            <style jsx>{`
              .form {
                background: transparent;
              }

              .table-column {
                padding: 1%;
              }

              .table-section {
                margin-top: 5%;
                padding: 5%
              }
              
              #title {
                text-align: center;
                font-family: sans-serif;
              }
              
              #rent {
                text-align: center;
                font-family: sans-serif;
                border-collapse: collapse;
                border: 3px solid #ddd;
                width: 100%;
              }
              
              td {
                padding: 1%;
              }

              #rent td, #rent th {
                border: 1px solid #ddd;
                padding: 18px;
              }
              
              #rent tr:nth-child(even){background-color: #f2f2f2;}
              
              #rent tr:hover {background-color: #ddd;}
              
              #rent th {
                padding-top: 12px;
                padding-bottom: 12px;
                text-align: center;
                background-color: #4CAF50;
                color: white;
              }

              .form :global(.ant-row.ant-form-item) {
                margin: 0 0 1em;
              }
              .form :global(.ant-row.ant-form-item:last-child) {
                margin-top: 1em;
              }
              .form :global(.ant-form-item-control) {
                line-height: 1em;
              }
              .form :global(.ant-form-item-label) {
                line-height: 1em;
                margin-bottom: 0.5em;
              }
              .form :global(.ant-form-item) {
                margin: 0;
              }
              .form :global(.ant-input) {
                appearance: none;
                height: auto;
                font-size: 1.2em;
                padding: 0.5em 0.6em;
              }
              .form :global(.ant-btn-primary) {
                height: auto;
                font-size: 1.2em;
                padding: 0.5em 3em;
                background: ${theme.color.brand.primary};
                border: 1px solid ${theme.color.brand.primary};
              }
              .form :global(.ant-form-explain) {
                margin-top: 0.2em;
              }

              @from-width desktop {
                .form :global(input) {
                  max-width: 50%;
                }
              }
            `}</style>

            {renderTable ? (
              <div style={tableSectionStyle}>
                <h1 id='title' style={titleStyle}>Rent Paid Over The Years</h1>
                  <table id='rent'>
                    <tbody>
                    <tr>
                        <th>Year</th>
                        <th>Rent Per Month</th>
                        <th>Total Rent in a Year</th>
                      </tr>
                        {this.renderTableData()}
                    </tbody>
                  </table>
                  <p style={totalRentStyle}>Total Rent Paid is -:  {totalRent.toLocaleString()}</p>
                </div>
          ) : null }
                       
          </div>
        )}
      </ThemeContext.Consumer>
    </React.Fragment>
    );
  }
}

Calculator.propTypes = {
  form: PropTypes.object
};

const CalculatorForm = Form.create({})(Calculator);

export default CalculatorForm;

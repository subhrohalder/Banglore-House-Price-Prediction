import React from "react";
import '../src/App.css'
import House from './assets/undraw_house_searching_n8mp.svg'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";

class App extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      price: null,
      locations:[]
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:5000/get_location_names")
      .then(response => {
        return response.json();
      })
      .then(data => {
        let location_data = data['locations'];
        console.log(location_data);
        this.setState({
          locations: location_data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    // fetch("http://localhost:5000/get_price", {
    //   method: "POST",
    //   body: data
    // });

    // this.setState({
    //   modal: !this.state.modal
    // });

    const requestOptions = {
      method: "POST",
      body: data
    };
    fetch("http://127.0.0.1:5000/get_price", requestOptions)
      .then(response => response.json())
      .then(data1 => this.setState({ price: data1.estimated_price }))
      .then(data2 => this.setState({ modal: !this.state.modal }));

   }

  state = {
    modal: false
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <MDBContainer>
       

        <MDBRow className='flex-center'>
        <img md ="3" src= {House} alt="Trulli" width="500" height="333"/>
          <MDBCol md="6">
            <form onSubmit={this.handleSubmit}>
              <p className="h4 text-center mb-4">Banglore House Price Prediction</p>
              <label htmlFor="defaultFormRegisterNameEx" className="black-text">
                Total Square foot
              </label>
              <input id="total_sqft" name="total_sqft" type="text" className="form-control"  pattern="[0-9]*"/>
              <br />
              <label htmlFor="defaultFormRegisterEmailEx" className="black-text">
               Location
              </label>
              {/* <input id="location" name="location" type="text" className="form-control"  /> */}
              <select
               id="location"
                className="dropdown"
                name="location" 
                className="form-control"
                onChange={this.handleDropDown}
              >
                {this.state.locations.map(location => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <br />
              <label
                htmlFor="defaultFormRegisterConfirmEx"
                className="black-text"
              >
                Number of BHK
              </label>
              <input id="bhk" name="bhk" type="text"  className="form-control" pattern="[0-9]*"/>
              <br />
              <label
                htmlFor="defaultFormRegisterPasswordEx"
                className="black-text"
              >
                Number of Bathroom
              </label>
              <input id="bath" name="bath" type="text"  className="form-control" pattern="[0-9]*" />
              <div className="text-center mt-4">
                <MDBBtn color="blue" type="submit" >
                  Predict the Price
                </MDBBtn>
                {/* <MDBBtn onClick={this.toggle}>Modal</MDBBtn> */}
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                  <MDBModalHeader toggle={this.toggle}>
                    The Predicted amount of the House
                  </MDBModalHeader>
                  <MDBModalBody>{this.state.price} Lakhs</MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={this.toggle}>
                      Close
                    </MDBBtn>
                    <MDBBtn color="primary">Save changes</MDBBtn>
                  </MDBModalFooter>
                </MDBModal>
              </div>
            </form>
            
          </MDBCol>

        </MDBRow>
        
      </MDBContainer>
    );
  }
}
export default App;

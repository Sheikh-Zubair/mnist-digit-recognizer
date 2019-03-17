import React, { Component } from 'react'
import { connect } from 'react-redux'
import SignaturePad from 'signature_pad'
import '../App.css';
import * as actions from '../actions/index'

class DrawingBooard extends Component {
    constructor(){
        super();

        this.state = {
            signature: '',
            canvas: ''
        }
    }

    componentDidMount() {
        document.querySelector('#result').style.display = 'none';
        this.draw();
    }
    draw() {
        let canvas = document.querySelector("#canv");
        let signature = new SignaturePad(canvas, {
            minWidth: 15,
            maxWidth: 20,
            dotSize: 10,
            penColor: 'black'
        });
        this.setState({signature, canvas})
    }
    img() {
        let image = this.state.signature.toDataURL()
        console.log(image)
        this.props.predict(image)
        document.querySelector('#result').style.display = 'block';
    }
    reset() {
        this.state.signature.clear();
        this.props.logout()
        document.querySelector('#result').style.display = 'none';
    }
    renderThis() {
        return (
            <div className="container">
            <header id="heading">
                <h1>MNIST number predictor</h1>
            </header>
                <div className="row justify-content-around">
                    <div className="col-md-6 col-xs-8">
                        <h2>Draw number</h2>
                        <div id="box">
                            <canvas height="280" width="280" id="canv"></canvas>
                        </div>
                    </div>
                    <div class="clearfix visible-xs"></div>
                    <div className="col-md-4 col-xs-4 col-md-push-2" id="result">
                        <h2>Prediction</h2>
                        <div id="result">{this.props.result || 'Predicting....'}</div>
                    </div> 
                </div>
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-3 col-xs-4">
                        <button className="btn btn-primary" onClick={() => this.img()}>Predict</button>
                    </div>
                    <div className="col-md-2 col-xs-8 offset-xs-2">
                        <button className="btn btn-warning" onClick={() => this.reset()}>Reset</button>
                    </div>
                </div>
            </div>
        );
    }
    render() {
        return (
            <div>
                {this.renderThis()}
            </div>
        );
    }
}
const mapStateToProps = ({result}) => ({result})

export default connect(mapStateToProps, actions)(DrawingBooard);
import React, {Component} from 'react';
import { useState } from 'react';
import {Button, Card} from 'reactstrap'; 
import FileBase64 from 'react-file-base64'
import './Upload.css'

class Upload extends Component{

    constructor(props){
        super();
        this.state = {
            files : [],
            Result: [],
            ifCeleb: ''
        }

        this.fileUpload = this.fileUpload.bind(this);
    }

    getFiles(files){
        this.setState({files: files})
        console.log(files); 

    }

    async fileUpload(){
        
        const response = await fetch('https://vnkszzbrq4.execute-api.us-east-2.amazonaws.com/Prod/passportphoto',{
            method: "POST", 
            headers: {
                Accept: "application/json", 
                "Content-type": "application/json"
            },

            body : JSON.stringify({photo : this.state.files['base64']})})

            const Result = await response.json();
            this.setState({Result: Result.body})
            console.log(this.state.Result)
            const FaceDetails = JSON.parse(this.state.Result)
            
            if(FaceDetails['CelebrityFaces'][0] === undefined){
                this.setState({ifCeleb: "We found NO CELEBRITY!"})
            } else {
                this.setState({ifCeleb: "We found " + FaceDetails['CelebrityFaces'][0]['Name']})
            }        
        }
        
        render(){
            const ifCeleb = this.state.ifCeleb
            
            return(
                <div>
                    <div className="row">
                        <div className="col-6 offset-3">
                            <h2 className="title">Celebrity Verification</h2>
                        </div>
                    </div>

                    <div className="row">
                        <div className=" files col-6 offset-3">
                            <FileBase64
                             multiple={false} 
                             onDone = {this.getFiles.bind(this)}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className=" files col-6 offset-3">
                            <img src={this.state.files.base64} width="40%"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6 offset-3">
                        <Button className="button" 
                            onClick={this.fileUpload}> Verify Photo!
                    
                        </Button>
                </div>

                    </div>

                    <div className="row">
                        <div className=" celebrity col-6 offset-3">

                        </div>
                    </div>

                    <div className="row">
                        <div className=" btn col-6 offset-3">
                            {ifCeleb}
                </div>
                </div>
            </div>
                    
                
        )

    }
}

export default Upload

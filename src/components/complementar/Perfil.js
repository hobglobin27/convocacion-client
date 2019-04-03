import React, {Component, Fragment} from 'react';
import 'antd/dist/antd.css';
import { Steps, Button, message, Input, Form, Icon, Radio, Upload, Modal, Alert } from 'antd';
import { connect } from "react-redux";
import * as actions from "../../actions";
import ComunService from "../../servicios/comun-service"
import {INITIAL_LOCATION, INITIAL_MAP_ZOOM_LEVEL, ATLANTIC_OCEAN} from "../../actions/types"

const comunService = new ComunService();
const Step = Steps.Step;
const RadioGroup = Radio.Group;
const Dragger = Upload.Dragger;
let arrayFile =[];

const props = {
  name: 'picture',
  multiple: false,
  action: ""
};

const steps = [{
  title: 'Datos Personales',
  content: 'First-content'  
}, {
  title: 'Datos de la Direccion', 
  content: 'Second-content',
}, {
  title: 'Finalizar Perfil',
  content: 'Last-content',
}];

var map="";

class Perfil extends Component {
    state = {
    current: 0,
    nombre: "",
    paterno: "",
    materno: "",
    genero: "",
    foto: {
      nombre: "",
      path: "",
      originalNombre: ""
    },
    hangouts: "",
    skype: "",
    correoNotificacion: "",
    tipoUsuario: "",
    materias: [],
    direccionBusqueda: "Ciudad de México, México",
    direccion: "",
    altitud: "",
    latitud: "",
    previewVisible: false,
    previewImage: '',
    fileList: [],
    inmueble:""
  };


  componentDidMount(){
    //props.action = `http://localhost:3001/api/upload/pictures/add/user/${this.props.loggedIn._id}`;
    props.action = `http://localhost:3001/api/upload/pictures/add/user/5c99202d69d07315f42517da`;      
  }  

  renderMap = () => {
    console.log("Este es el api KEY: ", process.env.REACT_APP_API_KEY)
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&callback=initMap`)
    window.initMap = this.initMap
  }

  initMap = () => {
    map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: INITIAL_MAP_ZOOM_LEVEL,
      center: {
        lat: INITIAL_LOCATION.position.lat,
        lng: INITIAL_LOCATION.position.lng
      }
    })

    this.marker = new window.google.maps.Marker({
      map: map,
      position: {
        lat: INITIAL_LOCATION.position.lat,
        lng: INITIAL_LOCATION.position.lng 
      }
    });

    this.geocoder = new window.google.maps.Geocoder();
  }

  geocodeAddress = (address) => {
    this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {
  
      if (status === window.google.maps.GeocoderStatus.OK) {
  
        map.setCenter(results[0].geometry.location);
        this.marker.setPosition(results[0].geometry.location);
  
        return;
      }
  
      this.map.setCenter({
        lat: ATLANTIC_OCEAN.latitude,
        lng: ATLANTIC_OCEAN.longitude
      });
  
      this.marker.setPosition({
        lat: ATLANTIC_OCEAN.latitude,
        lng: ATLANTIC_OCEAN.longitude
      });
  
    }.bind(this));
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
    if(current > 1){
      this.renderMap();
    }
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
    if(event.target.name==="inmueble"){
      this.renderMap();
    }
 
  }

  handleChangeImage = (info) => {
    const status = info.file.status;

    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      arrayFile.push({ uid: info.file.uid,
                        name: info.file.name,
                        status: info.file.status,
                        url: info.file.response.pictureUrl});
                        
      this.setState({fileList: arrayFile})
      
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleRemoveImage = (file) => {
    let afterRemove = arrayFile.filter(elemento => elemento.name!==file.name)
    arrayFile=afterRemove;
    this.setState({fileList: arrayFile})
    //comunService.remueveImagen(file,this.props.loggedIn._id);
    comunService.remueveImagen(file,"5c99202d69d07315f42517da");
  }

  handleClick = (event) => {
    var address = this.state.direccionBusqueda;
    this.geocodeAddress(address);
  }

  loadJS = (src) => {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}

  render() {
    const { current } = this.state;
    const { getFieldDecorator } = this.props.form;

    const { previewVisible, previewImage, fileList } = this.state;    

    return (
      <div className="container">
        <br/>
        <h3 style={{color:"rgb(238, 96, 40)", paddingLeft:"3.5%"}}>Dedica un momento para completar tu perfil</h3>
        
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">
          <Form onSubmit={this.handleSubmit} style={{paddingLeft: "1%", paddingRight: "1%"}}>
            { this.state.current === 0 ?
            <Fragment>
              <div className="d-flex flex-wrap">
                <div className="row align-items-center col-12">
                  <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                    <span><span style={{color:"red"}}>*</span> Selecciona tu rol dentro de ConVocacion:</span>
                  </div>
                  <div className="col-lg-7 col-md-7 col-sm-12 col-12">
                    <RadioGroup name="tipoUsuario" onChange={this.handleChange} value={this.state.tipoUsuario} style={{paddingLeft: "0%"}}>
                      <Radio value={"T"}>Tutor</Radio>
                      <Radio value={"L"}>Lider de grupo</Radio>
                    </RadioGroup>
                  </div>

                </div>
              </div>
              <br/><br/>
              <div className="d-flex flex-wrap justify-content-start">
                <div className="row align-items-center col-12">
                  <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                    <p style={{paddingBottom:"10%"}}><span style={{color:"red"}}>*</span> Nombre</p>
                  </div>
                  <div className="col-lg-9 col-md-9 col-sm-12 col-12">
                    <Form.Item
                      hasFeedback
                    >
                      {getFieldDecorator('nombre', {
                        initialValue: `${this.state.nombre}`,
                        rules: [{ required: true, message: 'Por favor ingresa tu Nombre!' }],
                      })(
                        <Input name="nombre" onChange = { e => this.handleChange(e)}  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="Nombre(s)" />
                      )}
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-wrap justify-content-start">
                <div className="row align-items-center col-12">
                  <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                    <p style={{paddingBottom:"10%"}}><span style={{color:"red"}}>*</span> Apellido Paterno</p>
                  </div>
                  <div className="col-lg-9 col-md-9 col-sm-12 col-12">
                    <Form.Item
                      hasFeedback
                      >
                        {getFieldDecorator('paterno', {
                          initialValue: `${this.state.paterno}`,
                          rules: [{ required: true, message: 'Por favor ingresa tu Apellido Paterno!' }],
                        })(
                          <Input name="paterno" onChange = { e => this.handleChange(e)} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Apellido Paterno" />
                      )}
                    </Form.Item>
                  </div>
                </div>
              </div>         
              <div className="d-flex flex-wrap justify-content-start">
                <div className="row align-items-center col-12">
                  <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                    <p style={{paddingBottom:"10%"}}><span style={{color:"red"}}>*</span> Apellido Materno</p>
                  </div>
                  <div className="col-lg-9 col-md-9 col-sm-12 col-12">
                    <Form.Item
                      hasFeedback
                      >
                        {getFieldDecorator('materno', {
                          initialValue: `${this.state.materno}`,
                          rules: [{ required: true, message: 'Por favor ingresa tu Apellido Materno!' }],
                        })(
                          <Input name="materno" onChange = { e => this.handleChange(e)} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Apellido Materno" />
                      )}
                    </Form.Item>                    
                  </div>
                </div>
              </div>  
              <div className="d-flex flex-wrap">
                <div className="row align-items-center col-12">
                  <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                  <span><span style={{color:"red"}}>*</span> Género:</span>
                  </div>
                  <div className="col-lg-7 col-md-7 col-sm-12 col-12">
                  <RadioGroup name="genero" onChange={this.handleChange} value={this.state.genero}>
                    <Radio value={"H"}>Hombre</Radio>
                    <Radio value={"M"}>Mujer</Radio>
                  </RadioGroup>
                  </div>
                </div>
              </div>
              <br/>
            </Fragment>
            :
              <Fragment>
              {this.state.current === 1 ?
                <Fragment>
                  <div className="d-flex flex-wrap justify-content-start">
                    <div className="row col-12">
                      <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <div>
                          <Dragger {...props} onChange = { e => this.handleChangeImage(e)}>
                            <p className="ant-upload-drag-icon">
                              <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">Para subir imagenes da click o arrastra un archivo dentro de esta área.</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                          </Dragger>
                        </div>
                        <br/><br/>
                        <span><span style={{color:"red"}}>*</span> Notificacion por correo?:</span>
                        <RadioGroup name="correoNotificacion" onChange={this.handleChange} value={this.state.correoNotificacion} style={{paddingLeft: "5%"}}>
                          <Radio value={"S"}>Si</Radio>
                          <Radio value={"N"}>No</Radio>
                        </RadioGroup>
                        <br/><br/>
                      </div> 
                      <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="clearfix row align-items-center col-12">
                          <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onRemove={this.handleRemoveImage}
                          />
                          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                          </Modal>
                        </div>
                        <div className="row align-items-center col-12">
                          <div className="col-12">
                            <Form.Item
                              hasFeedback
                              label="Hangouts"
                            >
                              {getFieldDecorator('hangouts', {
                                initialValue: `${this.state.hangouts}`,
                                rules: [{ required: false, message: 'Por favor ingresa tu Hangouts!' }],
                              })(
                                <Input name="hangouts" onChange = { e => this.handleChange(e)}  prefix={<Icon type="google" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="Google Hangouts" />
                              )}
                            </Form.Item>
                          </div>
                        </div>
                        <div className="row align-items-center col-12">
                          <div className="col-12">
                            <Form.Item
                              hasFeedback
                              label="Skype"
                            >
                              {getFieldDecorator('skype', {
                                initialValue: `${this.state.skype}`,
                                rules: [{ required: false, message: 'Por favor ingresa tu Skype!' }],
                              })(
                                <Input name="skype" onChange = { e => this.handleChange(e)}  prefix={<Icon type="skype" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="Skype" />
                              )}
                            </Form.Item>
                          </div>
                        </div>                                                 
                      </div>
                    </div>
                  </div>         
                </Fragment>
                :
                <Fragment>
                  <div className="d-flex flex-wrap justify-content-start">
                    <div className="row align-items-center col-12">
                      <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                        <span><span style={{color:"red"}}>*</span> ¿Tienes un inmueble en el que se pueda dar la capacitación?</span>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                        <RadioGroup name="inmueble" onChange={this.handleChange} value={this.state.inmueble} style={{paddingLeft: "0%"}}>
                          <Radio value={"S"}>Si</Radio>
                          <Radio value={"N"}>No</Radio>
                        </RadioGroup>
                      </div>
                    </div>                    
                    {
                      this.state.inmueble === "S" ?
                        <Fragment>
                          <br/><br/>
                          <div className="row col-12">                      
                            <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                              <Form.Item
                                >
                                  {getFieldDecorator('materno', {
                                    initialValue: `${this.state.direccionBusqueda}`,
                                    rules: [{message: 'Por favor ingresa la direccion!' }],
                                  })(
                                    <Input name="direccionBusqueda" onChange = { e => this.handleChange(e)} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Introduzca direccion" />
                                )}
                              </Form.Item>                    
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                              <Button onClick={e => this.handleClick(e)} type="primary" icon="search" style={{marginTop:"4px"}}>Buscar</Button>
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <Alert message="Ciudad de México, México" type="success" showIcon />
                            <br/>
                            <div id="map"></div>
                            <br/>
                          </div>
                        </Fragment>
                        :
                        <Fragment>
                          <div className="row col-12" style={{height:"20vw"}}>
                          </div>
                          
                        </Fragment>
                    }                    
                  </div>
                </Fragment>
              }
              </Fragment>
            }            
          </Form>
        </div>
        <div className="steps-action">
          {
            current > 0
            && (
            <Button style={{ marginRight: 30 }} onClick={() => this.prev()}>Anterior</Button>
            )
          }
          {
            current < steps.length - 1
            && <Button type="primary" onClick={() => this.next()}>Siguiente</Button>
          }
          {
            current === steps.length - 1
            && <Button type="primary" onClick={() => message.success('Processing complete!')}>Guardar</Button>
          }
        </div>
        <br/><br/>
      </div>
    );
  }
}

function loadScript(url){
  var index = window.document.getElementsByTagName("script")[0]
  var script =  window.document.createElement("script")
  script.src=url
  script.async=true
  script.defer=true 
  index.parentNode.insertBefore(script, index)
}

const mapStateToProps = state => ({ current: state.current,
                                    loggedIn: state.loggedIn });

export default connect(
mapStateToProps,
actions
)(Perfil);
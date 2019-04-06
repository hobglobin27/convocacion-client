import React, {Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Steps, Button, message, Input, Form, Icon, Radio, Upload, Modal, Alert, List, AutoComplete } from 'antd';
import { connect } from "react-redux";
import * as actions from "../../actions";
import ComunService from "../../servicios/comun-service"
import {INITIAL_LOCATION, INITIAL_MAP_ZOOM_LEVEL, ATLANTIC_OCEAN, CURRENT_HOME} from "../../actions/types"

const comunService = new ComunService();
const Step = Steps.Step;
const RadioGroup = Radio.Group;
const Dragger = Upload.Dragger;
let arrayFile=[];
let map="";
let arrayFotos=[];
let dataSource = [];

const props = {
  name: 'picture',
  multiple: false,
  action: "",
  showUploadList:true
};

const steps = [{
  title: 'Datos Personales',
  content: 'First-content'  
}, {
  title: 'Foto y medios de contacto', 
  content: 'Second-content',
}, {
  title: 'Datos dirección',
  content: 'Third-content',
}, {
  title: 'Finalizar perfil',
  content: 'Last-content',
}
];

class Perfil extends Component {
    state = {
    current: 0,
    nombre: "",
    paterno: "",
    materno: "",
    genero: "",
    fotos: [{
      uid: "",
      nombre: "",
      path: "",
      originalNombre: ""
    }],
    hangouts: "",
    skype: "",
    notificacionEmail: "",
    tipoUsuario: "",
    materias: [],
    direccionBusqueda: "",
    direccion: "",
    previewVisible: false,
    previewImage: '',
    fileList: [],
    inmueble:"",
    isGeocodingError: false,
    foundAddress: INITIAL_LOCATION.address,
    showUploadList: true,
    data: [],
    dataGrupo: [],
    disabledAgregar: true,
    disabledAgregarGrupo: true,
    materia:"",
    existeMateria:false,
    grupoLider:"",
    inputGrupo: "",
    grabado: false
  };

  componentWillMount(){
    dataSource = this.props.materias.map(materia => materia.descripcion)
  }

  componentDidMount(){
    if(arrayFile.length < 3)
      props.action = `http://localhost:3001/api/upload/pictures`;      
  }  

  renderMap = () => {
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

        this.setState({
          foundAddress: results[0].formatted_address,
          isGeocodingError: false,
          direccion: results[0].formatted_address
        })
        
        map.setCenter(results[0].geometry.location);
        this.marker.setPosition(results[0].geometry.location);
  
        return;
      }

      this.setState({
        foundAddress: null,
        isGeocodingError: true,
        direccion: ""
      })
  
      map.setCenter({
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
    if(current === 2){
      this.renderMap();
    }
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
    if(current === 2){
      this.renderMap();
    }
  }

  grabaPerfil = () => {
    let errores = [];
    let camposOK = true;
    
    if(this.state.nombre === ""){
      errores.push("Nombre")
      camposOK = false;
    }

    if(this.state.paterno === ""){
      errores.push("Apellido Paterno")
      camposOK = false;
    }
    if(this.state.materno === ""){
      errores.push("Apellido Materno")
      camposOK = false;
    }
    if(this.state.genero === ""){
      errores.push("Genero")
      camposOK = false;
    }
    if(this.state.fotos.length === 0){
      errores.push("Fotos")
      camposOK = false;
    }
    if(this.state.notificacionEmail === ""){
      errores.push("Notificaciones por correo")
      camposOK = false;
    }
    if(this.state.tipoUsuario === ""){
      errores.push("Rol en ConVocacion")
      camposOK = false;
    }
    if(this.state.materias.length === 0 && 
      this.state.tipoUsuario !== "" && 
      this.state.tipoUsuario === "T"){
      errores.push("Materias a impartir")
      camposOK = false;
    }
    if(this.state.inmueble === "S" && this.state.direccion === ""){
      errores.push("Direccion inmueble")
      camposOK = false;
    }
    if(this.state.inmueble === ""){
      errores.push("Cuenta con inmueble?")
      camposOK = false;
    }
    if(this.state.dataGrupo.length === 0 && 
      this.state.tipoUsuario !== "" && 
      this.state.tipoUsuario === "L" &&
      this.state.grupoLider === "S"){
      errores.push("Dar de alta grupo")
      camposOK = false;
    }
    if(this.state.grupoLider === "" &&
    this.state.tipoUsuario !== "" && 
    this.state.tipoUsuario === "L"){
      errores.push("Cuenta con un grupo?")
      camposOK = false;
    }

    if(camposOK){
      this.success()
      
    } 
    else{
      console.log("estos son los errores: ", errores)
    }
  }

  success = () => {
    message.loading('Action in progress..', 4)
      .then(() => message.success('La información se ha grabado correctamente', 2.5))
      .then(() => this.setState({grabado: true}));
  };
  

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
    if(event.target.name==="inmueble"){
      this.renderMap();
    }
    
    if(event.target.name==="inputGrupo"){
      if(event.target.value!=="")
        this.setState({disabledAgregarGrupo: false})
      else
        this.setState({disabledAgregarGrupo: true})
    } 
  }

  handleChangeImage = (info) => {
    const status = info.file.status;
    props.showUploadList=true;
    this.setState({showUploadList: props.showUploadList});
    if(arrayFile.length > 1){
      props.action="";
    }

    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
      props.showUploadList=false;
      this.setState({showUploadList: props.showUploadList});
    }

    if (status === 'uploading') {
      console.log(info.file, info.fileList); 
      props.showUploadList=true;
      this.setState({showUploadList: props.showUploadList});    
    }

    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      arrayFile.push({ uid: info.file.uid,
                        name: info.file.name,
                        status: info.file.status,
                        url: info.file.response.pictureUrl})
      arrayFotos.push({
                        uid: info.file.uid,
                        nombre: info.file.name,
                        path: info.file.response.pictureUrl,
                        originalNombre: info.file.name
                      })  
                                   
      this.setState({fileList: arrayFile})
      this.setState({fotos: arrayFotos})
      props.showUploadList=false;
      this.setState({showUploadList: props.showUploadList});
      
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
      props.showUploadList=false;
      this.setState({showUploadList: props.showUploadList});
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
    let afterRemove = arrayFile.filter(elemento => elemento.uid!==file.uid)
    let afterRemoveFotos = arrayFotos.filter(elemento => elemento.uid!==file.uid)
    arrayFile=afterRemove;
    arrayFotos=afterRemoveFotos;
    this.setState({fileList: arrayFile})
    this.setState({fotos: arrayFotos})
    if(arrayFile.length < 3){
      props.action = `http://localhost:3001/api/upload/pictures`;
    }
  }

  handleClick = (event) => {
    var address = this.state.direccionBusqueda;
    this.geocodeAddress(address);
  }

  handleSelectAutoCom = (event) => {
    this.setState({disabledAgregar: false});
    this.setState({existeMateria: true});
  }

  handleClickAgregar = (event) => {
    let existeMateria = dataSource.find(elemento => elemento === this.state.materia)
    if(existeMateria === undefined){
      this.setState({existeMateria: false})
    }
    if(existeMateria !== undefined){
      let datosLista = this.state.data;
      if(!datosLista.find(elemento => elemento === this.state.materia)){
        datosLista.push(this.state.materia)
        this.setState({data: datosLista})
        this.setState({disabledAgregar: true});
        this.setState({materias: datosLista});
      }        
    }
  }

  handleClickGuardaGrupo = (event) => {    
    let datosLista = this.state.dataGrupo;
    if(!datosLista.find(elemento => elemento === this.state.inputGrupo)){
      datosLista.push(this.state.inputGrupo)
      this.setState({dataGrupo: datosLista})
      this.setState({disabledAgregarGrupo: true});
      this.setState({inputGrupo:""})
      this.props.form.resetFields(["inputGrupo"]);
    }    
  }

  handleChangeAutoCom = (event) => {
    this.setState({materia: event})
  }

  handleClikDeleteLista = (event, item) => {
    let deleteArray = this.state.data.filter(elemento => elemento !==item )
    this.setState({data: deleteArray})
    this.setState({materias: deleteArray});
  }

  handleClikDeleteListaGrupo = (event, item) => {
    let deleteArray = this.state.dataGrupo.filter(elemento => elemento !==item )
    this.setState({dataGrupo: deleteArray})
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

    if(this.state.grabado){
      this.props.setCurrentNav(CURRENT_HOME);
      return <Redirect to="/homepage" />
    }

    return (
      <div className="container">
        <br/>
        <h3 style={{color:"rgb(238, 96, 40)", paddingLeft:"3.5%"}}>Dedica un momento para completar tu perfil</h3>
        
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">
          <Form.Item onSubmit={this.handleSubmit} style={{paddingLeft: "1%", paddingRight: "1%"}}>
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
            </Fragment>
            :
            <Fragment>
            {this.state.current === 1 ?
              <Fragment>
                <div className="d-flex flex-wrap justify-content-start">
                  <div className="row col-12">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="col-12">
                        <span><span style={{color:"red"}}>*</span> Debes subir al menos una foto:</span>
                      </div>
                      <div style={{marginBottom:"20px"}}>
                        <Dragger {...props} onChange = { e => this.handleChangeImage(e)}>
                          <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                          </p>
                          <p className="ant-upload-text">Para subir imagenes da click o arrastra un archivo dentro de esta área.</p>
                          <p className="ant-upload-hint">Solo puedes subir 3 imagenes como maximo. La primera de ellas es la que sera utilizada en tu perfil.</p>
                        </Dragger>
                      </div>
                      <span><span style={{color:"red"}}>*</span> Notificacion por correo?:</span>
                      <RadioGroup name="notificacionEmail" onChange={this.handleChange} value={this.state.notificacionEmail} style={{paddingLeft: "5%"}}>
                        <Radio value={"S"}>Si</Radio>
                        <Radio value={"N"}>No</Radio>
                      </RadioGroup>
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
              {this.state.current === 2 ?  
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
                          <div className="row col-12">                      
                            <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                              <Form.Item
                                >
                                  {getFieldDecorator('direccionBusqueda', {
                                    initialValue: `${this.state.direccionBusqueda}`,
                                    rules: [{message: 'Por favor ingresa la direccion!' }],
                                  })(
                                    <Input name="direccionBusqueda" onChange = { e => this.handleChange(e)} prefix={<Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Introduzca direccion" />
                                )}
                              </Form.Item>                    
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                              <Button onClick={e => this.handleClick(e)} type="primary" icon="search" style={{marginTop:"4px"}}>Buscar</Button>
                            </div>
                          </div>
                          <div className="col-sm-12">                            
                            {
                              this.state.isGeocodingError 
                              ? 
                              <Alert message="No se encontro la dirección" type="error" showIcon style={{marginBottom:"10px"}} />
                              :
                              <Alert message={this.state.foundAddress} type="success" showIcon style={{marginBottom:"10px"}} />
                            }
                            <div id="map"></div>                            
                          </div>
                        </Fragment>
                        :
                        <Fragment>
                          <div className="row col-12" style={{height:"18vw", marginBottom:"10px"}}>
                          </div>                          
                        </Fragment>
                    }                    
                  </div>
                </Fragment>
                :
                <Fragment>
                  {
                    this.state.tipoUsuario === "" ?
                      <Fragment>
                        <div style={{marginBottom:"15px"}}>
                          <br/><br/>
                          <p style={{fontSize:"3vw"}}>
                            Aun no has informado tu rol en convocacion. Selecciona uno!!!
                          </p>
                          <br/><br/>
                        </div>
                      </Fragment>
                    :
                    <Fragment>
                      {
                        this.state.tipoUsuario === "T" ?
                        <Fragment>
                          <div className="d-flex flex-wrap justify-content-start">
                            <div className="row col-12">
                              <div className=" row col-12">
                                <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                                  <span><span style={{color:"red"}}>*</span> Selecciona las materias que puedes impartir.</span>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                  <AutoComplete
                                    id="autoCompMateria"
                                    name="materia"
                                    style={{ width: "100%" }}
                                    dataSource={dataSource}
                                    placeholder="Busca una materia"
                                    defaultValue=""
                                    filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                                    onSelect={e => this.handleSelectAutoCom(e)}
                                    onChange={e => this.handleChangeAutoCom(e)}
                                  />
                                </div>
                                <div className="col-lg-2 col-md-6 col-sm-12 col-12">
                                  {
                                    (this.state.disabledAgregar || this.state.existeMateria === false) || this.state.data.length >2 ?
                                      <Button id="botonAgregar" onClick={e => this.handleClickAgregar(e)} type="primary" icon="check" style={{marginTop:"4px"}} disabled={true}>Agregar</Button>
                                      :
                                      <Button id="botonAgregar" onClick={e => this.handleClickAgregar(e)} type="primary" icon="check" style={{marginTop:"4px"}} disabled={false}>Agregar</Button>
                                  }                                  
                                </div>
                                {
                                  !this.state.existeMateria && this.state.materia !== "" ?
                                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                      <p style={{color:"red"}}>La materia no existe en el catalogo!</p>
                                    </div>
                                  :
                                    <div></div>
                                }
                              </div>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <List
                                  size="small"
                                  header={<div>Materias que puedes impartir</div>}
                                  footer={<div style={{fontSize:"12px"}}>* Solo una de las materias seleccionadas se mostrara cuando aparezcas en las busquedas </div>}
                                  bordered
                                  dataSource={this.state.data}
                                  renderItem={item => (<List.Item actions={[<Icon name={item} type="delete" onClick={e => this.handleClikDeleteLista(e, item)}></Icon>]}>{item} </List.Item>)}
                                />                                
                              </div>
                            </div>                            
                          </div>                          
                        </Fragment>
                        :
                        <Fragment>
                          <div className="d-flex flex-wrap justify-content-start">
                            <div className="row align-items-center col-12">
                              <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                                <span><span style={{color:"red"}}>*</span> ¿Ya tienes algun grupo formado o en mente?</span>
                              </div>
                              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                <RadioGroup name="grupoLider" onChange={this.handleChange} value={this.state.grupoLider} style={{paddingLeft: "0%"}}>
                                  <Radio value={"S"}>Si</Radio>
                                  <Radio value={"N"}>No</Radio>
                                </RadioGroup>
                              </div>
                            </div>                    
                            {
                              this.state.grupoLider === "S" ?
                                <Fragment>                          
                                  <div className="row col-12"> 
                                    <div className="col-lg-2 col-md-3 col-sm-12 col-12">
                                      <p style={{paddingBottom:"10%"}}> Introduce Grupo</p>
                                    </div>                     
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                      <Form.Item
                                      hasFeedback
                                      rese                            
                                        >
                                          {getFieldDecorator('inputGrupo', {
                                            initialValue: `${this.state.inputGrupo}`,
                                            rules: [{message: 'Por favor ingresa nombre de grupo!' }],
                                          })(
                                            <Input name="inputGrupo" onChange = { e => this.handleChange(e)} prefix={<Icon type="usergroup-add" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Introduzca nombre de grupo" />
                                        )}
                                      </Form.Item>                    
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                                      {
                                        this.state.disabledAgregarGrupo ?
                                          <Button id="botonAgregarGrupo" onClick={e => this.handleClickGuardaGrupo(e)} type="primary" icon="check" style={{marginTop:"4px"}} disabled={true}>Agregar</Button>
                                          :
                                          <Button id="botonAgregarGrupo" onClick={e => this.handleClickGuardaGrupo(e)} type="primary" icon="check" style={{marginTop:"4px"}} disabled={false}>Agregar</Button>
                                      }
                                    </div>
                                  </div>
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    <List
                                      size="small"
                                      header={<div>Grupos del Lider</div>}
                                      footer={<div style={{fontSize:"12px"}}>* Los integrantes de grupo los podras dar de alta desde tu pagina de inicio</div>}
                                      bordered
                                      dataSource={this.state.dataGrupo}
                                      renderItem={item => (<List.Item actions={[<Icon name={item} type="delete" onClick={e => this.handleClikDeleteListaGrupo(e, item)}></Icon>]}>{item} </List.Item>)}
                                    />                                
                                  </div>
                                </Fragment>
                                :
                                <Fragment>
                                  <div className="row col-12" style={{height:"18vw"}}>
                                  </div>                          
                                </Fragment>
                            }                    
                          </div>
                        </Fragment> 
                      }                      
                    </Fragment>                    
                  }
                </Fragment>
                }
                </Fragment>
              }
              </Fragment>
            }            
          </Form.Item>
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
            && <Button type="primary" onClick={() => this.grabaPerfil()}>Guardar</Button>
          }
        </div>
        <br/>
        {this.state.current === 3 && this.state.data.length ===1 && this.state.tipoUsuario === "T" ?
          <Fragment>
            <br/><br/><br/><br/>
          </Fragment>  
          :   
          <Fragment>     
            {this.state.current === 3 && this.state.data.length ===2 && this.state.tipoUsuario === "T" ?
              <Fragment>
              <br/><br/>
            </Fragment> 
              :
              <Fragment>     
                {this.state.current === 3 && this.state.dataGrupo.length ===1 && this.state.tipoUsuario === "L" ?
                  <Fragment>
                  <br/><br/><br/>
                </Fragment> 
                  :
                  <Fragment>     
                    {this.state.current === 3 && this.state.dataGrupo.length ===2 && this.state.tipoUsuario === "L" ?
                      <Fragment>
                      <br/>
                    </Fragment> 
                      :
                      <div></div>
                    }
                  </Fragment>
                }
              </Fragment>
            }
          </Fragment>
        } 
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
                                    loggedIn: state.loggedIn,
                                    materias: state.materias });

export default connect(
mapStateToProps,
actions
)(Perfil);
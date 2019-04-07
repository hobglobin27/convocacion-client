import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import AvatarTutor from "./avatarTutor";
import {GET_TOP_TUTORES} from "../../actions/types"

class ListaTutores extends Component {
	componentWillMount() {
		this.props.getListaTutores(GET_TOP_TUTORES);
	}
	render() {
    const { tutores } = this.props;
		return (
			<section className="d-flex flex-wrap justify-content-around">
				{tutores.map((avatar,index) => 
					<AvatarTutor {...avatar} key={index}/>
				)}
			</section>
		);
	}
}

const mapStateToProps = state => ({ tutores: state.tutores });

export default connect(
	mapStateToProps,
	actions
)(ListaTutores);
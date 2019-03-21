import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import AvatarTutor from "./avatarTutor";

class ListaTutores extends Component {
	componentWillMount() {
		this.props.getListaTutores();
	}
	render() {
    const { tutores } = this.props;
		return (
			<section className="container d-flex flex-wrap justify-content-around">
				{tutores.map(avatar => 
					<AvatarTutor {...avatar} />
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
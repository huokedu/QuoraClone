var React = require('react');
var PropTypes = React.PropTypes;
var AnswerStore = require('../../stores/answer_store.js');
var ApiUtil = require('../../util/api_util.js');



var AnswerEditForm = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function() {
		return {
			body: this.props.answer.body
		};
	},

	componentDidMount: function () {
		this.answerListener = AnswerStore.addListener(this._onStoreChange);
	},

	_onStoreChange: function() {

	},

	componentWillUnmount: function() {
		this.answerListener.remove();
	},

	_onBodyChange: function(e) {
		this.setState({ body: e.target.value });
	},

	handleEdit: function(e) {
    e.preventDefault();

    ApiUtil.editAnswer(this.props.answer, this.state, function (answer) {
			this.props.onEditEnd();
    }.bind(this));
	},

	render: function() {
		return (
			<form className="answer-form group"
						onSubmit={this.handleEdit}
						id="answer-form"
						>

				<section className="user-section">
					<div className="user-info">
						<img className="user-pic" />
						<p className="user-info">{this.props.submitter.username}</p>
					</div>
				</section>

				<input type="textarea"
					className="answer-body"
					onChange={this._onBodyChange}
					value={this.state.body}>
				</input>

				<div className="submit-area group">
					<input type="submit"
								 className="submit-answer-button"
								 value="Submit Answer"
								 />

							 <a href={"/#/main/questions/" + this.props.answer.question_id}
            onClick={this.props.onEditEnd}
            className="cancel-link"
            value="Cancel">Cancel</a>
				</div>
			</form>
		);
	}

});

module.exports = AnswerEditForm;

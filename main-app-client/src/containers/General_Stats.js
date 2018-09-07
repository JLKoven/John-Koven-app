import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
//import "./General_Stats.css";
import { s3Upload } from "../libs/awsLib";

export default class General_Stats extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
  isLoading: null,
  isDeleting: null,
  General_Stat: null,
  content: "",
  attachmentURL: null
};
  }

  async componentDidMount() {
    try {
      let attachmentURL;
      const General_Stat = await this.getGeneral_Stat();
      const { content, attachment } = General_Stat;

      if (attachment) {
        attachmentURL = await Storage.vault.get(attachment);
      }

      this.setState({
        General_Stat,
        content,
        attachmentURL
      });
    } catch (e) {
      alert(e);
    }
  }

  getGeneral_Stat() {
    return API.get("General_Stats", `/General_Stats/${this.props.match.params.id}`);
  }

  validateForm() {
  return this.state.content.length > 0;
}

formatFilename(str) {
  return str.replace(/^\w+-/, "");
}

handleChange = event => {
  this.setState({
    [event.target.id]: event.target.value
  });
}

handleFileChange = event => {
  this.file = event.target.files[0];
}

saveGeneral_Stat(General_Stat) {
  return API.put("General_Stats", `/General_Stats/${this.props.match.params.id}`, {
    body: General_Stat
  });
}

handleSubmit = async event => {
  let attachment;


  event.preventDefault();

  if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
    alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
    return;
  }

  this.setState({ isLoading: true });

  try {
    if (this.file) {
      attachment = await s3Upload(this.file);
    }

    await this.saveGeneral_Stat({
      content: this.state.content,
      attachment: attachment || this.state.General_Stat.attachment
    });
    this.props.history.push("/");
  } catch (e) {
    alert(e);
    this.setState({ isLoading: false });
  }
}

deleteGeneral_Stat() {
  return API.del("General_Stats", `/General_Stats/${this.props.match.params.id}`);
}

handleDelete = async event => {
  event.preventDefault();

  const confirmed = window.confirm(
    "Are you sure you want to delete this General_Stat?"
  );

  if (!confirmed) {
    return;
  }

  this.setState({ isDeleting: true });

  try {
    await this.deleteGeneral_Stat();
    this.props.history.push("/");
  } catch (e) {
    alert(e);
    this.setState({ isDeleting: false });
  }
}

render() {
  return (
    <div className="General_Stats">
      {this.state.General_Stat &&
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              onChange={this.handleChange}
              value={this.state.content}
              componentClass="textarea"
            />
          </FormGroup>
          {this.state.General_Stat.attachment &&
            <FormGroup>
              <ControlLabel>Attachment</ControlLabel>
              <FormControl.Static>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={this.state.attachmentURL}
                >
                  {this.formatFilename(this.state.General_Stat.attachment)}
                </a>
              </FormControl.Static>
            </FormGroup>}
          <FormGroup controlId="file">
            {!this.state.General_Stat.attachment &&
              <ControlLabel>Attachment</ControlLabel>}
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Save"
            loadingText="Saving…"
          />
          <LoaderButton
            block
            bsStyle="danger"
            bsSize="large"
            isLoading={this.state.isDeleting}
            onClick={this.handleDelete}
            text="Delete"
            loadingText="Deleting…"
          />
        </form>}
    </div>
  );
}
}

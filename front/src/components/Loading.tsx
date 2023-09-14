import { Loader, Dimmer } from "semantic-ui-react";
import PropTypes from "prop-types";

type Loading = {
    inverted: boolean,
    content: string
};

function Loading(props: Loading) {
  return (
    <Dimmer inverted={props.inverted} action="true">
      <Loader content={props.content} />
    </Dimmer>
  );
}

Loading.propTypes = {
  inverted: PropTypes.bool,
  content: PropTypes.string
};

export default Loading;
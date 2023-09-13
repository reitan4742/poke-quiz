import { Loader, Dimmer } from "semantic-ui-react";

function Loading({ inverted = true, content=""}) {
  return (
    <Dimmer inverted={inverted} action="true">
      <Loader content={content} />
    </Dimmer>
  )
}

export default Loading;
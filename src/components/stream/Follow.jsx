import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Heading, Button } from "react-bulma-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import FollowButton from "../profile/buttons/FollowButton.jsx";
import { sendFollow, checkFollowing } from "../profile/ProfileActions";

function Follow(props) {
  const [isFollowing, setIsFollowing] = useState(false);
  var checkFollow = false;

  useEffect(() => {
    if (!isFollowing) {
      checkFollow = props.checkFollowing(props.follower.id);
      if (checkFollow !== isFollowing) {
        setIsFollowing(checkFollowing);
      }
    }
  })

  const followBackButton = () => {
    return (
      <Card.Footer.Item style={{margin: "auto"}} >
        <Button style={{ minHeight: "4em" }} onClick={() => props.sendFollow(props.follower)}>
          Follow Back
          <FollowButton />
        </Button>
      </Card.Footer.Item>
    )
  }

  return (
      <Card>
        <Card.Content>
          <Heading size={4}>
            <b>{props.follower.displayName}</b> is now following you
          </Heading>
        </Card.Content>
        <Card.Footer>
          {isFollowing ? followBackButton() : null}
        </Card.Footer>
      </Card>
  );
}

Follow.propTypes = {
  follower: PropTypes.object.isRequired,
  sendFollow: PropTypes.func.isRequired,
  checkFollowing: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, { sendFollow, checkFollowing })(
  withRouter(Follow)
);

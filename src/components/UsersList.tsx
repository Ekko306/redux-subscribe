import { css } from "@emotion/css";
import { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import faker from "faker";
import { RootState } from "store";
import { api } from "../service";

const mapState = (state: RootState) => ({
  users: api.endpoints.getUsers.select(3)(state)
});
const mapDispatch = {
  getUsers: api.endpoints.getUsers.initiate,
  updateUser: api.endpoints.updateUser.initiate
};
const connector = connect(mapState, mapDispatch);
type UsersListProps = ConnectedProps<typeof connector>;

class UsersListComp extends Component<UsersListProps> {
  unsubscribe: null | (() => void) = null;

  componentDidMount() {
    const { getUsers } = this.props;
    // Start a subscription for the component to the cached data
    const { unsubscribe } = getUsers(3);

    // Store the unsubscribe promise for later use
    this.unsubscribe = unsubscribe;
  }

  componentWillUnmount() {
    // Unsubscribe the component from the cached data when unmounting
    this.unsubscribe?.();
  }

  handleUpdateUser1Name = () => {
    this.props.updateUser({
      id: 1,
      name: faker.name.findName()
    });
  };

  render() {
    // Access the current cached data and request status from the Redux store
    const { data = [] } = this.props.users;

    return (
      <div>
        <h4>Users List</h4>
        <button onClick={this.handleUpdateUser1Name}>Update user 1 name</button>
        {data.map((user) => (
          <div
            key={user.id}
            className={css`
              > *:not(:last-of-type) {
                margin-right: 8px;
              }
            `}
          >
            <span>
              <strong>ID: </strong>
              {user.id}
            </span>
            <span>
              <strong>Name: </strong>
              {user.name}
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export const UsersList = connector(UsersListComp);

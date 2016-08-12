// react requires
const React           = require('react');
const Link = require('react-router').Link;



const UserTable = React.createClass({

  render() {
    return (
      <section className="users-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {
              this.rows()
            }
          </tbody>
        </table>
      </section>
    );
  },

  row(user) {
    return (
      <tr key={user.id}>
        <td>
          <Link to={`/users/${user.id}`} className="text-link" title="See more info">{user.name}</Link>
        </td>
        <td>{user.location}</td>
      </tr>
    );
  },

  rows() {
    return this.props.users.map((user) => { return this.row(user); });
  },

});

module.exports = UserTable;


// function MyComponent() {
//     return (<div>Hello OpenClassrooms ð</div>)
// }

// ReactDOM.render(<MyComponent />, document.getElementsByClassName("#root"));

class Header extends React.Component {
    render() {
    return (
    <div>
        <h1>La maison jungle</h1>
    </div>
    );
    }
}

function Description() {
    return (<p>Ici achetez toutes les plantes dont vous avez toujours rÃªvÃ© ðµð±ð</p>)
}

ReactDOM.render(<Header /><Description />, document.getElementById("root"));


class HelloMessage extends React.Component {
    render() {
      return (
        <div>
          Salut {this.props.name}
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <HelloMessage name="Thierry" />,
    document.getElementById('hello-example')
  );

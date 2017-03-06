var FilterComponent = React.createClass({
  render: function() {
    return (
      <div>
        <input onClick={this.props.filterBy} placeHolder="Number" />
        <input onClick={this.props.filterBy} placeHolder="Name" />
        <input onClick={this.props.filterBy} placeHolder="Classification" />
        <input onClick={this.props.filterBy} placeHolder="FleeRate" />
        <input onClick={this.props.filterBy} placeHolder="MaxCP" />
        <input onClick={this.props.filterBy} placeHolder="MaxHP" />
      </div>
    );
  }
});

var FastAttackItem = React.createClass({
  render: function() {
    return (
      <ul>
        <li>Name: {this.props.data.Name}</li>
        <li>Type: {this.props.data.Type}</li>
        <li>Damage: {this.props.data.Damage}</li>
      </ul>
    );
  }
});

var FastAttacksList = React.createClass({
  render: function() {
    var fastAttacks = this.props.fastAttacks.map(function (fastAttack, index) {
      return (
        <FastAttackItem data={fastAttack} key={fastAttack.Name + index} />
      );
    });

    return (
      <ul>
        {fastAttacks}
      </ul>
    );
  }
});

var PokemonItem = React.createClass({
  render: function() {
    return (
      <ul>
        <li>Number: {this.props.data.Number}</li>
        <li>Name: {this.props.data.Name}</li>
        <li>Classification: {this.props.data.Classification}</li>
        <li>FleeRate: {this.props.data.FleeRate}</li>
        <li>MaxCP: {this.props.data.MaxCP}</li>
        <li>MaxHP: {this.props.data.MaxHP}</li>
        <li>Fast Attacks: <FastAttacksList fastAttacks={this.props.data['Fast Attack(s)']} /></li>
      </ul>
    );
  }
});

var PokemonList = React.createClass({
  render: function() {
    var pokemons = this.props.pokemonData.map(function (pokemon, index) {
      return (
        <PokemonItem data={pokemon} key={pokemon.Name + index} />
      );
    });

    return (
      <div>
        {pokemons}
      </div>
    );
  }
});

var PokemonContainer = React.createClass({
  getInitialState: function() {
    return {
      offset: 0,
      limit: 10,
      filterBy: ''
    };
  },
  handleLimitChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleFilterByChange: function(e) {
    this.setState({text: e.target.value});
  },
  render: function() {
    return (
      <div>
        <FilterComponent filterBy={this.state.filterBy} />
        <PokemonList pokemonData={this.props.pokemonData} />
      </div>
    );
  }
});

ReactDOM.render(
  <PokemonContainer pokemonData={pokemonData} />,
  document.getElementById('content')
);
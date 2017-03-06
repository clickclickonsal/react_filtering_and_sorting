var FilterList = React.createClass({
  render: function() {
    var self = this;

    var filters = this.props.options.map(function (option, index) {
      return (
        <button key={option + index} onClick={function () { self.props.changeFilterBy(option) }}>{option}</button>
      );
    });

    return (
      <ul className="options">
        {filters}
      </ul>
    );
  }
});

var FilterComponent = React.createClass({
  render: function() {
    return (
      <div>
        <FilterList changeFilterBy={this.props.changeFilterBy} options={['Number', 'Name', 'Classification', 'FleeRate', 'MaxCP', 'MaxHP']} />
        <input placeholder="Text yo!" onChange={this.props.changeText} />
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
      filterBy: '',
      filterText: '',
      pokemonData: this.props.pokemonData
    };
  },
  changeFilterBy: function(option) {
    this.setState({filterBy: option});
  },
  changeText: function (e) {
    this.setState({filterText: e.target.value})
    // this.handleFiltering();
  },
  handleFiltering: function () {
    if (this.state.filterBy) {
      var filteredData = this.props.pokemonData.filter((pokemon, index) => {
        if (String(pokemon[this.state.filterBy]).toLowerCase().includes(this.state.filterText.toLowerCase())) {
          return pokemon;
        }
      });

      this.setState({pokemonData: filteredData});
    } else {
      alert('I need a FilterBY!!!!!');
    }
  },
  handleSort: function (asc) {
    var sortedData = this.props.pokemonData.sort((a, b) => {
      var nameA = String(a[this.state.filterBy]).toLowerCase(); // ignore upper and lowercase
        var nameB = String(b[this.state.filterBy]).toLowerCase(); // ignore upper and lowercase
        if (asc) {
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        } else {
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
        }

        // names must be equal
        return 0;
    });

    this.setState({pokemonData: sortedData});
  },
  render: function() {
    var self = this;

    return (
      <div>
        <div>Filter By: {this.state.filterBy}</div>
        {this.state.filterText && <div>Filtering on: {this.state.filterText}</div>}
        <FilterComponent changeText={this.changeText} changeFilterBy={this.changeFilterBy} />
        <button onClick={this.handleFiltering}>Filter my data Please!</button>
        <button onClick={function () { self.handleSort(true)}}>Sort Asc</button>
        <button onClick={function () { self.handleSort(false)}}>Sort Desc</button>
        <PokemonList pokemonData={this.state.pokemonData} handleFilter={this.props.handleFilter} />
      </div>
    );
  }
});

ReactDOM.render(
  <PokemonContainer pokemonData={pokemonData} />,
  document.getElementById('content')
);
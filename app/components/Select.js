import React, { Component } from 'react';

import CreatableSelect from 'react-select/lib/Creatable';

export default class CreatableMulti extends Component {
  handleChange = (newValue: any, actionMeta: any) => {
    alert(newValue, actionMeta);
  };

  render() {
    return (
      <CreatableSelect
        stytle={{ marginTop: '50px' }}
        isMulti
        onChange={this.handleChange}
        placeholder="添加标签"
      />
    );
  }
}

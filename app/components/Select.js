import React, { Component } from "react";

import CreatableSelect from "react-select/lib/Creatable";
// import { colourOptions } from '../data';

export default class CreatableMulti extends Component<*, State> {
  handleChange = (newValue: any, actionMeta: any) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  render() {
    return (
      <CreatableSelect
        stytle={{ marginTop: "50px"}}
        isMulti
        onChange={this.handleChange}
        placeholder="添加标签"
      />
    );
  }
}
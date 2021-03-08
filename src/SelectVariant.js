import React from 'react';
import select from '@material-ui/core/Select';
import './Form.css';

const lookup = {
  "None": [{
    id: '0', text: 'None'
  }],

  "Bedsheets": [
    { id: '0', text: 'Please select a size' },
    { id: '1', text: 'King Size (108X108in)' },
    { id: '2', text: 'King Size (90X100in)' },
    { id: '3', text: 'Queen Size (81X96in)' },
    { id: '4', text: 'Kids/Twin (60X90in)' }
  ],
  "Curtains": [
    { id: '0', text: 'Please select a size' },
    { id: '5', text: 'Curtains (Window-5ft)' },
    { id: '6', text: 'Curtains (Window-7ft)' },
    { id: '7', text: 'Curtains (Door-9ft)' },
    { id: '8', text: 'Curtains (Door-8ft)' }
  ],
  "Shirts": [
    { id: '0', text: 'Please select a size' },
    { id: '9', text: '38' },
    { id: '10', text: '40' },
    { id: '11', text: '42' },
    { id: '12', text: '44' }
  ],
  "Sarees": [
    { id: '13', text: '6.5m' }
  ],
  "Kaftans": [
    { id: '0', text: 'Please select a size' },
    { id: '14', text: 'XS' },
    { id: '15', text: 'S' },
    { id: '16', text: 'M' },
    { id: '17', text: 'L' },
    { id: '18', text: 'XL' },
  ]
}

class selectVariant extends React.Component {

  render() {

    const options = lookup[this.props.variant];

    return (
      <div>
        <select value={this.props.variant} onChange={this.props.onChangeVariantValue(this.props.itemId)}>
          <option value="None">Please select an item</option>
          <option value="Bedsheets">Bedsheets</option>
          <option value="Curtains">Curtains</option>
          <option value="Shirts">Shirts</option>
          <option value="Sarees">Sarees</option>
          <option value="Kaftans">Kaftans</option>
        </select>

        <select value={this.props.variantType} onChange={this.props.onChangeVariantTypeValue(this.props.itemId)}>
          {options.map(o => <option key={o.id} value={o.text} >{o.text}</option>)}
        </select>
      </div>
    );
  }
}


export default selectVariant;


